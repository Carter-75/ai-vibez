// Cloudflare Pages Functions API routes
// This handles all /api/* requests and forwards them to the worker

export async function onRequest(context: any): Promise<Response> {
  const { request, env } = context;
  
  try {
    // Import the worker
    const workerModule = await import('../../dist/_worker.js');
    
    // Call the worker's default export (which is the fetch handler)
    if (workerModule.default && typeof workerModule.default.fetch === 'function') {
      return await workerModule.default.fetch(request, env, context);
    } else if (typeof workerModule.default === 'function') {
      return await workerModule.default(request, env, context);
    }
    
    // If worker module doesn't have the expected structure, return error
    return new Response('Worker module not properly configured', { status: 500 });
  } catch (error: any) {
    console.error('Error loading worker module:', error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}