import { ArrowUpRight, Check, Star } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Service, Testimonial } from '../../data/business'
import { Button, Card, Section, SectionHeading } from '../ui/primitives'

export type Product = { name: string; price: string; image: string; badge?: string }
export type Property = { title: string; location: string; price: string; image: string }
export type TeamMember = { name: string; role: string; image: string }

export function ServiceCard({ service, icon }: { service: Service; icon?: ReactNode }) {
  return <Card className="service-card"><span className="service-icon">{icon}</span><h3>{service.title}</h3><p>{service.description}</p></Card>
}

export function ProductCard({ product }: { product: Product }) {
  return <Card className="business-card product-card"><div className="card-image"><img src={product.image} alt={product.name} loading="lazy" /></div>{product.badge && <span className="card-badge">{product.badge}</span>}<h3>{product.name}</h3><strong>{product.price}</strong></Card>
}

export function PropertyCard({ property }: { property: Property }) {
  return <Card className="business-card property-card"><div className="card-image"><img src={property.image} alt={property.title} loading="lazy" /></div><span className="card-meta">{property.location}</span><h3>{property.title}</h3><strong>{property.price}</strong></Card>
}

export function TeamCard({ member }: { member: TeamMember }) {
  return <Card className="business-card team-member-card"><img src={member.image} alt={member.name} loading="lazy" /><span className="card-meta">{member.role}</span><h3>{member.name}</h3></Card>
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return <Card className="business-card testimonial-card"><div className="rating" aria-label={`${testimonial.rating} de 5 estrellas`}>{Array.from({ length: testimonial.rating }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}</div><blockquote>“{testimonial.quote}”</blockquote><footer>{testimonial.name}<span>{testimonial.role}</span></footer></Card>
}

export function TestimonialGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return <div className="business-grid testimonial-grid">{testimonials.map((testimonial) => <TestimonialCard key={testimonial.name} testimonial={testimonial} />)}</div>
}

export function PricingCard({ name, price, description, features, featured = false }: { name: string; price: string; description: string; features: string[]; featured?: boolean }) {
  return <Card className={`price-card${featured ? ' featured' : ''}`}><h3>{name}</h3><p className="plan-description">{description}</p><div className="price">{price}</div><ul>{features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul><Button variant={featured ? 'dark' : 'ghost'}>Consultar <ArrowUpRight size={15} /></Button></Card>
}

export function PricingGrid({ plans }: { plans: Array<{ name: string; price: string; description: string; features: string[]; featured?: boolean }> }) {
  return <div className="business-grid pricing-grid">{plans.map((plan) => <PricingCard key={plan.name} {...plan} />)}</div>
}

export function CTASection({ eyebrow, title, description, action = 'Empezar ahora', href = '#contact', children }: { eyebrow: string; title: string; description?: string; action?: string; href?: string; children?: ReactNode }) {
  return <Section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>{children ?? <Button href={href}>{action} <ArrowUpRight size={15} /></Button>}</div></Section>
}

export function ImageGallery({ images, title = 'Una galería para contar tu historia.' }: { images: Array<{ src: string; alt: string }>; title?: string }) {
  return <Section><div className="container"><SectionHeading eyebrow="Galería" title={title} /><div className="business-gallery">{images.map((image, index) => <figure key={image.src} className={index === 0 ? 'featured' : ''}><img src={image.src} alt={image.alt} loading="lazy" /></figure>)}</div></div></Section>
}
