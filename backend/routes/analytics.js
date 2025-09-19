import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Get analytics data
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalArticles,
      totalNewsletters,
      totalViews,
      recentArticles,
      popularTags
    ] = await Promise.all([
      prisma.newsArticle.count(),
      prisma.newsletter.count(),
      prisma.newsArticle.aggregate({
        _sum: { views: true }
      }),
      prisma.newsArticle.findMany({
        take: 5,
        orderBy: { date: 'desc' },
        select: {
          id: true,
          title: true,
          views: true,
          date: true
        }
      }),
      prisma.tag.findMany({
        include: {
          newsArticles: {
            select: { id: true }
          }
        },
        orderBy: { name: 'asc' }
      })
    ])

    res.json({
      summary: {
        totalArticles,
        totalNewsletters,
        totalViews: totalViews._sum.views || 0
      },
      recentArticles,
      popularTags: popularTags.map(tag => ({
        name: tag.name,
        count: tag.newsArticles.length
      })).sort((a, b) => b.count - a.count).slice(0, 10)
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    res.status(500).json({ error: 'Failed to fetch analytics' })
  }
})

export default router
