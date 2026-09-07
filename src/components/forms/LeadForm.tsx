import { useState } from 'react'
import type { FormEvent } from 'react'
import type { FormField, FormStatus } from '../../types/content'
import { Button, Field, TextareaField } from '../ui/primitives'

export function LeadForm({ fields, submitLabel = 'Enviar', onSubmit }: { fields: FormField[]; submitLabel?: string; onSubmit?: (values: Record<string, string>) => Promise<void> }) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setStatus('loading'); const values = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>; try { await onSubmit?.(values); setStatus('success') } catch { setStatus('error') } }
  return <form className="contact-form" onSubmit={submit}>{fields.map((field) => field.type === 'textarea' ? <TextareaField key={field.name} id={field.name} label={field.label} placeholder={field.placeholder} required={field.required} /> : <Field key={field.name} id={field.name} label={field.label} type={field.type ?? 'text'} placeholder={field.placeholder} required={field.required} />)}{status === 'success' && <p className="form-status" role="status">Hemos recibido tu solicitud.</p>}{status === 'error' && <p className="form-status error" role="alert">No hemos podido enviar el formulario.</p>}{status !== 'success' && <Button type="submit">{status === 'loading' ? 'Enviando...' : submitLabel}</Button>}</form>
}
