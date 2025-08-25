import { HeaderSection } from "@/components/HeaderSection";
import { HeroSection } from "@/components/HeroSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { DemoSection } from "@/components/DemoSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { FooterSection } from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeaderSection />
      
      {/* SEO Meta Tags */}
      <div className="hidden">
        <h1>Zaplia - Centralize seu WhatsApp e aumente suas vendas com inteligência e automação</h1>
        <meta name="description" content="Com o Zaplia, você gerencia atendimentos, organiza equipes e automatiza conversas em tempo real. Comece agora!" />
        <meta name="keywords" content="whatsapp business, chatbot, automação, crm whatsapp, multi atendimento" />
      </div>
      
      {/* Main content with padding to account for fixed header */}
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
