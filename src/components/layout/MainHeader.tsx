
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { isAuthenticated as checkAuth, logout as apiLogout } from '@/lib/authService';
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export default function MainHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, [pathname]);

  const handleLogout = () => {
    apiLogout();
    setIsAuthenticated(false);
    router.push('/login');
    router.refresh();
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Button variant="ghost" asChild className={cn("text-sm font-medium", pathname === href ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
      <Link href={href}>{children}</Link>
    </Button>
  );
  
  const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
     <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "block px-3 py-2 rounded-md text-base font-medium",
          pathname === href ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted hover:text-accent-foreground"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {children}
      </Link>
    </SheetClose>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-grow items-center space-x-1 lg:space-x-2 ml-6 lg:ml-8">
          {NAV_LINKS.public.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
          ))}
        </nav>

        {/* Auth Buttons & Mobile Menu Trigger Group - Pushed to the right */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2"> 
            {isAuthenticated ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/hub">Ir para o Hub</Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout} aria-label="Logout">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                <div className="flex justify-between items-center mb-6">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Logo />
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Fechar menu">
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-3">
                  {NAV_LINKS.public.map((link) => (
                    <MobileNavLink key={link.href} href={link.href}>{link.label}</MobileNavLink>
                  ))}
                  <hr className="my-3 border-border" />
                  {isAuthenticated ? (
                    <>
                      <MobileNavLink href="/hub">Hub de Soluções</MobileNavLink>
                      <MobileNavLink href="/account">Minha Conta</MobileNavLink>
                      <Button variant="ghost" onClick={() => { handleLogout(); setIsMobileMenuOpen(false);}} className="w-full justify-start px-3 py-2 text-base font-medium text-foreground hover:bg-muted hover:text-accent-foreground">
                        <LogOut className="mr-2 h-5 w-5" /> Sair
                      </Button>
                    </>
                  ) : (
                    <MobileNavLink href="/login">
                      <LogIn className="mr-2 h-5 w-5" /> Login
                    </MobileNavLink>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
