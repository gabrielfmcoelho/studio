export const APP_NAME = "Solude Platform";

export const NAV_LINKS = {
  public: [
    { href: "/", label: "Home" },
    { href: "/solutions", label: "Solutions" },
    { href: "/team", label: "Team" },
  ],
  authenticated: [
    { href: "/hub", label: "Solutions Hub", icon: "LayoutDashboard" },
    { href: "/account", label: "My Account", icon: "UserCircle" },
    { href: "/admin", label: "Admin Panel", icon: "ShieldCheck" },
  ],
};

export const MOCK_SOLUTIONS = [
  { id: "solution-1", name: "Alpha Analytics", description: "Advanced data processing and visualization.", url: "https://example.com/alpha-analytics-app", icon: "BarChart3", category: "Analytics" },
  { id: "solution-2", name: "Beta CRM", description: "Customer relationship management suite.", url: "https://example.com/beta-crm-app", icon: "Users", category: "CRM" },
  { id: "solution-3", name: "Gamma Project Manager", description: "Collaborative project tracking tool.", url: "https://example.com/gamma-pm-app", icon: "KanbanSquare", category: "Productivity" },
  { id: "solution-4", name: "Delta E-commerce", description: "Full-featured online store platform.", url: "https://example.com/delta-ecom-app", icon: "ShoppingCart", category: "E-commerce" },
];

export const MOCK_TEAM_MEMBERS = [
  { id: "1", name: "Dr. Elara Vance", role: "Chief Executive Officer", expertise: "Strategic Leadership, Innovation", imageUrl: "https://placehold.co/300x300.png", dataAiHint: "woman portrait" },
  { id: "2", name: "Marcus Chen", role: "Chief Technology Officer", expertise: "Software Architecture, AI", imageUrl: "https://placehold.co/300x300.png", dataAiHint: "man portrait" },
  { id: "3", name: "Sofia Reyes", role: "VP of Solutions", expertise: "Product Management, UX Design", imageUrl: "https://placehold.co/300x300.png", dataAiHint: "woman professional" },
  { id: "4", name: "James Miller", role: "Lead Engineer", expertise: "Full-Stack Development", imageUrl: "https://placehold.co/300x300.png", dataAiHint: "man tech" },
];

export const AUTH_TOKEN_KEY = "soludeAuthToken";
