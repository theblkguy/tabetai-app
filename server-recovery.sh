#!/bin/bash

echo "🔧 Server Recovery Script"
echo "========================="

# Check if this is being run on the EC2 instance
if [ ! -f /home/ubuntu/tabetai-app/backend/server.js ]; then
    echo "❌ This script should be run on the EC2 server"
    echo "👉 SSH to your server first: ssh -i your-key.pem ubuntu@3.129.135.94"
    exit 1
fi

echo "📍 Current location: $(pwd)"
echo "👤 Current user: $(whoami)"

# Navigate to the app directory
cd /home/ubuntu/tabetai-app/backend

echo "📋 Checking current PM2 status..."
pm2 status

echo "🔄 Attempting to restart tabetai-app..."
pm2 restart tabetai-app || {
    echo "⚠️  PM2 restart failed, trying to start fresh..."
    
    echo "🛑 Stopping any existing processes..."
    pm2 delete tabetai-app 2>/dev/null || echo "No existing process to delete"
    
    echo "🚀 Starting fresh..."
    NODE_ENV=production pm2 start server.js --name "tabetai-app"
    
    echo "💾 Saving PM2 configuration..."
    pm2 save
}

echo "✅ Final PM2 status:"
pm2 status

echo "🌐 Testing server response..."
sleep 3
curl -I http://localhost:5000 || echo "❌ Server not responding on localhost:5000"

echo "📊 Server logs (last 20 lines):"
pm2 logs tabetai-app --lines 20

echo "✅ Recovery script completed!"
echo "👉 Test your site: https://tabetai.online"
