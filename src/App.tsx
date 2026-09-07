import { DashboardApp } from './dashboard/DashboardApp'
import PublicDemo from './PublicDemo'
import PublishedSite from './PublishedSite'

export default function App() {
  const publishedMatch = window.location.pathname.match(/^\/site\/([^/]+)\/?$/)
  if (publishedMatch) return <PublishedSite projectId={publishedMatch[1]} />
  const isProductRoute = window.location.pathname === '/login' || window.location.pathname.startsWith('/dashboard')
  return isProductRoute ? <DashboardApp /> : <PublicDemo />
}
