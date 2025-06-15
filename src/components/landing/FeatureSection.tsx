import FeatureCard from './FeatureCard';

export default function FeatureSection() {
  const features = [
    {
      iconName: "BarChartBig" as const,
      title: "Powerful Analytics",
      description: "Gain deep insights with our advanced analytics tools and customizable dashboards."
    },
    {
      iconName: "Users" as const,
      title: "Seamless Collaboration",
      description: "Work together efficiently with integrated communication and project management features."
    },
    {
      iconName: "ShieldCheck" as const,
      title: "Enterprise-Grade Security",
      description: "Protect your data with robust security measures and compliance certifications."
    },
    {
      iconName: "Settings2" as const,
      title: "Highly Customizable",
      description: "Tailor the platform to your specific needs with flexible configurations and integrations."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Solude Platform offers a comprehensive suite of tools designed to elevate your business performance and drive innovation.
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
