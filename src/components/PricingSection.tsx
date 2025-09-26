import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  Smartphone,
  Users,
  Layers,
  Bot,
  MessageSquare,
  Calendar,
  Settings,
  Code,
  Phone,
  Headphones,
  Zap,
  BookOpen,
  Clock,
  Video,
} from 'lucide-react';
import { openWhatsApp, ZAPLIA_WHATSAPP } from '@/utils/whatsapp';
import { useState } from 'react';

export const PricingSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    'monthly' | 'semi' | 'annual'
  >('monthly');

  const periods = [
    { key: 'monthly', label: 'Mensal', discount: 0 },
    // { key: 'semi', label: 'Semestral', discount: 20 },
    // { key: 'annual', label: 'Anual', discount: 30 },
  ];

  const calculatePrice = (
    basePrice: number,
    discount: number,
    period: string
  ) => {
    const discountedMonthlyPrice = basePrice * (1 - discount / 100);

    if (period === 'monthly') {
      return discountedMonthlyPrice;
    } else if (period === 'semi') {
      return discountedMonthlyPrice * 6;
    } else if (period === 'annual') {
      return discountedMonthlyPrice * 12;
    }

    return discountedMonthlyPrice;
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const getOriginalTotalPrice = (basePrice: number, period: string) => {
    if (period === 'monthly') {
      return basePrice;
    } else if (period === 'semi') {
      return basePrice * 6;
    } else if (period === 'annual') {
      return basePrice * 12;
    }
    return basePrice;
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('números de WhatsApp')) return Smartphone;
    if (feature.includes('Atendente')) return Users;
    if (feature.includes('Filas') || feature.includes('Setores')) return Layers;
    if (feature.includes('Bot')) return Bot;
    if (feature.includes('Mensagens')) return MessageSquare;
    if (feature.includes('Agendamentos')) return Calendar;
    if (feature.includes('Painel') || feature.includes('Administrativo'))
      return Settings;
    if (feature.includes('API')) return Code;
    if (feature.includes('Mobile') || feature.includes('Acesso Mobile'))
      return Phone;
    if (feature.includes('Atendimento Prioritário')) return Headphones;
    if (feature.includes('Ativação')) return Zap;
    if (feature.includes('ChatGPT')) return Bot;

    return Check;
  };

  const plans = [
    {
      name: 'Básico',
      basePrice: 99.9,
      badge: null,
      color: 'border-muted',
      features: [
        '01 números de WhatsApp',
        '01 Atendente',
        '02 Filas / Setores',
        'Bot de Atendimento',
        'Mensagens ilimitadas',
        'Agendamentos de Envio',
        'Painel Administrativo',
        'Acesso Mobile',
        'Ativação imediata',
        'Suporte Premium',
      ],
    },
    {
      name: 'Pro',
      basePrice: 199.9,
      badge: 'Mais Popular',
      color: 'border-primary shadow-cta',
      features: [
        '02 números de WhatsApp',
        '03 Atendentes',
        '03 Filas / Setores',
        'Bot de Atendimento',
        'Mensagens ilimitadas',
        'Agendamentos de Envio',
        'Painel Administrativo',
        'Integrações Nativas',
        'API de Integração',
        'Acesso Mobile',
        'Ativação imediata',
        'Suporte Premium',
      ],
    },
    {
      name: 'Enterprise',
      basePrice: 299.0,
      badge: null,
      color: 'border-muted',
      features: [
        '3 números de WhatsApp',
        '5 Atendentes',
        '5 Filas / Setores',
        'Bot de Atendimento',
        'Mensagens ilimitadas',
        'Agendamentos de Envio',
        'Painel Administrativo',
        'Integrações Nativas',
        'API de Integração',
        'Acesso Mobile',
        'Ativação imediata',
        'Suporte Premium',
      ],
    },
    {
      name: 'Enterprise Plus',
      basePrice: 499.0,
      badge: 'Para grandes equipes',
      color: 'border-zaplia-orange shadow-feature',
      features: [
        '5 números de WhatsApp',
        '10 Atendentes',
        '10 Filas / Setores',
        'Bot de Atendimento',
        'Mensagens ilimitadas',
        'Agendamentos de Envio',
        'Painel Administrativo',
        'Integrações Nativas',
        'API de Integração',
        'Integração com ChatGPT',
        'Acesso Mobile',

        'Ativação imediata',
        'Suporte Premium',
      ],
    },
  ];

  const trainingFeatures = [
    'Configuração completa da plataforma',
    'Criação de bots personalizados',
    'Treinamento da equipe',
    'Integração com seus sistemas',
    'Suporte técnico especializado',
    'Estratégias de atendimento',
  ];

  return (
    <section className="py-20 pb-8 bg-muted/30" data-section="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Planos que se adaptam ao seu negócio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Escolha o plano ideal para sua empresa. Sem fidelização, cancele
            quando quiser.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => {
            const currentDiscount =
              periods.find(p => p.key === selectedPeriod)?.discount || 0;
            const currentPrice = calculatePrice(
              plan.basePrice,
              currentDiscount,
              selectedPeriod
            );
            const originalTotalPrice = getOriginalTotalPrice(
              plan.basePrice,
              selectedPeriod
            );

            return (
              <Card
                key={index}
                className={`relative p-8 hover:shadow-cta transition-all duration-300 hover:-translate-y-2 ${
                  plan.color
                } ${plan.badge === 'Mais Popular' ? 'scale-105' : ''}`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge
                      className={`px-4 py-1 font-semibold ${
                        plan.badge === 'Mais Popular'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-zaplia-orange text-white'
                      }`}
                    >
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {plan.name}
                  </h3>
                  <div className="flex flex-col items-center">
                    {currentDiscount > 0 && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg text-muted-foreground line-through">
                          {formatPrice(originalTotalPrice)}
                        </span>
                        <Badge className="bg-zaplia-green text-white text-xs">
                          -{currentDiscount}%
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-primary">
                        {formatPrice(currentPrice)}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        {selectedPeriod === 'monthly'
                          ? '/mês'
                          : selectedPeriod === 'semi'
                          ? ' por 6 meses'
                          : ' por 1 ano'}
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => {
                    const IconComponent = getFeatureIcon(feature);
                    return (
                      <li key={featureIndex} className="flex items-start">
                        <IconComponent className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    );
                  })}
                </ul>

                <Button
                  variant={plan.badge === 'Mais Popular' ? 'cta' : 'outline'}
                  className="w-full"
                  size="lg"
                  onClick={() => window.open('/trial-teste-gratis', '_blank')}
                >
                  Assinar Agora
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background hover:shadow-lg transition-all duration-300">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-8 h-8 text-primary" />
                <Badge className="bg-primary text-primary-foreground font-semibold text-sm px-3 py-1">
                  PLANO PERSONALIZADO
                </Badge>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-3">
                Solução Empresarial
              </h3>

              <p className="text-muted-foreground mb-6">
                Precisa de um plano personalizado para sua empresa? Criamos uma
                solução sob medida para suas necessidades específicas.
              </p>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() =>
                  openWhatsApp(
                    ZAPLIA_WHATSAPP,
                    'Gostaria de um plano personalizado para minha empresa!'
                  )
                }
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Falar com Especialista
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-2 border-zaplia-orange/20 bg-gradient-to-r from-zaplia-orange/5 to-background hover:shadow-lg transition-all duration-300">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-zaplia-orange" />
                <Badge className="bg-zaplia-orange text-white font-semibold text-sm px-3 py-1">
                  TREINAMENTO OPCIONAL
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Treinamento Personalizado
                </h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-2xl font-bold text-zaplia-orange">
                    R$ 300,00
                  </span>
                  <span className="text-muted-foreground ml-1 text-sm">
                    /única vez
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground font-medium">
                  Duração máxima de 2 horas
                </span>
              </div>

              <p className="text-muted-foreground mb-6">
                Maximize o potencial da plataforma com nosso treinamento
                especializado e configure tudo do jeito certo desde o início.
              </p>

              <Button
                variant="default"
                size="lg"
                className="w-full bg-zaplia-orange hover:bg-zaplia-orange/90 text-white shadow-lg"
                onClick={() =>
                  openWhatsApp(
                    ZAPLIA_WHATSAPP,
                    'Gostaria de contratar o treinamento personalizado para minha equipe!'
                  )
                }
              >
                <Video className="w-5 h-5 mr-2" />
                Contratar Treinamento
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
