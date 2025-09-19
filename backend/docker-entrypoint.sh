#!/bin/sh
set -e

echo "🚀 Starting Western Star Backend..."

# Wait for database to be ready
echo "⏳ Waiting for database..."
while ! nc -z postgres 5432; do
  echo "Waiting for postgres..."
  sleep 1
done
echo "✅ Database is ready!"

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️  Running database migrations..."
npx prisma migrate deploy

# Seed the database (only if not already seeded)
echo "🌱 Seeding database..."
npm run seed || echo "⚠️  Seeding failed or already completed"

# Start the server
echo "🎯 Starting server..."
exec npm start
