#!/bin/bash
set -e

echo "🐳 Setting up Western Star with Docker..."

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running!"
    echo "Please start Docker Desktop or Docker daemon and try again."
    exit 1
fi

echo "✅ Docker is running"

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose down -v 2>/dev/null || true

# Build and start containers
echo "🔨 Building and starting containers..."
docker compose --profile dev up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo "🔍 Checking service health..."
docker compose ps

echo "✅ Setup complete!"
echo ""
echo "🌐 Services available at:"
echo "  Frontend (dev): http://localhost:5173"
echo "  Backend:       http://localhost:3001"
echo "  Health:        http://localhost:3001/health"
echo ""
echo "📝 Useful commands:"
echo "  View logs:     docker compose logs -f"
echo "  Stop services: docker compose down"
echo "  Restart:       docker compose restart"
echo "  Database CLI:  docker compose exec postgres psql -U westernstar -d westernstar_db"
