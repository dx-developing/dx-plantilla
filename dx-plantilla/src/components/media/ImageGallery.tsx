import type { ImageAsset } from '../../types/content'
import { Container, Section, SectionHeading } from '../ui/primitives'

export function ImageGallery({ images, title, description, layout = 'grid' }: { images: ImageAsset[]; title?: string; description?: string; layout?: 'grid' | 'masonry' | 'horizontal' }) {
  return <Section><Container>{title && <SectionHeading eyebrow="Galería" title={title} description={description} />}<div className={`image-gallery image-gallery-${layout}`}>{images.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt} loading={image.loading ?? 'lazy'} width={image.width} height={image.height} /></figure>)}</div></Container></Section>
}
