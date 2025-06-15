import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  iconName?: keyof typeof LucideIcons;
  iconUrl?: string; // Can be a small icon URL or a larger screenshot URL
  title: string;
  description: string;
  className?: string;
  detailsList?: string[];
  detailsListTitle?: string;
  actionLink?: string;
  actionText?: string;
  isScreenshot?: boolean; // New prop to indicate if iconUrl is a screenshot
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
  actionText,
  isScreenshot = false
}) => {
  const IconComponent = iconName ? (LucideIcons[iconName] as React.ElementType) : null;

  return (
    <Card className={cn("bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col", className)}>
      {isScreenshot && iconUrl ? (
        <div className="relative w-full aspect-video">
          <Image 
            src={iconUrl} 
            alt={`${title} screenshot`} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-t-lg"
            data-ai-hint="software screenshot"
          />
        </div>
      ) : (
        <CardHeader className="items-center text-center pt-6">
          {iconUrl ? ( // For small icon URLs
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
      )}
      
      {!isScreenshot && ( // If it's a screenshot, title might be part of the image or styled differently
          <CardHeader className="items-center text-center pt-2">
             <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          </CardHeader>
      )}
      {isScreenshot && (
         <CardHeader className="items-center text-center pt-6">
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
         </CardHeader>
      )}


      <CardContent className="flex-grow">
        <CardDescription className="text-center text-muted-foreground">{description}</CardDescription>
        {detailsList && detailsList.length > 0 && (
          <div className="mt-4 text-left">
            {detailsListTitle && <h4 className="text-sm font-semibold mb-2 text-foreground">{detailsListTitle}</h4>}
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
              {detailsList.slice(0, 5).map((item, idx) => <li key={idx}>{item}</li>)}
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
