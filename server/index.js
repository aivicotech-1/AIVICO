import express from 'express';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env manually (no need for a separate loader since we use ESM)
const __dir = dirname(fileURLToPath(import.meta.url));
try {
  const env = readFileSync(join(__dir, '..', '.env'), 'utf8');
  env.split('\n').forEach((line) => {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) {
      process.env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '');
    }
  });
} catch { /* .env not present — fine in production where env vars are set directly */ }

const app = express();
app.use(express.json());

// ─── Create transporter ───────────────────────────────────────────────────────
// Supports Gmail (SMTP) — set SMTP_USER and SMTP_PASS in .env
// If env vars are absent the server still runs but just logs the inquiry.
let transporter = null;
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,   // Gmail App Password (not your login password)
    },
  });
}

// ─── POST /api/contact ────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, company, service, message, timeline } = req.body ?? {};

  // Basic validation
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'A name is required.' });
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'A project overview is required.' });
  }

  const to = process.env.INBOX_EMAIL || 'hello@aivico.com';
  const subject = `[Aivico Inquiry] ${service || 'General'} — ${name.trim()}`;
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#18191b">
      <div style="background:#0b0d10;padding:28px 32px;border-radius:12px 12px 0 0">
        <span style="color:#d8bc8a;font-weight:800;font-size:20px;letter-spacing:-0.03em">AIVICO.</span>
        <span style="color:#9ba1a6;font-size:13px;margin-left:16px">New Project Inquiry</span>
      </div>
      <div style="background:#f7f6f2;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e2db">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#525866;font-size:13px;width:130px">Service</td>
              <td style="padding:8px 0;font-weight:700;color:#18191b">${service || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#525866;font-size:13px">Name</td>
              <td style="padding:8px 0;font-weight:700;color:#18191b">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#525866;font-size:13px">Email</td>
              <td style="padding:8px 0"><a href="mailto:${email}" style="color:#8c6d3b">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#525866;font-size:13px">Company</td>
              <td style="padding:8px 0;color:#18191b">${company || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#525866;font-size:13px">Timeline</td>
              <td style="padding:8px 0;color:#18191b">${timeline || '—'}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5e2db;margin:20px 0">
        <p style="font-size:13px;color:#525866;margin:0 0 8px 0;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Project Overview</p>
        <p style="font-size:14px;color:#18191b;line-height:1.7;margin:0;white-space:pre-wrap">${message}</p>
        <hr style="border:none;border-top:1px solid #e5e2db;margin:20px 0">
        <p style="font-size:11px;color:#8c93a0;margin:0">Sent from aivico.com contact form — reply directly to this email to respond to the enquirer.</p>
      </div>
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Aivico Website" <${process.env.SMTP_USER}>`,
        to,
        replyTo: email,
        subject,
        html,
      });
      console.log(`[contact] Email sent → ${to} (from ${email})`);
    } catch (err) {
      console.error('[contact] Email send failed:', err.message);
      // Still return success — inquiry was received, just email failed
    }
  } else {
    // Dev mode: no SMTP configured — just log the inquiry
    console.log('\n📬 [contact] New inquiry received (no SMTP configured):');
    console.log(`  Name:    ${name}`);
    console.log(`  Email:   ${email}`);
    console.log(`  Company: ${company || '—'}`);
    console.log(`  Service: ${service || '—'}`);
    console.log(`  Message: ${message}\n`);
  }

  return res.status(202).json({ received: true });
});

app.listen(process.env.PORT || 3001, () =>
  console.log(`Aivico API ready on :${process.env.PORT || 3001}`)
);
