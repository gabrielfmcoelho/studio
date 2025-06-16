// Suggested code may be subject to a license. Learn more: ~LicenseLog:3311029861.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1364582968.
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
              Junte-se ao Ecossistema hoje mesmo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName">1. Nome Completo</Label>
                    <Input id="fullName" placeholder="João da Silva" className="bg-input" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">2. E-mail</Label>
                    <Input id="email" type="email" placeholder="joao@example.com" className="bg-input" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="organization">3. Organização</Label>
                    <Select id="organization">
                      <SelectTrigger className="bg-input">
                        <SelectValue placeholder="Selecione sua organização" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solude">Solude</SelectItem>
                        <SelectItem value="h-sao-marcos">Hosp. São Marcos</SelectItem>
                        <SelectItem value="hu-ufpi">Hosp. Univ. UFPI</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="access-code">4. Codigo da Organização</Label>
                    <Input id="access-code" type="password" placeholder="••••••••" className="bg-input" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Password">5. Senha</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" className="bg-input" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">6. Confirme a Senha</Label>
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
