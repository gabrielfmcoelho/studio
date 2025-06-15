import AuthenticatedPageLayout from '@/components/layout/AuthenticatedPageLayout';
import { MOCK_SOLUTIONS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface SolutionPageProps {
  params: { id: string };
}

// This is a Server Component
export default async function SolutionPage({ params }: SolutionPageProps) {
  const solutionId = params.id;
  // In a real app, fetch solution details by ID
  const solution = MOCK_SOLUTIONS.find(s => s.id === solutionId);

  if (!solution) {
    return (
      <AuthenticatedPageLayout pageTitle="Solution Not Found">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Solution Not Found</h1>
          <p className="text-muted-foreground">The solution you are looking for does not exist or you do not have access to it.</p>
        </div>
      </AuthenticatedPageLayout>
    );
  }

  return (
    <AuthenticatedPageLayout pageTitle={solution.name}>
      <Card className="w-full h-[calc(100vh-10rem)] shadow-lg overflow-hidden"> {/* Adjust height as needed */}
        <CardHeader className="border-b">
          <CardTitle className="text-xl">{solution.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-full">
          <iframe
            src={solution.url}
            title={solution.name}
            className="w-full h-full border-0"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups" // Adjust sandbox rules as needed
          />
        </CardContent>
      </Card>
      <div className="mt-4 p-4 bg-card rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">About this Solution:</h3>
        <p className="text-sm text-muted-foreground">{solution.description}</p>
      </div>
    </AuthenticatedPageLayout>
  );
}

// Generate static paths for solutions if they are known at build time
export async function generateStaticParams() {
  return MOCK_SOLUTIONS.map(solution => ({
    id: solution.id,
  }));
}
