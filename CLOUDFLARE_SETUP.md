# 🚀 Cloudflare Setup Guide for AI Vibez

## 📋 **What You Need to Create on Cloudflare Dashboard**

### **1. D1 Database**
1. Go to **Cloudflare Dashboard** → `Workers & Pages` → `D1 SQL Database`
2. Click `Create Database`
3. **Name**: `ai-vibez-db`
4. After creation, copy the **Database ID**
5. **Replace in wrangler.toml**: Line 28 `database_id = "REPLACE_WITH_YOUR_D1_DATABASE_ID"`

### **2. R2 Storage Bucket**
1. Go to `R2 Object Storage`
2. Click `Create bucket`
3. **Name**: `ai-vibez-r2`
4. **Region**: `Automatic`
5. ✅ Already configured in wrangler.toml

### **3. KV Namespace**
1. Go to `Workers & Pages` → `KV`
2. Click `Create a namespace`
3. **Name**: `VibecoderStore`
4. After creation, copy the **Namespace ID**
5. **Replace in wrangler.toml**: Line 49 `id = "REPLACE_WITH_YOUR_KV_NAMESPACE_ID"`

### **4. AI Gateway (Recommended)**
1. Go to `AI` → `AI Gateway`
2. Click `Create Gateway`
3. **Name**: `ai-vibez-gateway`
4. Create a **token** with `Read`, `Edit`, and `Run` permissions
5. Save the token for step 5

## 🔑 **Required API Keys to Get**

### **1. Google AI Studio API Key** (REQUIRED)
1. Go to [https://ai.google.dev](https://ai.google.dev)
2. Sign in and click `Get API Key`
3. Create new project or use existing
4. Copy the API key

### **2. OpenAI API Key** (Optional)
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create new secret key
3. Copy the API key

### **3. Anthropic API Key** (Optional)
1. Go to [https://console.anthropic.com](https://console.anthropic.com)
2. Create new API key
3. Copy the API key

## ⚙️ **After Getting All IDs and Keys**

**Tell me when you have:**
- ✅ D1 Database ID
- ✅ KV Namespace ID  
- ✅ Google AI Studio API Key
- ✅ (Optional) AI Gateway Token
- ✅ (Optional) OpenAI API Key
- ✅ (Optional) Anthropic API Key

**I will then:**
1. Update the configuration files
2. Set up the deployment secrets
3. Build and deploy your Worker
4. Get your live URL for sign-up and login

## 🎯 **What This Will Give You**

Once deployed, users will be able to:
- **Sign up** with email/password or OAuth (Google/GitHub)
- **Log in** securely with JWT sessions  
- **Generate web apps** using AI prompts
- **Preview apps** in real-time
- **Deploy apps** to their own Workers

## 📝 **Current Configuration**

Your app is configured with:
- **Project Name**: `ai-vibez`
- **Admin Email**: `cartermoyer75@gmail.com`  
- **Authentication**: Required (users must sign up/login)
- **Email Whitelist**: Disabled (anyone can sign up)
- **Worker URL**: Will be `https://ai-vibez.your-subdomain.workers.dev`

Let me know when you have the IDs and keys ready!