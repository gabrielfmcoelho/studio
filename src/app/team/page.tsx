// Suggested code may be subject to a license. Learn more: ~LicenseLog:3329299853.

import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import PartnersCarousel from '@/components/layout/PartnersCarousel';
import { MOCK_TEAM_MEMBERS } from '@/lib/constants';
import { Users, Building2 } from 'lucide-react';
import AlternateHeroSection from '@/components/landing/AlternateHeroSection';


export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainHeader />
      <main className="flex-grow">
        <AlternateHeroSection
          IconComponent={Building2}
          titleStart="Quem"
          titleHighlight="Somos"
          subtitle={"Com uma equipe multidisciplinar de especialistas em saúde, tecnologia e ciência de dados, combinamos conhecimento técnico aprofundado com uma abordagem inovadora. Estamos comprometidos em fornecer soluções personalizadas que atendam suas necessidades específicas, promovendo a eficiência, a equidade e a qualidade nos serviços de saúde."}
          buttonText='Entre em Contato'
          buttonLink='/contact'
        />

        <PartnersCarousel sectionBgClass="bg-background"/>

        {/* Team Members Section */}
        <section className="py-16 md:py-24 bg-section-alternate-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16 animate-fade-in">
              <Users className="mx-auto h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Conheça Nossa <span className="text-primary">Equipe de Especialistas</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                A força motriz por trás da inovação e do sucesso da Solude. Somos profissionais apaixonados e dedicados a entregar soluções excepcionais.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
              {MOCK_TEAM_MEMBERS.map((member, index) => (
                <div key={member.id} className="animate-slide-in-from-bottom h-full" style={{ animationDelay: `${index * 100}ms` }}>
                  <TeamMemberCard
                    name={member.name}
                    role={member.role}
                    imageUrl={member.imageUrl}
                    dataAiHint={member.dataAiHint}
                    description={member.description}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
