import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Lock } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Mais Vendas",
      description: "Capture e atenda leads instantaneamente.",
      emoji: "🚀",
      gradient: "from-zaplia-green to-zaplia-blue"
    },
    {
      icon: Clock,
      title: "Mais Agilidade",
      description: "Reduza filas e tempo médio de atendimento.",
      emoji: "⏱️",
      gradient: "from-zaplia-blue to-zaplia-purple"
    },
    {
      icon: Lock,
      title: "Controle Total",
      description: "Configure permissões e supervisão detalhada.",
      emoji: "🔒",
      gradient: "from-zaplia-purple to-zaplia-orange"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Benefícios que transformam seu negócio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Resultados comprovados em milhares de empresas que já usam o Zaplia.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="relative p-8 text-center overflow-hidden group hover:shadow-cta transition-all duration-500 hover:-translate-y-4"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.emoji}
                </div>
                
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-zaplia-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};