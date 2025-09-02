# 🔐 GitHub Secrets Setup Guide

Your GitHub Actions deployment failed because the required secrets are not configured. Follow this guide to set them up.

## 📋 Required Secrets

You need to add these secrets to your GitHub repository:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `EC2_HOST` | Your AWS EC2 instance IP address | `3.129.135.94` |
| `EC2_USER` | Username for your EC2 instance | `ubuntu` (for Ubuntu) or `ec2-user` (for Amazon Linux) |
| `EC2_SSH_KEY` | Private SSH key content (.pem file) | Full content of your .pem file |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `SPOONACULAR_API_KEY` | Spoonacular API key | `your_spoonacular_api_key` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `your_google_client_id` |

## 🛠️ Step-by-Step Setup

### 1. Access GitHub Repository Settings
1. Go to your repository: `https://github.com/theblkguy/tabetai-app`
2. Click **Settings** tab (at the top)
3. In the left sidebar, click **Secrets and variables** → **Actions**

### 2. Add Each Secret
Click **New repository secret** for each of the following:

#### **EC2_HOST**
- **Name**: `EC2_HOST`
- **Secret**: `3.129.135.94`

#### **EC2_USER**
- **Name**: `EC2_USER`
- **Secret**: `ubuntu` (or `ec2-user` if using Amazon Linux)

#### **EC2_SSH_KEY**
- **Name**: `EC2_SSH_KEY`
- **Secret**: Copy the ENTIRE content of your `.pem` file, including the header and footer:
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
(all the key content)
...
-----END RSA PRIVATE KEY-----
```

#### **MONGODB_URI**
- **Name**: `MONGODB_URI`
- **Secret**: Your MongoDB connection string

#### **SPOONACULAR_API_KEY**
- **Name**: `SPOONACULAR_API_KEY`
- **Secret**: Your Spoonacular API key

#### **GOOGLE_CLIENT_ID**
- **Name**: `GOOGLE_CLIENT_ID`
- **Secret**: Your Google OAuth client ID

### 3. Find Your SSH Key File

If you don't know where your EC2 key file is:

```bash
# Look for .pem files in common locations
find ~ -name "*.pem" 2>/dev/null
ls ~/.ssh/
ls ~/Downloads/
```

Then copy the content:
```bash
cat path/to/your-key.pem
```

### 4. Test Your SSH Connection

Before adding to GitHub, test that your key works:

```bash
ssh -i path/to/your-key.pem ubuntu@3.129.135.94
```

If this doesn't work, you need to:
- Check your EC2 security group allows SSH (port 22)
- Verify the correct username (ubuntu vs ec2-user)
- Ensure the key file has correct permissions: `chmod 600 your-key.pem`

## 🚀 After Adding Secrets

1. **Go to Actions tab** in your GitHub repository
2. **Click on the failed workflow run**
3. **Click "Re-run jobs"** → **"Re-run all jobs"**

Or simply push a new commit:
```bash
git commit --allow-empty -m "Trigger deployment after adding secrets"
git push origin main
```

## 🔍 Troubleshooting

### Common Issues:

1. **"Permission denied (publickey)"**
   - Wrong SSH key or username
   - Check security group settings

2. **"Host key verification failed"**
   - The workflow uses `StrictHostKeyChecking=no` to avoid this

3. **"pm2 command not found"**
   - PM2 will be installed automatically by the deployment script

4. **MongoDB connection issues**
   - Verify your MongoDB URI is correct
   - Ensure your MongoDB cluster allows connections from your EC2 IP

### Verify Secrets Are Set:
In your repository, go to Settings → Secrets and variables → Actions. You should see all 6 secrets listed.

## 📱 Next Steps

Once secrets are configured and deployment succeeds:
- Your app will be available at: `http://3.129.135.94:5000`
- Monitor with: `ssh -i your-key.pem ubuntu@3.129.135.94` then `pm2 logs tabetai-app`
