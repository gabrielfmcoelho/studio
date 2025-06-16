
import type { User } from './authService'; // Keep if User type is still used by MOCK_TEAM_MEMBERS
import type { ApiUser } from '@/types/api';
import { Briefcase, Lightbulb, BarChart3, CheckCircle, Users, Zap, ShieldCheck, Settings2 } from 'lucide-react';


export const APP_NAME = "Plataforma Solude";
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

export const SOLUDE_FEATURES = [
  { 
    iconName: "Zap" as const,
    title: "Acelere a Inovação", 
    description: "Utilize tecnologia de ponta para dar transformar sua instituição."
  },
  { 
    iconName: "BarChart3" as const,
    title: "Análises Poderosas",
    description: "Utilize análises abrangentes para fazer escolhas informadas."
  },
  {
    iconName: "ShieldCheck" as const,
    title: "Segurança de Nível Empresarial",
    description: "Proteja seus dados com medidas de segurança robustas."
  },
  { 
    iconName: "CheckCircle" as const, 
    title: "Operações Otimizadas", 
    description: "Otimize seus fluxos de trabalho e processos para máxima eficiência e produtividade."
  }
];

export const OTHER_SOLUDE_SERVICES = [
  { 
    iconName: "Lightbulb" as const,
    title: "Assessoria",
    description: "Assessoria de aporte de informações a partir da análise de dados e avaliações permanentes."
  },
  { 
    iconName: "Briefcase" as const,
    title: "Suporte de Gestão Estratégica", 
    description: "Relatórios com sistematização, avaliação e interpretação de dados em saúde, com visão integral e intersetorial."
  },
  { 
    iconName: "BarChart3" as const,
    title: "Dashboards", 
    description: "Dashboards para monitoramento contínuo de aspectos inerentes às características de saúde da região/população em questão."
  },
  { 
    iconName: "CheckCircle" as const,
    title: "Classificação de Prioridades", 
    description: "Criação de informações e conhecimentos pertinentes sobre a saúde da população em determinado território."
  },
  { 
    iconName: "Zap" as const,
    title: "Monitoramento de Indicadores", 
    description: "Apoio técnico para seleção de indicadores para análise da situação de saúde do município ou território de saúde."
  },
  { 
    iconName: "Users" as const,
    title: "Capacitação", 
    description: "Realização de capacitação para diagnóstico de situação de saúde e análise dos eixos estratégicos da região de saúde abrangida e do planejamento estratégico do estado em questão." 
  },
  { 
    iconName: "Settings2" as const,
    title: "Acompanhamento Técnico", 
    description: "Acompanhamento técnico enquanto durar o projeto, para a promoção de ajustes, aprimoramento e manutenção dos indicadores e resultados alcançados."
  },
  { 
    iconName: "ShieldCheck" as const,
    title: "Análise Externa", 
    description: "Avaliações formativas com os Stakeholders para análise externa dos serviços."
  }
];

export const MOCK_SOLUDE_SOLUTIONS_MARKETING = [
  {
      "benefits": ["Aumento de eficiência em 30%", "Melhora na precisão dos dados", "Maior satisfação do usuário"],
      "description": "Uma plataforma abrangente para gerenciar todas as suas análises de negócios. Oferece processamento de dados em tempo real, ferramentas avançadas de visualização e capacidades de modelagem preditiva para ajudá-lo a tomar decisões informadas.",
      "features": ["Painel em tempo real", "Relatórios personalizados", "Insights com IA", "Opções de exportação de dados"],
      "icon_url": "https://placehold.co/100x100/377BFF/FFFFFF.png?text=SA",
      "id": 1,
      "marketing_name": "Solude Analytics Pro",
      "screenshot_url": "https://placehold.co/600x400.png",
      "tag_line": "Desbloqueie o poder dos seus dados com análises inteligentes.",
      "tags": ["Analytics", "Big Data", "Business Intelligence"]
  },
  {
      "benefits": ["Comunicação com o cliente otimizada", "Visão 360º do cliente", "Fluxos de vendas automatizados"],
      "description": "O Solude CRM capacita suas equipes de vendas e marketing a construir relacionamentos mais fortes com os clientes. Rastreie leads, gerencie contatos e automatize a comunicação para uma jornada do cliente perfeita.",
      "features": ["Gerenciamento de contatos", "Rastreamento do funil de vendas", "Integração de e-mail", "Automação de marketing"],
      "icon_url": "https://placehold.co/100x100/7DF9FF/22293B.png?text=SC",
      "id": 2,
      "marketing_name": "Solude Connect CRM",
      "screenshot_url": "https://placehold.co/600x400.png",
      "tag_line": "Construa relacionamentos duradouros com clientes com facilidade.",
      "tags": ["CRM", "Vendas", "Marketing", "Suporte ao Cliente"]
  },
  {
      "benefits": ["Planejamento de projetos simplificado", "Colaboração em equipe aprimorada", "Entrega de projetos no prazo"],
      "description": "Gerencie projetos de qualquer tamanho com o Solude TaskMaster. Desde a atribuição de tarefas até o acompanhamento do progresso e alocação de recursos, nossa plataforma garante que seus projetos permaneçam no caminho certo e dentro do orçamento.",
      "features": ["Gerenciamento de tarefas", "Gráficos de Gantt", "Rastreamento de tempo", "Ferramentas de colaboração em equipe", "Alocação de recursos"],
      "icon_url": "https://placehold.co/100x100/FFD700/22293B.png?text=ST",
      "id": 3,
      "marketing_name": "Solude TaskMaster",
      "screenshot_url": "https://placehold.co/600x400.png",
      "tag_line": "Organize, rastreie e entregue projetos com sucesso.",
      "tags": ["Gerenciamento de Projetos", "Produtividade", "Colaboração"]
  }
];

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
    name: "Dr. Bruno Guedes", 
    role: "Diretor de Saúde", 
    expertise: "Liderança Estratégica, Gestão de Projetos, Saúde Digital", 
    imageUrl: "https://placehold.co/400x400/377BFF/FFFFFF.png?text=BG", 
    dataAiHint: "man",
    description: "Doutor em microbiologia com experiência em gestão de projetos e evidências em saúde."
  },
  { 
    id: "2", 
    name: "Alone Santos", 
    role: "Diretor de Negócios", 
    expertise: "Financeiro, Relacionamento com Setor Público", 
    imageUrl: "https://placehold.co/400x400/22293B/FFFFFF.png?text=AS", 
    dataAiHint: "man",
    description: "Advogado com ampla experiência em gestão de saúde, arrecadação municipal e vendas para o setor público."
  },
  { 
    id: "3", 
    name: "Dr. José Maria", 
    role: "Diretor de Tecnologia (CTO)", 
    expertise: "Liderança Tecnologica, Inteligência Artificial Aplicada a Saúde", 
    imageUrl: "https://placehold.co/400x400/7DF9FF/22293B.png?text=JM", 
    dataAiHint: "man",
    description: "Doutor em teleinformática, com experiência em gestão de projetos de TI, análises de dados e modelos preditivos."
  },
];

export const AUTH_TOKEN_KEY = "soludeAuthToken";
export const AUTH_REFRESH_TOKEN_KEY = "soludeAuthRefreshToken";
export const USER_DETAILS_KEY = "soludeUserDetails";
