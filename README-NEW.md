# Western Star - News & Analysis Platform

A modern, full-stack content management platform built with React, Node.js, and PostgreSQL. Features a sophisticated CMS system with database integration and seamless data migration capabilities.

## 🚀 Features

### Frontend

- **Modern React Architecture** with functional components and hooks
- **Responsive Design** with Tailwind CSS
- **Dynamic Routing** with custom router implementation
- **Content Management System** with real-time editing
- **Smooth Animations** with Framer Motion
- **SEO Optimized** with proper meta tags and structure

### Backend

- **RESTful API** with Express.js
- **PostgreSQL Database** with Prisma ORM
- **Data Migration** from localStorage to database
- **Input Validation** with express-validator
- **Rate Limiting** and security middleware
- **Comprehensive Error Handling**

### Content Management

- **News Articles** with rich content, insights, and resources
- **Newsletter Archive** with tagging and categorization
- **Trending Topics** with position management
- **Author Management** with profiles and article tracking
- **Tag System** with color coding and filtering
- **Analytics Dashboard** with view tracking

## 🏗️ Architecture

```
western-star-landing/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── sections/          # Section components
│   ├── styles/            # CSS styles
│   └── utils/             # Utility functions & API client
├── backend/               # Node.js backend API
│   ├── routes/            # API route handlers
│   ├── lib/               # Database connection
│   ├── prisma/            # Database schema & migrations
│   └── scripts/           # Setup and seed scripts
└── docs/                  # Documentation
```

## 🚦 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Option 1: Automatic Setup (Recommended)

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/western-star-landing.git
   cd western-star-landing
   ```

2. **Run complete setup**

   ```bash
   npm run full-setup
   ```

   This will:

   - Install frontend dependencies
   - Install backend dependencies
   - Set up PostgreSQL database
   - Run migrations and seed data
   - Generate Prisma client

3. **Start both frontend and backend**
   ```bash
   npm run dev:all
   ```

### Option 2: Manual Setup

1. **Frontend Setup**

   ```bash
   npm install
   cp .env.example .env
   ```

2. **Backend Setup**

   ```bash
   npm run backend:setup
   ```

3. **Start Development Servers**

   ```bash
   # Terminal 1 - Backend
   npm run backend:dev

   # Terminal 2 - Frontend
   npm run dev:frontend
   ```

## 🔄 Data Migration

If you have existing CMS data in localStorage, the system will automatically detect it and offer seamless migration:

1. **Automatic Detection** - Migration banner appears if localStorage data exists
2. **One-Click Migration** - All data transfers safely to PostgreSQL
3. **Validation & Rollback** - Data integrity checks with fallback options
4. **Zero Downtime** - CMS continues working during migration

## 📚 API Documentation

### Core Endpoints

#### Content Management

```bash
GET    /api/news              # Get news articles (paginated)
POST   /api/news              # Create news article
PUT    /api/news/:id          # Update news article
DELETE /api/news/:id          # Delete news article

GET    /api/newsletters       # Get newsletters (paginated)
POST   /api/newsletters       # Create newsletter
PUT    /api/newsletters/:id   # Update newsletter
DELETE /api/newsletters/:id   # Delete newsletter
```

#### Configuration

```bash
GET    /api/site              # Get site configuration
PUT    /api/site              # Update site configuration

GET    /api/hero              # Get hero section
PUT    /api/hero              # Update hero section
```

## 🛠️ Development

### Available Commands

**Frontend:**

```bash
npm run dev:frontend         # Start frontend dev server
npm run build               # Build for production
npm run preview             # Preview production build
```

**Backend:**

```bash
npm run backend:dev         # Start backend dev server
npm run backend:migrate     # Run database migrations
npm run backend:seed        # Seed database with sample data
npm run backend:studio      # Open Prisma Studio (DB GUI)
```

**Full Stack:**

```bash
npm run dev:all             # Start both frontend and backend
npm run full-setup          # Complete project setup
```

### Environment Configuration

**Frontend (.env)**

```bash
VITE_API_URL=http://localhost:5000/api
```

**Backend (backend/.env)**

```bash
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://westernstar:westernstar123@localhost:5432/westernstar_db"
FRONTEND_URL=http://localhost:5173
```

## 🚀 Production Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy dist folder**
   - Set `VITE_API_URL` to production API URL
   - Configure redirects for SPA routing

### Backend Deployment (Railway/Render/Heroku)

1. **Set environment variables**

   ```bash
   NODE_ENV=production
   DATABASE_URL=your_production_database_url
   FRONTEND_URL=https://your-frontend-domain.com
   ```

2. **Deploy with migrations**
   ```bash
   npm run migrate:prod
   npm start
   ```

## 🔧 Troubleshooting

### Common Issues

**Database Connection Errors**

- Check PostgreSQL is running
- Verify DATABASE_URL format in .env
- Ensure database and user exist

**Migration Fails**

- Check localStorage data format in browser dev tools
- Verify all required fields are present
- Check API server is running

**CORS Issues**

- Update FRONTEND_URL in backend .env
- Ensure ports match in both frontend and backend

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

Built with ❤️ for modern content management.
