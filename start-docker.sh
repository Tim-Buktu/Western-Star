#!/bin/bash

# Western Star Docker Startup Script
echo "🚀 Starting Western Star with Docker..."

# Stop any existing containers
echo "🛑 Stopping any existing containers..."
docker compose down -v

# Build and start all services
echo "🔨 Building and starting all services..."
docker compose --profile dev up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo "📊 Service Status:"
docker compose ps

# Test connectivity
echo ""
echo "🧪 Testing connectivity..."
echo "Backend API: $(curl -s http://localhost:3001/health 2>/dev/null || echo 'Not ready yet')"
echo "Frontend (dev): $(curl -s http://localhost:5173 2>/dev/null | head -c 50 || echo 'Not ready yet')..."

echo ""
echo "✅ Docker setup complete!"
echo "🌐 Access your application:"
echo "   - Frontend (dev): http://localhost:5173"
echo "   - Backend API:   http://localhost:3001"
echo "   - Database:      localhost:5435"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: docker compose logs -f"
echo "   - Stop services: docker compose down"
echo "   - Restart: docker compose restart"
