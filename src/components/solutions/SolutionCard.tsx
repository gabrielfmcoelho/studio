import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SolutionCardProps {
  id: string;
  name: string;
  description: string;
  icon?: keyof typeof LucideIcons;
  category?: string;
}

export default function SolutionCard({ id, name, description, icon, category }: SolutionCardProps) {
  const IconComponent = icon ? (LucideIcons[icon] as React.ElementType) : LucideIcons.Package;

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          {category && <Badge variant="secondary" className="mt-1 text-xs">{category}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-colors">
          <Link href={`/solution/${id}`}>
            Access Solution <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
