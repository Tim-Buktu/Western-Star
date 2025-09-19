/*
  Verification script to compare content between two PostgreSQL databases using Prisma.
  Usage:
    SOURCE_DB_URL=postgres://... TARGET_DB_URL=postgres://... node scripts/verify-db.js
    # Single DB mode (prints stats):
    SOURCE_DB_URL=postgres://... node scripts/verify-db.js
*/

import { PrismaClient } from '@prisma/client'

function makeClient(url) {
  if (!url) return null
  return new PrismaClient({ datasources: { db: { url } } })
}

async function getStats(prisma) {
  const [
    tags,
    authors,
    newsCount,
    newslettersCount,
    insightsCount,
    resourcesCount,
  ] = await Promise.all([
    prisma.tag.findMany({ select: { id: true, name: true } }),
    prisma.author.findMany({ select: { id: true, name: true } }),
    prisma.newsArticle.count(),
    prisma.newsletter.count(),
    prisma.newsArticleInsight.count(),
    prisma.newsArticleResource.count(),
  ])

  const topNews = await prisma.newsArticle.findMany({
    orderBy: { date: 'desc' },
    take: 5,
    select: {
      id: true,
      title: true,
      date: true,
      tags: { select: { name: true } },
    },
  })

  const topNewsletters = await prisma.newsletter.findMany({
    orderBy: { date: 'desc' },
    take: 5,
    select: { id: true, title: true, date: true },
  })

  return {
    counts: {
      tags: tags.length,
      authors: authors.length,
      news: newsCount,
      newsletters: newslettersCount,
      insights: insightsCount,
      resources: resourcesCount,
    },
    sample: {
      topNews,
      topNewsletters,
      tagNames: tags.map(t => t.name).sort().slice(0, 10),
      authorNames: authors.map(a => a.name).sort().slice(0, 10),
    }
  }
}

function formatTitleList(items) {
  return items.map(i => `- ${i.title} (${new Date(i.date).toISOString().slice(0,10)})`).join('\n')
}

async function main() {
  const sourceUrl = process.env.SOURCE_DB_URL
  const targetUrl = process.env.TARGET_DB_URL

  if (!sourceUrl && !targetUrl) {
    console.error('Please provide at least SOURCE_DB_URL env. Optionally add TARGET_DB_URL to compare.')
    process.exit(1)
  }

  const source = makeClient(sourceUrl)
  const target = makeClient(targetUrl)

  try {
    if (source && target) {
      console.log('Comparing databases...')
      const [srcStats, tgtStats] = await Promise.all([getStats(source), getStats(target)])

      console.log('\nCounts:')
      for (const k of Object.keys(srcStats.counts)) {
        const s = srcStats.counts[k]
        const t = tgtStats.counts[k]
        const emoji = s === t ? '✅' : '⚠️'
        console.log(`  ${emoji} ${k}: source=${s} target=${t}`)
      }

      console.log('\nTop 5 News (source):')
      console.log(formatTitleList(srcStats.sample.topNews))
      console.log('\nTop 5 News (target):')
      console.log(formatTitleList(tgtStats.sample.topNews))

      console.log('\nTop 5 Newsletters (source):')
      console.log(formatTitleList(srcStats.sample.topNewsletters))
      console.log('\nTop 5 Newsletters (target):')
      console.log(formatTitleList(tgtStats.sample.topNewsletters))

      // Simple diff by title+date for news (only sample top 50 for speed)
      const srcTop50 = srcStats.sample.topNews
      const tgtTop50 = tgtStats.sample.topNews
      const key = i => `${i.title}__${new Date(i.date).toISOString().slice(0,10)}`
      const tgtSet = new Set(tgtTop50.map(key))
      const missingInTarget = srcTop50.filter(i => !tgtSet.has(key(i)))
      if (missingInTarget.length) {
        console.log(`\n🧩 Sample differences (source news not in target sample): ${missingInTarget.length}`)
        console.log(formatTitleList(missingInTarget.slice(0, 5)))
      }

      console.log('\nTag samples (source vs target):')
      console.log('  source:', srcStats.sample.tagNames.join(', '))
      console.log('  target:', tgtStats.sample.tagNames.join(', '))

      console.log('\nAuthor samples (source vs target):')
      console.log('  source:', srcStats.sample.authorNames.join(', '))
      console.log('  target:', tgtStats.sample.authorNames.join(', '))

      console.log('\nDone.')
    } else {
      const one = source || target
      const stats = await getStats(one)
      console.log('Database stats:')
      console.log(JSON.stringify(stats, null, 2))
    }
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  } finally {
    await Promise.all([source?.$disconnect?.(), target?.$disconnect?.()])
  }
}

main()
