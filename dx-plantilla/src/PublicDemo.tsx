import type { CSSProperties } from 'react'
import './App.css'
import { homepage, type SectionConfig } from './config/site-config'
import { theme } from './themes/theme'
import { Footer } from './components/footer'
import { Hero } from './components/hero'
import { Header } from './components/navigation'
import { About, Contact, FAQ, Gallery, Pricing, Process, Services, Team, Testimonials, Trust } from './components/sections'
import { AnnouncementBar } from './components/announcement'
import { business } from './data/business'
import { createStructuredData } from './config/seo'

const sectionComponents = {
  hero: Hero,
  trust: Trust,
  services: Services,
  about: About,
  gallery: Gallery,
  process: Process,
  team: Team,
  testimonials: Testimonials,
  pricing: Pricing,
  faq: FAQ,
  contact: Contact,
} as const

function renderSection(section: SectionConfig, index: number) {
  const Component = sectionComponents[section.type]
  return <Component key={`${section.type}-${index}`} />
}

function App() {
  const cssVariables = {
    '--theme-background': theme.colors.background,
    '--theme-surface': theme.colors.surface,
    '--theme-text': theme.colors.text,
    '--theme-muted': theme.colors.muted,
    '--theme-primary': theme.colors.primary,
    '--theme-accent': theme.colors.accent,
    '--theme-dark': theme.colors.dark,
    '--theme-card-radius': theme.radius.card,
    '--theme-pill-radius': theme.radius.pill,
    '--theme-display': theme.typography.display,
    '--theme-body': theme.typography.body,
    '--theme-mono': theme.typography.mono,
  } as CSSProperties

  const structuredData = createStructuredData({ name: business.name, description: business.description, phone: business.contact.phone, email: business.contact.email, address: business.contact.address })

  return <div className="app-shell" style={cssVariables}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><AnnouncementBar message="Valoración inicial personalizada · Reserva tu primera visita" href="#contact" /><div className="site-header"><Header /></div><main>{homepage.map(renderSection)}</main><Footer /></div>
}

export default App
