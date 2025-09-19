#!/bin/bash

# Quick Docker management commands for Western Star

case "$1" in
    "start")
        echo "🚀 Starting Western Star with Docker..."
        docker-compose up -d
        echo "✅ Services started!"
        echo "🌐 Frontend: http://localhost:5173"
        echo "🔧 Backend: http://localhost:3001"
        echo "🗄️  Database: localhost:5435"
        ;;
    "stop")
        echo "🛑 Stopping Western Star..."
        docker-compose down
        echo "✅ Services stopped!"
        ;;
    "restart")
        echo "🔄 Restarting Western Star..."
        docker-compose restart
        echo "✅ Services restarted!"
        ;;
    "logs")
        echo "📋 Showing logs..."
        docker-compose logs -f
        ;;
    "status")
        echo "📊 Service Status:"
        docker-compose ps
        ;;
    "clean")
        echo "🧹 Cleaning up (removes volumes/data)..."
        docker-compose down -v
        docker system prune -f
        echo "✅ Cleanup complete!"
        ;;
    "build")
        echo "🔨 Rebuilding services..."
        docker-compose up --build -d
        echo "✅ Rebuild complete!"
        ;;
    *)
        echo "🛠️  Western Star Docker Management"
        echo ""
        echo "Usage: ./docker-manage.sh [command]"
        echo ""
        echo "Commands:"
        echo "  start    - Start all services"
        echo "  stop     - Stop all services" 
        echo "  restart  - Restart all services"
        echo "  logs     - View logs (press Ctrl+C to exit)"
        echo "  status   - Show service status"
        echo "  build    - Rebuild and start services"
        echo "  clean    - Stop and remove all data (WARNING: deletes database)"
        echo ""
        echo "Current status:"
        docker-compose ps 2>/dev/null || echo "Services not running"
        ;;
esac
