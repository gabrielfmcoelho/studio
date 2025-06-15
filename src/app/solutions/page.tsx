import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import PartnersCarousel from '@/components/layout/PartnersCarousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, Zap, BarChart3, Users, CheckCircle, Briefcase, Lightbulb, ShieldCheck } from 'lucide-react';
import FeatureCard from '@/components/landing/FeatureCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


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
    
    const mockApiResponse = [
        {
            "benefits": ["Aumento de eficiência em 30%", "Melhora na precisão dos dados", "Maior satisfação do usuário"],
            "description": "Uma plataforma abrangente para gerenciar todas as suas análises de negócios. Oferece processamento de dados em tempo real, ferramentas avançadas de visualização e capacidades de modelagem preditiva para ajudá-lo a tomar decisões informadas.",
            "features": ["Painel em tempo real", "Relatórios personalizados", "Insights com IA", "Opções de exportação de dados"],
            "icon_url": "https://placehold.co/100x100/377BFF/FFFFFF.png?text=SA",
            "id": 1,
            "marketing_name": "Solude Analytics Pro",
            "screenshot_url": "https://placehold.co/600x400.png",
            "tag_line": "Desbloqueie o poder dos seus dados com análises inteligentes.",
            "tags": ["Analytics", "Big Data", "Business Intelligence"]
        },
        {
            "benefits": ["Comunicação com o cliente otimizada", "Visão 360º do cliente", "Fluxos de vendas automatizados"],
            "description": "O Solude CRM capacita suas equipes de vendas e marketing a construir relacionamentos mais fortes com os clientes. Rastreie leads, gerencie contatos e automatize a comunicação para uma jornada do cliente perfeita.",
            "features": ["Gerenciamento de contatos", "Rastreamento do funil de vendas", "Integração de e-mail", "Automação de marketing"],
            "icon_url": "https://placehold.co/100x100/7DF9FF/22293B.png?text=SC",
            "id": 2,
            "marketing_name": "Solude Connect CRM",
            "screenshot_url": "https://placehold.co/600x400.png",
            "tag_line": "Construa relacionamentos duradouros com clientes com facilidade.",
            "tags": ["CRM", "Vendas", "Marketing", "Suporte ao Cliente"]
        },
        {
            "benefits": ["Planejamento de projetos simplificado", "Colaboração em equipe aprimorada", "Entrega de projetos no prazo"],
            "description": "Gerencie projetos de qualquer tamanho com o Solude TaskMaster. Desde a atribuição de tarefas até o acompanhamento do progresso e alocação de recursos, nossa plataforma garante que seus projetos permaneçam no caminho certo e dentro do orçamento.",
            "features": ["Gerenciamento de tarefas", "Gráficos de Gantt", "Rastreamento de tempo", "Ferramentas de colaboração em equipe", "Alocação de recursos"],
            "icon_url": "https://placehold.co/100x100/FFD700/22293B.png?text=ST",
            "id": 3,
            "marketing_name": "Solude TaskMaster",
            "screenshot_url": "https://placehold.co/600x400.png",
            "tag_line": "Organize, rastreie e entregue projetos com sucesso.",
            "tags": ["Gerenciamento de Projetos", "Produtividade", "Colaboração"]
        }
    ];
    if (!response.ok) {
      console.error('Falha ao buscar soluções de marketing:', response.statusText);
      return mockApiResponse; // Fallback para dados mockados em caso de erro
    }
    const data = await response.json();
    return data.length > 0 ? data : mockApiResponse; // Usar mock se a API retornar vazio
  } catch (error) {
    console.error('Erro ao buscar soluções de marketing:', error);
    // Para o propósito desta demonstração, retornaremos dados mockados em caso de erro de rede ou API.
     const mockApiResponseOnError = [
        {
            "benefits": ["Aumento de eficiência em 30%", "Melhora na precisão dos dados", "Maior satisfação do usuário"],
            "description": "Uma plataforma abrangente para gerenciar todas as suas análises de negócios. Oferece processamento de dados em tempo real, ferramentas avançadas de visualização e capacidades de modelagem preditiva para ajudá-lo a tomar decisões informadas.",
            "features": ["Painel em tempo real", "Relatórios personalizados", "Insights com IA", "Opções de exportação de dados"],
            "icon_url": "https://placehold.co/100x100/377BFF/FFFFFF.png?text=SA",
            "id": 1,
            "marketing_name": "Solude Analytics Pro",
            "screenshot_url": "https://placehold.co/600x400.png",
            "tag_line": "Desbloqueie o poder dos seus dados com análises inteligentes.",
            "tags": ["Analytics", "Big Data", "Business Intelligence"]
        },
        {
            "benefits": ["Comunicação com o cliente otimizada", "Visão 360º do cliente", "Fluxos de vendas automatizados"],
            "description": "O Solude CRM capacita suas equipes de vendas e marketing a construir relacionamentos mais fortes com os clientes. Rastreie leads, gerencie contatos e automatize a comunicação para uma jornada do cliente perfeita.",
            "features": ["Gerenciamento de contatos", "Rastreamento do funil de vendas", "Integração de e-mail", "Automação de marketing"],
            "icon_url": "https://placehold.co/100x100/7DF9FF/22293B.png?text=SC",
            "id": 2,
            "marketing_name": "Solude Connect CRM",
            "screenshot_url": "https://placehold.co/600x400.png",
            "tag_line": "Construa relacionamentos duradouros com clientes com facilidade.",
            "tags": ["CRM", "Vendas", "Marketing", "Suporte ao Cliente"]
        },
        {
            "benefits": ["Planejamento de projetos simplificado", "Colaboração em equipe aprimorada", "Entrega de projetos no prazo"],
            "description": "Gerencie projetos de qualquer tamanho com o Solude TaskMaster. Desde a atribuição de tarefas até o acompanhamento do progresso e alocação de recursos, nossa plataforma garante que seus projetos permaneçam no caminho certo e dentro do orçamento.",
            "features": ["Gerenciamento de tarefas", "Gráficos de Gantt", "Rastreamento de tempo", "Ferramentas de colaboração em equipe", "Alocação de recursos"],
            "icon_url": "https://placehold.co/100x100/FFD700/22293B.png?text=ST",
            "id": 3,
            "marketing_name": "Solude TaskMaster",
            "screenshot_url": "https://placehold.co/600x400.png",
            "tag_line": "Organize, rastreie e entregue projetos com sucesso.",
            "tags": ["Gerenciamento de Projetos", "Produtividade", "Colaboração"]
        }
    ];
    return mockApiResponseOnError;
  }
}


