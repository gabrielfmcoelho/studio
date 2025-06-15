
"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, UserSquare2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Endereço de e-mail inválido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login, guestLogin } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(data.email, data.password);
      toast({
        title: "Login Bem-sucedido",
        description: "Bem-vindo de volta!",
      });
      // Redirect is handled by useAuth hook
    } catch (err: any) {
      const errorMessage = err.message || "Ocorreu um erro inesperado.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Falha no Login",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsGuestLoading(true);
    setError(null);
    try {
      await guestLogin();
      toast({
        title: "Login como Convidado",
        description: "Bem-vindo!",
      });
    } catch (err: any) {
      const errorMessage = err.message || "Ocorreu um erro inesperado ao tentar login como convidado.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Falha no Login como Convidado",
        description: errorMessage,
      });
    } finally {
      setIsGuestLoading(false);
    }
  };


  return (
    <div className="w-full max-w-sm space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...form.register("email")}
            disabled={isLoading || isGuestLoading}
            className="bg-input"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...form.register("password")}
            disabled={isLoading || isGuestLoading}
            className="bg-input"
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading || isGuestLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Entrar
        </Button>
      </form>
      
      <Button variant="outline" className="w-full" onClick={handleGuestLogin} disabled={isLoading || isGuestLoading}>
        {isGuestLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserSquare2 className="mr-2 h-4 w-4" /> }
        Login como Convidado
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Ou use uma conta de demonstração
          </span>
        </div>
      </div>
      
       <div className="text-center text-sm text-muted-foreground">
          <p>user@solude.tech / admin</p>
          <p>admin@solude.tech / admin</p>
      </div>
    </div>
  );
}
