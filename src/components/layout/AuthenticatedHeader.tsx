"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Shield, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const NavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean; }) => (
  <Link href={href} passHref>
    <Button variant={isActive ? "secondary" : "ghost"} className="justify-start">
      {children}
    </Button>
  </Link>
);

export default function AuthenticatedHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  // Conditionally show Admin link based on user role
  const isAdmin = user?.role_id === 1;

  const navLinks = [
    { href: '/hub', label: 'Hub', icon: <LayoutGrid className="mr-2 h-4 w-4" />, show: true },
    { href: '/admin', label: 'Admin', icon: <Shield className="mr-2 h-4 w-4" />, show: isAdmin },
    { href: '/account', label: 'Minha Conta', icon: <User className="mr-2 h-4 w-4" />, show: true },
  ];

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatar.vercel.sh/${user?.email}.png`} alt={user?.first_name || 'User'} />
            <AvatarFallback>{user?.first_name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.first_name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account"><User className="mr-2 h-4 w-4" /><span>Minha Conta</span></Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Main container with justify-between and explicit x-padding */}
      <div className="flex h-16 items-center justify-between w-full px-4 sm:px-6 lg:px-8">
        
        {/* Left Group: Contains Logo and Navigation */}
        <div className="flex items-center">
          {/* Desktop Logo & Nav */}
          <div className="hidden md:flex items-center">
            <Link href="/hub" className="mr-6 flex items-center space-x-2">
              <Logo />
            </Link>
            <nav className="flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
              {navLinks.map(link => link.show && (
                <NavLink key={link.href} href={link.href} isActive={pathname.startsWith(link.href)}>
                  {link.icon} {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Mobile Menu: Sheet Trigger and Content */}
          <div className="md:hidden">
             <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Abrir menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
                  <div className="flex justify-between items-center mb-6">
                    <Link href="/hub">
                      <Logo />
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" aria-label="Fechar menu">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col space-y-2">
                    {navLinks.map(link => link.show && (
                      <SheetClose asChild key={link.href}>
                          <NavLink href={link.href} isActive={pathname.startsWith(link.href)}>
                              {link.icon} {link.label}
                          </NavLink>
                      </SheetClose>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
          </div>
        </div>

        {/* Right Group: User Menu */}
        <div className="flex items-center">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}