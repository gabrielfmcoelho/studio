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
    // Using a placeholder API for now as the provided one might not be live or could have CORS issues in this environment.
    // Replace with 'https://api.solude.tech/services/marketing' when ready.
    // const response = await fetch('https://api.solude.tech/services/marketing', { next: { revalidate: 3600 } }); // Revalidate every hour
    const mockApiResponse = [
        {
            "benefits": ["Increased efficiency by 30%", "Improved data accuracy", "Enhanced user satisfaction"],
            "description": "A comprehensive platform for managing all your business analytics. It offers real-time data processing, advanced visualization tools, and predictive modeling capabilities to help you make informed decisions.",
            "features": ["Real-time dashboard", "Custom reporting", "AI-powered insights", "Data export options"],
            "icon_url": "https://placehold.co/100x100/377BFF/FFFFFF.png?text=SA",
            "id": 1,
            "marketing_name": "Solude Analytics Pro",
            "screenshot_url": "https://placehold.co/600x400.png",
            "tag_line": "Unlock the power of your data with intelligent analytics.",
            "tags": ["Analytics", "Big Data", "Business Intelligence"]
        },
        {
            "benefits": ["Streamlined customer communication", "360-degree customer view", "Automated sales workflows"],
            "description": "Solude CRM empowers your sales and marketing teams to build stronger customer relationships. Track leads, manage contacts, and automate communication for a seamless customer journey.",
            "features": ["Contact management", "Sales pipeline tracking", "Email integration", "Marketing automation"],
            "icon_url": "https://placehold.co/100x100/7DF9FF/22293B.png?text=SC",
            "id": 2,
            "marketing_name": "Solude Connect CRM",
            "screenshot_url": "https://placehold.co/600x400.png",
            "tag_line": "Build lasting customer relationships with ease.",
            "tags": ["CRM", "Sales", "Marketing", "Customer Support"]
        },
        {
            "benefits": ["Simplified project planning", "Improved team collaboration", "On-time project delivery"],
            "description": "Manage projects of any size with Solude TaskMaster. From task assignment to progress tracking and resource allocation, our platform ensures your projects stay on track and within budget.",
            "features": ["Task management", "Gantt charts", "Time tracking", "Team collaboration tools", "Resource allocation"],
            "icon_url": "https://placehold.co/100x100/FFD700/22293B.png?text=ST",
            "id": 3,
            "marketing_name": "Solude TaskMaster",
            "screenshot_url": "https://placehold.co/600x400.png",
            "tag_line": "Organize, track, and deliver projects successfully.",
            "tags": ["Project Management", "Productivity", "Collaboration"]
        }
    ];
    // if (!response.ok) {
    //   console.error('Failed to fetch marketing solutions:', response.statusText);
    //   return mockApiResponse; // Fallback to mock data on error
    // }
    // const data = await response.json();
    // return data.length > 0 ? data : mockApiResponse; // Use mock if API returns empty
    return mockApiResponse;
  } catch (error) {
    console.error('Error fetching marketing solutions:', error);
    return []; // Return empty or mock on error
  }
}


export default async function SolutionsLandingPage() {
  const solutions = await getMarketingSolutions();

  const benefits = [
    { icon: Zap, text: "Accelerate Innovation", description: "Leverage cutting-edge technology to bring your ideas to life faster than ever before."},
    { icon: BarChart3, text: "Data-Driven Decisions", description: "Utilize comprehensive analytics to make informed choices that drive your business forward."},
    { icon: Users, text: "Enhanced Collaboration", description: "Foster teamwork and communication with integrated tools designed for seamless collaboration."},
    { icon: CheckCircle, text: "Streamlined Operations", description: "Optimize your workflows and processes for maximum efficiency and productivity."},
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
              Tailored Solutions for <span className="text-primary">Your Success</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto mb-10 animate-slide-in-from-bottom" style={{animationDelay: '200ms'}}>
              Discover Solude's comprehensive suite of solutions designed to tackle your toughest challenges and unlock new opportunities for growth and efficiency.
            </p>
            <div className="animate-slide-in-from-bottom" style={{animationDelay: '400ms'}}>
              <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href="/contact">
                  Request a Demo
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Solutions Section from API */}
        <section className="py-16 md:py-24 bg-section-alternate-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-foreground mb-12">
              Our Flagship Solutions
            </h2>
            {solutions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((solution, index) => (
                  <div key={solution.id} className="animate-slide-in-from-bottom h-full" style={{ animationDelay: `${index * 150}ms` }}>
                    <FeatureCard
                      iconUrl={solution.icon_url}
                      title={solution.marketing_name}
                      description={solution.tag_line}
                      detailsList={solution.features}
                      detailsListTitle="Key Features:"
                      className="h-full"
                      // actionLink={solution.screenshot_url} // Could link to a product page or screenshot
                      // actionText="Learn More"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Loading solutions or no solutions to display at the moment.</p>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-foreground mb-12">
              Why Choose Solude?
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
              Explore Our Comprehensive Services
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

        <PartnersCarousel sectionBgClass="bg-section-alternate-background" />


        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Let's discuss how Solude's solutions can be tailored to your unique needs.
            </p>
            <Button size="lg" asChild className="shadow-lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
