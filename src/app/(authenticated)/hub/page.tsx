"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChartBig, 
  KanbanSquare, 
  Contact2, 
  AppWindow,
  Search,
  LucideProps 
} from 'lucide-react';

const applicationsData = [
  [
    {
      "id": 1,
      "name": "Analisador de Dados IA",
      "description": "Visualize e analise seus dados de vendas com o poder da inteligência artificial.",
      "icon_url": "https://cdn-icons-png.flaticon.com/512/2833/2833449.png",
      "screenshot_url": "https://images.ctfassets.net/s3f1lbsnx44a/2932jAabRhp0i4mS94y8eZ/5f8e657e4e137834a942a78f4a1f64f8/drag_and_drop_analytics-email_marketing_software-drip.png",
      "last_update": "2025-06-15T10:00:00Z",
      "price": 50,
      "status": "active",
      "tags": ["IA", "Business Intelligence", "Analytics"]
    },
    {
      "id": 2,
      "name": "Gerenciador de Projetos Ágil",
      "description": "Acompanhe o progresso de suas equipes e projetos em tempo real com quadros Kanban e Scrum.",
      "icon_url": "https://cdn-icons-png.flaticon.com/512/9378/9378517.png",
      "screenshot_url": "https://i.pinimg.com/originals/1a/07/68/1a0768402f02b5420164b1ab832c388a.png",
      "last_update": "2025-06-10T14:30:00Z",
      "price": 25,
      "status": "active",
      "tags": ["Produtividade", "Metodologia Ágil"]
    }
  ],
  [
    {
      "id": 3,
      "name": "CRM Plus",
      "description": "Gerencie o relacionamento com seus clientes e otimize seu funil de vendas.",
      "icon_url": "https://cdn-icons-png.flaticon.com/512/3621/3621438.png",
      "screenshot_url": "https://www.creatio.com/sites/default/files/2022-03/crm-creatio.png",
      "last_update": "2025-05-20T09:00:00Z",
      "price": 40,
      "status": "active",
      "tags": ["Vendas", "Marketing"]
    }
  ]
];

const applications = applicationsData.flat();

const getIconForApp = (app: typeof applications[0]): React.ReactElement<LucideProps> => {
    const iconProps = { size: 32, className: "text-primary" };
    if (app.name.includes("Analisador") || app.tags.includes("Analytics")) {
        return <BarChartBig {...iconProps} />;
    }
    if (app.name.includes("Projetos") || app.tags.includes("Produtividade")) {
        return <KanbanSquare {...iconProps} />;
    }
    if (app.name.includes("CRM") || app.tags.includes("Vendas")) {
        return <Contact2 {...iconProps} />;
    }
    return <AppWindow {...iconProps} />;
};


export default function HubPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Memoize categories to prevent re-calculation on every render
  const categories = useMemo(() => {
    const allTags = new Set(applications.flatMap(app => app.tags));
    return ['All', ...Array.from(allTags)];
  }, []);

  // Filter applications based on selected category and search term
  const filteredApplications = useMemo(() => {
    return applications
      .filter(app => {
        // Category filter
        if (selectedCategory === 'All') return true;
        return app.tags.includes(selectedCategory);
      })
      .filter(app => {
        // Search term filter
        if (searchTerm === '') return true;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return (
          app.name.toLowerCase().includes(lowerCaseSearch) ||
          app.description.toLowerCase().includes(lowerCaseSearch) ||
          app.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
        );
      });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Hub de Soluções</h1>
        <p className="text-muted-foreground">Encontre as ferramentas certas para o seu negócio.</p>
      </div>

      <div className="flex flex-col gap-10 md:flex-row">
        {/* Left Column: Vertical Tabs for Categories */}
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <h2 className="text-lg font-semibold mb-4 px-2">Categorias</h2>
          <Tabs
            orientation="vertical"
            defaultValue="All"
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="flex-col items-stretch h-full bg-transparent p-0 border-none">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="w-full justify-start text-base py-2.5">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </aside>

        {/* Right Column: Search and Grid */}
        <main className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar por nome, descrição ou tag..."
              className="pl-10 h-11 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Grid of Solutions */}
          {filteredApplications.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredApplications.map((app) => (
                <Link
                  key={app.id}
                  href={{
                    pathname: `/solution/${app.id}`,
                    query: { name: app.name, last_update: app.last_update }
                  }}
                  className="group block h-full"
                >
                  <Card className="flex h-full flex-col overflow-hidden rounded-lg border transition-all duration-200 group-hover:shadow-xl group-hover:-translate-y-1">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={app.screenshot_url}
                        alt={`Screenshot of ${app.name}`}
                        width={400}
                        height={225}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="flex flex-grow flex-col p-6">
                      <div className="flex items-start gap-4">
                        {getIconForApp(app)}
                        <div className="flex-1">
                          <CardTitle className="text-lg">{app.name}</CardTitle>
                          <CardDescription className="mt-2 text-sm leading-relaxed">
                            {app.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="mt-auto pt-6">
                        <div className="flex flex-wrap gap-2">
                          {app.tags.map(tag => (
                            <Badge key={tag} variant={tag === selectedCategory ? "default" : "secondary"}>{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            // Message for no results
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 h-[400px] text-center p-8">
              <h3 className="text-2xl font-semibold">Nenhuma solução encontrada</h3>
              <p className="mt-2 text-muted-foreground">
                Tente ajustar sua busca ou selecionar uma categoria diferente.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}