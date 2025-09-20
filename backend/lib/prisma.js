import { PrismaClient } from '@prisma/client'

// Lazy initialize Prisma to avoid connecting on cold start for routes that don't touch the DB (e.g., /api/health)
function createPrisma() {
  const isDev = process.env.NODE_ENV === 'development'
  return new PrismaClient({
    log: isDev ? ['query', 'info', 'warn', 'error'] : [],
  })
}

export function getPrisma() {
  if (!globalThis.__prisma) {
    globalThis.__prisma = createPrisma()
  }
  return globalThis.__prisma
}

// Export a proxy that instantiates PrismaClient on first property access
const prismaProxy = new Proxy({}, {
  get(_target, prop) {
    const client = getPrisma()
    const value = client[prop]
    return typeof value === 'function' ? value.bind(client) : value
  }
})

export default prismaProxy
