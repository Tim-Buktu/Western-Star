#!/bin/bash
set -e

echo "🚀 Setting up Western Star for Production..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Production Environment Variables
DB_PASSWORD=your-secure-database-password-here
# Where your app will be accessed
FRONTEND_URL=http://your-domain.com
# Frontend uses a relative API base; nginx proxies /api -> backend
VITE_API_URL=/api
EOF
    echo "⚠️  Please edit .env file with your production settings!"
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose down -v 2>/dev/null || true

# Build and start production containers
echo "🔨 Building and starting production containers..."
docker compose up --build -d postgres backend frontend

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 15

# Check service health
echo "🔍 Checking service health..."
docker compose ps

echo "✅ Production setup complete!"
echo ""
echo "🌐 Services available at:"
echo "  Frontend: http://localhost:8080"
echo "  Backend:  http://localhost:3001" 
echo "  Health:   http://localhost:3001/health"
echo ""
echo "🔒 Don't forget to:"
echo "  1. Update .env with production passwords"
echo "  2. Configure your reverse proxy/load balancer"
echo "  3. Set up SSL certificates"
echo "  4. Configure domain names"
