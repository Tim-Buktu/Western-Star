import express from 'express'
import prisma from '../lib/prisma.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

// Get topics
router.get('/', async (req, res) => {
  try {
    const topics = await prisma.topic.findMany({
      where: { isActive: true },
      orderBy: { position: 'asc' }
    })

    res.json({
      title: "What we cover",
      items: topics.map(topic => ({
        id: topic.id,
        icon: topic.icon,
        title: topic.title,
        description: topic.description,
        isActive: topic.isActive
      }))
    })
  } catch (error) {
    console.error('Error fetching topics:', error)
    res.status(500).json({ error: 'Failed to fetch topics' })
  }
})

// Create topic
router.post('/', [
  body('icon').notEmpty().withMessage('Icon is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { icon, title, description, isActive = true } = req.body

    // Get the highest position
    const lastTopic = await prisma.topic.findFirst({
      orderBy: { position: 'desc' }
    })
    const position = lastTopic ? lastTopic.position + 1 : 1

    const topic = await prisma.topic.create({
      data: {
        icon,
        title,
        description,
        isActive,
        position
      }
    })

    res.status(201).json(topic)
  } catch (error) {
    console.error('Error creating topic:', error)
    res.status(500).json({ error: 'Failed to create topic' })
  }
})

// Update topic
router.put('/:id', [
  body('icon').optional().notEmpty().withMessage('Icon cannot be empty'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const updateData = {}

    if (req.body.icon !== undefined) updateData.icon = req.body.icon
    if (req.body.title !== undefined) updateData.title = req.body.title
    if (req.body.description !== undefined) updateData.description = req.body.description
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive
    if (req.body.position !== undefined) updateData.position = req.body.position

    const topic = await prisma.topic.update({
      where: { id: parseInt(id) },
      data: updateData
    })

    res.json(topic)
  } catch (error) {
    console.error('Error updating topic:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Topic not found' })
    }
    res.status(500).json({ error: 'Failed to update topic' })
  }
})

// Delete topic
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.topic.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Topic deleted successfully' })
  } catch (error) {
    console.error('Error deleting topic:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Topic not found' })
    }
    res.status(500).json({ error: 'Failed to delete topic' })
  }
})

export default router
