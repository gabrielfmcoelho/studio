
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import PartnersCarousel from '@/components/layout/PartnersCarousel';
import { MOCK_TEAM_MEMBERS } from '@/lib/constants';
import { Users, Building2 } from 'lucide-react';

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainHeader />
      <main className="flex-grow">
        {/* Quem Somos Section */}
        <section className="py-16 md:py-24 bg-section-alternate-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
               <Building2 className="mx-auto h-16 w-16 text-primary mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Quem <span className="text-primary">Somos</span>
              </h2>
            </div>
            <div className="prose lg:prose-xl mx-auto text-left text-muted-foreground space-y-4">
              <p>
                A Solude Platform é uma consultoria especializada em análise de dados e gestão estratégica em saúde. Nossa missão é transformar dados complexos em insights acionáveis, capacitando gestores e organizações a tomar decisões mais informadas e eficazes para aprimorar a saúde pública e o bem-estar populacional.
              </p>
              <p>
                Com uma equipe multidisciplinar de especialistas em saúde, tecnologia e ciência de dados, combinamos conhecimento técnico aprofundado com uma abordagem inovadora. Estamos comprometidos em fornecer soluções personalizadas que atendam às necessidades específicas de cada cliente, promovendo a eficiência, a equidade e a qualidade nos serviços de saúde.
              </p>
            </div>
          </div>
        </section>

        <PartnersCarousel sectionBgClass="bg-background"/>

        {/* Team Members Section */}
        <section className="py-16 md:py-24 bg-background">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {MOCK_TEAM_MEMBERS.map((member, index) => (
                <div key={member.id} className="animate-slide-in-from-bottom h-full" style={{ animationDelay: `${index * 100}ms` }}>
                  <TeamMemberCard
                    name={member.name}
                    role={member.role}
                    expertise={member.expertise}
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
