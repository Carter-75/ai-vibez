#!/bin/bash

# AI Vibez - Fix Deployment Issue
echo "🔧 AI Vibez Deployment Fix"
echo "=========================="
echo ""

cd /home/user/webapp

echo "📋 Analysis:"
echo "   - Token works (shows account info) ✅"
echo "   - Build process works perfectly ✅" 
echo "   - Project 'ai-vibez' may not exist ❌"
echo ""

echo "🚀 Solution: Use the working deployment method from Pages dashboard"
echo ""

echo "📦 Step 1: Build the project locally..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📋 Built files ready in dist/ folder:"
    ls -la dist/ | head -10
    echo ""
    
    echo "🎯 Step 2: Manual fix options:"
    echo ""
    echo "OPTION A - Quick Dashboard Upload:"
    echo "1. Go to: https://dash.cloudflare.com/2538cc93f6d69ecb28531e601bb15f8c/pages"
    echo "2. If ai-vibez project exists → Go to deployment"  
    echo "3. If not → Create new project 'ai-vibez'"
    echo "4. Upload the dist/ folder contents"
    echo ""
    
    echo "OPTION B - Try CI/CD Retry:"  
    echo "1. Go to your Pages project dashboard"
    echo "2. Click 'Retry deployment' on the latest failed build"
    echo "3. The build will use the correct environment token"
    echo ""
    
    echo "OPTION C - Git Push (if connected to repo):"
    echo "1. Make a small change and commit"
    echo "2. Push to trigger auto-deployment"
    echo "3. Pages will rebuild and deploy automatically"
    echo ""
    
    echo "✅ Your files are ready for deployment!"
    echo "🌐 Expected URLs after fix:"
    echo "   - https://ai-vibez.pages.dev"
    echo "   - https://ai-vibez.com (custom domain)"
    
else
    echo "❌ Build failed. Please check the build process first."
fi