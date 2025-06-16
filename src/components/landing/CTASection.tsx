import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


interface CTASectionProps {
    id: string;
    sectionBgClass?: string
    title: string;
    subtitle: string;
    primaryActionText: string;
    primaryActionLink: string;
    secondaryActionText: string;
    secondaryActionLink: string;
}

export default function CTASection({
    id,
    sectionBgClass = 'bg-background',
    title,
    subtitle,
    primaryActionText,
    primaryActionLink,
    secondaryActionText,
    secondaryActionLink,
}: CTASectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", sectionBgClass)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild className="shadow-lg">
            <Link href={primaryActionLink}>{primaryActionText}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-sm border-primary/50 text-primary hover:bg-primary/10">
            <Link href={secondaryActionLink}>{secondaryActionText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}