import type { FormField } from '../../types/content'
import { LeadForm } from './LeadForm'

const bookingFields: FormField[] = [
  { name: 'name', label: 'Nombre', placeholder: 'Tu nombre', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'hola@email.com', required: true },
  { name: 'date', label: 'Fecha preferida', type: 'date', required: true },
  { name: 'message', label: 'Notas', type: 'textarea', placeholder: 'Cuéntanos qué necesitas' },
]

export function BookingForm({ onSubmit }: { onSubmit?: (values: Record<string, string>) => Promise<void> }) {
  return <LeadForm fields={bookingFields} submitLabel="Solicitar reserva" onSubmit={onSubmit} />
}

export function NewsletterForm({ onSubmit }: { onSubmit?: (values: Record<string, string>) => Promise<void> }) {
  return <LeadForm fields={[{ name: 'email', label: 'Tu email', type: 'email', placeholder: 'hola@email.com', required: true }]} submitLabel="Suscribirme" onSubmit={onSubmit} />
}
