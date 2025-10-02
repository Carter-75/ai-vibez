// Cloudflare Pages Functions API routes
// This handles all /api/* requests

export async function onRequest(context) {
  const { request, env, ctx } = context;
  
  console.log('=== Pages Function Debug ===');
  console.log('Request method:', request.method);
  console.log('Request URL:', request.url);
  console.log('Environment keys:', Object.keys(env || {}));
  console.log('Context keys:', Object.keys(ctx || {}));
  
  const url = new URL(request.url);
  const path = url.pathname;
  
  console.log('Parsed path:', path);
  
  // Try worker import first, but don't fail if it doesn't work
  let workerResponse = null;
  try {
    console.log('Attempting to import worker...');
    const workerModule = await import('../../dist/_worker.js');
    console.log('Worker import successful, keys:', Object.keys(workerModule));
    
    const worker = workerModule.default;
    if (worker && typeof worker.fetch === 'function') {
      console.log('Worker fetch method found, calling...');
      workerResponse = await worker.fetch(request, env, ctx);
      console.log('Worker response status:', workerResponse.status);
      return workerResponse;
    } else {
      console.log('Worker fetch method not found or invalid structure');
    }
  } catch (error) {
    console.log('Worker import/execution failed:', error.message);
  }
  
  // Fallback to basic implementations
  console.log('Using fallback implementations for:', path);
  
  if (path === '/api/auth/profile') {
    console.log('Handling profile request');
    return new Response(JSON.stringify({ 
      error: 'Not authenticated',
      debug: 'Fallback response from Pages Function'
    }), {
      status: 401,
      headers: { 
        'Content-Type': 'application/json',
        'X-Debug': 'Pages-Function-Fallback'
      }
    });
  }
  
  if (path === '/api/auth/providers') {
    console.log('Handling providers request');
    return new Response(JSON.stringify({ 
      providers: ['email', 'github', 'google'],
      debug: 'Fallback response from Pages Function'
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'X-Debug': 'Pages-Function-Fallback' 
      }
    });
  }
  
  if (path === '/api/auth/login') {
    console.log('Handling login request');
    return new Response(JSON.stringify({ 
      error: 'Authentication system in debug mode',
      message: 'Pages Function is running but worker integration needs configuration',
      debug: {
        env: Object.keys(env || {}),
        hasWorker: workerResponse !== null
      }
    }), {
      status: 503,
      headers: { 
        'Content-Type': 'application/json',
        'X-Debug': 'Pages-Function-Debug'
      }
    });
  }
  
  console.log('No matching route found');
  return new Response(JSON.stringify({ 
    error: 'Route not found',
    path: path,
    debug: 'Pages Function executed successfully'
  }), { 
    status: 404,
    headers: { 
      'Content-Type': 'application/json',
      'X-Debug': 'Pages-Function-404'
    }
  });
}