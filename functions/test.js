export async function onRequest() {
  return new Response(JSON.stringify({
    message: "Pages Functions are working!",
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}