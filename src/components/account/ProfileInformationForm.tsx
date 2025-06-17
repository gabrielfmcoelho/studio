// src/components/account/ProfileInformationForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';
import { User } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from 'lucide-react';

const accountSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Endereço de e-mail inválido."),
});
type AccountFormValues = z.infer<typeof accountSchema>;

interface ProfileInformationFormProps {
  user: User | null;
}

export function ProfileInformationForm({ user }: ProfileInformationFormProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: { name: "", email: "" },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.first_name || "",
        email: user.email || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: AccountFormValues) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
    console.log("Profile updated (mock):", data);
    toast({ title: "Perfil Atualizado", description: "Suas informações de perfil foram salvas (simulado)." });
    setIsSaving(false);
  };

  const displayName = user?.first_name || user?.email?.split('@')[0] || 'Usuário';
  const avatarFallback = displayName.charAt(0).toUpperCase();

  return (
    <Card className="shadow-md bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Informações do Perfil</CardTitle>
        <CardDescription>Atualize seus dados pessoais e endereço de e-mail.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <Input id="name" {...form.register("name")} className="bg-input" />
              {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Endereço de E-mail</Label>
            <Input id="email" type="email" {...form.register("email")} className="bg-input" />
            {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Perfil
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}