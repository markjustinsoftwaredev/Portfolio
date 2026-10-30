import { NextRequest, NextResponse } from 'next/server';

// Generates a fresh per-request nonce and builds a strict Content-Security-Policy
// around it. This is the pattern Next.js documents for App Router CSP: the nonce
// is forwarded to the request so Next's own inline bootstrap/RSC scripts pick it
// up automatically, and it's echoed on the response header that the browser enforces.
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const isDev = process.env.NODE_ENV !== 'production';

  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self' data:;
    frame-src https://challenges.cloudflare.com;
    connect-src 'self' https://challenges.cloudflare.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: [
    // Skip API routes (JSON responses, no CSP benefit) and static asset
    // internals; apply the nonce-based CSP to every rendered page.
    '/((?!api/|_next/static/|_next/image/|favicon.ico).*)',
  ],
};
