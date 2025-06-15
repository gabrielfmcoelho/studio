import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Zap, BarChart3, Users, ShoppingCart, Package } from 'lucide-react';
import FeatureCard from '@/components/landing/FeatureCard';
import { MOCK_SOLUTIONS } from '@/lib/constants';


export default function SolutionsLandingPage() {
  const benefits = [
    { icon: Zap, text: "Accelerate Innovation" },
    { icon: BarChart3, text: "Data-Driven Decisions" },
    { icon: Users, text: "Enhanced Collaboration" },
    { icon: CheckCircle, text: "Streamlined Operations" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-background">
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
                <Link href="/hub">
                  Explore Solutions Hub
                </Link>
              </Button>
            </div>
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
                  <div key={index} className="flex flex-col items-center text-center p-6 bg-card/50 rounded-lg shadow-md hover:shadow-primary/20 transition-shadow duration-300 animate-fade-in" style={{animationDelay: `${index*150}ms`}}>
                    <Icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.text}</h3>
                    <p className="text-muted-foreground text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Featured Solutions Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-foreground mb-12">
              Our Flagship Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_SOLUTIONS.slice(0,3).map((solution, index) => (
                 <div key={solution.id} className="animate-slide-in-from-bottom" style={{ animationDelay: `${index * 150}ms` }}>
                  <FeatureCard
                    iconName={solution.icon as keyof typeof LucideIcons}
                    title={solution.name}
                    description={solution.description}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
             <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/hub">View All Solutions</Link>
              </Button>
            </div>
          </div>
        </section>

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
