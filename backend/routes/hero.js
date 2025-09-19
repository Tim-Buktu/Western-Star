import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Get hero configuration
router.get('/', async (req, res) => {
  try {
    let hero = await prisma.hero.findFirst()
    
    if (!hero) {
      hero = await prisma.hero.create({
        data: {
          badgeText: "Daily or every 2 days",
          badgeActive: true,
          title: "Western Star",
          subtitle: "Your daily dose of insights to navigate the complex market dynamics — technology, business, policy & regulations, investment, and global trends."
        }
      })
    }

    res.json({
      badge: {
        text: hero.badgeText,
        isActive: hero.badgeActive
      },
      title: hero.title,
      subtitle: hero.subtitle
    })
  } catch (error) {
    console.error('Error fetching hero configuration:', error)
    res.status(500).json({ error: 'Failed to fetch hero configuration' })
  }
})

// Update hero configuration
router.put('/', async (req, res) => {
  try {
    const { badge, title, subtitle } = req.body

    let hero = await prisma.hero.findFirst()

    const updateData = {}
    if (badge?.text !== undefined) updateData.badgeText = badge.text
    if (badge?.isActive !== undefined) updateData.badgeActive = badge.isActive
    if (title !== undefined) updateData.title = title
    if (subtitle !== undefined) updateData.subtitle = subtitle

    if (hero) {
      hero = await prisma.hero.update({
        where: { id: hero.id },
        data: updateData
      })
    } else {
      hero = await prisma.hero.create({
        data: {
          badgeText: badge?.text || "",
          badgeActive: badge?.isActive || true,
          title: title || "",
          subtitle: subtitle || ""
        }
      })
    }

    res.json({
      badge: {
        text: hero.badgeText,
        isActive: hero.badgeActive
      },
      title: hero.title,
      subtitle: hero.subtitle
    })
  } catch (error) {
    console.error('Error updating hero configuration:', error)
    res.status(500).json({ error: 'Failed to update hero configuration' })
  }
})

export default router
