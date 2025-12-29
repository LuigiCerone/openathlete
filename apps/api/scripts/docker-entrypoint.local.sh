#!/bin/sh
set -e

# Check required environment variables
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is required"
  exit 1
fi

cd /app/libs/database

export DATABASE_URL

# Run migrations
if prisma migrate deploy; then
  echo "✓ Migrations completed successfully"
else
  echo "ERROR: Migrations failed"
  exit 1
fi

# Start the API
cd /app/apps/api
exec node dist/main.js

