#!/bin/bash

# AI Vibez - Check Project Status
echo "🔍 AI Vibez Project Status Check"
echo "================================="
echo ""

cd /home/user/webapp

echo "📋 Expected Configuration:"
echo "   Project Name: ai-vibez"
echo "   Account: 2538cc93f6d69ecb28531e601bb15f8c"
echo "   Previous URL: https://48b9b037.ai-vibez.pages.dev"
echo "   Permanent URL: https://ai-vibez.pages.dev"
echo ""

echo "🔍 Checking current authentication..."
wrangler whoami

echo ""
echo "📊 Listing Pages projects..."
wrangler pages project list

echo ""
echo "🎯 Checking ai-vibez project specifically..."
wrangler pages project list | grep ai-vibez

if [ $? -eq 0 ]; then
    echo "✅ Project 'ai-vibez' found!"
    echo ""
    echo "📋 Getting project details..."
    wrangler pages deployment list --project-name ai-vibez | head -5
else
    echo "❌ Project 'ai-vibez' not found in current list."
    echo ""
    echo "🔧 This could mean:"
    echo "   1. Token lost permissions"
    echo "   2. Project was deleted"
    echo "   3. Account access changed"
    echo ""
    echo "🚀 Try recreating the project:"
    echo "   wrangler pages project create ai-vibez --production-branch=main"
fi