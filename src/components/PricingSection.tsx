import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Zap
} from "lucide-react";
import { openWhatsApp, ZAPLIA_WHATSAPP } from "@/utils/whatsapp";
import { useState } from "react";

export const PricingSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'semi' | 'annual'>('monthly');

  const periods = [
    { key: 'monthly', label: 'Mensal', discount: 0 },
    { key: 'semi', label: 'Semestral', discount: 20 },
    { key: 'annual', label: 'Anual', discount: 30 }
  ];

  const calculatePrice = (basePrice: number, discount: number, period: string) => {
    const discountedMonthlyPrice = basePrice * (1 - discount / 100);
    
    if (period === 'monthly') {
      return discountedMonthlyPrice;
    } else if (period === 'semi') {
      return discountedMonthlyPrice * 6; // Total for 6 months
    } else if (period === 'annual') {
      return discountedMonthlyPrice * 12; // Total for 12 months
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
    if (feature.includes('Painel') || feature.includes('Administrativo')) return Settings;
    if (feature.includes('API')) return Code;
    if (feature.includes('Mobile') || feature.includes('Acesso Mobile')) return Phone;
    if (feature.includes('Atendimento Prioritário')) return Headphones;
    if (feature.includes('Ativação')) return Zap;
    if (feature.includes('ChatGPT')) return Bot;
    
    return Check; // Default fallback
  };

  const plans = [
    {
      name: "Básico",
      basePrice: 49.90,
      badge: null,
      color: "border-muted",
      features: [
        "01 números de WhatsApp",
        "01 Atendente",
        "03 Filas / Setores",
        "Bot de Atendimento",
        "Mensagens ilimitadas",
        "Agendamentos de Envio",
        "Painel Administrativo",
        "Acesso Mobile",
        "Ativação imediata"
      ]
    },
    {
      name: "Pro",
      basePrice: 99.90,
      badge: "Mais Popular",
      color: "border-primary shadow-cta",
      features: [
        "02 números de WhatsApp",
        "05 Atendentes",
        "05 Filas / Setores",
        "Bot de Atendimento",
        "Mensagens ilimitadas",
        "Agendamentos de Envio",
        "Painel Administrativo",
        "API de Integração",
        "Acesso Mobile",
        "Ativação imediata"
      ]
    },
    {
      name: "Enterprise",
      basePrice: 199.00,
      badge: null,
      color: "border-muted",
      features: [
        "05 números de WhatsApp",
        "10 Atendentes",
        "10 Filas / Setores",
        "Bot de Atendimento",
        "Mensagens ilimitadas",
        "Agendamentos de Envio",
        "Painel Administrativo",
        "API de Integração",
        "Acesso Mobile",
        "Ativação imediata"
      ]
    },
    {
      name: "Enterprise Plus",
      basePrice: 499.00,
      badge: "Para grandes equipes",
      color: "border-zaplia-orange shadow-feature",
      features: [
        "10 números de WhatsApp",
        "25 Atendentes",
        "20 Filas / Setores",
        "Bot de Atendimento",
        "Mensagens ilimitadas",
        "Agendamentos de Envio",
        "Painel Administrativo",
        "API de Integração",
        "Integração com ChatGPT",
        "Acesso Mobile",
        "Atendimento Prioritário",
        "Ativação imediata"
      ]
    }
  ];

  return (
    <section className="py-20 pb-8 bg-muted/30" data-section="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Planos que se adaptam ao seu negócio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Escolha o plano ideal para sua empresa. Sem fidelização, cancele quando quiser.
          </p>
          
          {/* Period Selection */}
          <div className="inline-flex bg-background rounded-xl p-1 shadow-lg">
            {periods.map((period) => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key as 'monthly' | 'semi' | 'annual')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 relative ${
                  selectedPeriod === period.key
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {period.label}
                {period.discount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-zaplia-green text-white text-xs px-2 py-1">
                    -{period.discount}%
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => {
            const currentDiscount = periods.find(p => p.key === selectedPeriod)?.discount || 0;
            const currentPrice = calculatePrice(plan.basePrice, currentDiscount, selectedPeriod);
            const originalTotalPrice = getOriginalTotalPrice(plan.basePrice, selectedPeriod);
            
            return (
              <Card 
                key={index}
                className={`relative p-8 hover:shadow-cta transition-all duration-300 hover:-translate-y-2 ${plan.color} ${plan.badge === "Mais Popular" ? "scale-105" : ""}`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge 
                      className={`px-4 py-1 font-semibold ${
                        plan.badge === "Mais Popular" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-zaplia-orange text-white"
                      }`}
                    >
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                {/* Plan Header */}
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
                        {selectedPeriod === 'monthly' ? '/mês' : selectedPeriod === 'semi' ? ' por 6 meses' : ' por 1 ano'}
                      </span>
                    </div>
                  </div>
                </div>
              
                {/* Features */}
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
                
                {/* CTA Button */}
                <Button 
                  variant={plan.badge === "Mais Popular" ? "cta" : "outline"} 
                  className="w-full"
                  size="lg"
                  onClick={() => window.open("https://app.zaplia.com.br/signup", "_blank")}
                >
                  Assinar Agora
                </Button>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Precisa de um plano personalizado para sua empresa?
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => openWhatsApp(ZAPLIA_WHATSAPP, "Gostaria de um plano personalizado para minha empresa!")}
          >
            Falar com Especialista
          </Button>
        </div>
      </div>
    </section>
  );
};