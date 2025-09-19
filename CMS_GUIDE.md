# Western Star CMS Guide

This site’s CMS is now database-backed and integrated with the Node/Express backend (Prisma + Postgres/SQLite depending on env). You can manage News, Newsletters, Trending Topics, Testimonials, Hero, Site settings, and Tags directly from the in-app admin.

## Accessing the CMS

- Open the website locally (Vite dev server at http://localhost:5173). Click the floating pencil button in the bottom-right to open the CMS. Log in with the admin email and password configured in `CMSAdmin.jsx`.
- Sessions last 2 hours and are stored in localStorage for convenience during development.

## What’s Managed

- Site settings and Hero (title, subtitle, badge)
- News Articles: full CRUD, reorder (position), toggle visibility, choose showcase section (featured/mosaic/loop), tags, author, image, content
- Newsletters: CRUD with tags, content, URL
- Trending Topics: CRUD with category/title/summary/date/image/visibility, position ordering
- Testimonials, Topics, Tags, Navigation, Footer (read-only or CRUD as applicable)

## Data flow and caching

- Frontend uses `src/utils/cmsApi.js` and `src/utils/api.js` to call backend REST endpoints under `/api`.
- Responses are cached in-memory for ~60s. Any mutation clears the relevant cache so changes appear after save. If you don’t see changes immediately, wait a second and refresh.

## Authors

- Authors are managed via the backend (`/api/authors`). In the News Article modal, select an author from the dropdown. The selected authorId is saved with the article.

## Tags

- Tags must exist in the database to be associated. The backend now safely ignores unknown tag names on create/update rather than failing.

## JSON Import (Newsletters)

- Use the JSON import in CMS > Newsletters to bulk add newsletters. The input can be an array or an object with a `newsletters` array. On success, you’ll see a confirmation and the list will refresh.

## Troubleshooting

- If you previously used localStorage content, the app will force database mode. Clear `localStorage.westernStarCMS` only if needed. Use the “Reset CMS data” action to clear caches.
- If a UI section shows no items, verify the backend service is running and reachable at `VITE_API_URL` (or proxied to :3001 in dev). See `vite.config.js`.
- If you see tag-related filter errors, ensure your tags exist via `/api/tags` and are active. The UI now guards against missing arrays and undefined fields.

## Development

- Dev: run both servers (backend and frontend). The project includes `npm run dev` for frontend and `npm run backend:dev` for backend. Or run `npm run dev:all`.
- Build: `npm run build` creates a production bundle in `dist/`.

## Security note

- The current login is client-side only and intended for development. For production, integrate proper authentication/authorization on the backend and lock down write endpoints.
