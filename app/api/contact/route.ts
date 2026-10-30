import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { contactSchema } from '@/lib/validation';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { getClientIp, hit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 }; // 5 submissions / 10 min / IP

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limited = hit(`contact:${ip}`, RATE_LIMIT);
  if (!limited.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((limited.resetAt - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  let data;
  try {
    data = contactSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: 'Please check the form and try again.' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  if (data.company) {
    // Honeypot tripped. Respond as if successful so the bot doesn't learn
    // anything useful, but drop the submission entirely.
    return NextResponse.json({ success: true });
  }

  const turnstileResult = await verifyTurnstileToken(data.turnstileToken, ip);
  if (!turnstileResult.success) {
    return NextResponse.json(
      { error: 'Verification failed. Please retry the CAPTCHA.' },
      { status: 403 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'portfolio@yourdomain.com';

  if (apiKey && toEmail) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: data.email,
        subject: `Portfolio contact from ${data.name}`,
        text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
      });
    } catch (err) {
      console.error('[contact] Resend send failed:', err);
      return NextResponse.json(
        { error: 'Could not send your message right now. Please try again shortly.' },
        { status: 502 }
      );
    }
  } else {
    // No email provider configured — log so the submission isn't silently lost
    // during local development or before env vars are set in production.
    console.info('[contact] New submission (email not configured):', {
      name: data.name,
      email: data.email,
      message: data.message,
    });
  }

  return NextResponse.json({ success: true });
}
