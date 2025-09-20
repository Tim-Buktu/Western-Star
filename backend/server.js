import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

// Import routes
import siteRoutes from './routes/site.js'
import heroRoutes from './routes/hero.js'
import tagRoutes from './routes/tags.js'
import trendingTopicRoutes from './routes/trending-topics.js'
import topicRoutes from './routes/topics.js'
import navigationRoutes from './routes/navigation.js'
import newsRoutes from './routes/news.js'
import newsletterRoutes from './routes/newsletters.js'
import testimonialRoutes from './routes/testimonials.js'
import footerRoutes from './routes/footer.js'
import authorRoutes from './routes/authors.js'
import analyticsRoutes from './routes/analytics.js'
import migrationRoutes from './routes/migration.js'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet())

// CORS configuration
// Allow a primary FRONTEND_URL and optional comma-separated FRONTEND_URLS for multiple domains (e.g., Vercel prod + previews)
const extraOrigins = (process.env.FRONTEND_URLS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

const allowedOrigins = [
  process.env.FRONTEND_URL,
  ...extraOrigins,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173', // vite preview
  'http://127.0.0.1:4173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
].filter(Boolean)

const allowVercelPreviews = (process.env.ALLOW_VERCEL_PREVIEWS || 'false').toLowerCase() === 'true'

app.use(cors({
  origin: (origin, callback) => {
    // Allow no-origin (like curl or mobile apps) and allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    // Optionally allow any Vercel preview deployments (*.vercel.app)
    if (allowVercelPreviews) {
      try {
        const host = new URL(origin).host
        if (host && host.endsWith('.vercel.app')) {
          return callback(null, true)
        }
      } catch (_) {
        // ignore parse error and fall through
      }
    }
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

// Be explicit for API preflight in serverless environments
app.options('/api/*', cors(), (req, res) => res.sendStatus(204))

// Handle preflight
app.options('*', cors())

// Rate limiting
if (process.env.NODE_ENV !== 'development') {
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100 // limit each IP to 100 requests per windowMs
  })
  app.use(limiter)
} else {
  console.log('⚠️  Rate limiting is disabled in development mode')
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Compression middleware
app.use(compression())

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API Routes
app.use('/api/site', siteRoutes)
app.use('/api/hero', heroRoutes)
app.use('/api/tags', tagRoutes)
app.use('/api/trending-topics', trendingTopicRoutes)
app.use('/api/topics', topicRoutes)
app.use('/api/navigation', navigationRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/newsletters', newsletterRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/footer', footerRoutes)
app.use('/api/authors', authorRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/migration', migrationRoutes)

// Health check endpoints
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Match Vercel convention where backend is accessed via /api/*
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  
  // Don't send stack trace in production
  const error = process.env.NODE_ENV === 'production' 
    ? { message: err.message }
    : { message: err.message, stack: err.stack }

  res.status(err.status || 500).json({
    error: true,
    ...error
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: true,
    message: 'Route not found'
  })
})

// Export app for serverless (Vercel) and start server locally when not on Vercel
export default app

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📊 Environment: ${process.env.NODE_ENV}`)
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`)
  })
}
