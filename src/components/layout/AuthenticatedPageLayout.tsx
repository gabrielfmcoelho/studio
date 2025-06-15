"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { logout as apiLogout, getCurrentUser, User } from '@/lib/authService';
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
} from '@/components/ui/sidebar'; // Ensure this path is correct
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dynamically get Lucide Icons
const getIcon = (iconName: string): React.FC<LucideIcons.LucideProps> | null => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.HelpCircle; // Fallback icon
};

interface AuthenticatedPageLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function AuthenticatedPageLayout({ children, pageTitle }: AuthenticatedPageLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    apiLogout();
    router.push('/login');
    router.refresh();
  };
  
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
              {NAV_LINKS.authenticated.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} iconName={link.icon as string} />
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 mt-auto border-t border-sidebar-border">
             <SidebarMenuButton
                onClick={handleLogout}
                className="w-full hover:bg-destructive/20 hover:text-destructive group-data-[collapsible=icon]:justify-center"
                tooltip="Logout"
              >
                <LucideIcons.LogOut className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
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
                    <AvatarImage src={currentUser?.name ? `https://avatar.vercel.sh/${currentUser.name}.png` : `https://avatar.vercel.sh/default.png`} alt={currentUser?.name || 'User'} />
                    <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser?.email || "No email"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account"><LucideIcons.User className="mr-2 h-4 w-4" /> Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LucideIcons.LogOut className="mr-2 h-4 w-4" />
                  Logout
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
