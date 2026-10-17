import { nav } from '../../../frontend/src/features/home/content/journey.content.js'
import { SITE_LINKS } from '../../../frontend/src/shared/siteNav.js'

export const sitePages = SITE_LINKS
export const publicFloors = nav.filter((floor) => floor.id !== 'secret')
