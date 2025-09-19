import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Get navigation items
router.get('/', async (req, res) => {
  try {
    const items = await prisma.navigationItem.findMany({
      where: { isVisible: true },
      orderBy: { position: 'asc' }
    })

    res.json({
      items: items.map(item => ({
        id: item.id,
        label: item.label,
        href: item.href,
        isVisible: item.isVisible
      }))
    })
  } catch (error) {
    console.error('Error fetching navigation:', error)
    res.status(500).json({ error: 'Failed to fetch navigation' })
  }
})

export default router
