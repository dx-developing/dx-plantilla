import type { Project, Session } from './types'

const projectKey = 'dexyn-projects'
const sessionKey = 'dexyn-session'

export const defaultSections = (): Project['sections'] => [
  { id: 'hero', type: 'hero', label: 'Hero principal', enabled: true, variant: 'split', variants: ['split', 'centered', 'minimal', 'fullscreen'] },
  { id: 'services', type: 'services', label: 'Servicios', enabled: true, variant: 'cards', variants: ['cards', 'list', 'featured'] },
  { id: 'about', type: 'about', label: 'Sobre el negocio', enabled: true, variant: 'image-left', variants: ['image-left', 'image-right', 'text-only'] },
  { id: 'gallery', type: 'gallery', label: 'Galería', enabled: true, variant: 'grid', variants: ['grid', 'masonry', 'carousel'] },
  { id: 'testimonials', type: 'testimonials', label: 'Testimonios', enabled: true, variant: 'grid', variants: ['grid', 'featured', 'quotes'] },
  { id: 'pricing', type: 'pricing', label: 'Precios', enabled: false, variant: 'cards', variants: ['cards', 'comparison', 'featured'] },
  { id: 'faq', type: 'faq', label: 'Preguntas frecuentes', enabled: true, variant: 'accordion', variants: ['accordion', 'columns'] },
  { id: 'contact', type: 'contact', label: 'Contacto', enabled: true, variant: 'split', variants: ['split', 'centered', 'form-only'] },
]

const seedProjects: Project[] = [{
  id: 'lumen-house', name: 'Lumen House', client: 'Lumen House', category: 'Medicina estética', status: 'published', updatedAt: '2026-09-07T09:30:00.000Z',
  theme: { primary: '#a36948', accent: '#b7cec5', background: '#f5f3ee', text: '#27302e', displayFont: 'Playfair Display' }, sections: defaultSections(),
}, { id: 'north-studio', name: 'North Studio', client: 'North Studio', category: 'Estudio creativo', status: 'draft', updatedAt: '2026-09-06T15:10:00.000Z',
  theme: { primary: '#e8b34f', accent: '#d6e4ff', background: '#f6f7fb', text: '#142033', displayFont: 'DM Sans' }, sections: defaultSections().map((section) => ({ ...section, enabled: section.id !== 'pricing' && section.id !== 'faq' })),
}]

function read<T>(key: string, fallback: T): T { try { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) as T : fallback } catch { return fallback } }
function write<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)) }

export const projectStore = {
  list: () => read(projectKey, seedProjects),
  save: (projects: Project[]) => write(projectKey, projects),
}

export const sessionStore = {
  get: () => read<Session | null>(sessionKey, null),
  save: (session: Session) => write(sessionKey, session),
  clear: () => localStorage.removeItem(sessionKey),
}
