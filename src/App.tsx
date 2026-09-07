import { DashboardApp } from './dashboard/DashboardApp'
import PublicDemo from './PublicDemo'

export default function App() {
  const isProductRoute = window.location.pathname === '/login' || window.location.pathname.startsWith('/dashboard')
  return isProductRoute ? <DashboardApp /> : <PublicDemo />
}
