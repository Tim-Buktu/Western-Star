import prisma from '../lib/prisma.js'

async function main() {
  console.log('🌱 Starting database seed...')

  try {
    // Create default tags
    const tags = [
      { name: 'POLICY & REGULATIONS', color: 'blue' },
      { name: 'INTERNATIONAL RELATIONS', color: 'green' },
      { name: 'GLOBAL ECONOMY', color: 'purple' },
      { name: 'TECHNOLOGY', color: 'orange' },
      { name: 'CORPORATE', color: 'indigo' },
      { name: 'CAREER', color: 'yellow' },
      { name: 'FINANCIAL', color: 'pink' },
      { name: 'LIFESTYLE', color: 'cyan' },
      { name: 'INNOVATION', color: 'teal' },
      { name: 'CULTURAL', color: 'red' }
    ]

    for (const tag of tags) {
      await prisma.tag.upsert({
        where: { name: tag.name },
        update: {},
        create: tag
      })
    }

    // Create default author
    const author = await prisma.author.findFirst({
      where: { name: 'Editorial Team' }
    }) || await prisma.author.create({
      data: {
        name: 'Editorial Team',
        role: 'Western Star Editorial',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
      }
    })

    // Create site configuration
    await prisma.site.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: "Western Star",
        description: "Your daily dose of insights to navigate the complex market dynamics — technology, business, policy & regulations, investment, and global trends.",
        topBanner: "Indonesia. Tech. Business. Policy. Investment. Global Signals."
      }
    })

    // Create hero configuration
    await prisma.hero.upsert({
      where: { id: 1 },
      update: {},
      create: {
        badgeText: "Daily or every 2 days",
        badgeActive: true,
        title: "Western Star",
        subtitle: "Your daily dose of insights to navigate the complex market dynamics — technology, business, policy & regulations, investment, and global trends."
      }
    })

    // Create default navigation
    const navItems = [
      { label: 'Research', href: '/research', position: 0 },
      { label: 'News', href: '/news', position: 1 },
      { label: 'Newsletter', href: '/newsroom', position: 2 }
    ]

    for (const nav of navItems) {
      const existing = await prisma.navigationItem.findFirst({
        where: { href: nav.href }
      })
      if (!existing) {
        await prisma.navigationItem.create({
          data: nav
        })
      }
    }

    // Create default topics
    const topics = [
      {
        icon: "TrendingUp",
        title: "Tech & Business",
        description: "Signals from Indonesia's tech and enterprise landscape you can act on.",
        position: 0
      },
      {
        icon: "Scale",
        title: "Policy & Regulation",
        description: "Clarity on rules, incentives, and compliance that shift markets.",
        position: 1
      },
      {
        icon: "Landmark",
        title: "Investment",
        description: "Deal flow, sectors in motion, and capital allocators' playbooks.",
        position: 2
      },
      {
        icon: "Globe",
        title: "Global Dynamics",
        description: "How macro currents and geopolitics ripple through Indonesia.",
        position: 3
      }
    ]

    for (const topic of topics) {
      const existing = await prisma.topic.findFirst({
        where: { title: topic.title }
      })
      if (!existing) {
        await prisma.topic.create({
          data: topic
        })
      }
    }

    console.log('✅ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
