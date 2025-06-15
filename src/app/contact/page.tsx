import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import PartnersCarousel from '@/components/layout/PartnersCarousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainHeader />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <Mail className="mx-auto h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Entre em <span className="text-primary">Contato</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Adoraríamos ouvir de você! Se você tem alguma dúvida sobre funcionalidades, testes, preços ou qualquer outra coisa, nossa equipe está pronta para responder a todas as suas perguntas.
              </p>
            </div>
            
            <PartnersCarousel sectionBgClass="bg-section-alternate-background" />

            <div className="grid md:grid-cols-2 gap-12 items-start mt-12 md:mt-16">
              <Card className="shadow-xl bg-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Envie-nos uma mensagem</CardTitle>
                  <CardDescription>Preencha o formulário e retornaremos em breve.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input id="firstName" placeholder="João" className="bg-input border-input-border" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input id="lastName" placeholder="Silva" className="bg-input border-input-border" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Endereço de E-mail</Label>
                      <Input id="email" type="email" placeholder="joao.silva@example.com" className="bg-input border-input-border" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input id="subject" placeholder="Sobre a Solude Platform" className="bg-input border-input-border" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea id="message" placeholder="Sua mensagem..." rows={5} className="bg-input border-input-border" />
                    </div>
                    <Button type="submit" className="w-full sm:w-auto" size="lg">Enviar Mensagem</Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="shadow-lg bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Informações de Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />
                      <span>123 Innovation Drive, Tech City, TX 75001, EUA</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                      <a href="mailto:info@solude.tech" className="hover:text-primary">info@solude.tech</a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                      <a href="tel:+1234567890" className="hover:text-primary">+1 (234) 567-890</a>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Horário de Funcionamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-muted-foreground">
                    <p>Segunda - Sexta: 9:00 - 18:00 (Horário de Brasília)</p>
                    <p>Sábado - Domingo: Fechado</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
