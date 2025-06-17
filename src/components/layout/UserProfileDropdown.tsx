// src/components/layout/UserProfileDropdown.tsx
"use client";

import Link from 'next/link';
import { User as UserIcon, LogOut } from 'lucide-react';
import { useAuth, User } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserProfileDropdown() {
  const { user, logout } = useAuth();

  const displayName = user?.first_name || user?.email?.split('@')[0] || 'Usuário';
  const avatarFallback = displayName.charAt(0).toUpperCase();
  const avatarSrc = user?.first_name 
    ? `https://avatar.vercel.sh/${user.first_name}.png` 
    : `https://avatar.vercel.sh/${user?.email || 'default'}.png`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatarSrc} alt={displayName} />
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
          <Link href="/account"><UserIcon className="mr-2 h-4 w-4" /> Conta</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}