import { z } from 'zod';

// `company` is the honeypot (see the hidden field in Contact.tsx). Real
// visitors never see or fill it — any non-empty value means a bot filled
// every input it could find, and the route responds as if nothing happened.
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(100),
  email: z.string().trim().email('Enter a valid email address').max(200),
  message: z.string().trim().min(10, 'Message is too short').max(5000),
  company: z.string().optional(),
  turnstileToken: z.string().min(1, 'Verification token missing'),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const resumeRequestSchema = z.object({
  email: z.string().trim().email('Enter a valid email address').max(200),
  turnstileToken: z.string().min(1, 'Verification token missing'),
});

export type ResumeRequestInput = z.infer<typeof resumeRequestSchema>;
