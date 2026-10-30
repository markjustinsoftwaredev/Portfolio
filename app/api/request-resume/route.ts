import { NextResponse } from 'next/server';
import { resumeRequestSchema } from '@/lib/validation';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { getClientIp, hit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

// The resume file is intentionally not linked directly anywhere in the
// rendered HTML — it only becomes reachable after this route verifies a
// human via Turnstile, which keeps it out of reach of simple scrapers that
// crawl static links.
export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limited = hit(`resume:${ip}`, RATE_LIMIT);
  if (!limited.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = resumeRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 400 });
  }

  const turnstileResult = await verifyTurnstileToken(parsed.data.turnstileToken, ip);
  if (!turnstileResult.success) {
    return NextResponse.json(
      { error: 'Verification failed. Please retry the CAPTCHA.' },
      { status: 403 }
    );
  }

  console.info('[request-resume] Verified request from:', parsed.data.email);

  return NextResponse.json({ success: true, url: '/resume.pdf' });
}
