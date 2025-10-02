// Cloudflare Pages Functions API routes
// This handles all /api/* requests by loading the built worker

export async function onRequest(context) {
  const { request, env, ctx } = context;
  
  try {
    console.log('Pages Function handling:', request.method, new URL(request.url).pathname);
    
    // Try to import the built worker
    let workerModule;
    try {
      workerModule = await import('../../dist/_worker.js');
      console.log('Worker module loaded successfully');
    } catch (importError) {
      console.error('Failed to import worker:', importError.message);
      throw new Error(`Worker import failed: ${importError.message}`);
    }
    
    // Get the default export (the worker)
    const worker = workerModule.default;
    
    if (worker && typeof worker.fetch === 'function') {
      console.log('Calling worker.fetch with env keys:', Object.keys(env || {}));
      const response = await worker.fetch(request, env, ctx);
      console.log('Worker response status:', response.status);
      return response;
    } else {
      console.error('Worker module structure:', {
        hasDefault: !!workerModule.default,
        defaultType: typeof workerModule.default,
        hasFetch: !!(workerModule.default && workerModule.default.fetch),
        fetchType: typeof (workerModule.default && workerModule.default.fetch),
        moduleKeys: Object.keys(workerModule)
      });
      throw new Error('Worker not properly configured - missing fetch method');
    }
  } catch (error) {
    console.error('Pages Function Error:', error.message, error.stack);
    
    // Fallback: Basic auth endpoints for debugging
    const url = new URL(request.url);
    const path = url.pathname;
    
    if (path === '/api/auth/profile') {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (path === '/api/auth/providers') {
      return new Response(JSON.stringify({ 
        providers: ['email', 'github', 'google'] 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (path === '/api/auth/login') {
      return new Response(JSON.stringify({ 
        error: 'Authentication system temporarily unavailable',
        message: 'Please try again later'
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(`API Error: ${error.message}`, { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}