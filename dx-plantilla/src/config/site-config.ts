export type SectionConfig =
  | { type: 'hero' }
  | { type: 'trust' }
  | { type: 'services' }
  | { type: 'about' }
  | { type: 'gallery' }
  | { type: 'process' }
  | { type: 'team' }
  | { type: 'testimonials' }
  | { type: 'pricing' }
  | { type: 'faq' }
  | { type: 'contact' }

export type NavigationConfig = {
  label: string
  href: string
}

export const navigation: NavigationConfig[] = [
  { label: 'Tratamientos', href: '#services' },
  { label: 'Nuestra mirada', href: '#about' },
  { label: 'Equipo', href: '#team' },
  { label: 'Contacto', href: '#contact' },
]

export const homepage: SectionConfig[] = [
  { type: 'hero' },
  { type: 'trust' },
  { type: 'services' },
  { type: 'about' },
  { type: 'gallery' },
  { type: 'process' },
  { type: 'team' },
  { type: 'testimonials' },
  { type: 'pricing' },
  { type: 'faq' },
  { type: 'contact' },
]
