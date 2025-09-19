# Western Star Backend

A robust Node.js/Express.js backend with PostgreSQL database for the Western Star CMS platform.

## Features

- **RESTful API** for all CMS content management
- **PostgreSQL Database** with Prisma ORM
- **Data Migration** from localStorage to database
- **Authentication Ready** (can be extended)
- **Rate Limiting** and security middleware
- **Comprehensive Validation** with express-validator
- **CORS Support** for frontend integration

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Setup PostgreSQL Database**

   Create a new PostgreSQL database:

   ```sql
   CREATE DATABASE westernstar_db;
   CREATE USER westernstar WITH PASSWORD 'westernstar123';
   GRANT ALL PRIVILEGES ON DATABASE westernstar_db TO westernstar;
   ```

3. **Configure Environment**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the DATABASE_URL if needed:

   ```
   DATABASE_URL="postgresql://westernstar:westernstar123@localhost:5432/westernstar_db"
   ```

4. **Run Database Migrations**

   ```bash
   npm run migrate
   ```

5. **Seed Database**

   ```bash
   npm run seed
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001` (default in this repo)

## API Endpoints

### Site Configuration

- `GET /api/site` - Get site configuration
- `PUT /api/site` - Update site configuration

### Hero Section

- `GET /api/hero` - Get hero configuration
- `PUT /api/hero` - Update hero configuration

### Tags

- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create new tag
- `PUT /api/tags/:id` - Update tag
- `DELETE /api/tags/:id` - Delete tag

### Authors

- `GET /api/authors` - Get all authors
- `POST /api/authors` - Create new author
- `GET /api/authors/:id` - Get author by ID
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author

### News Articles

- `GET /api/news` - Get news articles (with pagination & filtering)
- `POST /api/news` - Create new article
- `GET /api/news/:id` - Get article by ID
- `PUT /api/news/:id` - Update article
- `DELETE /api/news/:id` - Delete article
- `PUT /api/news/reorder` - Bulk reorder articles

### Newsletters

- `GET /api/newsletters` - Get newsletters (with pagination & filtering)
- `POST /api/newsletters` - Create new newsletter
- `GET /api/newsletters/:id` - Get newsletter by ID
- `PUT /api/newsletters/:id` - Update newsletter
- `DELETE /api/newsletters/:id` - Delete newsletter

### Content Sections

- `GET /api/trending-topics` - Get trending topics
- `GET /api/topics` - Get topics/features
- `GET /api/navigation` - Get navigation items
- `GET /api/testimonials` - Get testimonials
- `GET /api/footer` - Get footer configuration

### Analytics

- `GET /api/analytics/dashboard` - Get dashboard analytics

### Migration

- `POST /api/migration/from-localstorage` - Migrate localStorage data to database
- `GET /api/migration/status` - Check migration status

## Database Schema

The database uses Prisma ORM with the following main models:

- **Site** - Site configuration
- **Hero** - Hero section configuration
- **Tag** - Content tags/categories
- **Author** - Article authors
- **NewsArticle** - News articles with insights and resources
- **Newsletter** - Newsletter archive
- **TrendingTopic** - Trending/featured topics
- **Topic** - Site topics/features
- **NavigationItem** - Navigation menu items
- **Testimonial** - Customer testimonials
- **Footer** - Footer configuration

## Migration from localStorage

If you have existing data in localStorage, the system will automatically detect it and offer migration options:

1. **Automatic Detection** - The frontend will show a migration banner
2. **One-Click Migration** - Click "Migrate Now" to transfer all data
3. **Validation** - The system validates all data during migration
4. **Rollback Safe** - Original localStorage data is preserved

## Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run migrate:prod` - Deploy migrations to production
- `npm run generate` - Generate Prisma client
- `npm run studio` - Open Prisma Studio (database GUI)
- `npm run seed` - Seed database with initial data

### Adding New Endpoints

1. Create route file in `/routes/`
2. Add validation using express-validator
3. Import and register in `server.js`
4. Add corresponding methods to frontend API client

### Database Changes

1. Modify `prisma/schema.prisma`
2. Run `npm run migrate` to create migration
3. Update API endpoints as needed
4. Update frontend API client methods

## Production Deployment

### Environment Variables

Production requires these environment variables:

```bash
NODE_ENV=production
DATABASE_URL="your-production-database-url"
PORT=3001
FRONTEND_URL="https://your-frontend-domain.com"
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Database Setup

1. Create production PostgreSQL database
2. Set DATABASE_URL environment variable
3. Run migrations: `npm run migrate:prod`
4. Run seed: `npm run seed` (optional)

### Security Considerations

- Rate limiting is enabled (100 requests per 15 minutes by default)
- CORS is configured for your frontend domain
- Input validation on all endpoints
- Helmet.js for security headers
- Environment-based configuration

## Frontend Integration

The frontend automatically detects whether to use the API or localStorage:

1. **Migration Mode** - Uses localStorage until migration is complete
2. **API Mode** - Uses database API after migration
3. **Fallback Mode** - Falls back to localStorage if API is unavailable

Update your frontend's `.env` file (recommended):

```
VITE_API_URL=/api
```

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database and user exist

### Migration Issues

- Check browser console for detailed error messages
- Verify localStorage data format
- Check API server is running

### CORS Issues

- Update FRONTEND_URL in backend .env
- Ensure frontend and backend ports match configuration

## Support

For issues and questions, check the console logs and error messages. The API provides detailed error responses for debugging.
