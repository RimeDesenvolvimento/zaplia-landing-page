import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { openWhatsApp, ZAPLIA_WHATSAPP } from "@/utils/whatsapp";

export const DemoSection = () => {
  return (
    <section id="demo-section" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Veja o Zaplia em ação
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra como milhares de empresas estão revolucionando seu atendimento no WhatsApp.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden bg-gradient-card border-0 shadow-feature">
            {/* Video Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-zaplia-blue/20 flex items-center justify-center group cursor-pointer">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Demonstração do Zaplia
                </h3>
                <p className="text-white/80">
                  Veja como gerenciar múltiplos atendimentos de forma inteligente
                </p>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-sm text-white font-medium">
                  📱 +55 11 99999-9999
                </div>
              </div>
              
              <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-sm text-white font-medium">
                  👥 5 atendentes online
                </div>
              </div>
              
              <div className="absolute top-1/2 right-8 bg-white/10 backdrop-blur-sm rounded-lg p-3 transform -translate-y-1/2">
                <div className="text-sm text-white font-medium">
                  💬 28 conversas ativas
                </div>
              </div>
            </div>
            
            {/* Demo Stats */}
            <div className="p-8 bg-white">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-zaplia-green mb-2">+40%</div>
                  <div className="text-muted-foreground">Aumento em vendas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-zaplia-blue mb-2">-60%</div>
                  <div className="text-muted-foreground">Tempo de resposta</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-zaplia-purple mb-2">24/7</div>
                  <div className="text-muted-foreground">Atendimento ativo</div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg" 
              className="group"
              onClick={() => openWhatsApp(ZAPLIA_WHATSAPP, "Gostaria de ver uma demonstração do Zaplia!")}
            >
              Veja como funciona
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};