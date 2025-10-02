/**
 * Iframe Support Middleware
 * Handles iframe-specific headers and configurations for embedding support
 */

import { Context, Next } from 'hono';
import { AppEnv } from '../types/appenv';

/**
 * Check if the request is coming from an allowed iframe parent
 */
function isAllowedIframeParent(referrer: string | null, env: Env): boolean {
  if (!referrer) return false;
  
  try {
    const referrerUrl = new URL(referrer);
    const allowedOrigins = [
      'carter-portfolio.fyi',
      'www.carter-portfolio.fyi',
    ];
    
    // Add development origins in dev environment
    if (env.ENVIRONMENT === 'dev') {
      allowedOrigins.push('localhost:4000', 'localhost:8080', '127.0.0.1:4000', '127.0.0.1:8080');
    }
    
    return allowedOrigins.some(origin => referrerUrl.hostname.includes(origin));
  } catch (e) {
    return false;
  }
}

/**
 * Middleware to handle iframe-specific headers and functionality
 */
export function iframeMiddleware(env: Env) {
  return async (c: Context<AppEnv>, next: Next) => {
    const request = c.req;
    const referrer = request.header('Referer') || request.header('Referrer');
    const userAgent = request.header('User-Agent') || '';
    
    // Check if this is an iframe request from an allowed parent
    const isIframeRequest = isAllowedIframeParent(referrer, env);
    const isOptionsRequest = request.method === 'OPTIONS';
    
    // Set iframe-specific headers for static content
    if (!request.url.includes('/api/') || isOptionsRequest) {
      // Allow iframe embedding from portfolio domain
      if (isIframeRequest) {
        c.header('X-Frame-Options', 'ALLOWALL');
        c.header('Content-Security-Policy', 
          `frame-ancestors 'self' https://carter-portfolio.fyi https://www.carter-portfolio.fyi ${env.ENVIRONMENT === 'dev' ? 'http://localhost:* http://127.0.0.1:*' : ''};`
        );
      }
      
      // Add iframe-friendly headers
      c.header('X-Iframe-Embeddable', isIframeRequest ? 'true' : 'false');
      c.header('X-Portfolio-Embedded', isAllowedIframeParent(referrer, env) ? 'true' : 'false');
      
      // Add cache headers for iframe content
      if (isIframeRequest) {
        c.header('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
      }
    }
    
    // Add iframe context to request for API endpoints
    c.set('isIframeRequest', isIframeRequest);
    c.set('isPortfolioEmbed', isAllowedIframeParent(referrer, env));
    c.set('referrer', referrer);
    
    await next();
  };
}

/**
 * Middleware specifically for handling iframe API requests
 */
export function iframeApiMiddleware(env: Env) {
  return async (c: Context<AppEnv>, next: Next) => {
    const isIframeRequest = c.get('isIframeRequest');
    const isPortfolioEmbed = c.get('isPortfolioEmbed');
    
    // Add iframe context to API responses
    if (isIframeRequest || isPortfolioEmbed) {
      // Set response headers for iframe API calls
      c.header('X-Iframe-Context', 'true');
      c.header('X-Portfolio-Context', isPortfolioEmbed ? 'true' : 'false');
      
      // Allow additional CORS headers for iframe requests
      c.header('Access-Control-Expose-Headers', 
        'X-Iframe-Context, X-Portfolio-Context, X-Request-ID, X-RateLimit-Remaining'
      );
    }
    
    await next();
  };
}