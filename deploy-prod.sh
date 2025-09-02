#!/bin/bash

# Manual Production Deployment Script for Tabetai App
# Usage: ./deploy-prod.sh [EC2_IP] [SSH_KEY_PATH] [EC2_USER]

set -e

# Default values
EC2_IP=${1:-"3.129.135.94"}
SSH_KEY=${2:-"~/.ssh/tabetai-key.pem"}
EC2_USER=${3:-"ubuntu"}

echo "🚀 Starting production deployment to $EC2_IP"

# Check if SSH key exists
if [ ! -f "$SSH_KEY" ]; then
    echo "❌ SSH key not found at $SSH_KEY"
    echo "Please provide the correct path to your EC2 private key"
    exit 1
fi

# Build the application
echo "📦 Building application..."
npm install
npm run build

# Create deployment package
echo "📦 Creating deployment package..."
rm -rf deploy deployment.zip
mkdir -p deploy

# Copy backend files
cp -r backend/* deploy/
# Copy built frontend files
mkdir -p deploy/public
cp -r client/dist/* deploy/public/

# Create production environment file template
cat > deploy/.env.template << EOL
MONGODB_URI=your_mongodb_connection_string
SPOONACULAR_API_KEY=your_spoonacular_api_key
GOOGLE_CLIENT_ID=your_google_client_id
PORT=5000
NODE_ENV=production
EOL

# Create deployment archive
cd deploy
zip -r ../deployment.zip . -x "node_modules/*" "*.git*"
cd ..

echo "📤 Uploading to EC2 instance..."
scp -i "$SSH_KEY" -o StrictHostKeyChecking=no deployment.zip "$EC2_USER@$EC2_IP":~/

echo "🔧 Deploying on EC2..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_IP" << 'EOF'
    # Create application directory
    mkdir -p ~/tabetai-app
    cd ~/tabetai-app
    
    # Stop existing application
    pm2 delete tabetai-app 2>/dev/null || true
    
    # Backup current deployment
    if [ -d "current" ]; then
        rm -rf backup
        mv current backup
    fi
    
    # Extract new deployment
    mkdir -p current
    cd current
    unzip -o ~/deployment.zip
    
    # Check if .env exists, if not prompt user to create it
    if [ ! -f ".env" ]; then
        echo "⚠️  .env file not found. Please create it with your environment variables."
        echo "Template created as .env.template"
        echo "Run: cp .env.template .env && nano .env"
        echo "Then run: pm2 start server.js --name tabetai-app"
        exit 1
    fi
    
    # Install dependencies
    echo "📦 Installing production dependencies..."
    npm install --production
    
    # Start application with PM2
    echo "🚀 Starting application..."
    pm2 start server.js --name "tabetai-app" --env production
    pm2 save
    
    # Clean up
    rm ~/deployment.zip
    
    echo "✅ Deployment completed successfully!"
    pm2 status
EOF

# Clean up local files
rm -rf deploy deployment.zip

echo "🎉 Deployment completed!"
echo "Your app should be running at: http://$EC2_IP:5000"
echo ""
echo "To monitor your app:"
echo "ssh -i $SSH_KEY $EC2_USER@$EC2_IP"
echo "pm2 logs tabetai-app"
