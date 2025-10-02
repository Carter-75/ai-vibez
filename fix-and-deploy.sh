#!/bin/bash

# AI Vibez - Fix Deploy Command and Deploy
# This script bypasses the incorrect Pages configuration

echo "🔧 AI Vibez Deployment Fix"
echo "=========================="
echo ""

# Ensure we're in the right directory
cd /home/user/webapp

echo "📦 Building project with npm (bun not available)..."
# Use npm instead of bun for building
npm run build:fast

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    echo "🚀 Deploying with correct command..."
    # Use the correct deploy command
    wrangler pages deploy dist --project-name ai-vibez --compatibility-date=2024-10-02 --commit-dirty=true
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Deployment successful!"
        echo "🌐 Your site should be live at:"
        echo "   - https://ai-vibez.pages.dev"
        echo "   - https://ai-vibez.com (custom domain)"
        echo ""
        echo "📊 Next steps:"
        echo "   1. Fix the deploy command in Cloudflare Pages dashboard"
        echo "   2. Go to Settings → Build & deployments"
        echo "   3. Change deploy command to: npm run deploy"
        echo "   4. Or use: wrangler pages deploy dist --compatibility-date=2024-10-02"
    else
        echo "❌ Deployment failed. Check the output above for errors."
    fi
else
    echo "❌ Build failed. Cannot proceed with deployment."
    exit 1
fi