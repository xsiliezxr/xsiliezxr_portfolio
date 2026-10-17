import { getHomeContent } from './home.service.js'

export async function getHome(_req, res, next) {
  try {
    const data = await getHomeContent()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}
