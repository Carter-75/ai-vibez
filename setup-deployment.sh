#!/bin/bash

# AI Vibez Deployment Setup Script
# Run this after creating your Cloudflare API token

echo "🚀 AI Vibez Deployment Setup"
echo "================================"

# Check if token is provided as argument
if [ -z "$1" ]; then
    echo "❌ Error: Please provide your Cloudflare API token"
    echo "Usage: ./setup-deployment.sh YOUR_API_TOKEN_HERE"
    echo ""
    echo "📋 Steps:"
    echo "1. Complete your token creation in Cloudflare dashboard"
    echo "2. Copy the generated token"
    echo "3. Run: ./setup-deployment.sh YOUR_TOKEN_HERE"
    exit 1
fi

API_TOKEN="$1"

echo "🔧 Setting up environment variables..."

# Create .dev.vars file if it doesn't exist
if [ ! -f ".dev.vars" ]; then
    echo "📝 Creating .dev.vars file..."
    cp .dev.vars.example .dev.vars
fi

# Add or update CLOUDFLARE_API_TOKEN in .dev.vars
if grep -q "CLOUDFLARE_API_TOKEN" .dev.vars; then
    sed -i "s/CLOUDFLARE_API_TOKEN=.*/CLOUDFLARE_API_TOKEN=\"$API_TOKEN\"/" .dev.vars
else
    echo "CLOUDFLARE_API_TOKEN=\"$API_TOKEN\"" >> .dev.vars
fi

echo "✅ Environment configured successfully!"
echo ""
echo "🔍 Verifying token permissions..."

# Test the token by trying to list account info
echo "Testing API token..."
ACCOUNT_TEST=$(curl -s -H "Authorization: Bearer $API_TOKEN" "https://api.cloudflare.com/client/v4/accounts")

if echo "$ACCOUNT_TEST" | grep -q "success.*true"; then
    echo "✅ Token validation successful!"
    echo ""
    echo "🚀 Ready to deploy! Run one of these commands:"
    echo ""
    echo "   npm run build           # Build the project"
    echo "   npm run deploy:full     # Full deployment"
    echo "   wrangler pages deploy   # Direct deployment"
    echo ""
    echo "📊 Project Configuration:"
    echo "   Account ID: 2538cc93f6d69ecb28531e601bb15f8c"
    echo "   Project Name: ai-vibez"
    echo "   Expected URL: https://ai-vibez.pages.dev"
else
    echo "❌ Token validation failed. Please check:"
    echo "   - Token has correct permissions"
    echo "   - Token is not expired"
    echo "   - Token includes: Zone:Read, Account:Read, Pages:Edit"
fi

echo ""
echo "💾 Environment file location: .dev.vars"
echo "🔒 Remember to keep your API token secure!"