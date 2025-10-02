#!/bin/bash

# AI Vibez - Direct Worker Deployment Script
# This bypasses Pages Functions and deploys the worker directly

echo "🚀 Starting AI Vibez Worker Deployment..."

# Build the project
echo "📦 Building project..."
bun run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Check if worker file exists
if [ ! -f "dist/_worker.js" ]; then
    echo "❌ Worker file not found at dist/_worker.js"
    exit 1
fi

echo "✅ Build completed successfully"

# Deploy the worker
echo "🌍 Deploying to Cloudflare..."
npx wrangler deploy --env production

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your application should be available at: https://ai-vibez.com"
else
    echo "❌ Deployment failed"
    exit 1
fi