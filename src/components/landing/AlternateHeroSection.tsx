import { Button } from '@/components/ui/button';
import Link from 'next/link';


interface AlternateHeroSectionProps {
    /** The icon component to display above the title (e.g., HeartPulse) */
    IconComponent: React.ElementType;
    /** The first part of the main title */
    titleStart: string;
    /** The highlighted part of the title */
    titleHighlight: string;
    /** The descriptive paragraph below the title */
    subtitle: string;
    /** (Optional) The text to display on the action button */
    buttonText?: string;
    /** (Optional) The URL the action button should link to */
    buttonLink?: string;
    /** (Optional) Custom classes for the section container */
    className?: string;
  }
  
export default function AlternateHeroSection({
    IconComponent,
    titleStart,
    titleHighlight,
    subtitle,
    buttonText,
    buttonLink,
    className = 'bg-background'
  }: AlternateHeroSectionProps) {
    return (
      <section className={`py-20 md:py-32 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icon with fade-in animation */}
          <IconComponent className="mx-auto h-16 w-16 text-primary mb-6 animate-fade-in" />
          
          {/* Main title with slide-in animation */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 animate-slide-in-from-bottom">
            {titleStart} <span className="text-primary">{titleHighlight}</span>
          </h1>
          
          {/* Subtitle with a delayed slide-in animation */}
          <p 
            className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto mb-10 animate-slide-in-from-bottom whitespace-pre-line" 
            style={{ animationDelay: '200ms' }}
          >
            {subtitle}
          </p>
          
          {/* Optional Button: Renders only if buttonText and buttonLink are provided */}
          {buttonText && buttonLink && (
            <div className="animate-slide-in-from-bottom" style={{ animationDelay: '400ms' }}>
              <Button size="lg" className="shadow-lg hover:shadow-primary/50">
                <Link href={buttonLink}>
                    {buttonText}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }