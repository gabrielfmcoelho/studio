import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeatureSection from '@/components/landing/FeatureSection';
import PartnersCarousel from '@/components/layout/PartnersCarousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, Lightbulb, BarChart3, CheckCircle, Users, Zap, ShieldCheck, Settings2 } from 'lucide-react';


const otherServices = [
  { title: "Assessoria", description: "Assessoria de aporte de informações a partir da análise de dados e avaliações permanentes.", icon: Lightbulb },
  { title: "Suporte de Gestão Estratégica", description: "Relatórios com sistematização, avaliação e interpretação de dados em saúde, com visão integral e intersetorial.", icon: Briefcase },
  { title: "Dashboards", description: "Dashboards para monitoramento contínuo de aspectos inerentes às características de saúde da região/população em questão.", icon: BarChart3 },
  { title: "Classificação de Prioridades", description: "Criação de informações e conhecimentos pertinentes sobre a saúde da população em determinado território.", icon: CheckCircle },
  { title: "Monitoramento de Indicadores", description: "Apoio técnico para seleção de indicadores para análise da situação de saúde do município ou território de saúde.", icon: Zap },
  { title: "Capacitação", description: "Realização de capacitação para diagnóstico de situação de saúde e análise dos eixos estratégicos da região de saúde abrangida e do planejamento estratégico do estado em questão.", icon: Users },
  { title: "Acompanhamento Técnico", description: "Acompanhamento técnico enquanto durar o projeto, para a promoção de ajustes, aprimoramento e manutenção dos indicadores e resultados alcançados.", icon: Settings2 },
  { title: "Análise Externa", description: "Avaliações formativas com os Stakeholders para análise externa dos serviços.", icon: ShieldCheck }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainHeader />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        
        <section id="how-it-works" className="py-16 md:py-24 bg-section-alternate-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
              How <span className="text-primary">Solude</span> Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Discover the simple yet powerful process of leveraging Solude Platform for your business needs.
            </p>
            <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
               <Image 
                src="https://placehold.co/1280x720.png" 
                alt="Product Demo Thumbnail"
                layout="fill"
                objectFit="cover"
                data-ai-hint="video thumbnail"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-6 shadow-lg bg-background/80 hover:bg-background/100 text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-3">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                  </svg>
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Other Services Section */}
        <section id="other-services" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Our Comprehensive <span className="text-primary">Service Portfolio</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Beyond our platform, we offer a range of expert services to support your organization's strategic goals.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {otherServices.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <Card key={index} className="shadow-lg hover:shadow-primary/20 transition-shadow bg-card flex flex-col h-full">
                    <CardHeader className="items-center text-center">
                      <div className="p-3 bg-primary/10 rounded-full text-primary inline-block mb-3">
                        <ServiceIcon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-center text-sm text-muted-foreground">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        
        <PartnersCarousel sectionBgClass="bg-background" />

        {/* Call to Action Section */}
        <section id="contact" className="py-16 md:py-24 bg-section-alternate-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
              Ready to Elevate Your Business?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Join leading companies who trust Solude Platform to drive their success. Get started today or contact our experts for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild className="shadow-lg">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="shadow-sm border-primary/50 text-primary hover:bg-primary/10">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
