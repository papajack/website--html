export async function onRequestGet() {
  return Response.json({
    message: 'Hello from Cloudflare Pages Functions',
  });
}