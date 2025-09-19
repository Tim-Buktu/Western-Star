import express from 'express'
import { body, validationResult } from 'express-validator'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Get all authors
router.get('/', async (req, res) => {
  try {
    const authors = await prisma.author.findMany({
      orderBy: { name: 'asc' }
    })

    res.json(authors.map(author => ({
      id: author.id,
      name: author.name,
      role: author.role,
      avatar: author.avatar,
      bio: author.bio
    })))
  } catch (error) {
    console.error('Error fetching authors:', error)
    res.status(500).json({ error: 'Failed to fetch authors' })
  }
})

// Get single author by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const author = await prisma.author.findUnique({
      where: { id: parseInt(id) },
      include: {
        NewsArticle: {
          orderBy: { date: 'desc' },
          take: 10
        }
      }
    })

    if (!author) {
      return res.status(404).json({ error: 'Author not found' })
    }

    res.json({
      id: author.id,
      name: author.name,
      role: author.role,
      avatar: author.avatar,
      bio: author.bio,
      articles: author.NewsArticle.map(article => ({
        id: article.id,
        title: article.title,
        date: article.date.toISOString().split('T')[0]
      }))
    })
  } catch (error) {
    console.error('Error fetching author:', error)
    res.status(500).json({ error: 'Failed to fetch author' })
  }
})

// Create new author
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('role').notEmpty().withMessage('Role is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, role, avatar, bio } = req.body

    const author = await prisma.author.create({
      data: {
        name,
        role,
        avatar,
        bio
      }
    })

    res.status(201).json({
      id: author.id,
      name: author.name,
      role: author.role,
      avatar: author.avatar,
      bio: author.bio
    })
  } catch (error) {
    console.error('Error creating author:', error)
    res.status(500).json({ error: 'Failed to create author' })
  }
})

// Update author
router.put('/:id', [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('role').optional().notEmpty().withMessage('Role cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { name, role, avatar, bio } = req.body

    const updateData = {}
    if (name !== undefined) updateData.name = name
    if (role !== undefined) updateData.role = role
    if (avatar !== undefined) updateData.avatar = avatar
    if (bio !== undefined) updateData.bio = bio

    const author = await prisma.author.update({
      where: { id: parseInt(id) },
      data: updateData
    })

    res.json({
      id: author.id,
      name: author.name,
      role: author.role,
      avatar: author.avatar,
      bio: author.bio
    })
  } catch (error) {
    console.error('Error updating author:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Author not found' })
    }
    res.status(500).json({ error: 'Failed to update author' })
  }
})

// Delete author
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    // Check if author has articles
    const articleCount = await prisma.newsArticle.count({
      where: { authorId: parseInt(id) }
    })

    if (articleCount > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete author with existing articles. Please reassign articles first.' 
      })
    }

    await prisma.author.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Author deleted successfully' })
  } catch (error) {
    console.error('Error deleting author:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Author not found' })
    }
    res.status(500).json({ error: 'Failed to delete author' })
  }
})

export default router
