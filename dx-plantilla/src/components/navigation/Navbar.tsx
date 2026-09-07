import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { LinkItem } from '../../types/content'
import { Button, Container } from '../ui/primitives'

export type NavbarVariant = 'minimal' | 'solid' | 'transparent'

export function Navbar({ brand, links, cta, variant = 'solid' }: { brand: string; links: LinkItem[]; cta?: { label: string; href: string }; variant?: NavbarVariant }) {
  const [open, setOpen] = useState(false)
  return <header className={`navbar navbar-${variant}`}><Container><div className="navbar-inner"><a className="navbar-brand" href="#top">{brand}</a><nav className={`navbar-links${open ? ' is-open' : ''}`} aria-label="Navegación principal">{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}{cta && <Button href={cta.href}>{cta.label}</Button>}</nav><button className="navbar-toggle" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div></Container></header>
}
