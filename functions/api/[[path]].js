// Cloudflare Pages Functions API routes
// Simple implementation to verify Pages Functions work

export async function onRequest(context) {
  const { request } = context;
  
  const response = new Response(JSON.stringify({
    message: 'Pages Function is working!',
    url: request.url,
    method: request.method,
    timestamp: new Date().toISOString(),
    headers: Object.fromEntries(request.headers)
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
  
  console.log('Pages Function executed for:', request.url);
  return response;
}