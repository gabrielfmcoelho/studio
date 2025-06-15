import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  dataAiHint?: string;
}

const partners: Partner[] = [
  { id: '1', name: 'Centelha PI MCTI', logoUrl: 'https://placehold.co/150x60/ffffff/377bff.png?text=Centelha+PI', dataAiHint: 'centelha mcti logo' },
  { id: '2', name: 'Partner B', logoUrl: 'https://placehold.co/150x60/ffffff/333333.png?text=Partner+B', dataAiHint: 'company logo' },
  { id: '3', name: 'Partner C', logoUrl: 'https://placehold.co/150x60/ffffff/cccccc.png?text=Partner+C&font=roboto', dataAiHint: 'tech logo' },
  { id: '4', name: 'Partner D', logoUrl: 'https://placehold.co/150x60/377bff/ffffff.png?text=Partner+D', dataAiHint: 'business logo' },
  { id: '5', name: 'Partner E', logoUrl: 'https://placehold.co/150x60/22293b/ffffff.png?text=Partner+E', dataAiHint: 'organization logo' },
  { id: '6', name: 'Partner F', logoUrl: 'https://placehold.co/150x60/7DF9FF/22293B.png?text=Partner+F', dataAiHint: 'startup logo' },
  // Add more partners as needed. For a smooth infinite scroll, ensure enough items (e.g., > 6-8).
];

// Duplicate partners for seamless looping effect
const duplicatedPartners = [...partners, ...partners];

interface PartnersCarouselProps {
  sectionBgClass?: string; // e.g., 'bg-background' or 'bg-section-alternate-background'
}

export default function PartnersCarousel({ sectionBgClass = 'bg-background' }: PartnersCarouselProps) {
  return (
    <section className={cn("py-12 md:py-16", sectionBgClass)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-center text-foreground mb-10">
          Our Valued Institutional Partners
        </h2>
        <div className={cn("logos-container", sectionBgClass === 'bg-section-alternate-background' ? 'bg-alternate' : '')}>
          <div className="logos-slide">
            {duplicatedPartners.map((partner, index) => (
              <div key={`${partner.id}-${index}`} className="inline-block mx-6 md:mx-10 align-middle">
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={150}
                  height={60}
                  className="max-h-[60px] w-auto object-contain"
                  data-ai-hint={partner.dataAiHint || "partner logo"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
