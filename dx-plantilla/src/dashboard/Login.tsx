import { ArrowRight, LockKeyhole, Sparkles } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); try { const mode = await signIn(email); if (mode === 'local') navigate('/dashboard'); else setMessage('Revisa tu email para continuar.') } catch { setMessage('No hemos podido iniciar sesión. Inténtalo de nuevo.') } }
  return <main className="auth-screen"><div className="auth-aside"><span className="product-mark"><Sparkles size={16} /> dexyn</span><div><p className="eyebrow">Website operating system</p><h1>Convierte ideas en sitios que trabajan por tu negocio.</h1><p>Un espacio para diseñar, publicar y mantener todas las webs de tus clientes desde un solo lugar.</p></div><span className="auth-caption">Built for small teams with high standards.</span></div><section className="auth-panel"><div className="auth-form"><span className="eyebrow">Workspace access</span><h2>Bienvenido de nuevo.</h2><p>Entra a tu workspace para continuar con tus proyectos.</p><form onSubmit={submit}><label htmlFor="login-email">Email profesional</label><input id="login-email" type="email" required placeholder="tu@agencia.com" value={email} onChange={(event) => setEmail(event.target.value)} /><button className="saas-button saas-button-primary" type="submit">Continuar <ArrowRight size={16} /></button></form>{message && <p className="form-status" role="status">{message}</p>}<small><LockKeyhole size={13} /> Sin Supabase: demo local. Con Supabase: magic link seguro.</small></div></section></main>
}
