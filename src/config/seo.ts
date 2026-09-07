export type SEOConfig = {
  title: string
  description: string
  image?: string
  siteUrl?: string
  noIndex?: boolean
}

export function createStructuredData(config: { name: string; description: string; phone?: string; email?: string; address?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    description: config.description,
    telephone: config.phone,
    email: config.email,
    address: config.address ? { '@type': 'PostalAddress', streetAddress: config.address } : undefined,
  }
}
