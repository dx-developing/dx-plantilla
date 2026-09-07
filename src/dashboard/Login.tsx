import { ArrowRight, Check, CircleAlert, LockKeyhole, Mail, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { isSupabaseConfigured } from '../lib/supabase'

export function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMethod, setAuthMethod] = useState<'password' | 'magic-link'>('password')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (!cooldown) return
    const timer = window.setInterval(() => setCooldown((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [cooldown])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (cooldown) return

    setStatus('loading')
    setMessage('')

    try {
      const result = await signIn(email, authMethod === 'password' ? password : undefined)

      if (result === 'magic-link') {
        setStatus('success')
        setCooldown(60)
        setMessage('Te hemos enviado un enlace seguro. Revisa tu bandeja de entrada y también la carpeta de spam.')
        return
      }

      if (result === 'password') {
        setStatus('success')
        setMessage('Acceso correcto. Bienvenido a tu workspace.')
        navigate('/dashboard')
        return
      }

      setStatus('success')
      setMessage(!isSupabaseConfigured ? 'Modo local activo: has entrado al workspace sin depender de email externo.' : 'Supabase no respondió; hemos abierto el workspace en modo local para que no te quedes bloqueado.')
      navigate('/dashboard')
    } catch (error) {
      setStatus('error')
      const detail = error instanceof Error ? error.message : ''
      const isRateLimited = detail.toLowerCase().includes('rate limit')
      setCooldown(isRateLimited ? 60 : 0)
      setMessage(isRateLimited ? 'Supabase ha limitado temporalmente los emails. Espera unos minutos o usa la contraseña del workspace local.' : detail || 'No hemos podido iniciar sesión. Revisa el email y la contraseña.')
    }
  }

  return (
    <main className="auth-screen">
      <div className="auth-brand-corner">
        <span className="product-mark"><Sparkles size={16} /> dexyn</span>
        <span>Site OS</span>
      </div>

      <section className="auth-hero">
        <div className="auth-hero-orbit auth-orbit-one" />
        <div className="auth-hero-orbit auth-orbit-two" />
        <div className="auth-hero-content">
          <span className="eyebrow">The operating system for better websites</span>
          <h1>Tu mejor trabajo merece un lugar a su altura.</h1>
          <p>Diseña, publica y gestiona las webs de tus clientes con un sistema hecho para equipos pequeños que cuidan cada detalle.</p>
          <div className="auth-proof">
            <span><Check size={13} /> Editor visual</span>
            <span><Check size={13} /> Publicación rápida</span>
            <span><Check size={13} /> Un workspace</span>
          </div>
        </div>

        <div className="auth-hero-footer">
          <span>DEXYN / 2026</span>
          <span>Built for small teams with high standards.</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-form">
          <div className="auth-form-header">
            <span className="auth-kicker">{isSupabaseConfigured ? 'Secure workspace access' : 'Workspace demo'}</span>
            <span className={`auth-mode ${isSupabaseConfigured ? 'is-live' : ''}`}><i />{isSupabaseConfigured ? 'Live auth' : 'Local mode'}</span>
          </div>

          <h2>Bienvenido de nuevo.</h2>
          <p className="auth-intro">{isSupabaseConfigured ? 'Usa contraseña o entra con enlace seguro.' : 'Prueba el workspace localmente. Tu sesión se guardará en este navegador.'}</p>

          <div className="auth-toggle">
            <button type="button" className={authMethod === 'password' ? 'is-active' : ''} onClick={() => setAuthMethod('password')}>Contraseña</button>
            <button type="button" className={authMethod === 'magic-link' ? 'is-active' : ''} onClick={() => setAuthMethod('magic-link')}>Enlace</button>
          </div>

          <form onSubmit={submit}>
            <label htmlFor="login-email">Email profesional</label>
            <div className="auth-input-wrap">
              <Mail size={17} />
              <input id="login-email" type="email" required autoComplete="email" placeholder="tu@agencia.com" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>

            {authMethod === 'password' ? (
              <>
                <label htmlFor="login-password">Contraseña</label>
                <div className="auth-input-wrap">
                  <LockKeyhole size={17} />
                  <input id="login-password" type="password" required autoComplete="current-password" placeholder="Tu contraseña" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
              </>
            ) : null}

            <button className="saas-button saas-button-primary auth-submit" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? (authMethod === 'password' ? 'Accediendo...' : 'Enviando enlace...') : (authMethod === 'password' ? 'Entrar al workspace' : 'Enviar enlace de acceso')}
              <ArrowRight size={16} className="button-arrow" />
            </button>

            {message ? (
              <div className={`auth-message ${status === 'error' ? 'error' : 'success'}`} role="status">
                <span className="message-icon">{status === 'error' ? <CircleAlert size={14} /> : <Check size={14} />}</span>
                <span>{message}</span>
              </div>
            ) : null}
          </form>
        </div>
      </section>
    </main>
  )
}
