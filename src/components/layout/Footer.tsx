import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background print:hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Capacitando negócios com soluções tecnológicas inovadoras.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/solutions" className="text-sm text-muted-foreground hover:text-primary">Nossas Soluções</Link></li>
              <li><Link href="/team" className="text-sm text-muted-foreground hover:text-primary">Conheça a Equipe</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Fale Conosco</Link></li>
              <li><Link href="/login" className="text-sm text-muted-foreground hover:text-primary">Login do Cliente</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Conecte-se Conosco</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
                <Linkedin size={20} />
              </Link>
              <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary">
                <Github size={20} />
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Teresina, Piauí, Brasil
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {APP_NAME}. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary">Política de Privacidade</Link>
            <Link href="/terms-of-service" className="text-xs text-muted-foreground hover:text-primary">Termos de Serviço</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
