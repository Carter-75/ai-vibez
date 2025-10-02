# AI Vibez Setup Guide

## 🚀 Quick Start

### 1. Environment Setup
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your API token: CLOUDFLARE_API_TOKEN=your_token_here
```

### 2. Development
```bash
# Start frontend development
npm run dev

# Start worker development (in another terminal)
npm run dev:worker

# Start remote worker development
npm run dev:remote
```

### 3. Build & Deploy
```bash
# Build for production
npm run build

# Deploy to Cloudflare Pages
npm run deploy

# Full deployment with build
npm run deploy:full
```

## 🔧 Configuration

### API Token
Your Cloudflare API token is configured in:
- `.env` - for local development
- `.dev.vars` - for wrangler dev
- Cloudflare Pages Environment Variables - for production

### Required Permissions
Your API token needs:
- Cloudflare Pages:Edit
- Zone:Read  
- Account Settings:Read

## 📝 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run dev:worker` - Start wrangler worker development
- `npm run dev:remote` - Start remote worker development
- `npm run build` - Build for production
- `npm run deploy` - Deploy to Cloudflare Pages
- `npm run deploy:full` - Build and deploy
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🔗 URLs

- **Development**: http://localhost:5173
- **Production**: https://ai-vibez.pages.dev (or your custom domain)

## 🛠 Troubleshooting

### Authentication Error
If you get authentication errors:
1. Check your API token in `.env`
2. Verify token permissions at https://dash.cloudflare.com/profile/api-tokens
3. Make sure environment variables are set in Cloudflare Pages dashboard

### Build Errors  
If build fails:
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf .vite`
3. Check TypeScript errors: `npm run lint`