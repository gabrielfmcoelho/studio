import AuthenticatedPageLayout from '@/components/layout/AuthenticatedPageLayout';
import SolutionCard from '@/components/solutions/SolutionCard';
import { MOCK_SOLUTIONS } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
// Server component, so no 'use client' needed at top level

export default function HubPage() {
  // In a real app, this data would be fetched, possibly with search/filter params
  const solutions = MOCK_SOLUTIONS;

  return (
    <AuthenticatedPageLayout pageTitle="Solutions Hub">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Available Solutions</h1>
            <p className="text-muted-foreground">Access your subscribed solutions or explore new ones.</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search solutions..." 
              className="pl-10 w-full md:w-72 bg-input" 
            />
          </div>
        </div>

        {solutions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <div key={solution.id} className="animate-slide-in-from-bottom" style={{ animationDelay: `${index * 100}ms` }}>
                <SolutionCard
                  id={solution.id}
                  name={solution.name}
                  description={solution.description}
                  icon={solution.icon as any} // Cast for now, ideally ensure icon is valid Lucide key
                  category={solution.category}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No solutions available at the moment.</p>
          </div>
        )}
      </div>
    </AuthenticatedPageLayout>
  );
}
