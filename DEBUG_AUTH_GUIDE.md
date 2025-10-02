# 🔧 AI-Vibez Authentication Debug Guide

## 🚨 **Current Password Requirements**

The system has **strict password requirements** that are not clearly shown on the frontend:

### **Password Must Have:**
- ✅ **Minimum 8 characters**
- ✅ **At least 1 lowercase letter** (a-z)  
- ✅ **At least 1 UPPERCASE letter** (A-Z)
- ✅ **At least 1 number** (0-9)
- ⚠️ **Special characters recommended** but not required

### **Examples:**
- ❌ `password123` - Missing uppercase
- ❌ `PASSWORD123` - Missing lowercase  
- ❌ `Password` - Missing number
- ✅ `Password123` - Valid!
- ✅ `MySecure1` - Valid!
- ✅ `Welcome2024!` - Valid and strong!

## 🔍 **Debugging Your Sign-up Issue**

### **Scenario 1: Wrong Password Format**
**If you used `cartermoyer75@gmail.com` but got an error:**
- Your password likely didn't meet the requirements above
- Try with a password like `Welcome2024!` or `MyPassword1`

### **Scenario 2: Account Already Exists**
**If the account already exists with a different password:**
- The system might return "user already exists" error
- You'd need to use the login form instead of sign-up
- Or reset the password (if that feature is implemented)

### **Scenario 3: Frontend Validation Issues**
**If the form doesn't submit:**
- Check browser console for JavaScript errors
- The frontend might have additional validation
- Network issues could prevent the request

## 🛠️ **Testing Authentication Locally**

### **Test with Known Good Credentials:**
```bash
# Email that should work (after fixes)
Email: cartermoyer75@gmail.com
Password: TestPassword1

# Or any email (with ENABLE_EMAIL_WHITELIST=false)  
Email: test@example.com
Password: MySecure123
```

### **Manual API Testing:**
```bash
# Test registration endpoint directly
curl -X POST https://ai-vibez.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cartermoyer75@gmail.com", 
    "password": "TestPassword123",
    "name": "Carter"
  }'

# Test login endpoint
curl -X POST https://ai-vibez.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cartermoyer75@gmail.com",
    "password": "TestPassword123"  
  }'
```

## 🏥 **Health Check Endpoints**

### **Check Auth Providers:**
```bash
curl https://ai-vibez.com/api/auth/providers
```

**Should return:**
```json
{
  "success": true,
  "data": {
    "providers": {
      "google": false,  // true if OAuth configured
      "github": false,  // true if OAuth configured  
      "email": true     // should be true after fix
    },
    "hasOAuth": false,
    "requiresEmailAuth": true
  }
}
```

### **Check Current Auth Status:**
```bash  
curl https://ai-vibez.com/api/auth/profile
```

## 🎯 **Recommended Frontend Improvements**

### **1. Show Password Requirements**
Add this to the registration form:
```typescript
// In login-modal.tsx or registration component
const passwordHelp = (
  <div className="text-sm text-gray-600 mt-2">
    <p>Password must contain:</p>
    <ul className="list-disc list-inside ml-2">
      <li>At least 8 characters</li>
      <li>One lowercase letter</li>
      <li>One uppercase letter</li> 
      <li>One number</li>
    </ul>
  </div>
);
```

### **2. Real-time Password Validation**
```typescript
// Add to form validation
const validatePassword = (password: string) => {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password), 
    number: /[0-9]/.test(password)
  };
  
  return {
    valid: Object.values(checks).every(Boolean),
    checks
  };
};
```

### **3. Better Error Messages**
```typescript
// Show specific error instead of generic "Registration failed"
if (error.includes('Password must contain')) {
  return 'Password too weak. Check requirements below.';
}
if (error.includes('already exists')) {
  return 'Account exists. Try logging in instead.';
}
```

## 🚀 **Quick Fixes to Deploy**

### **1. Environment Variables (Already Fixed)**
```bash
ENABLE_EMAIL_WHITELIST=false  # Allow any email
DISABLE_EMAIL_AUTH=false      # Keep email/password enabled
```

### **2. Relax Password Requirements (Optional)**
Edit `worker/utils/validationUtils.ts`:
```typescript
// Make password requirements less strict
const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')  // Reduced from 8
  .max(128, 'Password must be less than 128 characters');
  // Remove uppercase/lowercase/number requirements
```

### **3. Add Debug Logging**
Add to `worker/api/controllers/auth/controller.ts`:
```typescript
// In register method, add logging
console.log('Registration attempt:', { 
  email: validatedData.email,
  hasPassword: !!validatedData.password,
  passwordLength: validatedData.password?.length 
});
```

## 📋 **Current Status Summary**

### **✅ Fixed Issues:**
- Email whitelisting disabled 
- OAuth/email auth coexistence enabled
- TypeScript compilation errors resolved
- Environment variables properly configured

### **⚠️ Potential Issues:**
- **Strict password requirements** (likely main issue)
- Missing frontend password requirement hints
- No clear error messages for password validation
- Possible existing account conflicts

### **🔧 Next Steps:**
1. **Try signing up with strong password**: `cartermoyer75@gmail.com` / `Welcome2024!`
2. **Check browser network tab** for API error responses  
3. **Test API endpoints directly** with curl/Postman
4. **Add frontend password hints** for better UX
5. **Consider relaxing password requirements** if too strict

The authentication should work now - the main issue is likely that you need a password meeting the strict requirements: **uppercase + lowercase + number + 8+ characters**.