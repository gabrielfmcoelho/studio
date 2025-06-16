import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  dataAiHint?: string;
}

const partners: Partner[] = [
  { id: '1', name: 'Centelha PI', logoUrl: '/CENTELHA.png', dataAiHint: 'centelha mcti logo' },
  { id: '2', name: 'CIATEN UFPI', logoUrl: '/Ciaten.png', dataAiHint: 'CIATEN UFPI logo'},
  { id: '3', name: 'EBSERH', logoUrl: '/EBSERH.png', dataAiHint: 'EBSERH - Empresa Brasileira de Serviços Hospitalares logo' },
  { id: '4', name: 'FAPEPI', logoUrl: '/FAPEPI.png', dataAiHint: 'FAPEPI - Fundação de Amparo à Pesquisa do Estado do Piauí logo' },
  { id: '5', name: 'HU UFPI', logoUrl: '/HU.png', dataAiHint: 'Hospital Universitário da UFPI logo' },
  { id: '6', name: 'Investe Piauí', logoUrl: '/investepiaui.png', dataAiHint: 'Investe Piauí logo' },
  { id: '7', name: 'São Marcos', logoUrl: '/saomarcos.png', dataAiHint: 'Hospital São Marcos logo' },
  { id: '8', name: 'StartupNE', logoUrl: '/StartupNE.png', dataAiHint: 'Startup Nordeste logo' },
  { id: '9', name: 'Startup Piauí', logoUrl: '/startuppiaui.png', dataAiHint: 'Startup Piauí logo' }
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
          Instituições que Confiam em nossas Soluções
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
