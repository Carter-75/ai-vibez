# AI Vibez Deployment Guide

## Current Issue
The API token `5ZRM4G758HnIrDN0dMb6kkqUkUzHKyzvDhqApoXr` lacks sufficient permissions for Pages operations.

## Required Token Permissions
To fix the deployment, create a new API token at https://dash.cloudflare.com/2538cc93f6d69ecb28531e601bb15f8c/api-tokens with these permissions:

1. **Zone:Read** - All zones
2. **Account:Read** - Account: Cartermoyer75@gmail.com's Account 
3. **Cloudflare Pages:Edit** - Account: Cartermoyer75@gmail.com's Account

## Quick Fix Options

### Option 1: Update API Token (Recommended)
1. Go to https://dash.cloudflare.com/2538cc93f6d69ecb28531e601bb15f8c/api-tokens
2. Edit the existing token to add missing permissions
3. Update `.env` file with the new token
4. Run: `npm run deploy:full`

### Option 2: Manual Deployment via Dashboard
1. Build the project: `npm run build`
2. Go to Cloudflare Pages dashboard
3. Create new Pages project named "ai-vibez"
4. Upload the `dist` folder contents
5. Configure environment variables from `.dev.vars`

### Option 3: Browser Login
1. Run: `wrangler logout`
2. Run: `wrangler login` (opens browser for auth)
3. Run: `npm run deploy:full`

## Current Build Status
✅ Frontend build: Working (1,364.80 kB)
✅ Worker build: Working (1.6MB optimized)
❌ Deployment: Blocked by API permissions

## Files Ready for Deployment
- `dist/` - Frontend assets
- `dist/_worker.js` - Cloudflare Worker
- `wrangler.json` - Pages configuration
- All environment variables configured

## Account Information
- Account ID: `2538cc93f6d69ecb28531e601bb15f8c`
- Project Name: `ai-vibez`
- Expected URL: `https://ai-vibez.pages.dev`