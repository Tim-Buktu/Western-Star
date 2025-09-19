# 🐳 Docker Setup for Western Star

Your Western Star application is now fully configured to run with Docker! Everything runs with a single command.

## 🚀 Quick Start

### Start Everything

```bash
./start-docker.sh
```

### Or use the management script

```bash
./docker-manage.sh start
```

## 📋 Available Commands

### Management Script (`./docker-manage.sh`)

- `./docker-manage.sh start` - Start all services
- `./docker-manage.sh stop` - Stop all services
- `./docker-manage.sh restart` - Restart all services
- `./docker-manage.sh logs` - View logs
- `./docker-manage.sh status` - Check service status
- `./docker-manage.sh build` - Rebuild and start
- `./docker-manage.sh clean` - Remove everything (⚠️ deletes data)

### Direct Docker Commands

```bash
# Start services (dev)
docker compose --profile dev up -d --build postgres backend frontend-dev

# View logs
docker compose logs -f

# Stop services
docker compose down

# Rebuild everything
docker compose up --build -d
```

## 🌐 Access Points

Once running, access your application at:

- **🌍 Frontend**: http://localhost:5173
- **🔧 Backend API**: http://localhost:3001
- **🗄️ Database**: localhost:5435 (external port)
- **🔐 CMS Admin**: Click ⚙️ on frontend (email: `timothyhapsim@gmail.com`, password: `admin321`)

## 🏗️ Architecture

Your Docker setup includes:

### 🐘 Database (PostgreSQL)

- **Container**: `western-star-db`
- **Image**: `postgres:16`
- **Port**: 5435 (external) → 5432 (internal)
- **Data**: Persisted in Docker volume

### 🚀 Backend (Node.js/Express)

- **Container**: `western-star-backend`
- **Build**: Custom Dockerfile
- **Port**: 3001
- **Features**: Prisma ORM, health checks, auto-migrations

### ⚛️ Frontend (React/Vite)

- **Container**: `western-star-frontend`
- **Build**: Custom Dockerfile
- **Port**: 5173
- **Features**: Hot reloading, development server

## 🔧 Configuration

### Environment Variables

The Docker setup uses these key configurations:

```yaml
# Database
POSTGRES_DB: westernstar_db
POSTGRES_USER: westernstar
POSTGRES_PASSWORD: westernstar123

# Backend
NODE_ENV: development
DATABASE_URL: postgresql://westernstar:westernstar123@postgres:5432/westernstar_db
PORT: 3001
FRONTEND_URL: http://localhost:5173

# Frontend
VITE_API_URL: /api
VITE_PROXY_TARGET: http://backend:3001
```

### Health Checks

- **Database**: Checks PostgreSQL connectivity
- **Backend**: HTTP health endpoint (`/health`)
- **Frontend**: Automatic startup after backend is healthy

## 🛠️ Development Workflow

### 1. Start Development

```bash
./docker-manage.sh start
```

### 2. View Logs (for debugging)

```bash
./docker-manage.sh logs
```

### 3. Make Changes

- Code changes are reflected automatically (volumes mounted)
- For major changes, rebuild: `./docker-manage.sh build`

### 4. Stop When Done

```bash
./docker-manage.sh stop
```

## 🔍 Troubleshooting

### Services Won't Start

```bash
# Check Docker is running
docker info

# View detailed logs
docker-compose logs

# Check port conflicts
lsof -i :5173 -i :3001 -i :5435
```

### Database Issues

```bash
# Reset database (⚠️ deletes all data)
./docker-manage.sh clean
./docker-manage.sh start

# Access database directly
docker exec -it western-star-db psql -U westernstar -d westernstar_db
```

### Performance Issues

```bash
# Check resource usage
docker stats

# Clean up unused resources
docker system prune -f
```

## 📦 What's Included

- ✅ **Automatic Database Setup**: Migrations run automatically
- ✅ **Development Hot Reload**: Code changes reflect immediately
- ✅ **Health Monitoring**: Services wait for dependencies
- ✅ **Data Persistence**: Database data survives container restarts
- ✅ **Port Management**: No conflicts with local development
- ✅ **Easy Management**: Simple scripts for common tasks

## 🎯 Benefits of Docker Setup

1. **🔄 Consistency**: Same environment everywhere
2. **🚀 Quick Setup**: One command starts everything
3. **🧹 Clean Isolation**: No local dependency conflicts
4. **📦 Easy Deployment**: Ready for production
5. **🔧 Simple Management**: Clear commands for common tasks

---

**Your Western Star application is now fully containerized! 🎉**

Use `./docker-manage.sh start` to begin and `./docker-manage.sh status` to check everything is running correctly.
