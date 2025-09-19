import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Get footer configuration
router.get('/', async (req, res) => {
  try {
    const [footer, links] = await Promise.all([
      prisma.footer.findFirst(),
      prisma.footerLink.findMany({
        where: { isVisible: true },
        orderBy: { position: 'asc' }
      })
    ])

    res.json({
      links: links.map(link => ({
        id: link.id,
        label: link.label,
        href: link.href,
        isVisible: link.isVisible
      })),
      copyright: footer?.copyright || "Western Star. All rights reserved."
    })
  } catch (error) {
    console.error('Error fetching footer:', error)
    res.status(500).json({ error: 'Failed to fetch footer' })
  }
})

export default router
