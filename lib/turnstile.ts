const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes': string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<{ success: boolean; errorCodes: string[] }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    // Fails closed in production so a missing secret can't silently disable
    // bot protection; in local dev without a configured key, logs a warning
    // and passes through so the rest of the flow can still be exercised.
    if (process.env.NODE_ENV === 'production') {
      return { success: false, errorCodes: ['missing-secret-key'] };
    }
    console.warn(
      '[turnstile] TURNSTILE_SECRET_KEY not set — skipping verification in dev.'
    );
    return { success: true, errorCodes: [] };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = (await res.json()) as TurnstileVerifyResponse;
    return { success: data.success, errorCodes: data['error-codes'] ?? [] };
  } catch {
    return { success: false, errorCodes: ['network-error'] };
  }
}
