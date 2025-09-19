import express from 'express'
import { body, validationResult } from 'express-validator'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Get all newsletters with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      tags,
      search
    } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)

    let where = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { keyDiscussion: { contains: search, mode: 'insensitive' } }
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

    const [newsletters, total] = await Promise.all([
      prisma.newsletter.findMany({
        where,
        include: {
          tags: true
        },
        orderBy: { date: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.newsletter.count({ where })
    ])

    res.json({
      newsletters: newsletters.map(formatNewsletterResponse),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching newsletters:', error)
    res.status(500).json({ error: 'Failed to fetch newsletters' })
  }
})

// Get single newsletter by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const newsletter = await prisma.newsletter.findUnique({
      where: { id: parseInt(id) },
      include: {
        tags: true
      }
    })

    if (!newsletter) {
      return res.status(404).json({ error: 'Newsletter not found' })
    }

    // Increment view count
    await prisma.newsletter.update({
      where: { id: parseInt(id) },
      data: { views: { increment: 1 } }
    })

    res.json(formatNewsletterResponse(newsletter))
  } catch (error) {
    console.error('Error fetching newsletter:', error)
    res.status(500).json({ error: 'Failed to fetch newsletter' })
  }
})

// Create new newsletter
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('keyDiscussion').notEmpty().withMessage('Key discussion is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      title,
      keyDiscussion,
      content,
      newsletterUrl,
      imageUrl,
      date,
      displayDate,
      tags = []
    } = req.body

    // Handle tags - only connect tags that exist
    let tagConnections = {}
    if (tags.length > 0) {
      const existingTags = await prisma.tag.findMany({
        where: { name: { in: tags } }
      })
      const existingTagNames = existingTags.map(tag => tag.name)
      
      if (existingTagNames.length > 0) {
        tagConnections = {
          connect: existingTagNames.map(tagName => ({ name: tagName }))
        }
      }
    }

    const newsletter = await prisma.newsletter.create({
      data: {
        title,
        keyDiscussion,
        content,
        newsletterUrl,
        imageUrl,
        date: new Date(date),
        ...(displayDate ? { displayDate } : {}),
        ...(Object.keys(tagConnections).length > 0 && { tags: tagConnections })
      },
      include: {
        tags: true
      }
    })

    res.status(201).json(formatNewsletterResponse(newsletter))
  } catch (error) {
    console.error('Error creating newsletter:', error)
    res.status(500).json({ error: 'Failed to create newsletter' })
  }
})

// Update newsletter
router.put('/:id', [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('keyDiscussion').optional().notEmpty().withMessage('Key discussion cannot be empty'),
  body('date').optional().isISO8601().withMessage('Valid date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const {
      title,
      keyDiscussion,
      content,
      newsletterUrl,
      imageUrl,
      date,
      displayDate,
      tags
    } = req.body

    const updateData = {}
    if (title !== undefined) updateData.title = title
    if (keyDiscussion !== undefined) updateData.keyDiscussion = keyDiscussion
    if (content !== undefined) updateData.content = content
    if (newsletterUrl !== undefined) updateData.newsletterUrl = newsletterUrl
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl
  if (date !== undefined) updateData.date = new Date(date)
  if (displayDate !== undefined) updateData.displayDate = displayDate

    if (tags !== undefined) {
      updateData.tags = {
        set: [], // Remove all existing tags
        connect: tags.map(tagName => ({ name: tagName }))
      }
    }

    const newsletter = await prisma.newsletter.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        tags: true
      }
    })

    res.json(formatNewsletterResponse(newsletter))
  } catch (error) {
    console.error('Error updating newsletter:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Newsletter not found' })
    }
    res.status(500).json({ error: 'Failed to update newsletter' })
  }
})

// Delete newsletter
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.newsletter.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Newsletter deleted successfully' })
  } catch (error) {
    console.error('Error deleting newsletter:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Newsletter not found' })
    }
    res.status(500).json({ error: 'Failed to delete newsletter' })
  }
})

// Helper function to format newsletter response
function formatNewsletterResponse(newsletter) {
  return {
    id: newsletter.id,
    date: newsletter.date.toISOString().split('T')[0],
    displayDate: newsletter.displayDate || null,
    title: newsletter.title,
    keyDiscussion: newsletter.keyDiscussion,
    content: newsletter.content,
    newsletterUrl: newsletter.newsletterUrl,
    image: newsletter.imageUrl,
    views: newsletter.views,
    tags: newsletter.tags.map(tag => tag.name)
  }
}

export default router
