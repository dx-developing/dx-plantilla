import { ArrowRight, LockKeyhole, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from './useAuth'

export function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  return <main className="auth-screen"><div className="auth-aside"><span className="product-mark"><Sparkles size={16} /> dexyn</span><div><p className="eyebrow">Website operating system</p><h1>Convierte ideas en sitios que trabajan por tu negocio.</h1><p>Un espacio para diseñar, publicar y mantener todas las webs de tus clientes desde un solo lugar.</p></div><span className="auth-caption">Built for small teams with high standards.</span></div><section className="auth-panel"><div className="auth-form"><span className="eyebrow">Workspace access</span><h2>Bienvenido de nuevo.</h2><p>Entra a tu workspace para continuar con tus proyectos.</p><form onSubmit={(event) => { event.preventDefault(); signIn(email) }}><label htmlFor="login-email">Email profesional</label><input id="login-email" type="email" required placeholder="tu@agencia.com" value={email} onChange={(event) => setEmail(event.target.value)} /><button className="saas-button saas-button-primary" type="submit">Continuar <ArrowRight size={16} /></button></form><small><LockKeyhole size={13} /> Demo local: la sesión se guarda en este navegador.</small></div></section></main>
}
