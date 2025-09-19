import express from 'express'
import { body, validationResult } from 'express-validator'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' }
    })

    res.json(tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
      isActive: tag.isActive
    })))
  } catch (error) {
    console.error('Error fetching tags:', error)
    res.status(500).json({ error: 'Failed to fetch tags' })
  }
})

// Get single tag by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const tag = await prisma.tag.findUnique({
      where: { id: parseInt(id) }
    })

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' })
    }

    res.json({
      id: tag.id,
      name: tag.name,
      color: tag.color,
      isActive: tag.isActive
    })
  } catch (error) {
    console.error('Error fetching tag:', error)
    res.status(500).json({ error: 'Failed to fetch tag' })
  }
})

// Create new tag
router.post('/', [
  body('name').notEmpty().withMessage('Tag name is required'),
  body('color').notEmpty().withMessage('Color is required'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, color, isActive = true } = req.body

    const tag = await prisma.tag.create({
      data: {
        name: name.toUpperCase(),
        color,
        isActive
      }
    })

    res.status(201).json({
      id: tag.id,
      name: tag.name,
      color: tag.color,
      isActive: tag.isActive
    })
  } catch (error) {
    console.error('Error creating tag:', error)
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Tag name already exists' })
    }
    res.status(500).json({ error: 'Failed to create tag' })
  }
})

// Update tag
router.put('/:id', [
  body('name').optional().notEmpty().withMessage('Tag name cannot be empty'),
  body('color').optional().notEmpty().withMessage('Color cannot be empty'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { name, color, isActive } = req.body

    const updateData = {}
    if (name !== undefined) updateData.name = name.toUpperCase()
    if (color !== undefined) updateData.color = color
    if (isActive !== undefined) updateData.isActive = isActive

    const tag = await prisma.tag.update({
      where: { id: parseInt(id) },
      data: updateData
    })

    res.json({
      id: tag.id,
      name: tag.name,
      color: tag.color,
      isActive: tag.isActive
    })
  } catch (error) {
    console.error('Error updating tag:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Tag not found' })
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Tag name already exists' })
    }
    res.status(500).json({ error: 'Failed to update tag' })
  }
})

// Delete tag
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.tag.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Tag deleted successfully' })
  } catch (error) {
    console.error('Error deleting tag:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Tag not found' })
    }
    res.status(500).json({ error: 'Failed to delete tag' })
  }
})

export default router
