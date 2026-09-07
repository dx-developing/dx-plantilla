import type { ReactNode } from 'react'
import type { CTA, ImageAsset } from '../../types/content'
import { Button, Container } from '../ui/primitives'

export type HeroVariantName = 'centered' | 'split' | 'fullscreen' | 'minimal'

export function HeroVariant({ variant = 'split', eyebrow, title, description, image, actions = [], children }: { variant?: HeroVariantName; eyebrow?: string; title: string; description?: string; image?: ImageAsset; actions?: CTA[]; children?: ReactNode }) {
  return <section className={`hero-variant hero-variant-${variant}`}><Container><div className="hero-variant-content"><div className="hero-variant-copy">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{description && <p>{description}</p>}{actions.length > 0 && <div className="hero-actions">{actions.map((action) => <Button key={action.href} href={action.href} variant={action.variant === 'secondary' ? 'light' : action.variant === 'ghost' ? 'ghost' : 'dark'}>{action.label}</Button>)}</div>}{children}</div>{image && <div className="hero-variant-media"><img src={image.src} alt={image.alt} loading={image.loading ?? 'eager'} /></div>}</div></Container></section>
}
