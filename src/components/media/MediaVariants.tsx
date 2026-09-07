import type { ImageAsset } from '../../types/content'

export function VideoSection({ src, poster, title }: { src: string; poster?: ImageAsset; title: string }) {
  return <section className="video-section"><video controls preload="metadata" poster={poster?.src} aria-label={title}><source src={src} type="video/mp4" /></video></section>
}

export function BeforeAfter({ before, after, label = 'Antes y después' }: { before: ImageAsset; after: ImageAsset; label?: string }) {
  return <figure className="before-after"><div><img src={before.src} alt={`${label}: antes`} loading="lazy" /></div><div><img src={after.src} alt={`${label}: después`} loading="lazy" /></div><figcaption>{label}</figcaption></figure>
}