export default async function SolutionsLandingPage() {
  const solutions = await getMarketingSolutions();

  const benefits = [
    { icon: Zap, text: "Acelere a Inovação", description: "Utilize tecnologia de ponta para dar vida às suas ideias mais rápido do que nunca."},
    { icon: BarChart3, text: "Decisões Baseadas em Dados", description: "Utilize análises abrangentes para fazer escolhas informadas que impulsionam o seu negócio."},
    { icon: Users, text: "Colaboração Aprimorada", description: "Promova o trabalho em equipe e a comunicação com ferramentas integradas projetadas para colaboração perfeita."},
    { icon: CheckCircle, text: "Operações Otimizadas", description: "Otimize seus fluxos de trabalho e processos para máxima eficiência e produtividade."},
  ];

  const otherServices = [
    { title: "Consultoria Estratégica", description: "Análise de dados e avaliações para aporte de informações.", icon: Lightbulb },
    { title: "Suporte de Gestão", description: "Relatórios e interpretação de dados em saúde.", icon: Briefcase },
    { title: "Dashboards Personalizados", description: "Monitoramento contínuo de indicadores chave.", icon: BarChart3 },
    { title: "Classificação de Prioridades", description: "Criação de insights sobre saúde populacional.", icon: CheckCircle },
    { title: "Monitoramento de Indicadores", description: "Apoio técnico para seleção e análise de indicadores.", icon: Zap },
    { title: "Capacitação Especializada", description: "Treinamentos para diagnóstico e planejamento em saúde.", icon: Users },
    { title: "Acompanhamento Técnico", description: "Suporte contínuo para ajustes e aprimoramento de projetos.", icon: ShieldCheck },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Package className="mx-auto h-16 w-16 text-primary mb-6 animate-fade-in" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 animate-slide-in-from-bottom">
              Soluções Sob Medida para o <span className="text-primary">Seu Sucesso</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto mb-10 animate-slide-in-from-bottom" style={{animationDelay: '200ms'}}>
              Descubra o conjunto abrangente de soluções da Solude, projetado para enfrentar seus desafios mais difíceis e desbloquear novas oportunidades de crescimento e eficiência.
            </p>
            <div className="animate-slide-in-from-bottom" style={{animationDelay: '400ms'}}>
              <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href="/contact">
                  Solicite uma Demonstração
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <PartnersCarousel sectionBgClass="bg-section-alternate-background" />

        {/* Featured Solutions Section from API */}
        <section className="py-16 md:py-24 bg-section-alternate-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-foreground mb-12">
              Nossas Principais Soluções
            </h2>
            {solutions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((solution, index) => (
                  <div key={solution.id} className="animate-slide-in-from-bottom h-full" style={{ animationDelay: `${index * 150}ms` }}>
                    <FeatureCard
                      iconUrl={solution.screenshot_url} // Use screenshot_url here
                      isScreenshot={true} // Indicate that this URL is for a screenshot
                      title={solution.marketing_name}
                      description={solution.tag_line} // Use tag_line for main description
                      detailsList={solution.features}
                      detailsListTitle="Principais Funcionalidades:"
                      className="h-full"
                      // actionLink={solution.some_product_page_url} // Link to a specific product page if available
                      // actionText="Saiba Mais"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Carregando soluções ou nenhuma solução para exibir no momento.</p>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-foreground mb-12">
              Por que Escolher a Solude?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-primary/20 transition-shadow duration-300 animate-fade-in" style={{animationDelay: `${index*150}ms`}}>
                    <div className="p-3 bg-primary/10 rounded-full text-primary inline-block mb-4">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.text}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Other Services Section */}
        <section className="py-16 md:py-24 bg-section-alternate-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-foreground mb-12">
              Explore Nossos Serviços Abrangentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherServices.map((service, index) => {
                 const ServiceIcon = service.icon;
                 return (
                  <Card key={index} className="shadow-lg hover:shadow-primary/20 transition-shadow bg-card h-full">
                    <CardHeader className="items-center text-center">
                      <div className="p-3 bg-primary/10 rounded-full text-primary inline-block mb-3">
                        <ServiceIcon className="h-8 w-8" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-muted-foreground">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
              Pronto para Transformar Seu Negócio?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Vamos discutir como as soluções da Solude podem ser adaptadas às suas necessidades únicas.
            </p>
            <Button size="lg" asChild className="shadow-lg">
              <Link href="/contact">Entre em Contato</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
