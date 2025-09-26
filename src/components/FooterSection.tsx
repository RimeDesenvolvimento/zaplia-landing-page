import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  Shield,
  FileText,
  Phone,
  Mail,
  MapPin,
  Instagram,
} from 'lucide-react';
import { openWhatsApp, ZAPLIA_WHATSAPP } from '@/utils/whatsapp';

const CURRENT_YEAR = new Date().getFullYear();

export const FooterSection = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <img
                  src="/lovable-uploads/aa0572f7-9dc5-4ca1-bc20-8ff0b8dd9e50.png"
                  alt="Zaplia"
                  className="h-32 w-36"
                />
              </div>
              <p className="text-secondary-foreground/80 mb-6 leading-relaxed">
                A plataforma completa para gerenciar seu WhatsApp Business com
                inteligência artificial e automação.
              </p>
              <div className="flex space-x-4">
                <div
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  onClick={() =>
                    openWhatsApp(
                      ZAPLIA_WHATSAPP,
                      'Olá! Quero saber mais sobre o Zaplia!'
                    )
                  }
                >
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  onClick={() =>
                    openWhatsApp(
                      ZAPLIA_WHATSAPP,
                      'Gostaria de entrar em contato por email!'
                    )
                  }
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  onClick={() =>
                    openWhatsApp(
                      ZAPLIA_WHATSAPP,
                      'Gostaria de falar por telefone!'
                    )
                  }
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  onClick={() =>
                    window.open(
                      'https://instagram.com/zaplia_oficial',
                      '_blank'
                    )
                  }
                >
                  <Instagram className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Links e Recursos */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Links e Recursos</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#pricing"
                    className="text-secondary-foreground/80 hover:text-primary transition-colors cursor-pointer"
                    onClick={e => {
                      e.preventDefault();
                      const pricingSection = document.querySelector(
                        '[data-section="pricing"]'
                      );
                      pricingSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Preços
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-secondary-foreground/80 hover:text-primary transition-colors cursor-pointer"
                    onClick={e => {
                      e.preventDefault();
                      const featuresSection = document.querySelector(
                        '[data-section="features"]'
                      );
                      featuresSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Funcionalidades
                  </a>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Fale Conosco</h3>
              <div className="space-y-4">
                <div
                  className="flex items-center cursor-pointer hover:text-primary transition-colors"
                  onClick={() =>
                    openWhatsApp(
                      ZAPLIA_WHATSAPP,
                      'Gostaria de falar por telefone!'
                    )
                  }
                >
                  <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-secondary-foreground/80">
                    (11){' '}
                    {(import.meta.env.VITE_ZAPLIA_WHATSAPP as string)
                      .replace('5511', '')
                      .replace(/(\d{5})(\d{4})/, '$1-$2')}
                  </span>
                </div>
                <div
                  className="flex items-center cursor-pointer hover:text-primary transition-colors"
                  onClick={() =>
                    openWhatsApp(
                      ZAPLIA_WHATSAPP,
                      'Gostaria de entrar em contato por email!'
                    )
                  }
                >
                  <Mail className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-secondary-foreground/80">
                    ajuda@zaplia.com.br
                  </span>
                </div>
                <div
                  className="flex items-center cursor-pointer hover:text-primary transition-colors"
                  onClick={() =>
                    window.open(
                      'https://instagram.com/zaplia_oficial',
                      '_blank'
                    )
                  }
                >
                  <Instagram className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-secondary-foreground/80">
                    zaplia_oficial
                  </span>
                </div>
                <div
                  className="flex items-start cursor-pointer hover:text-primary transition-colors"
                  onClick={() =>
                    openWhatsApp(
                      ZAPLIA_WHATSAPP,
                      'Gostaria de saber mais sobre a localização!'
                    )
                  }
                >
                  <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-foreground/80">
                    São Paulo, SP - Brasil
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-secondary-foreground/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-primary mr-2" />
                <span className="text-secondary-foreground/80 text-sm">
                  LGPD Compliance
                </span>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-primary mr-2" />
                <span className="text-secondary-foreground/80 text-sm">
                  Segurança Garantida
                </span>
              </div>
            </div>

            <div className="text-secondary-foreground/60 text-sm text-center md:text-right">
              © {CURRENT_YEAR} Zaplia. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-zaplia-green hover:bg-zaplia-green/90 shadow-cta hover:animate-none group"
          onClick={() =>
            openWhatsApp(
              ZAPLIA_WHATSAPP,
              'Olá! Quero saber mais sobre o Zaplia!'
            )
          }
          title="Fale conosco no WhatsApp"
        >
          <svg
            className="w-8 h-8 text-white group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </Button>
      </div>
    </footer>
  );
};
