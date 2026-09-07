import type { Project } from '../dashboard/types'

export function projectPublicPath(project: Project) {
  return `/site/${encodeURIComponent(project.id)}`
}

export function findPublishedProject(projects: Project[], id: string) {
  return projects.find((project) => project.id === decodeURIComponent(id) && project.status === 'published') ?? null
}