import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

interface FeatureCardProps {
  iconName?: keyof typeof LucideIcons;
  iconUrl?: string;
  title: string;
  description: string;
  className?: string;
  detailsList?: string[];
  detailsListTitle?: string;
  actionLink?: string;
  actionText?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  iconName, 
  iconUrl, 
  title, 
  description, 
  className,
  detailsList,
  detailsListTitle,
  actionLink,
  actionText
}) => {
  const IconComponent = iconName ? (LucideIcons[iconName] as React.ElementType) : null;

  return (
    <Card className={`bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col ${className}`}>
      <CardHeader className="items-center text-center">
        {iconUrl ? (
          <div className="mb-4 p-2 bg-primary/10 rounded-lg flex items-center justify-center h-16 w-16">
            <Image src={iconUrl} alt={`${title} icon`} width={48} height={48} className="object-contain" />
          </div>
        ) : IconComponent ? (
          <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary inline-flex items-center justify-center h-16 w-16">
            <IconComponent className="h-8 w-8" />
          </div>
        ) : (
           <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary inline-flex items-center justify-center h-16 w-16">
            <LucideIcons.Package className="h-8 w-8" /> {/* Default icon */}
          </div>
        )}
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-center text-muted-foreground">{description}</CardDescription>
        {detailsList && detailsList.length > 0 && (
          <div className="mt-4 text-left">
            {detailsListTitle && <h4 className="text-sm font-semibold mb-2 text-foreground">{detailsListTitle}</h4>}
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
              {detailsList.slice(0, 5).map((item, idx) => <li key={idx}>{item}</li>)} {/* Limit to 5 items for brevity */}
            </ul>
          </div>
        )}
      </CardContent>
      {actionLink && actionText && (
        <div className="p-6 pt-0 text-center">
          <a href={actionLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline font-medium">
            {actionText}
          </a>
        </div>
      )}
    </Card>
  );
};

export default FeatureCard;
