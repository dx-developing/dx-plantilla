import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth'
import { useAuth } from './useAuth'
import { Dashboard } from './Dashboard'
import { Login } from './Login'

function Protected() { const { session } = useAuth(); return session ? <Dashboard /> : <Navigate to="/login" replace /> }

export function DashboardApp() { return <AuthProvider><BrowserRouter><Routes><Route path="/login" element={<Login />} /><Route path="/dashboard/*" element={<Protected />} /><Route path="*" element={<Navigate to="/dashboard" replace />} /></Routes></BrowserRouter></AuthProvider> }
