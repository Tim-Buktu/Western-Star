#!/bin/bash

# Western Star Backend Setup Script
echo "🌟 Western Star Backend Setup"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js $(node -v) found"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    print_error "PostgreSQL is not installed. Please install PostgreSQL 12+ and try again."
    exit 1
fi

print_success "PostgreSQL found"

# Navigate to backend directory
cd "$(dirname "$0")"

# Install dependencies
print_status "Installing dependencies..."
if npm install; then
    print_success "Dependencies installed"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating .env file..."
    cp .env.example .env
    print_success ".env file created"
else
    print_warning ".env file already exists"
fi

# Check if database exists
print_status "Checking database connection..."

# Read database URL from .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Extract database details from DATABASE_URL
# Format: postgresql://username:password@host:port/database
DB_URL_REGEX="postgresql://([^:]+):([^@]+)@([^:]+):([^/]+)/(.+)"

if [[ $DATABASE_URL =~ $DB_URL_REGEX ]]; then
    DB_USER="${BASH_REMATCH[1]}"
    DB_PASS="${BASH_REMATCH[2]}"
    DB_HOST="${BASH_REMATCH[3]}"
    DB_PORT="${BASH_REMATCH[4]}"
    DB_NAME="${BASH_REMATCH[5]}"
else
    print_error "Could not parse DATABASE_URL from .env file"
    exit 1
fi

# Check if database exists
print_status "Checking if database '$DB_NAME' exists..."
if PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    print_success "Database '$DB_NAME' exists"
else
    print_warning "Database '$DB_NAME' does not exist"
    read -p "Would you like to create it? (y/N): " create_db
    
    if [[ $create_db =~ ^[Yy]$ ]]; then
        print_status "Creating database '$DB_NAME'..."
        
        # Create database and user
        PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || \
        PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME;" 2>/dev/null
        
        PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" 2>/dev/null || true
        PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" 2>/dev/null || true
        
        if PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
            print_success "Database '$DB_NAME' created successfully"
        else
            print_error "Failed to create database. Please create it manually:"
            echo "  createdb -h $DB_HOST -p $DB_PORT -U postgres $DB_NAME"
            echo "  psql -h $DB_HOST -p $DB_PORT -U postgres -c \"CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';\""
            echo "  psql -h $DB_HOST -p $DB_PORT -U postgres -c \"GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;\""
            exit 1
        fi
    else
        print_error "Database is required. Please create '$DB_NAME' manually and try again."
        exit 1
    fi
fi

# Generate Prisma client
print_status "Generating Prisma client..."
if npm run generate; then
    print_success "Prisma client generated"
else
    print_error "Failed to generate Prisma client"
    exit 1
fi

# Run migrations
print_status "Running database migrations..."
if npm run migrate; then
    print_success "Database migrations completed"
else
    print_error "Database migrations failed"
    exit 1
fi

# Run seed
print_status "Seeding database with initial data..."
if npm run seed; then
    print_success "Database seeded successfully"
else
    print_warning "Database seeding failed (this is optional)"
fi

# Final success message
echo ""
print_success "🎉 Backend setup completed successfully!"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Start the development server: ${YELLOW}npm run dev${NC}"
echo "2. The API will be available at: ${YELLOW}http://localhost:$PORT${NC}"
echo "3. Access Prisma Studio: ${YELLOW}npm run studio${NC}"
echo ""
echo -e "${BLUE}Frontend setup:${NC}"
echo "1. Make sure your frontend .env has: ${YELLOW}VITE_API_URL=/api${NC} (recommended)"
echo "2. Start your frontend development server"
echo "3. Any localStorage data will be automatically detected for migration"
echo ""
