import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <MainHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-md animate-fade-in">
          <CardHeader className="text-center space-y-4">
             <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Crie uma Conta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Junte-se à Solude Platform e comece a transformar seu negócio hoje mesmo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input id="fullName" placeholder="João da Silva" className="bg-input" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="joao@example.com" className="bg-input" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" placeholder="••••••••" className="bg-input" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirme a Senha</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" className="bg-input" />
                </div>
                <Button type="submit" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" /> Cadastrar
                </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
