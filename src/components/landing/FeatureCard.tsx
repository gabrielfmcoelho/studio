import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

interface FeatureCardProps {
  iconName: keyof typeof LucideIcons;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconName, title, description, className }) => {
  const IconComponent = LucideIcons[iconName] as React.ElementType;

  return (
    <Card className={`bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-shadow duration-300 ${className}`}>
      <CardHeader className="items-center text-center">
        {IconComponent && (
          <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary">
            <IconComponent className="h-8 w-8" />
          </div>
        )}
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
