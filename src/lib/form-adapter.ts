export type FormSubmitter = (values: Record<string, string>) => Promise<void>

export const demoFormSubmitter: FormSubmitter = async () => {
  await new Promise((resolve) => window.setTimeout(resolve, 450))
}

export function createFormSubmitter(endpoint: string): FormSubmitter {
  return async (values) => {
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
    if (!response.ok) throw new Error(`Form submission failed with status ${response.status}`)
  }
}
