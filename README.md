# Western Star — Landing Page & Newsroom

Modern, professional newsletter landing page with integrated newsroom for Indonesia's market dynamics.
Tech stack: Vite + React + Tailwind, Framer Motion, Lucide Icons.

## Quick start

```bash
npm install
npm run dev
```

## Features

### Landing Page

- Hero section with newsletter subscription
- Latest content preview cards (TechCrunch-style)
- Topic categories and testimonials
- Mobile-responsive design

### Newsroom Features

- **Creative Layout**: Modern, engaging design with featured newsletter hero section
- **Advanced Search**: Full-text search across titles, content, and tags with real-time filtering
- **Smart Filtering**: Multi-tag selection, year filtering, and advanced sort options (newest, oldest, A-Z)
- **View Modes**: Switch between grid and list view for optimal browsing experience
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing
- **Apple-Inspired Design**: Clean, professional aesthetic with smooth animations and transitions
- **Interactive Elements**: Hover effects, smooth transitions, and engaging micro-interactions

### Content Management System (CMS)

- Admin panel accessible via floating button
- Authentication-protected interface
- JSON import/export for newsletters
- Real-time content editing
- Newsletter template download

## Configure Beehiiv

Set the environment variable `VITE_BEEHIIV_FORM_ACTION` to the **form action URL** from Beehiiv (Grow → Embeds). Example:

```
VITE_BEEHIIV_FORM_ACTION=https://embeds.beehiiv.com/.../subscribe
```

Create a `.env.local` file at project root and add the line above.

## Newsletter JSON Format

Import newsletters using JSON files with this structure:

```json
{
  "newsletters": [
    {
      "title": "Newsletter Title",
      "date": "2025-09-04",
      "keyDiscussion": "Brief summary of key topics covered",
      "tags": ["TECHNOLOGY", "POLICY & REGULATIONS"],
      "image": "https://example.com/image.jpg",
      "content": "<h2>Content</h2><p>HTML formatted content...</p>",
      "newsletterUrl": "https://link-to-full-newsletter.com"
    }
  ]
}
```

Required fields: `title`, `date`, `keyDiscussion`, `tags`
Optional fields: `image`, `content`, `newsletterUrl`

## CMS Admin Access

- Email: timothyhapsim@gmail.com
- Password: admin321
- Session duration: 2 hours

## Navigation

- `/` - Landing page with newsletter subscription and content preview
- `/newsroom` - Complete newsletter archive with advanced filtering and search
- `/newsletter/{id}` - Individual newsletter detail view with related articles
- **Logo Navigation**: Click the Western Star logo to return to the landing page from any section
- **Navbar Integration**: Seamless navigation between landing page and newsroom

## Fonts

Plus Jakarta Sans and Montserrat are loaded via Google Fonts (see `index.html`).

## Structure

- `src/pages/` — main pages (Landing, Newsroom, Newsletter Detail)
- `src/sections/` — hero, preview cards, topics, testimonials, subscribe
- `src/components/` — navbar, footer, router, CMS admin
- `src/utils/` — beehiiv integration, CMS data management
- `src/assets/logo.png` — brand logo

## Deploy

- Vercel or Netlify work well. No server required.
- All content is stored in localStorage for demo purposes
- For production, consider integrating with a proper CMS or database
