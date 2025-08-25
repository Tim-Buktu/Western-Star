# Western Star — Landing Page

Modern, professional, minimal landing page for a newsletter about Indonesia's market dynamics.
Tech stack: Vite + React + Tailwind, Framer Motion, Lucide Icons.

## Quick start
```bash
npm install
npm run dev
```

## Configure Beehiiv
Set the environment variable `VITE_BEEHIIV_FORM_ACTION` to the **form action URL** from Beehiiv (Grow → Embeds). Example:
```
VITE_BEEHIIV_FORM_ACTION=https://embeds.beehiiv.com/.../subscribe
```
Create a `.env.local` file at project root and add the line above.

## Fonts
Plus Jakarta Sans and Montserrat are loaded via Google Fonts (see `index.html`).

## Structure
- `src/pages/LandingPage.jsx` — page composition
- `src/sections/*` — hero, preview cards (TechCrunch-like), topics, testimonials, subscribe
- `src/components/*` — navbar, footer
- `src/assets/logo.jpg` — your provided logo
- `src/utils/beehiiv.js` — simple helper to post to Beehiiv form action

## Deploy
- Vercel or Netlify work well. No server required.
