import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import PartnersCarousel from '@/components/layout/PartnersCarousel';
import { ScrollText } from 'lucide-react';
import { useEffect, useState } from 'react'; // Import for client-side date rendering


// This page needs to be a client component to avoid hydration errors with `new Date()`
// if we want the date to be truly "Last Updated: today" for the user.
// However, for SEO and simplicity, a build-time date or static date is often better.
// For now, we'll keep it as a server component and use a fixed or build-time date.
// If dynamic "today's date" is critical, this component would need 'use client'
// and handle date formatting in useEffect.

export default function PrivacyPolicyPage() {
  // For a static build or server component, this will be the build time.
  // If client-side dynamic date is needed, use 'use client' and useEffect.
  const lastUpdatedDate = new Date().toLocaleDateString('en-US', {
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
              <ScrollText className="mx-auto h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Privacy Policy
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">Last Updated: {lastUpdatedDate}</p>
            </div>
            
            <article className="prose lg:prose-xl mx-auto text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
              <p>Welcome to Solude Platform's Privacy Policy. This policy describes how Solude ("we", "us", or "our") collects, uses, and shares information about you through our online interfaces (e.g., websites and mobile applications) owned and controlled by us, including www.solude.tech (collectively referred to herein as the "Site").</p>

              <h2>1. Information We Collect</h2>
              <p>We may collect information about you directly from you and from third parties, as well as automatically through your use of our Site or services.</p>
              <ul>
                <li><strong>Information You Provide to Us:</strong> This includes your name, email address, phone number, company information, and any other information you choose to provide when you register for an account, use our services, or communicate with us.</li>
                <li><strong>Information We Collect Automatically:</strong> When you visit our Site, we may automatically log information about you and your computer or mobile device, such as your computer or mobile device operating system name and version, manufacturer and model, browser type, browser language, screen resolution, the website you visited before browsing to our Site, pages you viewed, how long you spent on a page, access times, and information about your use of and actions on our Site.</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use your information, including your personal data, for the following purposes:</p>
              <ul>
                <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
                <li>To manage Your Account: to manage Your registration as a user of the Service.</li>
                <li>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                <li>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
                <li>To provide You with news, special offers and general information about other goods, services and events which we offer.</li>
              </ul>

              <h2>3. How We Share Your Information</h2>
              <p>We do not sell your personal data. We may share your personal data in the following situations:</p>
              <ul>
                <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</li>
                <li><strong>For Business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                <li><strong>With Your consent:</strong> We may disclose Your personal information for any other purpose with Your consent.</li>
              </ul>

              <h2>4. Your Data Protection Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, update, or request deletion of your personal information. You may also have the right to object to processing of your personal information, ask us to restrict processing of your personal information, or request portability of your personal information.</p>

              <h2>5. Security of Your Information</h2>
              <p>We take reasonable measures, including administrative, technical, and physical safeguards, to protect your information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
              
              <h2>6. Changes to This Privacy Policy</h2>
              <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

              <h2>7. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, You can contact us:</p>
              <ul>
                <li>By email: privacy@solude.tech</li>
                <li>By visiting this page on our website: <Link href="/contact">www.solude.tech/contact</Link></li>
              </ul>
            </article>
          </div>
        </section>
        <PartnersCarousel sectionBgClass="bg-section-alternate-background" />
      </main>
      <Footer />
    </div>
  );
}
