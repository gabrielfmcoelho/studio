
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // useRouter removed as handleLogout is in useAuth
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAuth, User } from '@/hooks/useAuth'; // Import User from useAuth
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const getIcon = (iconName: string): React.FC<LucideIcons.LucideProps> | null => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.HelpCircle; 
};

interface AuthenticatedPageLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function AuthenticatedPageLayout({ children, pageTitle }: AuthenticatedPageLayoutProps) {
  const pathname = usePathname();
  const { user, logout, isLoading: authIsLoading } = useAuth(); // Get user and logout from useAuth

  const adminNavLink = NAV_LINKS.authenticated.find(link => link.href === "/admin");

  const navLinksToDisplay = NAV_LINKS.authenticated.filter(link => {
    if (link.href === "/admin") {
      return user?.role_id === 1; // Assuming role_id 1 is admin
    }
    return true;
  });
  
  const NavLink = ({ href, label, iconName }: { href: string; label: string; iconName?: string }) => {
    const Icon = iconName ? getIcon(iconName) : null;
    const isActive = pathname === href || (href !== '/hub' && pathname.startsWith(href));
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={isActive}
          className={cn(isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50")}
          tooltip={label}
        >
          <Link href={href}>
            {Icon && <Icon className="h-5 w-5" />}
            <span>{label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  const displayName = user?.first_name || user?.email?.split('@')[0] || 'Usuário';
  const avatarFallback = displayName.charAt(0).toUpperCase();


  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <Sidebar collapsible="icon" className="border-r border-sidebar-border">
          <SidebarHeader className="p-4">
            <Link href="/hub" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
               <Logo iconOnly className="group-data-[collapsible=icon]:block hidden" />
               <Logo className="group-data-[collapsible=icon]:hidden" />
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {navLinksToDisplay.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} iconName={link.icon as string} />
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 mt-auto border-t border-sidebar-border">
             <SidebarMenuButton
                onClick={logout} // Use logout from useAuth
                className="w-full hover:bg-destructive/20 hover:text-destructive group-data-[collapsible=icon]:justify-center"
                tooltip="Sair"
              >
                <LucideIcons.LogOut className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">Sair</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-6 shadow-sm">
            <div className="flex items-center gap-4">
               <SidebarTrigger className="md:hidden" /> {/* Mobile toggle */}
               {pageTitle && <h1 className="text-xl font-semibold">{pageTitle}</h1>}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.first_name ? `https://avatar.vercel.sh/${user.first_name}.png` : `https://avatar.vercel.sh/${user?.email || 'default'}.png`} alt={displayName} />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "Nenhum e-mail"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account"><LucideIcons.User className="mr-2 h-4 w-4" /> Conta</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LucideIcons.LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
