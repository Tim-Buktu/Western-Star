import express from 'express'
import { body, validationResult } from 'express-validator'
import prisma from '../lib/prisma.js'

const router = express.Router()

// Migration endpoint to transfer localStorage data to database
router.post('/from-localstorage', [
  body('cmsData').isObject().withMessage('CMS data must be an object')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { cmsData } = req.body
    const migrationResults = {
      success: true,
      migrated: {
        site: 0,
        hero: 0,
        tags: 0,
        authors: 0,
        trendingTopics: 0,
        topics: 0,
        navigation: 0,
        testimonials: 0,
        footer: 0,
        newsletters: 0,
        newsArticles: 0
      },
      errors: []
    }

    // Start transaction for all migrations
    await prisma.$transaction(async (prisma) => {
      // 1. Migrate site data
      if (cmsData.site) {
        await prisma.site.deleteMany()
        await prisma.site.create({
          data: {
            title: cmsData.site.title || 'Western Star',
            description: cmsData.site.description || '',
            topBanner: cmsData.site.topBanner || ''
          }
        })
        migrationResults.migrated.site = 1
      }

      // 2. Migrate hero data
      if (cmsData.hero) {
        await prisma.hero.deleteMany()
        await prisma.hero.create({
          data: {
            badgeText: cmsData.hero.badge?.text || '',
            badgeActive: cmsData.hero.badge?.isActive || true,
            title: cmsData.hero.title || '',
            subtitle: cmsData.hero.subtitle || ''
          }
        })
        migrationResults.migrated.hero = 1
      }

      // 3. Migrate tags
      if (cmsData.availableTags) {
        await prisma.tag.deleteMany()
        for (const tag of cmsData.availableTags) {
          await prisma.tag.create({
            data: {
              name: tag.name,
              color: tag.color,
              isActive: tag.isActive
            }
          })
          migrationResults.migrated.tags++
        }
      }

      // 4. Create default authors (extract from news data)
      const authorMap = new Map()
      if (cmsData.news?.items) {
        for (const article of cmsData.news.items) {
          if (article.author && !authorMap.has(article.author.name)) {
            const author = await prisma.author.create({
              data: {
                name: article.author.name,
                role: article.author.role,
                avatar: article.author.avatar,
                bio: article.author.bio || ''
              }
            })
            authorMap.set(article.author.name, author.id)
            migrationResults.migrated.authors++
          }
        }
      }

      // 5. Migrate trending topics
      if (cmsData.trendingTopics?.items) {
        await prisma.trendingTopic.deleteMany()
        for (const [index, topic] of cmsData.trendingTopics.items.entries()) {
          await prisma.trendingTopic.create({
            data: {
              category: topic.category,
              title: topic.title,
              summary: topic.summary,
              date: new Date(topic.date),
              image: topic.image,
              position: index,
              isVisible: true
            }
          })
          migrationResults.migrated.trendingTopics++
        }
      }

      // 6. Migrate topics
      if (cmsData.topics?.items) {
        await prisma.topic.deleteMany()
        for (const [index, topic] of cmsData.topics.items.entries()) {
          await prisma.topic.create({
            data: {
              icon: topic.icon,
              title: topic.title,
              description: topic.description,
              isActive: topic.isActive,
              position: index
            }
          })
          migrationResults.migrated.topics++
        }
      }

      // 7. Migrate navigation
      if (cmsData.navigation?.items) {
        await prisma.navigationItem.deleteMany()
        for (const [index, nav] of cmsData.navigation.items.entries()) {
          await prisma.navigationItem.create({
            data: {
              label: nav.label,
              href: nav.href,
              isVisible: nav.isVisible,
              position: index
            }
          })
          migrationResults.migrated.navigation++
        }
      }

      // 8. Migrate testimonials
      if (cmsData.testimonials?.items) {
        await prisma.testimonial.deleteMany()
        for (const [index, testimonial] of cmsData.testimonials.items.entries()) {
          await prisma.testimonial.create({
            data: {
              name: testimonial.name,
              title: testimonial.title,
              text: testimonial.text,
              isActive: testimonial.isActive,
              position: index
            }
          })
          migrationResults.migrated.testimonials++
        }
      }

      // 9. Migrate footer
      if (cmsData.footer) {
        await prisma.footer.deleteMany()
        await prisma.footer.create({
          data: {
            copyright: cmsData.footer.copyright || ''
          }
        })

        if (cmsData.footer.links) {
          await prisma.footerLink.deleteMany()
          for (const [index, link] of cmsData.footer.links.entries()) {
            await prisma.footerLink.create({
              data: {
                label: link.label,
                href: link.href,
                isVisible: link.isVisible,
                position: index
              }
            })
          }
        }
        migrationResults.migrated.footer = 1
      }

      // 10. Migrate newsletters
      if (cmsData.newsletters?.items) {
        await prisma.newsletter.deleteMany()
        for (const newsletter of cmsData.newsletters.items) {
          const createdNewsletter = await prisma.newsletter.create({
            data: {
              title: newsletter.title,
              keyDiscussion: newsletter.keyDiscussion,
              content: newsletter.content || '',
              newsletterUrl: newsletter.newsletterUrl,
              imageUrl: newsletter.image,
              date: new Date(newsletter.date),
              views: 0
            }
          })

          // Connect tags if they exist
          if (newsletter.tags && newsletter.tags.length > 0) {
            await prisma.newsletter.update({
              where: { id: createdNewsletter.id },
              data: {
                tags: {
                  connect: newsletter.tags.map(tagName => ({ name: tagName }))
                }
              }
            })
          }

          migrationResults.migrated.newsletters++
        }
      }

      // 11. Migrate news articles
      if (cmsData.news?.items) {
        await prisma.newsArticle.deleteMany()
        for (const article of cmsData.news.items) {
          // Get author ID
          const authorId = authorMap.get(article.author?.name) || authorMap.values().next().value

          if (!authorId) {
            migrationResults.errors.push(`No author found for article: ${article.title}`)
            continue
          }

          const createdArticle = await prisma.newsArticle.create({
            data: {
              type: article.type || 'standard',
              category: article.category,
              title: article.title,
              summary: article.summary,
              content: article.content || '',
              showcaseSection: article.showcaseSection || 'none',
              isVisible: article.isVisible !== false,
              position: article.position || 0,
              date: new Date(article.date),
              views: article.views || 0,
              imageUrl: article.image?.url,
              imageAlt: article.image?.alt,
              authorId: authorId
            }
          })

          // Connect tags
          if (article.tags && article.tags.length > 0) {
            await prisma.newsArticle.update({
              where: { id: createdArticle.id },
              data: {
                tags: {
                  connect: article.tags.map(tagName => ({ name: tagName }))
                }
              }
            })
          }

          // Add insights
          if (article.insights && article.insights.length > 0) {
            for (const [index, insight] of article.insights.entries()) {
              await prisma.newsArticleInsight.create({
                data: {
                  newsArticleId: createdArticle.id,
                  content: insight,
                  position: index
                }
              })
            }
          }

          // Add resources
          if (article.resources && article.resources.length > 0) {
            for (const [index, resource] of article.resources.entries()) {
              await prisma.newsArticleResource.create({
                data: {
                  newsArticleId: createdArticle.id,
                  title: resource.title,
                  description: resource.description || '',
                  url: resource.url,
                  type: resource.type || 'link',
                  position: index
                }
              })
            }
          }

          migrationResults.migrated.newsArticles++
        }
      }
    })

    res.json({
      message: 'Migration completed successfully',
      results: migrationResults
    })

  } catch (error) {
    console.error('Migration error:', error)
    res.status(500).json({
      error: 'Migration failed',
      details: error.message
    })
  }
})

// Check migration status
router.get('/status', async (req, res) => {
  try {
    const counts = await Promise.all([
      prisma.site.count(),
      prisma.hero.count(),
      prisma.tag.count(),
      prisma.author.count(),
      prisma.trendingTopic.count(),
      prisma.topic.count(),
      prisma.navigationItem.count(),
      prisma.testimonial.count(),
      prisma.footer.count(),
      prisma.newsletter.count(),
      prisma.newsArticle.count()
    ])

    res.json({
      database: {
        site: counts[0],
        hero: counts[1],
        tags: counts[2],
        authors: counts[3],
        trendingTopics: counts[4],
        topics: counts[5],
        navigation: counts[6],
        testimonials: counts[7],
        footer: counts[8],
        newsletters: counts[9],
        newsArticles: counts[10]
      }
    })
  } catch (error) {
    console.error('Error getting migration status:', error)
    res.status(500).json({ error: 'Failed to get migration status' })
  }
})

export default router
