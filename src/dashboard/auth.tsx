import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { sessionStore } from './store'
import { AuthContext } from './context'
import type { Session } from './types'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => isSupabaseConfigured ? null : sessionStore.get())
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured)

  const acceptLocalSession = (email: string) => {
    const next = { name: email.split('@')[0] || 'Owner', email, role: 'owner' as const }
    sessionStore.save(next)
    setSession(next)
    return next
  }

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return
    supabase.auth.getSession().then(({ data }) => { if (data.session?.user.email) setSession({ name: data.session.user.user_metadata.name ?? data.session.user.email.split('@')[0], email: data.session.user.email, role: 'owner' }); setAuthReady(true) }).catch(() => setAuthReady(true))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, authSession) => { if (authSession?.user.email) setSession({ name: authSession.user.user_metadata.name ?? authSession.user.email.split('@')[0], email: authSession.user.email, role: 'owner' }); else setSession(null) })
    return () => listener.subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password?: string): Promise<'local' | 'password' | 'magic-link'> => {
    const normalizedEmail = email.trim()
    if (!normalizedEmail) throw new Error('Introduce un email válido.')

    if (isSupabaseConfigured && supabase) {
      if (password && password.trim()) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password })
          if (error) throw error

          if (data.session?.user.email) {
            const next = { name: data.session.user.user_metadata.name ?? data.session.user.email.split('@')[0], email: data.session.user.email, role: 'owner' as const }
            setSession(next)
            return 'password'
          }
        } catch {
          const fallback = acceptLocalSession(normalizedEmail)
          setSession(fallback)
          return 'local'
        }
      }

      try {
        const { error } = await supabase.auth.signInWithOtp({ email: normalizedEmail, options: { emailRedirectTo: `${window.location.origin}/dashboard` } })
        if (error) throw error
        return 'magic-link'
      } catch {
        const fallback = acceptLocalSession(normalizedEmail)
        setSession(fallback)
        return 'local'
      }
    }

    const fallback = acceptLocalSession(normalizedEmail)
    setSession(fallback)
    return 'local'
  }

  const signOut = async () => { if (isSupabaseConfigured && supabase) await supabase.auth.signOut(); sessionStore.clear(); setSession(null) }
  return <AuthContext.Provider value={{ session, authReady, signIn, signOut }}>{children}</AuthContext.Provider>
}
