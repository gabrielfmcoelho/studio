// src/components/layout/AuthenticatedPageLayout.tsx
"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { UserProfileDropdown } from './UserProfileDropdown';
import { SidebarLogo } from './SidebarLogo';

// Helper to get Lucide icons safely
const getIcon = (iconName: string): React.FC<LucideIcons.LucideProps> => {
  return (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
};

// Component for a single navigation link
function NavLink({ href, label, iconName }: { href: string; label: string; iconName: string }) {
  const Icon = getIcon(iconName);
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/hub' && pathname.startsWith(href));

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
        <Link href={href}>
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

interface AuthenticatedPageLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function AuthenticatedPageLayout({ children, pageTitle }: AuthenticatedPageLayoutProps) {
  const { user, logout } = useAuth();

  const navLinksToDisplay = useMemo(() =>
    NAV_LINKS.authenticated.filter(link => {
      if (link.href === "/admin") {
        return user?.role_id === 1; // Show admin link only to admins
      }
      return true;
    }),
    [user?.role_id]
  );

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <Sidebar collapsible="icon" className="border-r border-sidebar-border">
          <SidebarHeader className="p-4 flex items-center justify-center">
            <SidebarLogo />
          </SidebarHeader>

          <SidebarContent className="p-2 flex-grow">
            <SidebarMenu>
              {navLinksToDisplay.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} iconName={link.icon as string} />
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4 mt-auto border-t border-sidebar-border">
            {/* Change: API Link added here */}
            <NavLink href="/api-docs" label="API" iconName="Code" />
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout} className="w-full text-red-500/80 hover:bg-destructive/20 hover:text-destructive" tooltip="Sair">
                <LucideIcons.LogOut className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col w-full">
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <SidebarTrigger className="hidden md:block" />
              {pageTitle && <h1 className="text-xl font-semibold">{pageTitle}</h1>}
            </div>
            <UserProfileDropdown />
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}