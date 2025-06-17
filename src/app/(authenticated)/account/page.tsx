"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Shield, Building, Mail, Copy, Check } from 'lucide-react';

export default function AccountPage() {
  const { user } = useAuth();
  const [hasCopied, setHasCopied] = useState(false);

  if (!user) {
    return <div>Carregando informações do usuário...</div>;
  }

  const userRole = user.role_id === 1 ? 'Administrador' : 'Usuário';
  const inviteCode = `${user.organization_id.toString().padStart(4, '0')}-ABCD`; // Example code

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Minha Conta</h1>
        <p className="text-muted-foreground">Veja e gerencie suas informações pessoais e plano.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {/* User Info Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} />
              <AvatarFallback>{user.first_name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.first_name}</CardTitle>
              <CardDescription>Informações de perfil</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center text-sm">
              <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Building className="mr-3 h-4 w-4 text-muted-foreground" />
              <span>{user.organization_name}</span>
            </div>
            <div className="flex items-center text-sm">
              <Shield className="mr-3 h-4 w-4 text-muted-foreground" />
              <span>{userRole}</span>
            </div>
          </CardContent>
        </Card>

        {/* Invite Code Card */}
        <Card>
          <CardHeader>
            <CardTitle>Código de Convite</CardTitle>
            <CardDescription>Compartilhe este código para que colegas possam entrar na sua organização.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="bg-muted p-4 rounded-lg border-dashed border-2 w-full">
              <p className="text-3xl font-bold tracking-widest font-mono text-primary">
                {inviteCode}
              </p>
            </div>
            <Button onClick={handleCopy} className="w-full">
              {hasCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copiado!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copiar Código
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}