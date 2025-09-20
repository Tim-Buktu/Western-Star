export default async function handler(req, res) {
  // Minimal, DB-free health check for Vercel serverless to avoid cold-start overhead
  res.setHeader('Content-Type', 'application/json')
  // Allow quick manual checks from any origin; backend CORS still applies for the Express app
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  return res.status(200).json({
    status: 'OK',
    app: 'western-star-backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    serverless: true
  })
}
