import { X } from 'lucide-react'
import { useState } from 'react'

export function AnnouncementBar({ message, href, dismissible = true }: { message: string; href?: string; dismissible?: boolean }) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return <div className="announcement-bar"><span>{message}</span>{href && <a href={href}>Saber más</a>}{dismissible && <button type="button" aria-label="Cerrar anuncio" onClick={() => setVisible(false)}><X size={14} /></button>}</div>
}
