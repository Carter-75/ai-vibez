#!/bin/bash

# AI Vibez - NPM Compatible Build and Deploy
echo "🔧 AI Vibez NPM Build & Deploy"
echo "=============================="
echo ""

# Ensure we're in the right directory
cd /home/user/webapp

echo "📦 Building frontend (fast)..."
NODE_OPTIONS='--max-old-space-size=4096' npx vite build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
    echo ""
    
    echo "🔧 Building worker..."
    npx esbuild worker/index.ts \
        --bundle \
        --platform=neutral \
        --target=es2022 \
        --format=esm \
        --outfile=dist/_worker.js \
        --tsconfig=tsconfig.worker.json \
        --minify \
        --tree-shaking \
        --external:cloudflare:workers \
        --external:cloudflare:email \
        --external:@cloudflare/sandbox \
        --external:@cloudflare/containers \
        --external:node:async_hooks \
        --external:node:crypto \
        --external:node:util \
        --external:node:buffer \
        --external:node:stream \
        --external:node:url \
        --external:node:fs \
        --external:node:path \
        --external:node:process \
        --external:node:os \
        --external:jsonc-parser \
        --external:@babel/types \
        --external:@babel/parser \
        --external:@babel/traverse \
        --external:@babel/generator \
        --external:jose \
        --external:async_hooks \
        --external:partyserver \
        --external:path \
        --external:ajv \
        --external:pkce-challenge

    if [ $? -eq 0 ]; then
        echo "✅ Worker build successful!"
        echo ""
        
        echo "📊 Build summary:"
        if [ -f "dist/index.html" ]; then
            echo "   ✅ Frontend: $(ls -lh dist/index.html | awk '{print $5}')"
        fi
        if [ -f "dist/_worker.js" ]; then
            echo "   ✅ Worker: $(ls -lh dist/_worker.js | awk '{print $5}')"
        fi
        echo ""
        
        echo "🚀 Deploying to Cloudflare Pages..."
        npx wrangler pages deploy dist \
            --project-name ai-vibez \
            --compatibility-date=2024-10-02 \
            --commit-dirty=true
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 Deployment successful!"
            echo "🌐 Your site is live at:"
            echo "   - https://ai-vibez.pages.dev"
            echo "   - https://ai-vibez.com (custom domain)"
        else
            echo "❌ Deployment failed. Check the output above for errors."
        fi
    else
        echo "❌ Worker build failed."
        exit 1
    fi
else
    echo "❌ Frontend build failed."
    exit 1
fi