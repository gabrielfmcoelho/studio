import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface VideoSectionProps {
    id: string
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
}

export default function VideoSection({
    id,
    titleStart,
    titleHighlight,
    subtitle,
    thumbnailUrl,
    thumbnailAlt,
}: VideoSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24 bg-section-alternate-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
          {titleStart} <span className="text-primary">{titleHighlight}</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          {subtitle}
        </p>
        <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={thumbnailUrl}
            alt={thumbnailAlt}
            layout="fill"
            objectFit="cover"
            data-ai-hint="video thumbnail"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6 shadow-lg bg-background/80 hover:bg-background/100 text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-3">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
              Assistir
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}