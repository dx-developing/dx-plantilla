import type { Project } from '../dashboard/types'
import { isSupabaseConfigured, supabase } from './supabase'

type ProjectRow = { id: string; name: string; client: string; category: string; status: Project['status']; updated_at: string; theme: Project['theme']; sections: Project['sections'] }

async function getOrganizationId() {
  if (!supabase) return null
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData.user) return null
  const { data, error } = await supabase.from('organization_members').select('organization_id').eq('user_id', userData.user.id).limit(1).single()
  if (error) throw error
  return data.organization_id as string
}

function fromRow(row: ProjectRow): Project { return { id: row.id, name: row.name, client: row.client, category: row.category, status: row.status, updatedAt: row.updated_at, theme: row.theme, sections: row.sections } }

export async function listRemoteProjects(): Promise<Project[] | null> {
  if (!isSupabaseConfigured || !supabase) return null
  const { data, error } = await supabase.from('projects').select('id,name,client,category,status,updated_at,theme,sections').order('updated_at', { ascending: false })
  if (error) throw error
  return (data as ProjectRow[]).map(fromRow)
}

export async function upsertRemoteProject(project: Project): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return
  const organizationId = await getOrganizationId()
  if (!organizationId) throw new Error('No organization found for the authenticated user')
  const { error } = await supabase.from('projects').upsert({ id: project.id, organization_id: organizationId, name: project.name, client: project.client, category: project.category, status: project.status, updated_at: project.updatedAt, theme: project.theme, sections: project.sections })
  if (error) throw error
}

export async function getPublishedProject(id: string): Promise<Project | null> {
  if (!isSupabaseConfigured || !supabase) return null
  const { data, error } = await supabase.from('projects').select('id,name,client,category,status,updated_at,theme,sections').eq('id', id).eq('status', 'published').maybeSingle()
  if (error) throw error
  return data ? fromRow(data as ProjectRow) : null
}