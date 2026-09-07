import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, ChevronDown, Clock3, Instagram, Leaf, Mail, MapPin, Menu, Phone, Sparkles, Sun, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { business } from '../../data/business'
import { navigation } from '../../config/site-config'
import { ServiceCard } from '../cards/business-cards'
import { PricingGrid } from '../pricing'
import { TestimonialGrid } from '../testimonials'
import { Button, Container, Field, Section, SectionHeading, TextareaField } from '../ui/primitives'

const serviceIcons: Record<string, LucideIcon> = { sparkles: Sparkles, leaf: Leaf, sun: Sun }

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <header className="container header" aria-label="Navegación principal">
    <a className="brand" href="#top" onClick={close}><span className="brand-mark">L</span>{business.shortName}</a>
    <nav className={`nav-links${open ? ' is-open' : ''}`}>
      {navigation.map((item) => <a className="nav-link" href={item.href} onClick={close} key={item.href}>{item.label}</a>)}
    </nav>
    <Button href="#contact">Reservar cita <ArrowUpRight size={15} /></Button>
    <button className="mobile-toggle" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
  </header>
}

export function Hero() {
  return <section className="hero" id="top"><Container><div className="hero-grid">
    <div><span className="eyebrow">{business.category}</span><h1 className="display hero-title">{business.tagline}</h1><p className="hero-copy">{business.description}</p><div className="hero-actions"><Button href="#contact">Encuentra tu ritual <ArrowUpRight size={15} /></Button><Button variant="ghost" href="#services">Explorar tratamientos</Button></div></div>
    <div className="hero-art"><img src={business.hero.image} alt="Interior luminoso de Lumen House" /><div className="hero-note"><strong>01 / 03</strong><span>{business.hero.note}</span></div></div>
  </div></Container></section>
}

export function Trust() {
  return <div className="trust-strip" aria-label="Principios de Lumen"><Container><div className="trust-inner"><span className="eyebrow">{business.trust.eyebrow}</span><div className="trust-logos">{business.trust.labels.map((label) => <span key={label}>{label}</span>)}</div></div></Container></div>
}

export function Services() {
  return <Section id="services"><Container><SectionHeading eyebrow="Nuestros tratamientos" title="La precisión también puede sentirse suave." description="Diseñamos cada protocolo alrededor de tu piel, tu ritmo y tus objetivos. Sin fórmulas universales." /><div className="services-grid">{business.services.map((service) => { const Icon = serviceIcons[service.icon]; return <ServiceCard key={service.title} service={service} icon={<Icon size={19} strokeWidth={1.6} />} /> })}</div></Container></Section>
}

