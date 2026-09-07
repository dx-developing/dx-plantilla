export type ImageAsset = {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'eager' | 'lazy'
}

export type LinkItem = {
  label: string
  href: string
  external?: boolean
}

export type CTA = {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export type Stat = {
  value: string
  label: string
}

export type Service = {
  id: string
  title: string
  description: string
  icon?: string
  price?: string
  image?: ImageAsset
  features?: string[]
}

export type Testimonial = {
  id: string
  name: string
  role?: string
  quote: string
  avatar?: ImageAsset
  rating?: number
  video?: string
}

export type TeamMember = {
  id: string
  name: string
  role: string
  bio?: string
  image: ImageAsset
  links?: LinkItem[]
}

export type FAQItem = {
  question: string
  answer: string
}

export type PricingPlan = {
  id: string
  name: string
  description: string
  price: string
  period?: string
  features: string[]
  featured?: boolean
  cta?: CTA
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export type FormField = {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea'
  placeholder?: string
  required?: boolean
  options?: string[]
}
