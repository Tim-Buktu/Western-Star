# 🐳 Western Star Docker Setup

This directory contains everything you need to run Western Star CMS using Docker containers.

## 🚀 Quick Start

### Development Setup

```bash
# Quick setup (recommended)
./setup-docker.sh

# Or manual setup (dev profile)
docker compose --profile dev up -d --build postgres backend frontend-dev
```

### Production Setup

```bash
# Production deployment
./setup-production.sh

# Or manual production setup (single compose uses Nginx frontend)
docker compose up -d --build postgres backend frontend
```

## 📋 Prerequisites

- Docker Desktop or Docker Engine
- Docker Compose v2.0+
- At least 2GB available RAM

## 🏗️ Architecture

The Docker setup includes:

- **PostgreSQL Database** (postgres:16)

  - Port: 5432
  - Database: westernstar_db
  - User: westernstar

- **Backend API** (Node.js/Express)

  - Port: 3001
  - Includes: Prisma ORM, migrations, seeding

- **Frontend** (React/Vite)
  - Development: Port 5173
  - Production: Port 8080 (Nginx)

## 🔧 Commands

### Development

```bash
# Start dev services
docker compose --profile dev up -d --build postgres backend frontend-dev

# View logs
docker compose logs -f backend postgres

# Stop services
docker compose down

# Rebuild and restart
docker compose up --build -d

# Access database
docker compose exec postgres psql -U westernstar -d westernstar_db

# Run backend commands
docker compose exec backend npm run migrate
docker compose exec backend npm run seed
```

### Production

```bash
# Start production services
docker compose up -d --build postgres backend frontend

# View production logs
docker compose logs -f

# Stop production services
docker compose down
```

## 🌐 Service URLs

### Development

- Frontend: http://localhost:5173
- API via proxy: http://localhost:5173/api -> backend
- Backend API direct: http://localhost:3001
- Health Check: http://localhost:3001/health
- Database: localhost:5435

### Production

- Frontend: http://localhost:8080
- API via proxy: http://localhost:8080/api -> backend
- Backend API direct: http://localhost:3001
- Health Check: http://localhost:3001/health

## 🔒 Environment Variables

### Development (.env)

The development setup uses sensible defaults. No additional configuration required.

### Production (.env)

Create a `.env` file for production:

```env
# Database
DB_PASSWORD=your-secure-password-here

# URLs
FRONTEND_URL=https://your-domain.com
VITE_API_URL=/api
```

## 📊 Health Checks

All services include health checks:

- **Database**: `pg_isready` command
- **Backend**: HTTP GET `/health` endpoint
- **Frontend**: Nginx status

## 🗄️ Data Persistence

- **Database**: Uses Docker volume `postgres_data` (dev) or `postgres_prod_data` (prod)
- **Migration**: Automatic on container start
- **Seeding**: Runs once on first start

## 🔍 Troubleshooting

### Services won't start

```bash
# Check logs
docker compose logs

# Restart specific service
docker compose restart backend

# Full cleanup and rebuild
docker compose down -v
docker compose up --build -d
```

### Database connection issues

```bash
# Check database health
docker compose exec postgres pg_isready -U westernstar -d westernstar_db

# Reset database
docker compose down -v
docker volume rm website_postgres_data
docker compose up -d
```

### Port conflicts

```bash
# Check what's using ports
lsof -ti :5173 :3001 :5432

# Modify ports in docker-compose.yml if needed
```

## 🚀 Deployment

### Local Development

1. Run `./setup-docker.sh`
2. Visit http://localhost:5173

### Production Server

1. Clone repository
2. Run `./setup-production.sh`
3. Configure reverse proxy
4. Set up SSL certificates
5. Update DNS records

### Cloud Platforms

#### AWS/Digital Ocean/Linode

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clone and deploy
git clone <your-repo>
cd western-star-landing
./setup-production.sh
```

#### Docker Swarm/Kubernetes

The docker-compose files can be converted for orchestration platforms.

## 📁 Docker Files Structure

```
├── docker-compose.yml          # Dev/prod using profiles
├── Dockerfile                  # Frontend build + Nginx
├── nginx.conf                  # Nginx configuration
├── setup-docker.sh            # Development setup script
├── setup-production.sh        # Production setup script
└── backend/
    ├── Dockerfile             # Backend container
    ├── docker-entrypoint.sh   # Backend startup script
    ├── init-db.sql           # Database initialization
    └── .dockerignore         # Docker ignore rules
```

## 🎯 Next Steps

1. **Development**: Use `./setup-docker.sh` to get started
2. **Production**: Configure `.env` and run `./setup-production.sh`
3. **Domain Setup**: Configure reverse proxy and SSL
4. **Monitoring**: Add logging and monitoring solutions
5. **Backups**: Set up database backup strategies

---

🎉 **Your Western Star CMS is now fully containerized and ready for deployment!**
