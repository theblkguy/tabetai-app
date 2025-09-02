#!/bin/bash

# Tabetai App Development Startup Script

echo "🍜 Starting Tabetai App Development Environment..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Check if .env files exist
if [ ! -f "client/.env" ]; then
    echo "⚠️  client/.env file not found. Creating template..."
    cat > client/.env << EOL
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_SPOONACULAR_API_KEY=your_spoonacular_api_key_here
EOL
    echo "📝 Please update client/.env with your actual API keys"
fi

if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env file not found. Creating template..."
    cat > backend/.env << EOL
MONGODB_URI=mongodb://localhost:27017/tabetai
SPOONACULAR_API_KEY=your_spoonacular_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
PORT=5000
NODE_ENV=development
EOL
    echo "📝 Please update backend/.env with your actual configuration"
fi

# Start the applications
echo "🚀 Starting development servers..."
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🖥️  Backend will be available at: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Start backend in background
echo "Starting backend server..."
cd backend && npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend (this will block)
echo "Starting frontend server..."
cd .. && npm start

# If we get here, frontend was stopped, so stop backend too
echo "Stopping backend server..."
kill $BACKEND_PID 2>/dev/null || true

echo "👋 All servers stopped. Goodbye!"
