# Deployment Guide for Tabetai App

## AWS EC2 Setup for Production Deployment

### Prerequisites
Your AWS EC2 instance (IP: 3.129.135.94) should have:
- Node.js 18+ installed
- PM2 installed globally (`npm install -g pm2`)
- Git installed
- Proper security groups allowing HTTP/HTTPS traffic

### Required GitHub Secrets

To set up the GitHub Actions deployment, you need to add the following secrets to your GitHub repository:

1. **Go to your GitHub repository** → Settings → Secrets and variables → Actions

2. **Add the following secrets:**

#### AWS Configuration
- `AWS_ACCESS_KEY_ID`: Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key

#### EC2 Connection
- `EC2_HOST`: `3.129.135.94` (your EC2 instance IP)
- `EC2_USER`: `ubuntu` (or `ec2-user` depending on your AMI)
- `EC2_SSH_KEY`: Your private SSH key content (the .pem file content)

#### Application Environment Variables
- `MONGODB_URI`: Your MongoDB connection string
- `SPOONACULAR_API_KEY`: Your Spoonacular API key
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID

### Setting up EC2 SSH Key Secret

1. Copy your EC2 private key file content:
```bash
cat path/to/your-key.pem
```

2. Copy the entire output (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`)

3. Paste it as the value for `EC2_SSH_KEY` secret in GitHub

### EC2 Instance Preparation

SSH into your EC2 instance and run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Create application directory
mkdir -p ~/tabetai-app

# Configure PM2 to start on system boot
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
```

### Security Group Configuration

Ensure your EC2 security group allows:
- SSH (port 22) from your IP
- HTTP (port 80) from anywhere (0.0.0.0/0)
- HTTPS (port 443) from anywhere (0.0.0.0/0)
- Custom TCP (port 5000) from anywhere (for your app)

### Deployment Process

1. **Push to main branch** - This triggers the GitHub Actions workflow
2. **The workflow will:**
   - Build the React frontend
   - Package the Node.js backend
   - Deploy to your EC2 instance
   - Start the application with PM2

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# On your local machine
npm run build
scp -r . ubuntu@3.129.135.94:~/tabetai-app/

# On EC2 instance
cd ~/tabetai-app
npm install --production
pm2 start server.js --name "tabetai-app"
pm2 save
```

### Monitoring

After deployment, you can monitor your application:

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@3.129.135.94

# Check PM2 status
pm2 status

# View logs
pm2 logs tabetai-app

# Restart application
pm2 restart tabetai-app
```

### Accessing Your Application

Once deployed, your application will be accessible at:
- `http://3.129.135.94:5000` - Full application (frontend + backend)
- Backend API endpoints will be available at `/api/*` routes

### SSL/HTTPS Setup (Optional but Recommended)

For production, consider setting up SSL with Let's Encrypt:

```bash
# Install Certbot
sudo apt install certbot

# Get SSL certificate (you'll need a domain name)
sudo certbot certonly --standalone -d yourdomain.com

# Configure reverse proxy with nginx
sudo apt install nginx
```

### Troubleshooting

1. **Port 5000 not accessible**: Check security groups and firewall settings
2. **PM2 not starting**: Check logs with `pm2 logs`
3. **Build failures**: Check environment variables are properly set
4. **Database connection**: Ensure MongoDB URI is correct and accessible from EC2

### Environment Variables Reference

Create these files in your deployment:

**Backend .env:**
```
MONGODB_URI=your_mongodb_connection_string
SPOONACULAR_API_KEY=your_spoonacular_api_key
GOOGLE_CLIENT_ID=your_google_client_id
PORT=5000
NODE_ENV=production
```

**Client .env:**
```
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_SPOONACULAR_API_KEY=your_spoonacular_api_key
```
