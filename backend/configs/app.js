import express from 'express'
import { corsMiddleware } from '../middlewares/cors.js'
import { errorHandler } from '../middlewares/error-handler.js'
import { rateLimitMiddleware } from '../middlewares/rate-limit.js'
import { securityHeaders } from '../middlewares/security-headers.js'
import { chatRoutes } from '../src/chat/chat.routes.js'
import { homeRoutes } from '../src/home/home.routes.js'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(securityHeaders)
  app.use(corsMiddleware)
  app.use(rateLimitMiddleware)
  app.use(express.json({ limit: '16kb' }))

  app.use('/api/home', homeRoutes)
  app.use('/api/chat', chatRoutes)

  app.use(errorHandler)

  return app
}
