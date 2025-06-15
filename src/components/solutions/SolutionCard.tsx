
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package as DefaultIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SolutionCardProps {
  id: string | number; // API ID is number
  name: string;
  description: string;
  iconUrl?: string | null; // From HubService
  lucideIconName?: keyof typeof LucideIcons; // For existing MOCK_SOLUTIONS compatibility
  category?: string; // From MOCK_SOLUTIONS
  tags?: string[]; // From HubService
  appUrl?: string; // URL to launch the solution
}

export default function SolutionCard({ 
  id, 
  name, 
  description, 
  iconUrl, 
  lucideIconName, 
  category, 
  tags,
  appUrl
}: SolutionCardProps) {
  const IconComponent = lucideIconName ? (LucideIcons[lucideIconName] as React.ElementType) : DefaultIcon;
  const displayTags = tags || (category ? [category] : []);
  const launchUrl = appUrl || `/solution/${id}`; // Fallback to old routing if appUrl not provided

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3 pt-5 px-5">
        {iconUrl ? (
          <div className="relative h-12 w-12 flex-shrink-0">
            <Image src={iconUrl} alt={`${name} icon`} layout="fill" objectFit="contain" />
          </div>
        ) : (
          <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
            <IconComponent className="h-6 w-6" />
          </div>
        )}
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold line-clamp-2">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow px-5 pb-3">
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-2">{description}</CardDescription>
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {displayTags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <Button asChild variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-colors">
          <Link href={launchUrl}>
            Acessar Solução <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
