import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import PartnersCarousel from '@/components/layout/PartnersCarousel';
import { FileText } from 'lucide-react';
import Link from 'next/link'; 

export default function TermsOfServicePage() {
  const lastUpdatedDate = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainHeader />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-center mb-12">
              <FileText className="mx-auto h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Termos de Serviço
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">Última Atualização: {lastUpdatedDate}</p>
            </div>

            <PartnersCarousel sectionBgClass="bg-section-alternate-background" />
            
            <article className="prose lg:prose-xl mx-auto text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground mt-12 md:mt-16">
              <h2>1. Aceitação dos Termos</h2>
              <p>Ao acessar ou usar a Solude Platform ("Serviço"), você concorda em ficar vinculado por estes Termos de Serviço ("Termos"). Se você discordar de qualquer parte dos termos, então você não poderá acessar o Serviço. Estes Termos se aplicam a todos os visitantes, usuários e outros que acessam ou usam o Serviço.</p>

              <h2>2. Descrição do Serviço</h2>
              <p>A Solude Platform fornece um conjunto de soluções de software projetadas para empresas. As funcionalidades e recursos específicos disponíveis para você dependerão do seu plano de assinatura e de quaisquer contratos de serviço aplicáveis.</p>

              <h2>3. Contas de Usuário</h2>
              <p>Ao criar uma conta conosco, você deve fornecer informações que sejam precisas, completas e atuais em todos os momentos. O não cumprimento constitui uma violação dos Termos, o que pode resultar na rescisão imediata de sua conta em nosso Serviço. Você é responsável por proteger a senha que usa para acessar o Serviço e por quaisquer atividades ou ações sob sua senha.</p>

              <h2>4. Uso do Serviço</h2>
              <p>Você concorda em não usar o Serviço:</p>
              <ul>
                <li>De qualquer forma que viole qualquer lei ou regulamento nacional ou internacional aplicável.</li>
                <li>Com o propósito de explorar, prejudicar ou tentar explorar ou prejudicar menores de qualquer forma.</li>
                <li>Para transmitir ou obter o envio de qualquer material publicitário ou promocional, incluindo qualquer "junk mail", "corrente", "spam" ou qualquer outra solicitação similar.</li>
                <li>Para se passar ou tentar se passar por Solude, um funcionário da Solude, outro usuário ou qualquer outra pessoa ou entidade.</li>
              </ul>

              <h2>5. Propriedade Intelectual</h2>
              <p>O Serviço e seu conteúdo original (excluindo Conteúdo fornecido pelos usuários), recursos e funcionalidades são e permanecerão propriedade exclusiva da Solude e seus licenciadores. O Serviço é protegido por direitos autorais, marcas registradas e outras leis dos Estados Unidos e de países estrangeiros.</p>

              <h2>6. Rescisão</h2>
              <p>Podemos rescindir ou suspender sua conta imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos. Após a rescisão, seu direito de usar o Serviço cessará imediatamente.</p>

              <h2>7. Limitação de Responsabilidade</h2>
              <p>Em nenhum caso a Solude, nem seus diretores, funcionários, parceiros, agentes, fornecedores ou afiliados, serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, goodwill ou outras perdas intangíveis, resultantes de (i) seu acesso ou uso ou incapacidade de acessar ou usar o Serviço; (ii) qualquer conduta ou conteúdo de terceiros no Serviço; (iii) qualquer conteúdo obtido do Serviço; e (iv) acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo, seja com base em garantia, contrato, ato ilícito (incluindo negligência) ou qualquer outra teoria legal, tenhamos ou não sido informados da possibilidade de tal dano.</p>

              <h2>8. Lei Aplicável</h2>
              <p>Estes Termos serão regidos e interpretados de acordo com as leis do Estado do Texas, Estados Unidos, sem levar em conta suas disposições sobre conflito de leis.</p>

              <h2>9. Alterações aos Termos</h2>
              <p>Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso de pelo menos 30 dias antes que quaisquer novos termos entrem em vigor. O que constitui uma alteração material será determinado a nosso exclusivo critério.</p>

              <h2>10. Contate-Nos</h2>
              <p>Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco:</p>
              <ul>
                <li>Por e-mail: legal@solude.tech</li>
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
