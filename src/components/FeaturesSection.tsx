import { Card } from "@/components/ui/card";
import { 
  Users, 
  MessageSquare, 
  UserCheck, 
  ArrowRightLeft, 
  Calendar, 
  GitBranch, 
  Bot, 
  Megaphone,
  Network,
  Zap,
  Smartphone,
  MessageCircle,
  BarChart3,
  Shield,
  Cpu,
  Download
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "CRM no WhatsApp",
      description: "Gestão centralizada de clientes em tempo real.",
      color: "bg-zaplia-green"
    },
    {
      icon: MessageSquare,
      title: "Multi Atendimento",
      description: "Vários atendentes em um único número.",
      color: "bg-zaplia-blue"
    },
    {
      icon: UserCheck,
      title: "Assinatura",
      description: "Nome do atendente visível nas conversas.",
      color: "bg-zaplia-purple"
    },
    {
      icon: ArrowRightLeft,
      title: "Transferência",
      description: "Passe conversas facilmente entre atendentes.",
      color: "bg-zaplia-orange"
    },
    {
      icon: Calendar,
      title: "Agendamento",
      description: "Mensagens automáticas em datas e horários estratégicos.",
      color: "bg-zaplia-cyan"
    },
    {
      icon: GitBranch,
      title: "Divisão",
      description: "Filas e setores para organização de atendimento.",
      color: "bg-zaplia-red"
    },
    {
      icon: Bot,
      title: "Automatize",
      description: "Respostas programadas que direcionam clientes.",
      color: "bg-zaplia-yellow"
    },
    {
      icon: Megaphone,
      title: "Campanhas",
      description: "Disparo em massa de mensagens e notificações.",
      color: "bg-zaplia-green"
    },
    {
      icon: Network,
      title: "Várias Conexões",
      description: "Diversos números de WhatsApp conectados.",
      color: "bg-zaplia-blue"
    },
    {
      icon: Zap,
      title: "Respostas Rápidas",
      description: "Salve mensagens recorrentes.",
      color: "bg-zaplia-purple"
    },
    {
      icon: Smartphone,
      title: "Mobilidade",
      description: "Acesso web e Mobile",
      color: "bg-zaplia-orange"
    },
    {
      icon: MessageCircle,
      title: "Chat Interno",
      description: "Comunicação entre equipe dentro da plataforma.",
      color: "bg-zaplia-cyan"
    },
    {
      icon: BarChart3,
      title: "Métricas",
      description: "Dashboard detalhado de performance.",
      color: "bg-zaplia-red"
    },
    {
      icon: Shield,
      title: "Administração",
      description: "Controle total das conversas e permissões.",
      color: "bg-zaplia-yellow"
    },
    {
      icon: Cpu,
      title: "API de Integração",
      description: "API REST para conectar com outros sistemas.",
      color: "bg-zaplia-green"
    },
    {
      icon: Download,
      title: "Sem Instalação",
      description: "100% web, sem necessidade de downloads.",
      color: "bg-zaplia-blue"
    }
  ];

  return (
    <section className="py-20 bg-background" data-section="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tudo que você precisa para vender mais
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Funcionalidades completas para transformar seu WhatsApp em uma máquina de vendas profissional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-feature transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};