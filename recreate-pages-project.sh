#!/bin/bash

# AI Vibez - Recreate Pages Project
echo "🎯 AI Vibez - Recreating Pages Project"
echo "====================================="
echo ""

cd /home/user/webapp

echo "📋 Analysis:"
echo "   ✅ Build: Working perfectly"
echo "   ✅ Token: Super Administrator access"
echo "   ❌ Pages API: Project 'ai-vibez' not accessible"
echo ""
echo "💡 Solution: Recreate the Pages project"
echo ""

echo "🔧 Step 1: Create Pages project..."
echo "Command: wrangler pages project create ai-vibez --production-branch=main"
echo ""

# Try to create the project
npx wrangler pages project create ai-vibez --production-branch=main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Project created successfully!"
    echo ""
    
    echo "🚀 Step 2: Deploy the built files..."
    npx wrangler pages deploy dist --project-name ai-vibez --commit-dirty=true
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 DEPLOYMENT SUCCESS!"
        echo ""
        echo "🌐 Your AI Vibez app is now live at:"
        echo "   - Production: https://ai-vibez.pages.dev"
        echo "   - Custom Domain: https://ai-vibez.com (if DNS configured)"
        echo ""
        echo "📊 Next steps:"
        echo "   1. Connect GitHub for auto-deployments"
        echo "   2. Configure custom domain DNS"
        echo "   3. Set up environment variables if needed"
        echo ""
        echo "🔧 To connect GitHub:"
        echo "   1. Go to: https://dash.cloudflare.com/2538cc93f6d69ecb28531e601bb15f8c/pages/view/ai-vibez"
        echo "   2. Settings → Source → Connect GitHub"
        echo "   3. Repository: Carter-75/ai-vibez"
        echo "   4. Branch: main"
        
    else
        echo ""
        echo "❌ Project created but deployment failed."
        echo "🔍 The project now exists, try deploying again."
    fi
    
else
    echo ""
    echo "❌ Failed to create project."
    echo ""
    echo "🔧 Possible issues:"
    echo "   1. Project already exists (check dashboard)"
    echo "   2. Token missing specific permissions"
    echo "   3. Account limits reached"
    echo ""
    echo "🌐 Manual solution:"
    echo "   1. Go to: https://dash.cloudflare.com/2538cc93f6d69ecb28531e601bb15f8c/pages"
    echo "   2. Click 'Create application'"
    echo "   3. Choose 'Pages' → 'Connect to Git'"
    echo "   4. Connect to: Carter-75/ai-vibez"
    echo "   5. Branch: main, Build command: bun run build, Output: dist"
fi