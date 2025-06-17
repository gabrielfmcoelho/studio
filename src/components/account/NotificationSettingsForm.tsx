// src/components/account/NotificationSettingsForm.tsx
"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';

const notificationsSchema = z.object({
  emailNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(false),
});
type NotificationsFormValues = z.infer<typeof notificationsSchema>;

export function NotificationSettingsForm() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: { emailNotifications: true, pushNotifications: false },
  });

  const onSubmit = async (data: NotificationsFormValues) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
    console.log("Notifications settings updated (mock):", data);
    toast({ title: "Preferências Atualizadas", description: "Suas preferências de notificação foram salvas (simulado)." });
    setIsSaving(false);
  };

  return (
    <Card className="shadow-md bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Configurações de Notificação</CardTitle>
        <CardDescription>Gerencie como você recebe notificações.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
            <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
              <span>Notificações por E-mail</span>
              <span className="font-normal leading-snug text-muted-foreground">Receba atualizações e alertas.</span>
            </Label>
            <Switch
              id="emailNotifications"
              checked={form.watch("emailNotifications")}
              onCheckedChange={(checked) => form.setValue("emailNotifications", checked)}
            />
          </div>
          <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
            <Label htmlFor="pushNotifications" className="flex flex-col space-y-1">
              <span>Notificações Push</span>
              <span className="font-normal leading-snug text-muted-foreground">Receba alertas em tempo real.</span>
            </Label>
            <Switch
              id="pushNotifications"
              checked={form.watch("pushNotifications")}
              onCheckedChange={(checked) => form.setValue("pushNotifications", checked)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Preferências
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}