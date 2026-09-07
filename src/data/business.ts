export type Service = {
  title: string
  description: string
  icon: 'sparkles' | 'leaf' | 'sun'
}

export type Testimonial = {
  name: string
  role: string
  quote: string
  rating: number
}

export type ProcessStep = {
  number: string
  title: string
  description: string
}

export const business = {
  name: 'Lumen House',
  shortName: 'Lumen',
  category: 'Medicina estética · Madrid',
  tagline: 'Tu piel, en su mejor momento.',
  description: 'Un espacio de medicina estética que combina precisión clínica, calma y resultados que se sienten tuyos.',
  contact: {
    phone: '+34 910 24 18 60',
    email: 'hola@lumenhouse.es',
    address: 'Calle del Barquillo 21, Madrid',
  },
  social: {
    instagram: '@lumenhouse.es',
    linkedin: 'Lumen House',
  },
  hours: 'Lun — Vie · 09:00 — 20:00',
  trust: {
    eyebrow: 'Una forma distinta de cuidarte',
    labels: ['Atención médica', 'Resultados naturales', 'Acompañamiento real'],
  },
  hero: {
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1400&q=85',
    note: 'Resultados que respetan lo que ya eres.',
  },
  about: {
    eyebrow: 'La mirada Lumen',
    title: 'La belleza no necesita prisa.',
    body: 'Trabajamos desde la escucha y la evidencia para acompañarte con tratamientos honestos, personalizados y siempre naturales.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1100&q=85',
  },
  services: [
    { title: 'Rostro', description: 'Tratamientos que despiertan tu piel y afinan la luz que ya tiene.', icon: 'sparkles' },
    { title: 'Cuerpo', description: 'Tecnología y criterio médico para sentirte más cómoda en tu piel.', icon: 'leaf' },
    { title: 'Bienestar', description: 'Rituales de cuidado para bajar el ritmo y volver a ti.', icon: 'sun' },
  ] satisfies Service[],
  gallery: [
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1100&q=85',
    'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=85',
  ],
  stats: [
    { value: '12', label: 'años de experiencia' },
    { value: '4.9/5', label: 'valoración media' },
    { value: '8k+', label: 'historias acompañadas' },
  ],
  process: [
    { number: '01', title: 'Escuchamos', description: 'Una primera conversación para entender qué buscas y qué necesitas.' },
    { number: '02', title: 'Diseñamos', description: 'Traducimos esa conversación en un plan claro, realista y tuyo.' },
    { number: '03', title: 'Acompañamos', description: 'Medimos el proceso y ajustamos contigo, sin desaparecer después.' },
  ] satisfies ProcessStep[],
  team: {
    name: 'Dra. Clara Montalvo',
    role: 'Directora médica y fundadora',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=85',
    bio: '“La medicina estética tiene sentido cuando devuelve confianza, no cuando cambia identidades.”',
  },
  testimonials: [
    { name: 'María G.', role: 'Paciente Lumen desde 2021', quote: 'Por fin encontré un lugar donde me explican todo sin intentar venderme nada. El resultado es sutil y me siento muy yo.', rating: 5 },
    { name: 'Ana R.', role: 'Paciente Lumen desde 2023', quote: 'Cada visita se siente como una pausa. El equipo cuida los detalles y el seguimiento es excepcional.', rating: 5 },
  ] satisfies Testimonial[],
  plans: [
    { name: 'Esencial', price: '95€', description: 'Para empezar a escuchar tu piel.', features: ['Diagnóstico personalizado', 'Limpieza profunda', 'Plan de cuidado'] },
    { name: 'Lumen Signature', price: '180€', description: 'Nuestro ritual más completo.', features: ['Diagnóstico médico', 'Tratamiento combinado', 'Seguimiento a 30 días'], featured: true },
    { name: 'A medida', price: '—', description: 'Para necesidades que piden más tiempo.', features: ['Consulta de valoración', 'Protocolo personalizado', 'Acompañamiento continuo'] },
  ],
  faq: [
    { question: '¿La primera consulta tiene coste?', answer: 'La primera valoración médica tiene un coste de 40€, que descontamos íntegramente si realizas un tratamiento.' },
    { question: '¿Cómo sé qué tratamiento necesito?', answer: 'No necesitas saberlo antes de venir. Empezamos con una conversación y un diagnóstico para recomendar solo lo que tiene sentido para ti.' },
    { question: '¿Cuánto dura una sesión?', answer: 'Depende del protocolo, pero reservamos siempre el tiempo necesario para que la experiencia sea tranquila y sin prisas.' },
  ],
}
