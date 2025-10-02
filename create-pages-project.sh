#!/bin/bash

# Create AI Vibez Pages Project Script
echo "🎯 Creating AI Vibez Pages Project"
echo "=================================="
echo ""

cd /home/user/webapp

echo "📋 Project Information:"
echo "   Name: ai-vibez"
echo "   Account: 2538cc93f6d69ecb28531e601bb15f8c"
echo "   Custom Domain: ai-vibez.com"
echo ""

echo "🔧 Creating Pages project..."
npx wrangler pages project create ai-vibez

if [ $? -eq 0 ]; then
    echo "✅ Project created successfully!"
    echo ""
    echo "🚀 Now attempting deployment..."
    npx wrangler pages deploy dist \
        --project-name ai-vibez \
        --commit-dirty=true
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Deployment successful!"
        echo "🌐 Your site is live at:"
        echo "   - https://ai-vibez.pages.dev"
        echo ""
        echo "🔧 Next step: Configure custom domain"
        echo "   Go to Pages dashboard and add ai-vibez.com"
    else
        echo "❌ Deployment failed after project creation."
    fi
else
    echo "❌ Failed to create project. Check token permissions:"
    echo "   - Cloudflare Pages:Edit is required"
    echo "   - Account scope must include Cartermoyer75@gmail.com's Account"
    echo ""
    echo "🔗 Update token at: https://dash.cloudflare.com/profile/api-tokens"
fi