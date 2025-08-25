import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clientLogos from "@/assets/client-logos-white-bg.jpg";
import testimonialCarlos from "@/assets/testimonial-carlos.jpg";
import testimonialMaria from "@/assets/testimonial-maria.jpg";
import testimonialJoao from "@/assets/testimonial-joao.jpg";

export const SocialProofSection = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "CEO",
      image: testimonialCarlos,
      text: "O Zaplia transformou nosso atendimento. Conseguimos aumentar as vendas em 40% no primeiro mês.",
      rating: 5
    },
    {
      name: "Maria Santos",
      role: "Gerente de Vendas",
      image: testimonialMaria,
      text: "A automação do Zaplia nos permitiu atender 3x mais clientes com a mesma equipe.",
      rating: 5
    },
    {
      name: "João Oliveira",
      role: "Diretor",
      image: testimonialJoao,
      text: "Interface intuitiva e suporte excelente. Recomendo para qualquer empresa que usa WhatsApp.",
      rating: 5
    }
  ];

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 shadow-feature hover:shadow-cta transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-zaplia-yellow fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};