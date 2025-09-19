import express from 'express'
import prisma from '../lib/prisma.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

// Get testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { position: 'asc' }
    })

    res.json({
      title: "Built for clarity, not noise",
      subtitle: "Trusted by professionals who need reliable insights to make informed decisions",
      items: testimonials.map(testimonial => ({
        id: testimonial.id,
        name: testimonial.name,
        title: testimonial.title,
        text: testimonial.text,
        isActive: testimonial.isActive
      }))
    })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    res.status(500).json({ error: 'Failed to fetch testimonials' })
  }
})

// Create testimonial
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('text').notEmpty().withMessage('Text is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, title, text, isActive = true } = req.body

    // Get the highest position
    const lastTestimonial = await prisma.testimonial.findFirst({
      orderBy: { position: 'desc' }
    })
    const position = lastTestimonial ? lastTestimonial.position + 1 : 1

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        title,
        text,
        isActive,
        position
      }
    })

    res.status(201).json(testimonial)
  } catch (error) {
    console.error('Error creating testimonial:', error)
    res.status(500).json({ error: 'Failed to create testimonial' })
  }
})

// Update testimonial
router.put('/:id', [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('text').optional().notEmpty().withMessage('Text cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const updateData = {}

    if (req.body.name !== undefined) updateData.name = req.body.name
    if (req.body.title !== undefined) updateData.title = req.body.title
    if (req.body.text !== undefined) updateData.text = req.body.text
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive
    if (req.body.position !== undefined) updateData.position = req.body.position

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: updateData
    })

    res.json(testimonial)
  } catch (error) {
    console.error('Error updating testimonial:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    res.status(500).json({ error: 'Failed to update testimonial' })
  }
})

// Delete testimonial
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.testimonial.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    res.status(500).json({ error: 'Failed to delete testimonial' })
  }
})

export default router
