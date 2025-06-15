import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Linkedin, Twitter, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TeamMemberCardProps {
  name: string;
  role: string;
  expertise: string;
  imageUrl: string;
  dataAiHint: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

export default function TeamMemberCard({
  name,
  role,
  expertise,
  imageUrl,
  dataAiHint,
  linkedinUrl = "#",
  twitterUrl = "#"
}: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
      <CardHeader className="p-0">
        <div className="relative w-full h-56 sm:h-64">
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
      <CardContent className="p-6 text-center">
        <CardTitle className="text-xl font-semibold text-primary mb-1">{name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 flex items-center justify-center">
          <Briefcase size={14} className="mr-2" /> {role}
        </CardDescription>
        <Badge variant="secondary" className="mb-4 text-xs">{expertise}</Badge>
        
        <div className="flex justify-center space-x-3 mt-4">
          {twitterUrl && (
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Twitter`} className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn`} className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
