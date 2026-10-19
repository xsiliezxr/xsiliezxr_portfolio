import { resolveAsset } from '../../shared/lib/resolveAsset.js'
import {
  ARCHIVE_FILTERS,
  projects as projectRecords,
  projectsLead,
} from './projects.list.js'

const images = import.meta.glob('../../assets/images/projects/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})

export { ARCHIVE_FILTERS, projectsLead }

export const projects = projectRecords.map((project) => ({
  ...project,
  src: resolveAsset(images, project.image),
}))

export const featuredProjects = projects.filter((project) => project.featured)
export const archiveProjects = projects.filter((project) => !project.featured)
