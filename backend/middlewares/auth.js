import jwt from 'jsonwebtoken'
import { env } from '../configs/env.js'

export function requireAuth(req, res, next) {
  const header = req.get('authorization')

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = header.slice('Bearer '.length)

  try {
    req.user = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ['HS256'],
    })
    return next()
  } catch {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
