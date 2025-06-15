import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-grow py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-12">
            <FileText className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Terms of Service
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <article className="prose prose-invert lg:prose-xl mx-auto text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using the Solude Platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.</p>

            <h2>2. Description of Service</h2>
            <p>Solude Platform provides a suite of software solutions designed for businesses. The specific features and functionalities available to you will depend on your subscription plan and any applicable service agreements.</p>

            <h2>3. User Accounts</h2>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>

            <h2>4. Use of the Service</h2>
            <p>You agree not to use the Service:</p>
            <ul>
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate Solude, a Solude employee, another user, or any other person or entity.</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Solude and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

            <h2>6. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>

            <h2>7. Limitation of Liability</h2>
            <p>In no event shall Solude, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>

            <h2>8. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions.</p>

            <h2>9. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

            <h2>10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul>
              <li>By email: legal@solude.tech</li>
              <li>By visiting this page on our website: <a href="/contact">www.solude.tech/contact</a></li>
            </ul>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
