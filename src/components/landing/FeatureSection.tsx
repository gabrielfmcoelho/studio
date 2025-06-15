import FeatureCard from './FeatureCard';

export default function FeatureSection() {
  const features = [
    {
      iconName: "BarChartBig" as const,
      title: "Análises Poderosas",
      description: "Obtenha insights profundos com nossas ferramentas avançadas de análise e dashboards personalizáveis."
    },
    {
      iconName: "Users" as const,
      title: "Colaboração Contínua",
      description: "Trabalhe em conjunto de forma eficiente com recursos integrados de comunicação e gerenciamento de projetos."
    },
    {
      iconName: "ShieldCheck" as const,
      title: "Segurança de Nível Empresarial",
      description: "Proteja seus dados com medidas de segurança robustas e certificações de conformidade."
    },
    {
      iconName: "Settings2" as const,
      title: "Altamente Personalizável",
      description: "Adapte a plataforma às suas necessidades específicas com configurações e integrações flexíveis."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Tudo o que Você Precisa para o Sucesso
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A Solude Platform oferece um conjunto abrangente de ferramentas projetadas para elevar o desempenho do seu negócio e impulsionar a inovação.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="animate-slide-in-from-bottom" style={{ animationDelay: `${index * 150}ms` }}>
              <FeatureCard              
                iconName={feature.iconName}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
