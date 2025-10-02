// Cloudflare Pages Functions API routes
// This handles all /api/* requests and forwards them to the worker

import { createApp } from '../../worker/app';
import { createLogger } from '../../worker/logger';

const logger = createLogger('Pages-API');

export async function onRequest(context: any): Promise<Response> {
  const { request, env, ctx } = context;
  
  try {
    // Log the incoming request for debugging
    const url = new URL(request.url);
    logger.info(`Pages API handling request: ${request.method} ${url.pathname}`);
    
    // Create the main Hono application directly
    const app = createApp(env);
    
    // Call the app fetch handler
    const response = await app.fetch(request, env, ctx);
    
    logger.info(`Pages API response status: ${response.status}`);
    return response;
  } catch (error: any) {
    logger.error('Error in Pages API handler:', error);
    console.error('Pages API Error:', error);
    return new Response(`API Error: ${error.message}`, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}