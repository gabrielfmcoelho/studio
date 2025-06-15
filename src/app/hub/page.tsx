
"use client";

import React, { useEffect, useState } from 'react';
import AuthenticatedPageLayout from '@/components/layout/AuthenticatedPageLayout';
import SolutionCard from '@/components/solutions/SolutionCard';
import { Input } from '@/components/ui/input';
import { Search, Loader2, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getAuthToken } from '@/lib/authService';
import type { HubService } from '@/types/api';
import { API_BASE_URL } from '@/lib/constants';

async function fetchOrganizationServices(organizationId: number, token: string): Promise<HubService[]> {
  const response = await fetch(`${API_BASE_URL}/services/organization/${organizationId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    // It's better to handle specific errors or return a type that includes error info
    const errorData = await response.json().catch(() => ({ message: "Falha ao buscar serviços." }));
    throw new Error(errorData.message || `Erro ${response.status} ao buscar serviços`);
  }
  const data = await response.json();
   // The API doc says response is HubService[][], which is odd. Assuming it's HubService[] or {data: HubService[]}
  // If the actual API wraps the array in a 'data' property:
  // return data.data || []; 
  // For now, if it's directly an array:
  return Array.isArray(data) ? data : (data.data || []); // Adjust based on actual API response structure
}


export default function HubPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [solutions, setSolutions] = useState<HubService[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user?.organization_id) {
      const token = getAuthToken();
      if (token) {
        setIsLoadingServices(true);
        setError(null);
        fetchOrganizationServices(user.organization_id, token)
          .then(data => {
            setSolutions(data);
            setIsLoadingServices(false);
          })
          .catch(err => {
            console.error("Failed to fetch services:", err);
            setError(err.message || "Não foi possível carregar as soluções.");
            setIsLoadingServices(false);
          });
      } else {
         setError("Token de autenticação não encontrado.");
         setIsLoadingServices(false);
      }
    } else if (!authLoading && !isAuthenticated) {
      // If auth is loaded and user is not authenticated (e.g. token expired, direct access)
      setError("Você precisa estar logado para ver as soluções.");
      setIsLoadingServices(false);
    }
  }, [isAuthenticated, user, authLoading]);

  const filteredSolutions = solutions.filter(solution =>
    solution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solution.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (solution.tags && solution.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );
  
  if (authLoading) {
    return (
      <AuthenticatedPageLayout pageTitle="Hub de Soluções">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </AuthenticatedPageLayout>
    );
  }

  return (
    <AuthenticatedPageLayout pageTitle="Hub de Soluções">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Soluções Disponíveis</h1>
            <p className="text-muted-foreground">Acesse suas soluções ou explore novas opções.</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Buscar soluções..." 
              className="pl-10 w-full md:w-72 bg-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoadingServices ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Carregando soluções...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center py-12 bg-destructive/10 border border-destructive text-destructive rounded-lg">
            <AlertTriangle className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Erro ao Carregar Soluções</h2>
            <p>{error}</p>
          </div>
        ) : filteredSolutions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSolutions.map((solution, index) => (
              <div key={solution.id} className="animate-slide-in-from-bottom" style={{ animationDelay: `${index * 100}ms` }}>
                <SolutionCard
                  id={solution.id.toString()} // Ensure ID is string for SolutionCard if it expects string
                  name={solution.name}
                  description={solution.description}
                  iconUrl={solution.icon_url}
                  tags={solution.tags}
                  appUrl={solution.app_url || `/solution/${solution.id}`} // Construct URL if not provided
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Nenhuma solução encontrada {searchTerm && `para "${searchTerm}"`}.</p>
          </div>
        )}
      </div>
    </AuthenticatedPageLayout>
  );
}
