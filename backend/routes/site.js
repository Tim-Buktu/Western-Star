import express from 'express'
import { body, validationResult } from 'express-validator'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Get site configuration
router.get('/', async (req, res) => {
  try {
    let site = await prisma.site.findFirst()
    
    if (!site) {
      // Create default site configuration
      site = await prisma.site.create({
        data: {
          title: "Western Star",
          description: "Your daily dose of insights to navigate the complex market dynamics — technology, business, policy & regulations, investment, and global trends.",
          topBanner: "Indonesia. Tech. Business. Policy. Investment. Global Signals."
        }
      })
    }

    res.json({
      title: site.title,
      description: site.description,
      topBanner: site.topBanner
    })
  } catch (error) {
    console.error('Error fetching site configuration:', error)
    res.status(500).json({ error: 'Failed to fetch site configuration' })
  }
})

// Update site configuration
router.put('/', [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('topBanner').optional().notEmpty().withMessage('Top banner cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, description, topBanner } = req.body

    let site = await prisma.site.findFirst()

    const updateData = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (topBanner !== undefined) updateData.topBanner = topBanner

    if (site) {
      site = await prisma.site.update({
        where: { id: site.id },
        data: updateData
      })
    } else {
      site = await prisma.site.create({
        data: {
          title: title || "Western Star",
          description: description || "",
          topBanner: topBanner || ""
        }
      })
    }

    res.json({
      title: site.title,
      description: site.description,
      topBanner: site.topBanner
    })
  } catch (error) {
    console.error('Error updating site configuration:', error)
    res.status(500).json({ error: 'Failed to update site configuration' })
  }
})

export default router
