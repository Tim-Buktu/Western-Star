#!/bin/bash

echo "🔍 Validating Docker setup..."

#!/bin/bash

echo "🔍 Validating Docker setup..."

# Check if Docker files exist
files=(
    "docker-compose.yml"
    "Dockerfile"
    "nginx.conf"
    "backend/Dockerfile"
    "backend/docker-entrypoint.sh"
    "backend/init-db.sql"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
    fi
done

echo ""
echo "🐳 Docker info:"
if docker info >/dev/null 2>&1; then
    echo "✅ Docker daemon is running"
    docker --version
    docker-compose --version 2>/dev/null || docker compose version
else
    echo "❌ Docker daemon is not running"
    echo "Please start Docker Desktop"
fi

echo ""
echo "📁 Project structure:"
echo "├── docker-compose.yml (profiles: dev, prod)"
echo "├── Dockerfile (frontend multi-stage)"
echo "├── setup-docker.sh (dev setup)"
echo "├── setup-production.sh (prod setup)"
echo "└── backend/"
echo "    ├── Dockerfile"
echo "    ├── docker-entrypoint.sh"
echo "    └── init-db.sql"

echo ""
echo "🚀 Ready to run:"
echo "  Development: ./setup-docker.sh"
echo "  Production:  ./setup-production.sh"
