import { Star } from 'lucide-react'

export function ReviewScore({ score, count, source = 'Google' }: { score: number; count: string; source?: string }) {
  return <div className="review-score" aria-label={`${score} de 5 en ${source}`}><strong>{score.toFixed(1)}</strong><span className="rating">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill={index < Math.round(score) ? 'currentColor' : 'none'} />)}</span><small>{count} reseñas en {source}</small></div>
}
