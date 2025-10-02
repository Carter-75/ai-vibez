#!/bin/bash

# AI Vibez Token Verification Script
# Usage: ./test-token.sh YOUR_API_TOKEN

if [ -z "$1" ]; then
    echo "❌ Usage: ./test-token.sh YOUR_API_TOKEN"
    exit 1
fi

TOKEN="$1"
ACCOUNT_ID="2538cc93f6d69ecb28531e601bb15f8c"

echo "🔍 Testing Cloudflare API Token..."
echo "=================================="
echo ""

# Test 1: Account Access
echo "1️⃣ Testing Account Access..."
ACCOUNT_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID")

if echo "$ACCOUNT_RESPONSE" | grep -q '"success":true'; then
    echo "   ✅ Account access: WORKING"
    ACCOUNT_NAME=$(echo "$ACCOUNT_RESPONSE" | grep -o '"name":"[^"]*"' | head -1 | cut -d'"' -f4)
    echo "   📧 Account: $ACCOUNT_NAME"
else
    echo "   ❌ Account access: FAILED"
    echo "   🔍 Response: $ACCOUNT_RESPONSE"
fi

echo ""

# Test 2: Pages Access
echo "2️⃣ Testing Pages Access..."
PAGES_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects")

if echo "$PAGES_RESPONSE" | grep -q '"success":true'; then
    echo "   ✅ Pages access: WORKING"
    
    # Check if ai-vibez project exists
    if echo "$PAGES_RESPONSE" | grep -q '"name":"ai-vibez"'; then
        echo "   🎯 Project 'ai-vibez': EXISTS"
        PROJECT_URL=$(echo "$PAGES_RESPONSE" | grep -A 10 '"name":"ai-vibez"' | grep -o '"subdomain":"[^"]*"' | cut -d'"' -f4)
        if [ ! -z "$PROJECT_URL" ]; then
            echo "   🌐 URL: https://$PROJECT_URL.pages.dev"
        fi
    else
        echo "   ℹ️  Project 'ai-vibez': NOT FOUND (will be created on first deploy)"
    fi
else
    echo "   ❌ Pages access: FAILED"
    echo "   🔍 Response: $PAGES_RESPONSE"
fi

echo ""

# Test 3: Zone Access
echo "3️⃣ Testing Zone Access..."
ZONES_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
    "https://api.cloudflare.com/client/v4/zones")

if echo "$ZONES_RESPONSE" | grep -q '"success":true'; then
    echo "   ✅ Zone access: WORKING"
    ZONE_COUNT=$(echo "$ZONES_RESPONSE" | grep -o '"name":"[^"]*"' | wc -l)
    echo "   🌐 Available zones: $ZONE_COUNT"
    
    # Check for ai-vibez.com domain
    if echo "$ZONES_RESPONSE" | grep -q '"name":"ai-vibez.com"'; then
        echo "   🎯 Domain 'ai-vibez.com': FOUND"
    else
        echo "   ℹ️  Domain 'ai-vibez.com': NOT FOUND (using pages.dev subdomain)"
    fi
else
    echo "   ❌ Zone access: FAILED"
    echo "   🔍 Response: $ZONES_RESPONSE"
fi

echo ""
echo "🎯 Summary"
echo "=========="

# Final verification
ALL_TESTS_PASSED=true

if ! echo "$ACCOUNT_RESPONSE" | grep -q '"success":true'; then
    ALL_TESTS_PASSED=false
fi

if ! echo "$PAGES_RESPONSE" | grep -q '"success":true'; then
    ALL_TESTS_PASSED=false
fi

if ! echo "$ZONES_RESPONSE" | grep -q '"success":true'; then
    ALL_TESTS_PASSED=false
fi

if [ "$ALL_TESTS_PASSED" = true ]; then
    echo "🎉 ALL TESTS PASSED!"
    echo "✅ Your token is ready for deployment!"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Run: ./setup-deployment.sh $TOKEN"
    echo "   2. Run: npm run deploy:full"
    echo ""
    echo "🌐 Expected deployment URL: https://ai-vibez.pages.dev"
else
    echo "❌ SOME TESTS FAILED"
    echo "🔧 Please check your token permissions:"
    echo "   - Zone:Read (All zones)"
    echo "   - Account:Read (Cartermoyer75@gmail.com's Account)"
    echo "   - Cloudflare Pages:Edit (Cartermoyer75@gmail.com's Account)"
fi