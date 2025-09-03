#!/bin/bash

echo "🚀 Starting production deployment..."

# Exit on any error
set -e

# Build the production client
echo "📦 Building production client..."
npm run build

# Copy built files to backend for deployment
echo "📋 Copying build files..."
if [ -d "backend/public" ]; then
    rm -rf backend/public
fi
cp -r client/dist backend/public

echo "✅ Production build ready!"
echo "📂 Files in backend/public:"
ls -la backend/public/

echo ""
echo "🌐 To deploy to your server, run:"
echo "1. scp -r backend/ user@your-server:/path/to/app/"
echo "2. ssh user@your-server 'cd /path/to/app/backend && NODE_ENV=production npm start'"
echo ""
echo "Or if using PM2:"
echo "1. scp -r backend/ user@your-server:/path/to/app/"
echo "2. ssh user@your-server 'cd /path/to/app/backend && pm2 restart app'"
