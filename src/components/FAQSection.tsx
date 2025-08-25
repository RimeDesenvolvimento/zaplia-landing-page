import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Posso ter vários atendentes em um número?",
      answer: "Sim! O Zaplia permite que um único número seja usado por diversos atendentes, com possibilidade de dividir o atendimento em setores ou filas. Você escolhe se cada atendente vê apenas suas conversas ou se um supervisor acompanha todas."
    },
    {
      question: "Existe limite de mensagens por dia?",
      answer: "Não há limites. Você pode enviar quantas mensagens forem necessárias, respeitando apenas as condições técnicas do WhatsApp e os termos do plano contratado."
    },
    {
      question: "Corro risco de bloqueio no WhatsApp?",
      answer: "Não há risco de bloqueio ao usar o Zaplia, desde que sejam respeitadas as diretrizes do WhatsApp, especialmente em relação a campanhas em massa. Trabalhamos com boas práticas para manter seu número seguro."
    },
    {
      question: "Há fidelização ou taxa extra?",
      answer: "Não. Você paga apenas a mensalidade do plano escolhido, sem fidelização obrigatória. Caso cancele, continua com acesso até o fim do período já pago, sem taxas surpresa."
    },
    {
      question: "O Zaplia integra com ChatGPT?",
      answer: "Sim! Você pode integrar o Zaplia ao ChatGPT para criar fluxos de conversas contextualizados, com respostas inteligentes e linguagem natural. Apenas para o plano Enterprise Plus."
    },
    {
      question: "Como funciona o limite de conexões?",
      answer: "Cada conexão equivale a um número de WhatsApp ativo na plataforma. O limite depende do plano contratado. Você pode ter desde 1 conexão até múltiplos números, cada um para setores diferentes."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre o Zaplia e descubra como pode transformar seu atendimento.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 hover:shadow-card transition-shadow"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};