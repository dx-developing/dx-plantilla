import type { PricingPlan } from '../../types/content'

export function ComparisonTable({ plans }: { plans: PricingPlan[] }) {
  const features = [...new Set(plans.flatMap((plan) => plan.features))]
  return <div className="comparison-table" role="table" aria-label="Comparación de planes"><div className="comparison-row comparison-header" role="row"><span>Características</span>{plans.map((plan) => <strong key={plan.id}>{plan.name}</strong>)}</div>{features.map((feature) => <div className="comparison-row" role="row" key={feature}><span>{feature}</span>{plans.map((plan) => <span key={plan.id} aria-label={plan.features.includes(feature) ? 'Incluido' : 'No incluido'}>{plan.features.includes(feature) ? '✓' : '—'}</span>)}</div>)}</div>
}
