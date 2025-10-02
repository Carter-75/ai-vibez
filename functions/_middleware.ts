// Cloudflare Pages Functions middleware
// Basic middleware for Pages Functions

export async function onRequest(context: any) {
  // Continue to next handler
  return context.next();
}