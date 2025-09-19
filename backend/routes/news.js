import express from 'express'
import { body, validationResult } from 'express-validator'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Get all news articles with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      showcaseSection,
      category,
      tags,
      isVisible,
      search
    } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)

    let where = {}

    if (showcaseSection && showcaseSection !== 'all') {
      where.showcaseSection = showcaseSection
    }

    if (category) {
      where.category = category
    }

    if (isVisible !== undefined) {
      where.isVisible = isVisible === 'true'
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (tags) {
      const tagArray = tags.split(',')
      where.tags = {
        some: {
          name: { in: tagArray }
        }
      }
    }

    const [articles, total] = await Promise.all([
      prisma.newsArticle.findMany({
        where,
        include: {
          author: true,
          tags: true,
          insights: {
            orderBy: { position: 'asc' }
          },
          resources: {
            orderBy: { position: 'asc' }
          }
        },
        orderBy: [
          { position: 'asc' },
          { date: 'desc' }
        ],
        skip,
        take: parseInt(limit)
      }),
      prisma.newsArticle.count({ where })
    ])

    res.json({
      articles: articles.map(formatArticleResponse),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching news articles:', error)
    res.status(500).json({ error: 'Failed to fetch news articles' })
  }
})

// Get single news article by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const article = await prisma.newsArticle.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
        tags: true,
        insights: {
          orderBy: { position: 'asc' }
        },
        resources: {
          orderBy: { position: 'asc' }
        }
      }
    })

    if (!article) {
      return res.status(404).json({ error: 'Article not found' })
    }

    // Increment view count
    await prisma.newsArticle.update({
      where: { id: parseInt(id) },
      data: { views: { increment: 1 } }
    })

    res.json(formatArticleResponse(article))
  } catch (error) {
    console.error('Error fetching news article:', error)
    res.status(500).json({ error: 'Failed to fetch news article' })
  }
})

// Create new news article
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('summary').notEmpty().withMessage('Summary is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('authorId').isInt().withMessage('Valid author ID is required'),
  body('tags').isArray().withMessage('Tags must be an array'),
  body('showcaseSection').optional().isIn(['featured', 'mosaic', 'loop', 'none'])
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      type = 'standard',
      category,
      title,
      summary,
      content,
      showcaseSection = 'none',
      isVisible = true,
      position = 0,
      imageUrl,
      imageAlt,
      authorId,
      date,
      displayDate,
      tags = [],
      insights = [],
      resources = []
    } = req.body

    // Create article with nested data
    // Resolve only existing tags to avoid connect errors
    let tagConnections = {}
    if (tags && tags.length > 0) {
      const existingTags = await prisma.tag.findMany({ where: { name: { in: tags } } })
      const existing = existingTags.map(t => t.name)
      if (existing.length > 0) {
        tagConnections = { connect: existing.map(name => ({ name })) }
      }
    }

    const article = await prisma.newsArticle.create({
      data: {
        type,
        category,
        title,
        summary,
        content,
        showcaseSection,
        isVisible,
        position,
        ...(date ? { date: new Date(date) } : {}),
        ...(displayDate ? { displayDate } : {}),
        imageUrl,
        imageAlt,
        authorId: parseInt(authorId),
        ...(Object.keys(tagConnections).length > 0 && { tags: tagConnections }),
        insights: {
          create: insights.map((insight, index) => ({
            content: insight,
            position: index
          }))
        },
        resources: {
          create: resources.map((resource, index) => ({
            title: resource.title,
            description: resource.description,
            url: resource.url,
            type: resource.type || 'link',
            position: index
          }))
        }
      },
      include: {
        author: true,
        tags: true,
        insights: {
          orderBy: { position: 'asc' }
        },
        resources: {
          orderBy: { position: 'asc' }
        }
      }
    })

    res.status(201).json(formatArticleResponse(article))
  } catch (error) {
    console.error('Error creating news article:', error)
    res.status(500).json({ error: 'Failed to create news article' })
  }
})

