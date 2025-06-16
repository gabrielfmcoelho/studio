import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import CustomizableFeatureSection from '@/components/landing/FeatureSection';
import VideoSection from '@/components/landing/VideoSection';
import CTASection from '@/components/landing/CTASection';
import PartnersCarousel from '@/components/layout/PartnersCarousel';
import { OTHER_SOLUDE_SERVICES, SOLUDE_FEATURES } from '@/lib/constants';
import FeatureCard from '@/components/landing/FeatureCard';


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainHeader />
      <main className="flex-grow">
        <HeroSection />

        <PartnersCarousel sectionBgClass="bg-background" />

        <CustomizableFeatureSection
          id="features"
          titleStart="Tudo o que Você Precisa para o"
          titleHighlight="Sucesso"
          subtitle="A Solude Platform oferece um conjunto abrangente de ferramentas projetadas para elevar o desempenho do seu negócio e impulsionar a inovação."
          items={SOLUDE_FEATURES}
          gridConfig="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          renderItem={(feature, index) => (
            <div key={index} className="animate-slide-in-from-bottom h-full" style={{ animationDelay: `${index * 150}ms` }}>
              <FeatureCard
                iconName={feature.iconName}
                title={feature.title}
                description={feature.description}
                className='h-full'
              />
            </div>
          )}
        />

        <VideoSection
          id='how-it-works'
          titleStart="Como a Opera a"
          titleHighlight="Solude"
          subtitle="Descubra o processo simples, porém poderoso, de utilizar a Solude para as necessidades do seu negócio."
          thumbnailUrl="https://placehold.co/1280x720.png"
          thumbnailAlt="Miniatura da Demonstração do Produto"
        />

        <CustomizableFeatureSection
          id="other-services"
          titleStart="Nosso Portfólio Abrangente de"
          titleHighlight="Serviços"
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
        
        {/* Call to Action Section */}
        <CTASection 
          id='contact'
          sectionBgClass='bg-section-alternate-background'
          title="Vamso Transformar a Saúde Juntos?"
          subtitle="Junte-se às instituições líderes que confiam na Plataforma Solude para impulsionar seu sucesso. Comece hoje mesmo ou entre em contato com nossa equipe."
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
