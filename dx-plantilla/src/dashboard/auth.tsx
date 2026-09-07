import { useState } from 'react'
import type { ReactNode } from 'react'
import { sessionStore } from './store'
import { AuthContext } from './context'
import type { Session } from './types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => sessionStore.get())
  const signIn = (email: string) => { const next = { name: email.split('@')[0] || 'Owner', email, role: 'owner' as const }; sessionStore.save(next); setSession(next) }
  const signOut = () => { sessionStore.clear(); setSession(null) }
  return <AuthContext.Provider value={{ session, signIn, signOut }}>{children}</AuthContext.Provider>
}
