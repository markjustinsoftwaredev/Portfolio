# Portfolio

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

`npm run build` / `npm run start` for a production build. `npm run lint` runs ESLint.

## Before deploying

- **Turnstile keys** — create a site at the [Cloudflare Turnstile dashboard](https://dash.cloudflare.com/?to=/:account/turnstile) and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`. Without `TURNSTILE_SECRET_KEY`, the contact and resume-request APIs fail closed in production (they only skip verification in `NODE_ENV !== 'production'`, with a console warning).
- **Email delivery** — set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` to actually send contact-form submissions via [Resend](https://resend.com). Without these, submissions are just logged server-side (useful for local dev, not for production).
- **Replace placeholders**: `public/resume.pdf` (currently a placeholder PDF), the GitHub/LinkedIn links in `components/layout/Footer.tsx`, the email parts in `components/ui/ObfuscatedEmail.tsx`, and `metadataBase` in `app/layout.tsx`.
- **Project screenshots**: `public/projects/*.svg` are generated placeholder diagrams, not real product screenshots — swap in real imagery if you have it.

## Security features and why they're built this way

- **Strict CSP with per-request nonces** — `proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`) generates a fresh nonce per request and builds the `Content-Security-Policy` header around it, following Next's documented pattern for App Router. This is why the pages are rendered dynamically (`ƒ` in the build output) rather than statically — a static page can't carry a per-request nonce.
- **Other headers** (`next.config.js`) — HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`. These don't need per-request data, so they're set once for every route via `headers()`.
- **Contact form** (`app/api/contact/route.ts`) — honeypot field (`company`, visually hidden off-screen rather than `display:none`, see `components/sections/Contact.tsx`), in-memory sliding-window rate limiting (`lib/rateLimit.ts`, 5 req / 10 min / IP), Zod validation, and server-side Cloudflare Turnstile verification. A tripped honeypot returns `{ success: true }` so a bot gets no signal it was caught.
- **Resume gating** (`app/api/request-resume/route.ts`) — the resume link is never present in the page's HTML; it's only returned after Turnstile verification succeeds, keeping it out of reach of static scrapers.
- **Email obfuscation** (`components/ui/ObfuscatedEmail.tsx`) — the address is assembled client-side from parts, not written into the server-rendered HTML as plain text.
- **Image protection** (`components/ui/ProtectedImage.tsx`) — blocks right-click and drag-and-drop on project imagery. This deters casual scraping, not a determined attacker with devtools — documented as such in the component.
- **SOC widget and terminal easter egg** are intentionally playful/cosmetic (`components/ui/SecurityStatusWidget.tsx`, `components/ui/Terminal.tsx`, press `` ` `` to open) — the widget is labeled "simulated demo" so it never claims to be real monitoring.

### Known accepted advisory

`npm audit` reports a high-severity advisory in `braces`/`micromatch`/`fast-glob`, pulled in transitively by `eslint-config-next` → `@next/eslint-plugin-next`. This is a **lint-time-only devDependency** (glob matching over local source files during `next lint`/local dev), never shipped to the deployed app and never exposed to attacker-controlled input. `npm audit fix --force` would "fix" it by downgrading `eslint-config-next` to a version older than this project's Next.js version, which is a worse tradeoff than leaving it. Revisit this once `eslint-config-next` bumps its glob dependency chain.

## Project structure

- `app/` — App Router pages, layout, API routes.
- `components/sections/` — page sections (Hero, About, Projects, Skills & Certifications, Resume Request, Contact).
- `components/ui/` — reusable interactive pieces (Turnstile wrapper, project architecture modal, terminal, SOC widget, protected image, obfuscated email).
- `components/layout/` — navbar and footer.
- `lib/` — rate limiting, Zod schemas, Turnstile server verification, and the content data (projects, skills, certifications).
