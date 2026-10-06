# Aivico Tech Website

Company website built with **React, TypeScript, Vite, and plain CSS**, with a separate **Express + Nodemailer** contact API.

## Run locally

Requires Node.js **22.12+** and npm.

```sh
npm ci
npm run dev       # Frontend: use the localhost URL printed by Vite
```

In a second terminal:

```sh
npm run server    # Contact API: localhost:3001
```

Vite proxies `/api` to port 3001. To check the production build, run `npm run build`; use `npm run preview` to preview it. No test or lint scripts are currently configured.

## What the website includes

- **Homepage `/`:** hero, Services, moving technology icons, searchable Technologies, Projects, Process, FAQ, contact form, and footer.
- **Leadership `/leadership`:** team profiles. Routing uses a pathname check in `App.tsx`.
- **Six services:** Web Development, AI Product Development, SEO, SQA, Digital Marketing, and AI/ML Ops. The selector rotates every **3 seconds**, pausing on hover or keyboard focus.
- **Three projects:** Skill2Success, AIVICO, and Creston Biz, each with a description and local image.
- **Themes and motion:** persistent light/dark toggle, scroll reveals, hover glows, card tilt, and smooth anchor scrolling. The current default is dark.

## Where to make changes

| File | Responsibility |
| --- | --- |
| `src/App.tsx` | Main layout, navigation, service/process/FAQ content, theme state, contact form |
| `src/components/Projects.tsx` | Project names, descriptions, and image imports |
| `src/components/TechStackExplorer.tsx` | Technology catalog, categories, and search |
| `src/components/TeamRow.tsx` | Leadership profiles |
| `src/components/TiltCard.tsx` | Interactive card tilt and glow |
| `src/images/` | Logos, project screenshots, and portraits |
| `src/styles.css` | Base design system and responsive styles |
| `src/layout-updates.css` | Layout, spacing, project, and logo overrides |
| `src/motion.css` | Motion refinements and anchor offsets |
| `server/index.js` | Contact validation and email delivery |
| `index.html`, `public/` | Metadata, fonts, robots.txt, and sitemap |

Styles load through `src/main.tsx`; later stylesheets override earlier rules. `service-cycle.css` contains unused rotation-button styles. `CaseStudies.tsx`, `Hero3DCanvas.tsx`, and `ProjectEstimator.tsx` are retained legacy components, not displayed on the website.

## Contact API

The form sends JSON to `POST /api/contact`. Required fields: `name`, `email`, and `message`. The backend also accepts `company`, `service`, and `timeline`.

Create a root `.env` for email delivery (never commit credentials):

```dotenv
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-sending-email
SMTP_PASS=your-smtp-app-password
INBOX_EMAIL=your-receiving-email
```

Without SMTP credentials, submissions are logged only; there is no database. SMTP uses port 587/STARTTLS by default.

**Before production:** fix the current success fallback—the frontend shows success on failed requests, and the server returns 202 even if email delivery fails. Also fix the asynchronous form reset, include the form's `timeline` in the request, escape email HTML inputs, and add abuse protection.

## Deployment

- **Frontend:** Vercel build command `npm run build`, output `dist`. The existing `vercel.json` provides the SPA fallback needed for `/leadership`.
- **Backend:** deploy Express separately with `npm run server`, or implement a serverless contact endpoint. Route `/api/contact` before the SPA fallback. The Vite proxy works only in development; Vercel does not automatically deploy `server/index.js`.
- Update the domain in `index.html`, `public/robots.txt`, and `public/sitemap.xml`, plus public contact/social links in `App.tsx`.
- Check both themes, mobile layouts, keyboard interaction, and actual email delivery before release. Fonts and some icons load from external providers.