export function About() {
  return <Section className="soft-section" id="about"><Container><div className="split-grid"><div className="portrait"><img src={business.about.image} alt="Detalle de un tratamiento facial en Lumen House" loading="lazy" /></div><div className="about-copy"><span className="eyebrow">{business.about.eyebrow}</span><h2>{business.about.title}</h2><p>{business.about.body}</p><div className="stats">{business.stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div></div></Container></Section>
}

export function Gallery() {
  return <Section id="gallery"><Container><SectionHeading eyebrow="El espacio" title="Un lugar para volver a escucharte." description="Texturas naturales, luz tranquila y el tiempo que necesitas para sentirte bien atendida." /><div className="gallery-grid"><div className="gallery-item gallery-large"><img src={business.gallery[0]} alt="Sala de tratamientos de Lumen House" loading="lazy" /></div><div className="gallery-item"><img src={business.gallery[1]} alt="Detalle de cosmética en Lumen House" loading="lazy" /></div><div className="gallery-item"><img src={business.gallery[2]} alt="Rincón de descanso de Lumen House" loading="lazy" /></div></div></Container></Section>
}

export function Process() {
  return <Section className="soft-section"><Container><SectionHeading eyebrow="Así trabajamos" title="Cuidarte también puede ser sencillo." /><div className="process-grid">{business.process.map((step) => <article className="process-item" key={step.number}><span className="process-number">{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></Container></Section>
}

export function Team() {
  return <Section id="team"><Container><SectionHeading eyebrow="Las personas detrás" title="Criterio médico. Mirada humana." /><div className="team-card"><img src={business.team.image} alt={business.team.name} loading="lazy" /><div><span className="eyebrow">{business.team.role}</span><h3>{business.team.name}</h3><p>{business.team.bio}</p><Button variant="ghost" href="#contact">Conocer Lumen <ArrowUpRight size={15} /></Button></div></div></Container></Section>
}

export function Testimonials() {
  const testimonials = business.testimonials.map((testimonial, index) => ({ ...testimonial, id: `testimonial-${index + 1}` }))
  return <Section className="soft-section" id="testimonials"><Container><SectionHeading eyebrow="Historias Lumen" title="La confianza se construye en cada visita." /><TestimonialGrid testimonials={testimonials} /></Container></Section>
}

export function Pricing() {
  const plans = business.plans.map((plan, index) => ({ ...plan, id: `plan-${index + 1}`, period: plan.price === '—' ? undefined : 'sesión' }))
  return <Section id="pricing"><Container><SectionHeading eyebrow="Rituales Lumen" title="Empieza por donde te haga sentido." description="Una selección para orientarte. Tu tratamiento final siempre nace de una valoración personalizada." /><PricingGrid plans={plans} /></Container></Section>
}

export function FAQ() {
  return <Section className="soft-section"><Container><SectionHeading eyebrow="Preguntas frecuentes" title="Antes de venir, lo importante." /><div className="faq-list">{business.faq.map((item) => <details className="faq-item" key={item.question}><summary>{item.question}<ChevronDown size={18} /></summary><p>{item.answer}</p></details>)}</div></Container></Section>
}

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setStatus('loading'); try { await new Promise((resolve) => window.setTimeout(resolve, 450)); setStatus('success') } catch { setStatus('error') } }
  return <Section className="contact-section" id="contact"><Container><div className="contact-grid"><div className="contact-copy"><span className="eyebrow">Tu próxima pausa</span><h2>Hablemos de lo que necesitas.</h2><p>Cuéntanos un poco sobre ti. Te responderemos en menos de 24 horas para encontrar el momento adecuado.</p><div className="contact-details"><div><span>Visítanos</span><MapPin size={14} /> {business.contact.address}</div><div><span>Escríbenos</span><Mail size={14} /> {business.contact.email}</div><div><span>Horario</span><Clock3 size={14} /> {business.hours}</div></div></div><form className="contact-form" onSubmit={submit}><Field id="name" label="Tu nombre" required placeholder="María García" /><Field id="email" label="Tu email" type="email" required placeholder="hola@email.com" /><TextareaField id="message" label="¿En qué podemos ayudarte?" required placeholder="Me gustaría saber más sobre..." />{status === 'success' ? <p className="form-status" role="status">Gracias. Te escribiremos muy pronto.</p> : status === 'error' ? <p className="form-status error" role="alert">No hemos podido enviar tu consulta. Inténtalo de nuevo.</p> : <Button type="submit">{status === 'loading' ? 'Enviando...' : 'Enviar consulta'} <ArrowUpRight size={15} /></Button>}</form></div></Container></Section>
}

export function Footer() {
  return <footer className="footer"><Container><div className="footer-grid"><div><a className="brand" href="#top"><span className="brand-mark">L</span>{business.shortName}</a><p className="footer-description">{business.description}</p></div><div><span className="footer-label">Explora</span><div className="footer-links"><a href="#services">Tratamientos</a><a href="#about">Nuestra mirada</a><a href="#team">Equipo</a></div></div><div><span className="footer-label">Contacto</span><div className="footer-links"><a href={`tel:${business.contact.phone}`}><Phone size={13} /> {business.contact.phone}</a><a href={`mailto:${business.contact.email}`}><Mail size={13} /> {business.contact.email}</a></div></div><div><span className="footer-label">Síguenos</span><div className="footer-links"><a href="#top"><Instagram size={13} /> {business.social.instagram}</a><a href="#top">Madrid · España</a></div></div></div><div className="footer-bottom"><span>© 2025 Lumen House</span><span>Diseñado para sentirse bien.</span></div></Container></footer>
}
