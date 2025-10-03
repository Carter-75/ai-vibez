# 🚀 AI VIBEZ DEPLOYMENT GUIDE

**IMPORTANT: Authentication is REQUIRED! Users must log in to use this app.**

## 📋 WHAT YOU NEED TO SET UP

### 🔧 1. CLOUDFLARE RESOURCES (Required)

#### **Create D1 Database**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **D1 SQL Database**  
2. Click **Create Database**
3. Name: `ai-vibez-db`
4. ✅ **COPY THE DATABASE ID** (looks like: `12345678-abcd-1234-abcd-123456789abc`)
5. ➡️ **Replace `YOUR_D1_DATABASE_ID_HERE` in `wrangler.toml`**

#### **Create KV Namespace**
1. Go to **Workers & Pages** → **KV**
2. Click **Create a namespace**  
3. Name: `VibecoderStore`
4. ✅ **COPY THE NAMESPACE ID** (looks like: `abc123def456789`)
5. ➡️ **Replace `YOUR_KV_NAMESPACE_ID_HERE` in `wrangler.toml`**

#### **Create R2 Bucket**
1. Go to **R2 Object Storage**
2. Click **Create bucket**
3. Name: `ai-vibez-r2`
4. ✅ **Bucket created** ✓

#### **Create AI Gateway + Token**
1. Go to **AI** → **AI Gateway**
2. Click **Create Gateway** 
3. Name: `ai-vibez-gateway`
4. Click **Create Token** with **Run** permissions
5. ✅ **COPY THE AI GATEWAY TOKEN**
6. ➡️ **Replace `YOUR_AI_GATEWAY_TOKEN_HERE` in `.dev.vars`**

---

### 🎯 2. GOOGLE AI STUDIO API KEY (Required)

1. Go to [ai.google.dev](https://ai.google.dev)
2. Click **Get API Key**
3. Create new project or use existing
4. ✅ **COPY THE API KEY**
5. ➡️ **Replace `YOUR_GOOGLE_AI_STUDIO_API_KEY_HERE` in `.dev.vars`**

---

### 🔐 3. OAUTH LOGIN SETUP (Required - Users MUST Log In!)

#### **Option A: Google OAuth (Recommended)**
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create new project or select existing
3. Click **Create Credentials** → **OAuth client ID**
4. Application type: **Web application**
5. Name: `AI Vibez Login`
6. **Authorized JavaScript origins**: 
   - `https://ai-vibez.com`
   - `https://www.ai-vibez.com`
7. **Authorized redirect URIs**: 
   - `https://ai-vibez.com/api/auth/google/callback`
   - `https://www.ai-vibez.com/api/auth/google/callback`
8. ✅ **COPY Client ID and Client Secret**
9. ➡️ **Replace `your-google-oauth-client-id` and `your-google-oauth-client-secret` in `.dev.vars`**

#### **Option B: GitHub OAuth (Alternative)**
1. Go to [GitHub Settings](https://github.com/settings/developers) → **OAuth Apps**
2. Click **New OAuth App**
3. Application name: `AI Vibez`  
4. Homepage URL: `https://ai-vibez.com`
5. Authorization callback URL: `https://ai-vibez.com/api/auth/github/callback`
6. ✅ **COPY Client ID and Client Secret**
7. ➡️ **Replace `your-github-oauth-client-id` and `your-github-oauth-client-secret` in `.dev.vars`**

---

### 🔑 4. SECURITY SECRETS (Required)

Generate random secure strings for:

```bash
# Generate JWT Secret (Linux/Mac)
openssl rand -base64 32

# Generate Webhook Secret  
openssl rand -base64 24

# Generate Encryption Key (32 characters)
openssl rand -base64 24 | cut -c1-32
```

➡️ **Replace the placeholder values in `.dev.vars`:**
- `your-secure-jwt-secret-here-make-it-long-and-random`
- `your-secure-webhook-secret-here`  
- `your-32-character-encryption-key-here`

---

### 🚀 5. CLOUDFLARE API TOKEN (For Deployment)

1. Go to **My Profile** → **API Tokens**
2. Click **Create Token**
3. Template: **Workers:Edit** 
4. Add these permissions:
   - ✅ **Account:Read**
   - ✅ **Workers Scripts:Edit**
   - ✅ **Workers KV Storage:Edit** 
   - ✅ **D1:Edit**
   - ✅ **Zone:Read** (if using custom domain)
5. ✅ **COPY THE API TOKEN**

---

## 🎯 WHAT HAPPENS AFTER SETUP

Once you provide the IDs and tokens:

1. ✅ **I'll update your configuration files**
2. ✅ **Set up the database with user authentication tables**
3. ✅ **Deploy to Cloudflare Workers**  
4. ✅ **Your app will be live with required login!**

## 🔐 LOGIN FLOW FOR USERS

1. **User visits your app** → Redirected to login page
2. **User clicks "Login with Google" or "Login with GitHub"**
3. **OAuth flow completes** → User is logged in
4. **User can now use AI app generation features**

**NO LOGIN = NO ACCESS** - This is enforced in the code!

---

## 🌐 CUSTOM DOMAIN SETUP

**Your app is configured for: `ai-vibez.com`**

### **Domain Requirements**
1. **Add ai-vibez.com to Cloudflare**:
   - Go to Cloudflare Dashboard → **Add a Site**
   - Enter: `ai-vibez.com`
   - Follow nameserver setup instructions

2. **DNS Configuration** (after domain is active):
   - The Workers route will automatically handle `ai-vibez.com/*`
   - No additional DNS records needed for the app

3. **SSL Certificate**: Cloudflare will automatically provision SSL

---

## 📝 CHECKLIST

- [ ] **Domain**: ai-vibez.com added to Cloudflare account
- [ ] **D1 Database**: ID copied to `wrangler.toml`
- [ ] **KV Namespace**: ID copied to `wrangler.toml`  
- [ ] **R2 Bucket**: ai-vibez-r2 created ✓
- [ ] **AI Gateway**: Token copied to `.dev.vars`
- [ ] **Google AI Studio**: API Key copied to `.dev.vars`
- [ ] **OAuth Login**: Google OR GitHub configured in `.dev.vars` (with ai-vibez.com URLs)
- [ ] **Security Secrets**: Generated and added to `.dev.vars`
- [ ] **Cloudflare API Token**: Ready for deployment

**Your app will be live at: https://ai-vibez.com** 🚀