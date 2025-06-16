import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import PartnersCarousel from '@/components/layout/PartnersCarousel';
import CTASection from '@/components/landing/CTASection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, HeartPulse, Zap, BarChart3, Users, CheckCircle, Briefcase, Lightbulb, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { error } from 'console';
import { OTHER_SOLUDE_SERVICES, SOLUDE_FEATURES, MOCK_SOLUDE_SOLUTIONS_MARKETING } from '@/lib/constants';
import CustomizableFeatureSection from '@/components/landing/FeatureSection';
import FeatureCard from '@/components/landing/FeatureCard';
import AlternateHeroSection from '@/components/landing/AlternateHeroSection';


interface MarketingSolution {
  benefits: string[];
  description: string;
  features: string[];
  icon_url: string;
  id: number;
  marketing_name: string;
  screenshot_url: string;
  tag_line: string;
  tags: string[];
}

async function getMarketingSolutions(): Promise<MarketingSolution[]> {
  try {
    const response = await fetch('https://api.solude.tech/services/marketing', { next: { revalidate: 3600 } }); // Revalidate every hour
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Erro ao buscar soluções de marketing:', error);
    return MOCK_SOLUDE_SOLUTIONS_MARKETING;
  }
}


export default async function SolutionsLandingPage() {
  const solutions = await getMarketingSolutions();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainHeader />
      <main className="flex-grow">
        <AlternateHeroSection
          IconComponent={HeartPulse}
          titleStart='Soluções Sob Medida para '
          titleHighlight='sua Instituição'
          subtitle='Descubra o conjunto abrangente de soluções da Solude, projetado para enfrentar seus desafios mais difíceis e desbloquear novas oportunidades de crescimento e eficiência.'
          buttonText='Solicite uma Demonstração'
          buttonLink='/contact'
        />

        <PartnersCarousel sectionBgClass="bg-section-background" />

        <CustomizableFeatureSection
          id='solutions'
          sectionBgClass='bg-section-alternate-background'
          titleStart='Nossas Principais'
          titleHighlight='Soluções'
          titleEnd=''
          subtitle=''
          items={solutions}
          gridConfig="grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          renderItem={(solution, index) =>(
            <div key={index} className="animate-slide-in-from-bottom h-full" style={{ animationDelay: `${index * 150}ms` }}>
              <FeatureCard
                iconUrl={solution.screenshot_url} // Use screenshot_url here
                isScreenshot={true} // Indicate that this URL is for a screenshot
                title={solution.marketing_name}
                description={solution.tag_line} // Use tag_line for main description
                detailsList={solution.features}
                detailsListTitle="Principais Funcionalidades:"
                className='h-full'
                // actionLink={solution.some_product_page_url} // Link to a specific product page if available
                // actionText="Saiba Mais"
              />
          </div>
          )}
        />


        <CustomizableFeatureSection
          id='benefits'
          titleStart='Por que Escolher a'
          titleHighlight='Solude'
          titleEnd='?'
          subtitle=''
          items={SOLUDE_FEATURES}
          gridConfig="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          renderItem={(benefit, index) =>(
            <div key={index} className="animate-slide-in-from-bottom h-full" style={{ animationDelay: `${index * 150}ms` }}>
              <FeatureCard
                iconName={benefit.iconName} // Use screenshot_url here
                title={benefit.title}
                description={benefit.description} // Use tag_line for main description
                className='h-full'
              />
          </div>
          )}
        />

        <CustomizableFeatureSection
          id="other-services-solutions"
          sectionBgClass='bg-section-alternate-background'
          titleStart="Explore Nossos"
          titleHighlight="Serviços"
          titleEnd='Abrangentes'
          subtitle="Além da nossa plataforma, oferecemos uma gama de serviços especializados para apoiar os objetivos estratégicos da sua organização."
          items={OTHER_SOLUDE_SERVICES}
          gridConfig="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          renderItem={(service, index) => (
            <div key={index} className="animate-slide-in-from-bottom h-full" style={{ animationDelay: `${index * 150}ms` }}>
              <FeatureCard
                iconName={service.iconName}
                title={service.title}
                description={service.description}
                className='h-full'
              />
            </div>
          )}
        />

        <CTASection 
          id='contact-solutions'
          title="Vamso Transformar a Saúde Juntos?" 
          subtitle="Vamos discutir como as soluções da Solude podem ser adaptadas às suas necessidades únicas ?"
          primaryActionText="Começar Agora"
          primaryActionLink="/login"
          secondaryActionText="Entre em Contato"
          secondaryActionLink="/contact"
        />
      </main>
      <Footer />
    </div>
  );
}