// Update news article
router.put('/:id', [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('summary').optional().notEmpty().withMessage('Summary cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  body('showcaseSection').optional().isIn(['featured', 'mosaic', 'loop', 'none'])
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const {
      type,
      category,
      title,
      summary,
      content,
      showcaseSection,
      isVisible,
      position,
      date,
      displayDate,
      imageUrl,
      imageAlt,
      tags,
      insights,
      resources
    } = req.body

    // Build update data
    const updateData = {}
    if (type !== undefined) updateData.type = type
    if (category !== undefined) updateData.category = category
    if (title !== undefined) updateData.title = title
    if (summary !== undefined) updateData.summary = summary
    if (content !== undefined) updateData.content = content
    if (showcaseSection !== undefined) updateData.showcaseSection = showcaseSection
    if (isVisible !== undefined) updateData.isVisible = isVisible
    if (position !== undefined) updateData.position = position
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl
  if (imageAlt !== undefined) updateData.imageAlt = imageAlt
  if (date !== undefined) updateData.date = new Date(date)
  if (displayDate !== undefined) updateData.displayDate = displayDate

    // Handle tags update
    if (tags !== undefined) {
      let tagConnections = { set: [] }
      if (Array.isArray(tags) && tags.length > 0) {
        const existingTags = await prisma.tag.findMany({ where: { name: { in: tags } } })
        const existing = existingTags.map(t => t.name)
        if (existing.length > 0) {
          tagConnections.connect = existing.map(name => ({ name }))
        }
      }
      updateData.tags = tagConnections
    }

    // Handle insights update
    if (insights !== undefined) {
      updateData.insights = {
        deleteMany: {}, // Remove all existing insights
        create: insights.map((insight, index) => ({
          content: insight,
          position: index
        }))
      }
    }

    // Handle resources update
    if (resources !== undefined) {
      updateData.resources = {
        deleteMany: {}, // Remove all existing resources
        create: resources.map((resource, index) => ({
          title: resource.title,
          description: resource.description,
          url: resource.url,
          type: resource.type || 'link',
          position: index
        }))
      }
    }

    const article = await prisma.newsArticle.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        author: true,
        tags: true,
        insights: {
          orderBy: { position: 'asc' }
        },
        resources: {
          orderBy: { position: 'asc' }
        }
      }
    })

    res.json(formatArticleResponse(article))
  } catch (error) {
    console.error('Error updating news article:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Article not found' })
    }
    res.status(500).json({ error: 'Failed to update news article' })
  }
})

// Delete news article
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.newsArticle.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Article deleted successfully' })
  } catch (error) {
    console.error('Error deleting news article:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Article not found' })
    }
    res.status(500).json({ error: 'Failed to delete news article' })
  }
})

// Bulk reorder articles
router.put('/reorder', [
  body('articles').isArray().withMessage('Articles must be an array'),
  body('articles.*.id').isInt().withMessage('Article ID must be an integer'),
  body('articles.*.position').isInt().withMessage('Position must be an integer')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { articles } = req.body

    // Update positions in transaction
    await prisma.$transaction(
      articles.map(article =>
        prisma.newsArticle.update({
          where: { id: article.id },
          data: { position: article.position }
        })
      )
    )

    res.json({ message: 'Articles reordered successfully' })
  } catch (error) {
    console.error('Error reordering articles:', error)
    res.status(500).json({ error: 'Failed to reorder articles' })
  }
})

// Helper function to format article response
function formatArticleResponse(article) {
  return {
    id: article.id,
    type: article.type,
    category: article.category,
    title: article.title,
    summary: article.summary,
    content: article.content,
    showcaseSection: article.showcaseSection,
    isVisible: article.isVisible,
    position: article.position,
    date: article.date.toISOString().split('T')[0],
    displayDate: article.displayDate || null,
    lastUpdated: article.lastUpdated.toISOString().split('T')[0],
    views: article.views,
    image: article.imageUrl ? {
      url: article.imageUrl,
      alt: article.imageAlt || ''
    } : null,
    author: {
      id: article.author.id,
      name: article.author.name,
      role: article.author.role,
      avatar: article.author.avatar
    },
    tags: article.tags.map(tag => tag.name),
    insights: article.insights.map(insight => insight.content),
    resources: article.resources.map(resource => ({
      title: resource.title,
      description: resource.description,
      url: resource.url,
      type: resource.type
    }))
  }
}

export default router
