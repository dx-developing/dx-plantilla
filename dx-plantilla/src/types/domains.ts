import type { ImageAsset, Service, TeamMember, Testimonial } from './content'

export type MenuItem = {
  id: string
  name: string
  description?: string
  price: string
  image?: ImageAsset
  tags?: string[]
}

export type MenuCategory = {
  name: string
  items: MenuItem[]
}

export type BookingSlot = {
  date: string
  times: string[]
}

export type Property = {
  id: string
  title: string
  location: string
  price: string
  type: string
  bedrooms?: number
  bathrooms?: number
  area?: string
  image: ImageAsset
  featured?: boolean
}

export type Room = {
  id: string
  name: string
  description: string
  price: string
  capacity: string
  image: ImageAsset
  amenities: string[]
}

export type Product = {
  id: string
  name: string
  description?: string
  price: string
  compareAtPrice?: string
  image: ImageAsset
  badge?: string
  category?: string
}

export type Membership = {
  id: string
  name: string
  price: string
  period: string
  benefits: string[]
  featured?: boolean
}

export type DomainCatalog = {
  services?: Service[]
  team?: TeamMember[]
  testimonials?: Testimonial[]
  menu?: MenuCategory[]
  properties?: Property[]
  rooms?: Room[]
  products?: Product[]
  memberships?: Membership[]
}
