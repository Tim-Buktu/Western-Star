import express from 'express'
import prisma from '../lib/prisma.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

// Get trending topics
router.get('/', async (req, res) => {
  try {
    const { isVisible } = req.query

    let where = {}
    if (isVisible !== undefined) {
      where.isVisible = isVisible === 'true'
    }

    const topics = await prisma.trendingTopic.findMany({
      where,
      orderBy: { position: 'asc' }
    })

    res.json({
      title: "Breaking News",
      isVisible: true,
      headlines: topics.slice(0, 5).map(topic => topic.title),
      items: topics.map(topic => ({
        id: topic.id,
        category: topic.category,
        title: topic.title,
        summary: topic.summary,
        description: topic.summary,
        source: topic.source || undefined,
        date: topic.date.toISOString().split('T')[0],
        image: topic.image,
        tags: []
      }))
    })
  } catch (error) {
    console.error('Error fetching trending topics:', error)
    res.status(500).json({ error: 'Failed to fetch trending topics' })
  }
})

// Create trending topic
router.post('/', [
  body('category').notEmpty().withMessage('Category is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('summary').notEmpty().withMessage('Summary is required'),
  body('date').isISO8601().withMessage('Valid date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { category, title, summary, date, image, isVisible = true } = req.body

    // Get the highest position
    const lastTopic = await prisma.trendingTopic.findFirst({
      orderBy: { position: 'desc' }
    })
    const position = lastTopic ? lastTopic.position + 1 : 1

    const trendingTopic = await prisma.trendingTopic.create({
      data: {
        category,
        title,
        summary,
        date: new Date(date),
        image: image || '/api/placeholder/trending-topic',
        isVisible,
        position
      }
    })

    res.status(201).json(trendingTopic)
  } catch (error) {
    console.error('Error creating trending topic:', error)
    res.status(500).json({ error: 'Failed to create trending topic' })
  }
})

// Update trending topic
router.put('/:id', [
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('summary').optional().notEmpty().withMessage('Summary cannot be empty'),
  body('date').optional().isISO8601().withMessage('Valid date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const updateData = {}

    if (req.body.category !== undefined) updateData.category = req.body.category
    if (req.body.title !== undefined) updateData.title = req.body.title
    if (req.body.summary !== undefined) updateData.summary = req.body.summary
    if (req.body.date !== undefined) updateData.date = new Date(req.body.date)
    if (req.body.image !== undefined) updateData.image = req.body.image
    if (req.body.isVisible !== undefined) updateData.isVisible = req.body.isVisible
    if (req.body.position !== undefined) updateData.position = req.body.position

    const trendingTopic = await prisma.trendingTopic.update({
      where: { id: parseInt(id) },
      data: updateData
    })

    res.json(trendingTopic)
  } catch (error) {
    console.error('Error updating trending topic:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Trending topic not found' })
    }
    res.status(500).json({ error: 'Failed to update trending topic' })
  }
})

// Delete trending topic
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.trendingTopic.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Trending topic deleted successfully' })
  } catch (error) {
    console.error('Error deleting trending topic:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Trending topic not found' })
    }
    res.status(500).json({ error: 'Failed to delete trending topic' })
  }
})

export default router
