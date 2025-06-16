
"use client";

import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import PartnersCarousel from '@/components/layout/PartnersCarousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast'; // Corrected import path

const contactFormSchema = z.object({
  firstName: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  subject: z.string().min(1, "Assunto é obrigatório"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({ resolver: zodResolver(contactFormSchema) });
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
                Adoraríamos ouvir de você! Se você tem alguma dúvida sobre funcionalidades, testes, preços ou qualquer outra चीज, nossa equipe está pronta para responder a todas as suas perguntas.
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
                  <form className="space-y-6" onSubmit={form.handleSubmit(async (values) => {
                    setIsSubmitting(true);
                    try {
                      // Replace with your actual API endpoint for contact form submission
                      // For example: const response = await fetch('/api/contact', { ... });
                      console.log("Form submitted with values:", values);
                      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
                      
                      toast({
                        title: "Mensagem Enviada!",
                        description: "Sua mensagem foi enviada com sucesso. Retornaremos em breve.",
                        variant: "default",
                      });
                      form.reset();
                    } catch (error) {
                      console.error("Erro na requisição:", error);
                      toast({
                        title: "Erro na Conexão",
                        description: "Não foi possível conectar ao servidor. Verifique sua conexão ou tente mais tarde.",
                        variant: "destructive",
                      });
                    } finally {
                      setIsSubmitting(false);
                    }
                  })}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input id="firstName" placeholder="João" className="bg-input border-input-border" {...form.register("firstName")} />
                        {form.formState.errors.firstName && <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input id="lastName" placeholder="Silva" className="bg-input border-input-border" {...form.register("lastName")} />
                        {form.formState.errors.lastName && <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Endereço de E-mail</Label>
                      <Input id="email" type="email" placeholder="joao.silva@example.com" className="bg-input border-input-border" {...form.register("email")} />
                      {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input id="subject" placeholder="Sobre a Solude" className="bg-input border-input-border" {...form.register("subject")} />
                       {form.formState.errors.subject && <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea id="message" placeholder="Sua mensagem..." rows={5} className="bg-input border-input-border" {...form.register("message")} />
                      {form.formState.errors.message && <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>}
                    </div>
                    <Button type="submit" className="w-full sm:w-auto" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    </Button>
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
                      <span>Teresina, Piaui, Brasil</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                      <a href="mailto:contato@solude.tech" className="hover:text-primary">contato@solude.tech</a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                      <a href="tel:+55869xxxxxxxx" className="hover:text-primary">+55 (86) 9xxxx-xxxx</a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <PartnersCarousel sectionBgClass="bg-background" />
      </main>
      <Footer />
    </div>
  );
}

    