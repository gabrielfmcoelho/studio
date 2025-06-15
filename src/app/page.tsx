import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeatureSection from '@/components/landing/FeatureSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        
        {/* How It Works Section Placeholder */}
        <section id="how-it-works" className="py-16 md:py-24 bg-background">
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
                 {/* Replace with actual video player or modal trigger */}
                <Button variant="secondary" size="lg" className="text-lg px-8 py-6 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-3">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                  </svg>
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="contact" className="py-16 md:py-24 bg-primary/10">
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
              <Button size="lg" variant="outline" asChild className="shadow-sm">
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
