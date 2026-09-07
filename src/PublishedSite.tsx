import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import type { Project } from './dashboard/types'
import { projectStore } from './dashboard/store'
import { findPublishedProject } from './lib/project-public'
import { getPublishedProject } from './lib/supabase-repository'
import { isSupabaseConfigured } from './lib/supabase'
import './published-site.css'

function SectionPreview({ label, variant, primary, accent }: { label: string; variant: string; primary: string; accent: string }) {
  return <section className={`published-section published-${variant}`}><div className="published-section-marker" style={{ background: primary }} /><div><span className="published-section-index" style={{ color: primary }}>0{label.length % 9 + 1}</span><h2>{label}</h2><p>Una experiencia diseñada para comunicar con claridad y convertir cada visita en una relación duradera.</p></div><div className="published-section-art" style={{ background: accent }}><span>{variant}</span></div></section>
}

function PublishedPage({ project }: { project: Project }) {
  const style = {
    '--published-bg': project.theme.background,
    '--published-text': project.theme.text,
    '--published-primary': project.theme.primary,
    '--published-accent': project.theme.accent,
    '--published-font': `'${project.theme.displayFont}', sans-serif`,
  } as CSSProperties
  const hero = project.sections.find((section) => section.type === 'hero')
  const sections = project.sections.filter((section) => section.enabled && section.type !== 'hero')

  return <main className="published-site" style={style}><header className="published-nav"><a href="#top" className="published-brand">{project.client}</a><nav><a href="#about">Sobre nosotros</a><a href="#services">Servicios</a><a href="#contact">Contacto</a></nav><a className="published-nav-cta" href="#contact">Hablemos</a></header><section className={`published-hero published-hero-${hero?.variant ?? 'split'}`} id="top"><div className="published-hero-copy"><span className="published-eyebrow">{project.category} / {hero?.variant ?? 'split'}</span><h1>{project.name} crea espacios con intención.</h1><p>Una presencia digital clara, memorable y diseñada para que tu marca avance.</p><a className="published-cta" href="#contact" style={{ background: project.theme.primary }}>Descubrir proyecto <span>↗</span></a></div><div className="published-hero-shape" style={{ background: project.theme.accent }}><span style={{ color: project.theme.primary }}>{project.client.slice(0, 1)}</span></div></section><div className="published-sections">{sections.map((section) => <div id={section.id} key={section.id}><SectionPreview label={section.label} variant={section.variant} primary={project.theme.primary} accent={project.theme.accent} /></div>)}</div><footer className="published-footer" id="contact"><div><span className="published-eyebrow">{project.category}</span><h2>¿Hacemos algo memorable?</h2></div><a className="published-cta" href={`mailto:hello@example.com`} style={{ background: project.theme.primary }}>Contactar <span>↗</span></a><small>© {new Date().getFullYear()} {project.client}. Published with Dexyn.</small></footer></main>
}

export default function PublishedSite({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<Project | null>(() => findPublishedProject(projectStore.list(), projectId))
  const [loading, setLoading] = useState(!project && isSupabaseConfigured)
  useEffect(() => {
    if (project || !isSupabaseConfigured) return
    getPublishedProject(projectId).then((remoteProject) => setProject(remoteProject)).catch(() => setProject(null)).finally(() => setLoading(false))
  }, [project, projectId])
  if (loading) return <main className="published-not-found"><span>LOADING</span><h1>Cargando sitio...</h1></main>
  if (!project) return <main className="published-not-found"><span>404</span><h1>Este sitio todavía no está publicado.</h1><p>Comprueba la URL o publica el proyecto desde tu workspace.</p><a href="/dashboard">Volver al workspace</a></main>
  return <PublishedPage project={project} />
}