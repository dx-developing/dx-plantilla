import { Star } from 'lucide-react'
import type { Testimonial } from '../../types/content'
import { Card } from '../ui/primitives'

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return <Card className="testimonial-card"><div className="rating" aria-label={`${testimonial.rating ?? 5} de 5 estrellas`}>{Array.from({ length: testimonial.rating ?? 5 }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}</div><blockquote>“{testimonial.quote}”</blockquote><footer>{testimonial.name}{testimonial.role && <span>{testimonial.role}</span>}</footer></Card>
}

export function TestimonialGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return <div className="business-grid testimonial-grid">{testimonials.map((testimonial) => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)}</div>
}
