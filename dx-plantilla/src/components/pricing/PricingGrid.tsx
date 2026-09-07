import { ArrowUpRight, Check } from 'lucide-react'
import type { PricingPlan } from '../../types/content'
import { Button, Card } from '../ui/primitives'

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return <Card className={`price-card${plan.featured ? ' featured' : ''}`}><h3>{plan.name}</h3><p className="plan-description">{plan.description}</p><div className="price">{plan.price}{plan.period && <small> / {plan.period}</small>}</div><ul>{plan.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul><Button href={plan.cta?.href ?? '#contact'} variant={plan.featured ? 'dark' : 'ghost'}>{plan.cta?.label ?? 'Consultar'} <ArrowUpRight size={15} /></Button></Card>
}

export function PricingGrid({ plans }: { plans: PricingPlan[] }) {
  return <div className="business-grid pricing-grid">{plans.map((plan) => <PricingCard key={plan.id} plan={plan} />)}</div>
}
