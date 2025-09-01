import { Button } from '@/components/ui/button';
import heroMockup from '/lovable-uploads/fc6e023a-038a-4e7f-b0e8-5138f0e38725.png';
import { openWhatsApp, ZAPLIA_WHATSAPP } from '@/utils/whatsapp';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-20 lg:pt-12 lg:pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-zaplia-blue/5"></div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6 backdrop-blur-sm border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              Mais de 1.000+ empresas confiam no Zaplia
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Centralize seu WhatsApp e
              <span className="text-primary"> aumente suas vendas</span> com
              inteligência e automação.
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-center lg:text-left">
              Com o Zaplia, você gerencia atendimentos, organiza equipes e
              automatiza conversas em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="hero"
                size="xl"
                className="group"
                onClick={() => window.open('/signup', '_blank')}
              >
                Teste Grátis Agora
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
            </div>
          </div>

          {/* Hero Mockup */}
          <div className="relative">
            <img
              src={heroMockup}
              alt="Zaplia Dashboard e Mobile App Interface"
              className="w-full"
              style={{
                mixBlendMode: 'multiply',
                filter: 'contrast(1.1) brightness(1.1)',
                background: 'transparent',
              }}
            />
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-zaplia-blue/10 rounded-full blur-3xl"></div>
    </section>
  );
};
