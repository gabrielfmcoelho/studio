
import type { User } from './authService'; // Keep if User type is still used by MOCK_TEAM_MEMBERS
import type { ApiUser } from '@/types/api';


export const APP_NAME = "Solude Platform";
export const API_BASE_URL = "https://api.solude.tech";

export const NAV_LINKS = {
  public: [
    { href: "/", label: "Início" },
    { href: "/solutions", label: "Soluções" },
    { href: "/team", label: "Equipe" },
    // { href: "/contact", label: "Contato" }, // Already in MainHeader, this might be redundant here
  ],
  authenticated: [
    { href: "/hub", label: "Hub de Soluções", icon: "LayoutDashboard" },
    { href: "/account", label: "Minha Conta", icon: "UserCircle" },
    // Admin link should be conditional based on user role
    // { href: "/admin", label: "Painel Admin", icon: "ShieldCheck" }, 
  ],
};

// MOCK_SOLUTIONS is now for the /solution/[id] page, Hub uses API
export const MOCK_SOLUTIONS = [
  { id: "1", name: "Alpha Analytics", description: "Processamento e visualização avançada de dados.", url: "https://prod.solude.tech/samples/sample-solution-1.html", icon: "BarChart3", category: "Analytics" },
  { id: "2", name: "Beta CRM", description: "Suite de gerenciamento de relacionamento com o cliente.", url: "https://prod.solude.tech/samples/sample-solution-2.html", icon: "Users", category: "CRM" },
  { id: "3", name: "Gamma Project Manager", description: "Ferramenta colaborativa de acompanhamento de projetos.", url: "https://prod.solude.tech/samples/sample-solution-3.html", icon: "KanbanSquare", category: "Produtividade" },
  { id: "4", name: "Delta E-commerce", description: "Plataforma de loja online completa.", url: "https://prod.solude.tech/samples/sample-solution-4.html", icon: "ShoppingCart", category: "E-commerce" },
];


export const MOCK_TEAM_MEMBERS = [
  { 
    id: "1", 
    name: "Dra. Elara Vance", 
    role: "Diretora Executiva (CEO)", 
    expertise: "Liderança Estratégica, Inovação em Saúde Digital", 
    imageUrl: "https://placehold.co/400x400/377BFF/FFFFFF.png?text=EV", 
    dataAiHint: "woman portrait professional",
    description: "Dra. Vance é uma líder visionária com mais de 20 anos em tecnologia e saúde, impulsionando inovação e crescimento estratégico para transformar o setor de saúde."
  },
  { 
    id: "2", 
    name: "Marcus Chen", 
    role: "Diretor de Tecnologia (CTO)", 
    expertise: "Arquitetura de Software, Inteligência Artificial em Saúde", 
    imageUrl: "https://placehold.co/400x400/22293B/FFFFFF.png?text=MC", 
    dataAiHint: "man portrait tech professional",
    description: "Marcus projeta soluções de saúde de ponta, utilizando IA e sistemas escaláveis para resolver desafios complexos e melhorar os resultados dos pacientes."
  },
  { 
    id: "3", 
    name: "Sofia Reyes", 
    role: "VP de Soluções ao Cliente", 
    expertise: "Gerenciamento de Produto em Saúde, Design UX/UI", 
    imageUrl: "https://placehold.co/400x400/7DF9FF/22293B.png?text=SR", 
    dataAiHint: "woman professional product manager",
    description: "Sofia traduz as necessidades de clientes do setor de saúde em produtos impactantes, focando em design centrado no usuário e experiências de saúde digitais fluidas."
  },
  { 
    id: "4", 
    name: "James Miller", 
    role: "Engenheiro de Software Sênior", 
    expertise: "Desenvolvimento Full-Stack para Saúde, Segurança de Dados", 
    imageUrl: "https://placehold.co/400x400/cccccc/22293B.png?text=JM", 
    dataAiHint: "man tech engineer",
    description: "James lidera nossa equipe de desenvolvimento de software, garantindo soluções de saúde robustas, seguras, de alta qualidade e entrega eficiente de projetos."
  },
];

export const AUTH_TOKEN_KEY = "soludeAuthToken";
export const AUTH_REFRESH_TOKEN_KEY = "soludeAuthRefreshToken";
export const USER_DETAILS_KEY = "soludeUserDetails";
