'use client';

import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import PartnersCarousel from '@/components/layout/PartnersCarousel';
import { ScrollText } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function PrivacyPolicyPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainHeader />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-center mb-12">
              <ScrollText className="mx-auto h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Política de Privacidade
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">Última Atualização: {lastUpdatedDate !== null ? lastUpdatedDate : 'Carregando...'}</p>
            </div>

            <PartnersCarousel sectionBgClass="bg-section-alternate-background" />
            
            <article className="prose lg:prose-xl mx-auto text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground mt-12 md:mt-16">
              <p>Bem-vindo à Política de Privacidade da Solude Platform. Esta política descreve como a Solude ("nós", "nos" ou "nosso") coleta, usa e compartilha informações sobre você através de nossas interfaces online (por exemplo, websites e aplicativos móveis) de nossa propriedade e controle, incluindo www.solude.tech (coletivamente referidos aqui como o "Site").</p>

              <h2>1. Informações que Coletamos</h2>
              <p>Podemos coletar informações sobre você diretamente de você e de terceiros, bem como automaticamente através do seu uso de nosso Site ou serviços.</p>
              <ul>
                <li><strong>Informações que Você nos Fornece:</strong> Isso inclui seu nome, endereço de e-mail, número de telefone, informações da empresa e qualquer outra informação que você escolha fornecer ao se registrar para uma conta, usar nossos serviços ou se comunicar conosco.</li>
                <li><strong>Informações que Coletamos Automaticamente:</strong> Quando você visita nosso Site, podemos registrar automaticamente informações sobre você e seu computador ou dispositivo móvel, como o nome e a versão do sistema operacional do seu computador ou dispositivo móvel, fabricante e modelo, tipo de navegador, idioma do navegador, resolução da tela, o website que você visitou antes de navegar para o nosso Site, páginas que você visualizou, quanto tempo você passou em uma página, horários de acesso e informações sobre seu uso e ações em nosso Site.</li>
              </ul>

              <h2>2. Como Usamos Suas Informações</h2>
              <p>Usamos suas informações, incluindo seus dados pessoais, para os seguintes propósitos:</p>
              <ul>
                <li>Para fornecer e manter nosso Serviço, incluindo monitorar o uso de nosso Serviço.</li>
                <li>Para gerenciar Sua Conta: para gerenciar Seu registro como usuário do Serviço.</li>
                <li>Para a execução de um contrato: o desenvolvimento, cumprimento e realização do contrato de compra dos produtos, itens ou serviços que Você adquiriu ou de qualquer outro contrato conosco através do Serviço.</li>
                <li>Para contatá-lo: Para contatá-lo por e-mail, chamadas telefônicas, SMS ou outras formas equivalentes de comunicação eletrônica.</li>
                <li>Para fornecer a Você notícias, ofertas especiais e informações gerais sobre outros bens, serviços e eventos que oferecemos.</li>
              </ul>

              <h2>3. Como Compartilhamos Suas Informações</h2>
              <p>Não vendemos seus dados pessoais. Podemos compartilhar seus dados pessoais nas seguintes situações:</p>
              <ul>
                <li><strong>Com Prestadores de Serviços:</strong> Podemos compartilhar Suas informações pessoais com Prestadores de Serviços para monitorar e analisar o uso de nosso Serviço, para contatá-lo.</li>
                <li><strong>Para transferências de negócios:</strong> Podemos compartilhar ou transferir Suas informações pessoais em conexão com, ou durante negociações de, qualquer fusão, venda de ativos da Empresa, financiamento ou aquisição de toda ou uma parte de Nossos negócios para outra empresa.</li>
                <li><strong>Com o Seu consentimento:</strong> Podemos divulgar Suas informações pessoais para qualquer outro propósito com o Seu consentimento.</li>
              </ul>

              <h2>4. Seus Direitos de Proteção de Dados</h2>
              <p>Dependendo da sua localização, você pode ter certos direitos em relação às suas informações pessoais, incluindo o direito de acessar, corrigir, atualizar ou solicitar a exclusão de suas informações pessoais. Você também pode ter o direito de se opor ao processamento de suas informações pessoais, pedir-nos para restringir o processamento de suas informações pessoais ou solicitar a portabilidade de suas informações pessoais.</p>

              <h2>5. Segurança de Suas Informações</h2>
              <p>Tomamos medidas razoáveis, incluindo salvaguardas administrativas, técnicas e físicas, para proteger suas informações contra perda, roubo, uso indevido e acesso não autorizado, divulgação, alteração e destruição.</p>
              
              <h2>6. Alterações a Esta Política de Privacidade</h2>
              <p>Podemos atualizar Nossa Política de Privacidade de tempos em tempos. Notificaremos Você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página. Aconselhamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações.</p>

              <h2>7. Contate-Nos</h2>
              <p>Se você tiver alguma dúvida sobre esta Política de Privacidade, Você pode nos contatar:</p>
              <ul>
                <li>Por e-mail: privacidade@solude.tech</li>
                <li>Visitando esta página em nosso website: <Link href="/contact">www.solude.tech/contato</Link></li>
              </ul>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
