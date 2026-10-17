import { Router } from 'express'
import { getHome } from './home.controller.js'

export const homeRoutes = Router()

homeRoutes.get('/', getHome)
