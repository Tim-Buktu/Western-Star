# If you're experiencing Docker build issues, try these alternatives:

## Option 1: Use Debian-based image (recommended)

# Current Dockerfile uses debian-slim which should work reliably

## Option 2: Use Alpine-based image (if you prefer smaller images)

# Rename Dockerfile.alpine to Dockerfile and rebuild

## Option 3: Use pre-built image (if local builds fail)

# Uncomment the following lines in docker-compose.yml instead of 'build:' section:

#

# backend:

# image: node:18-slim

# working_dir: /app

# volumes:

# - ./backend:/app

# command: >

# sh -c "

# apt-get update &&

# apt-get install -y wget netcat-openbsd &&

# npm install &&

# npx prisma generate &&

# npx prisma migrate deploy &&

# npm run seed &&

# npm start

# "

## Troubleshooting Docker Issues:

### SSL/Network Issues:

# 1. Check your internet connection

# 2. Try using a VPN or different network

# 3. Use the Debian-based Dockerfile (already set)

### Permission Issues:

# 1. Ensure Docker has proper permissions

# 2. On macOS: Docker Desktop > Settings > Resources > Advanced

# 3. On Linux: Add your user to docker group

### Build Cache Issues:

# Clear Docker cache:

# docker system prune -a

# docker-compose build --no-cache

### Port Conflicts:

# Check if ports are in use:

# lsof -ti :3001 :5173 :5432

# Kill processes or change ports in docker-compose.yml
