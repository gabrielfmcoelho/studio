import LoginForm from '@/components/auth/LoginForm';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <MainHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-md animate-fade-in">
          <CardHeader className="text-center space-y-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Bem-vindo de Volta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Faça login para acessar suas soluções Solude Platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Cadastre-se
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
