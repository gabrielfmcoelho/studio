import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-from-bottom space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Transforme Dados em Saúde com a <span className="text-primary">Plataforma Solude</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Fornecemos soluções de ponta para transformar sua instiuição, otimizar operações. Descubra o poder da inovação com a Solude.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href="/solutions">
                  Explore Nossas Soluções <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="shadow-sm hover:shadow-accent/30 transition-shadow">
                <Link href="#how-it-works"> 
                  <PlayCircle className="mr-2 h-5 w-5" /> Assistir Demo
                </Link>
              </Button>
            </div>
          </div>
          <div className="animate-fade-in delay-300">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Representação Abstrata da Solude Platform"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl object-cover"
              data-ai-hint="abstract technology"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
