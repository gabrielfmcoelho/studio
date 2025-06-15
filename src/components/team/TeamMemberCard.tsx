import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Linkedin, Twitter, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TeamMemberCardProps {
  name: string;
  role: string;
  expertise: string;
  imageUrl: string;
  dataAiHint: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  className?: string;
}

export default function TeamMemberCard({
  name,
  role,
  expertise,
  imageUrl,
  dataAiHint,
  linkedinUrl = "#",
  twitterUrl = "#",
  className
}: TeamMemberCardProps) {
  return (
    <Card className={cn("overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card flex flex-col", className)}>
      <CardHeader className="p-0">
        <div className="relative w-full aspect-[4/3]"> {/* Changed to aspect ratio for consistency */}
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
            data-ai-hint={dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-center flex flex-col flex-grow">
        <CardTitle className="text-xl font-semibold text-primary mb-1">{name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 flex items-center justify-center">
          <Briefcase size={14} className="mr-2 flex-shrink-0" /> {role}
        </CardDescription>
        <Badge variant="secondary" className="mb-4 text-xs">{expertise}</Badge>
        
        <div className="flex justify-center space-x-3 mt-auto pt-3">
          {twitterUrl && twitterUrl !== "#" && (
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Twitter`} className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
          )}
          {linkedinUrl && linkedinUrl !== "#" && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn`} className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
