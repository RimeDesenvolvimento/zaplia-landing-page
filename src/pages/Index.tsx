import { useEffect } from 'react';
import { HeaderSection } from '@/components/HeaderSection';
import { HeroSection } from '@/components/HeroSection';
import { SocialProofSection } from '@/components/SocialProofSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { DemoSection } from '@/components/DemoSection';
import { PricingSection } from '@/components/PricingSection';
import { FAQSection } from '@/components/FAQSection';
import { FooterSection } from '@/components/FooterSection';

const Index = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17522613958';
    script.async = true;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17522613958');
    `;
    document.head.appendChild(inlineScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(inlineScript);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeaderSection />

      <div className="hidden">
        <h1>
          Zaplia - Centralize seu WhatsApp e aumente suas vendas com
          inteligência e automação
        </h1>
        <meta
          name="description"
          content="Com o Zaplia, você gerencia atendimentos, organiza equipes e automatiza conversas em tempo real. Comece agora!"
        />
        <meta
          name="keywords"
          content="whatsapp business, chatbot, automação, crm whatsapp, multi atendimento"
        />
      </div>

      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <PricingSection />
        <SocialProofSection />
        <FAQSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
