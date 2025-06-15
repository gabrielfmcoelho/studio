
"use client"; 

import AuthenticatedPageLayout from '@/components/layout/AuthenticatedPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth, User } from '@/hooks/useAuth'; // Import User type from useAuth
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const accountSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Endereço de e-mail inválido."),
  // Add other fields like currentPassword, newPassword, confirmPassword if implementing password change
});
type AccountFormValues = z.infer<typeof accountSchema>;

const notificationsSchema = z.object({
  emailNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(false),
});
type NotificationsFormValues = z.infer<typeof notificationsSchema>;


export default function AccountPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isNotificationSaving, setIsNotificationSaving] = useState(false);

  const profileForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    // Default values are set once. Use `reset` or `setValue` in useEffect if `user` data loads asynchronously
    // and you want the form to update.
    defaultValues: {
      name: "",
      email: "",
    },
    disabled: authLoading,
  });

  // Populate form once user data is available
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.first_name || "", // API provides first_name
        email: user.email || "",
      });
    }
  }, [user, profileForm]);


  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
        emailNotifications: true, // These could be fetched from user preferences API
        pushNotifications: false,
    },
  });


  const onProfileSubmit = async (data: AccountFormValues) => {
    setIsProfileSaving(true);
    // Simulate API call
    console.log("Profile update attempt with data:", data);
    // In a real app:
    // try {
    //   await updateUserProfile(user.id, { first_name: data.name, email: data.email });
    //   toast({ title: "Perfil Atualizado", description: "Suas informações de perfil foram salvas." });
    // } catch (error) {
    //   toast({ variant: "destructive", title: "Erro ao Atualizar", description: "Não foi possível salvar seu perfil." });
    // }
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Profile updated (mock):", data);
    toast({ title: "Perfil Atualizado", description: "Suas informações de perfil foram salvas (simulado)." });
    setIsProfileSaving(false);
  };
  
  const onNotificationsSubmit = async (data: NotificationsFormValues) => {
    setIsNotificationSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Notifications settings updated (mock):", data);
    toast({ title: "Preferências Atualizadas", description: "Suas preferências de notificação foram salvas (simulado)." });
    setIsNotificationSaving(false);
  };

  if (authLoading) {
    return (
      <AuthenticatedPageLayout pageTitle="Minha Conta">
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AuthenticatedPageLayout>
    );
  }

  const displayName = user?.first_name || user?.email?.split('@')[0] || 'Usuário';
  const avatarFallback = displayName.charAt(0).toUpperCase();

  return (
    <AuthenticatedPageLayout pageTitle="Minha Conta">
      <div className="space-y-8 max-w-3xl mx-auto">
        {/* Profile Information Card */}
        <Card className="shadow-md bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
            <CardDescription>Atualize seus dados pessoais e endereço de e-mail.</CardDescription>
          </CardHeader>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.first_name ? `https://avatar.vercel.sh/${user.first_name}.png` : `https://avatar.vercel.sh/${user?.email || 'default'}.png`} alt={displayName} />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background hover:bg-muted">
                        <Camera size={16} />
                        <span className="sr-only">Mudar avatar</span>
                    </Button>
                </div>
                <div className="flex-grow space-y-1">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" {...profileForm.register("name")} className="bg-input" />
                    {profileForm.formState.errors.name && <p className="text-sm text-destructive">{profileForm.formState.errors.name.message}</p>}
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="email">Endereço de E-mail</Label>
                <Input id="email" type="email" {...profileForm.register("email")} className="bg-input" />
                {profileForm.formState.errors.email && <p className="text-sm text-destructive">{profileForm.formState.errors.email.message}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isProfileSaving}>
                {isProfileSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Perfil
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Notification Settings Card */}
        <Card className="shadow-md bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Configurações de Notificação</CardTitle>
            <CardDescription>Gerencie como você recebe notificações da Solude Platform.</CardDescription>
          </CardHeader>
          <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)}>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
                    <span>Notificações por E-mail</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                        Receba atualizações e alertas por e-mail.
                    </span>
                    </Label>
                    <Switch
                        id="emailNotifications"
                        checked={notificationsForm.watch("emailNotifications")}
                        onCheckedChange={(checked) => notificationsForm.setValue("emailNotifications", checked)}
                    />
                </div>
                <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <Label htmlFor="pushNotifications" className="flex flex-col space-y-1">
                    <span>Notificações Push</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                        Receba alertas em tempo real no seu dispositivo (se suportado).
                    </span>
                    </Label>
                     <Switch
                        id="pushNotifications"
                        checked={notificationsForm.watch("pushNotifications")}
                        onCheckedChange={(checked) => notificationsForm.setValue("pushNotifications", checked)}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" disabled={isNotificationSaving}>
                    {isNotificationSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Salvar Preferências
                </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Security Settings Card Placeholder */}
        <Card className="shadow-md bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Configurações de Segurança</CardTitle>
            <CardDescription>Gerencie sua senha e autenticação de dois fatores.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Mudar Senha</Button>
            {/* Placeholder for 2FA setup */}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedPageLayout>
  );
}
