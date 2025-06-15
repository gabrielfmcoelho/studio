
export const APP_NAME = "Solude Platform";

export const NAV_LINKS = {
  public: [
    { href: "/", label: "Início" },
    { href: "/solutions", label: "Soluções" },
    { href: "/team", label: "Equipe" },
  ],
  authenticated: [
    { href: "/hub", label: "Hub de Soluções", icon: "LayoutDashboard" },
    { href: "/account", label: "Minha Conta", icon: "UserCircle" },
    { href: "/admin", label: "Painel Admin", icon: "ShieldCheck" },
  ],
};

export const MOCK_SOLUTIONS = [
  { id: "solution-1", name: "Alpha Analytics", description: "Processamento e visualização avançada de dados.", url: "https://example.com/alpha-analytics-app", icon: "BarChart3", category: "Analytics" },
  { id: "solution-2", name: "Beta CRM", description: "Suite de gerenciamento de relacionamento com o cliente.", url: "https://example.com/beta-crm-app", icon: "Users", category: "CRM" },
  { id: "solution-3", name: "Gamma Project Manager", description: "Ferramenta colaborativa de acompanhamento de projetos.", url: "https://example.com/gamma-pm-app", icon: "KanbanSquare", category: "Produtividade" },
  { id: "solution-4", name: "Delta E-commerce", description: "Plataforma de loja online completa.", url: "https://example.com/delta-ecom-app", icon: "ShoppingCart", category: "E-commerce" },
];

export const MOCK_TEAM_MEMBERS = [
  { 
    id: "1", 
    name: "Dra. Elara Vance", 
    role: "Diretora Executiva (CEO)", 
    expertise: "Liderança Estratégica, Inovação", 
    imageUrl: "https://placehold.co/400x400.png", 
    dataAiHint: "woman portrait",
    description: "Dra. Vance é uma líder visionária com mais de 20 anos em tecnologia, impulsionando inovação e crescimento estratégico para empresas globais."
  },
  { 
    id: "2", 
    name: "Marcus Chen", 
    role: "Diretor de Tecnologia (CTO)", 
    expertise: "Arquitetura de Software, IA", 
    imageUrl: "https://placehold.co/400x400.png", 
    dataAiHint: "man portrait",
    description: "Marcus projeta soluções de ponta, utilizando IA e sistemas escaláveis para resolver desafios complexos de negócios."
  },
  { 
    id: "3", 
    name: "Sofia Reyes", 
    role: "VP de Soluções", 
    expertise: "Gerenciamento de Produto, Design UX", 
    imageUrl: "https://placehold.co/400x400.png", 
    dataAiHint: "woman professional",
    description: "Sofia traduz as necessidades dos clientes em produtos impactantes, focando em design centrado no usuário e experiências fluidas."
  },
  { 
    id: "4", 
    name: "James Miller", 
    role: "Engenheiro Líder", 
    expertise: "Desenvolvimento Full-Stack", 
    imageUrl: "https://placehold.co/400x400.png", 
    dataAiHint: "man tech",
    description: "James lidera nossa equipe de desenvolvimento, garantindo código robusto, de alta qualidade e entrega eficiente de projetos."
  },
];

export const AUTH_TOKEN_KEY = "soludeAuthToken";
