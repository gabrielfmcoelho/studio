"use client";

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Expand, Shrink, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SolutionPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // Get data from URL
  const id = params.id;
  const name = searchParams.get('name') || `Solução ${id}`;
  const lastUpdate = searchParams.get('last_update');
  
  // State for fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // In a real app, you would fetch the solution URL based on the ID
  const solutionUrl = `https://iframe-placeholder.glitch.me/?title=${name.replace(/\s/g, '+')}`;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Effect to handle exiting fullscreen with the 'Escape' key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    // Main container that adapts to fullscreen mode
    <div className={cn("flex flex-col h-full w-full transition-all duration-300", {
      "fixed inset-0 z-[100] bg-background": isFullscreen,
    })}>
      
      {/* Page Header */}
      <header className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
            {lastUpdate && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="mr-2 h-4 w-4" />
                Última atualização: {new Date(lastUpdate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            )}
          </div>
        </div>
        <Button variant="outline" onClick={toggleFullscreen}>
          {isFullscreen ? (
            <>
              <Shrink className="mr-2 h-4 w-4" /> Sair da Tela Cheia
            </>
          ) : (
            <>
              <Expand className="mr-2 h-4 w-4" /> Tela Cheia
            </>
          )}
        </Button>
      </header>

      {/* Iframe Container */}
      <div className="flex-grow w-full h-full">
          <iframe
            src={solutionUrl}
            title={name}
            className="h-full w-full rounded-lg border bg-white"
            style={{ minHeight: isFullscreen ? '100vh' : 'calc(100vh - 150px)' }} // Adjust height
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
      </div>
    </div>
  );
}