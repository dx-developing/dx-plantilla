import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>
}

export function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return <section className={`section ${className}`} id={id}>{children}</section>
}

export function Button({ children, variant = 'dark', href = '#contact', type = 'button', onClick }: { children: ReactNode; variant?: 'dark' | 'light' | 'ghost'; href?: string; type?: 'button' | 'submit'; onClick?: () => void }) {
  if (type === 'submit') return <button className={`button button-${variant}`} type="submit" onClick={onClick}>{children}</button>
  return <a className={`button button-${variant}`} href={href} onClick={onClick}>{children}</a>
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{description && <p>{description}</p>}</div>
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <article className={`card ${className}`}>{children}</article>
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>
}

export function IconButton({ label, children }: { label: string; children: ReactNode }) {
  return <button className="icon-button" type="button" aria-label={label}>{children}</button>
}

export function Divider() {
  return <hr className="divider" />
}

export function ArrowLink({ children, href = '#contact' }: { children: ReactNode; href?: string }) {
  return <a className="arrow-link" href={href}>{children}<ArrowUpRight size={15} /></a>
}

export function Field({ label, id, type = 'text', placeholder, required = false }: { label: string; id: string; type?: string; placeholder?: string; required?: boolean }) {
  return <div className="form-field"><label htmlFor={id}>{label}</label><input id={id} name={id} type={type} required={required} placeholder={placeholder} /></div>
}

export function TextareaField({ label, id, placeholder, required = false }: { label: string; id: string; placeholder?: string; required?: boolean }) {
  return <div className="form-field"><label htmlFor={id}>{label}</label><textarea id={id} name={id} required={required} placeholder={placeholder} /></div>
}
