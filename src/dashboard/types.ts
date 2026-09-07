export type ProjectStatus = 'draft' | 'published'

export type BuilderSection = {
  id: string
  type: 'hero' | 'services' | 'about' | 'gallery' | 'testimonials' | 'pricing' | 'faq' | 'contact'
  label: string
  enabled: boolean
  variant: string
  variants?: string[]
}

export type Project = {
  id: string
  name: string
  client: string
  category: string
  status: ProjectStatus
  updatedAt: string
  theme: {
    primary: string
    accent: string
    background: string
    text: string
    displayFont: string
  }
  sections: BuilderSection[]
}

export type Session = {
  name: string
  email: string
  role: 'owner' | 'editor'
}
