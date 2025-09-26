import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '@/services/api';
import qs from 'query-string';

const formSchema = z
  .object({
    companyName: z.string().min(1, 'Nome da empresa é obrigatório'),
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    phone: z
      .string()
      .regex(
        /^\(\d{2}\) \d{4,5}-\d{4}$/,
        'Formato inválido. Use: (11) 99999-9999'
      )
      .optional()
      .or(z.literal('')),
    cpfCnpj: z.string().refine(
      value => {
        const numbers = value.replace(/\D/g, '');
        return numbers.length === 11 || numbers.length === 14;
      },
      { message: 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos' }
    ),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    passwordConfirmation: z
      .string()
      .min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'As senhas não coincidem',
  });

type FormData = z.infer<typeof formSchema>;

// Modal de Termos de Uso
const TermsModal: React.FC<{
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}> = ({ isOpen, onAccept, onDecline }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const resetModal = () => {
    setHasScrolledToBottom(false);
    setTermsAccepted(false);
  };

  useEffect(() => {
    if (isOpen) {
      resetModal();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Termos de Uso e Contrato - Zaplia
          </h2>
          <p className="text-gray-600">
            Por favor, leia atentamente os termos antes de prosseguir
          </p>
        </div>

        <div
          className="flex-1 overflow-y-auto p-6 text-sm text-gray-700 leading-relaxed"
          onScroll={handleScroll}
        >
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-800 mb-2">Introdução</h3>
              <p>
                Zaplia é uma marca da empresa RIME TECNOLOGIA E DESENVOLVIMENTO
                DE SOFTWARE LTDA - ME, inscrita sob o CNPJ 58.416.071/0001-50,
                estabelecida à Avenida Eng. Luiz Carlos Berrini, 1681, Conjuntos
                111 e 112, Anexo 1952, Cidade Monções, São Paulo – SP, CEP
                04571-011, doravante designada simplesmente CONTRATADA.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                1 – OBJETO DO CONTRATO
              </h3>
              <p className="mb-3">
                1.1 Os serviços que constituem o objeto do presente Contrato
                consistem em um conjunto de ferramentas, recursos e
                funcionalidades web voltadas à comunicação por meio do WhatsApp
                Web, integradas em um sistema para o atendimento automático
                on-line dos contatos cadastrados pela CONTRATANTE.
              </p>
              <p className="mb-3">
                O programa serve para empresas que queiram utilizar o WhatsApp
                como canal de comunicação e/ou vendas. A integração com o
                WhatsApp permite que a CONTRATANTE tenha vários usuários logados
                ao mesmo tempo, que poderão se comunicar com os seus contatos
                por meio de vários números de WhatsApp, podendo ainda configurar
                o robô (Chatbot) para enviar mensagens programadas através de
                uma sequência previamente configurada pela CONTRATANTE.
              </p>
              <p className="mb-3">
                1.4 O Zaplia não utiliza a API oficial do WhatsApp.
              </p>
              <p className="mb-3">
                1.5 A falta de funcionamento momentânea do Zaplia pode derivar
                de alguma atualização em nossos sistemas. Nestes casos, deve-se
                aguardar por mais detalhes ou procurar o suporte do setor para
                obter informações.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                2 – VIGÊNCIA DO CONTRATO
              </h3>
              <p className="mb-3">
                2.1 O presente contrato terá vigência mensal, limitada à
                quantidade de usuários e de mensagens do plano selecionado no
                formulário de contratação dos serviços em nosso site.
              </p>
              <p className="mb-3">
                2.2 O atraso no pagamento implica em suspensão do serviço após o
                período de 48 horas da data de vencimento.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                3 – CANCELAMENTO
              </h3>
              <p className="mb-3">
                3.1 Poderá ser rescindido o serviço a qualquer momento por
                qualquer das partes, sem devolução dos valores já contratados,
                ou seja, não haverá fracionamento do plano contratado, sendo a
                periodicidade mínima de 30 dias.
              </p>
              <p className="mb-3">
                3.2 Será bloqueado o serviço no caso de mora da CONTRATANTE de
                mais de 48 horas, a partir da data de vencimento.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                4 – DAS RESPONSABILIDADES DAS PARTES
              </h3>
              <p className="mb-3">
                <strong>4.1 Cabe à parte CONTRATADA:</strong> Realizar e cumprir
                os serviços selecionados no formulário de contratação de acordo
                com a descrição do objeto do contrato; Garantir a realização
                integral do(s) serviço(s) contratado(s) pela CONTRATANTE;
                Efetuar, a qualquer tempo, a correção de qualquer bug ou falha
                do sistema.
              </p>
              <p className="mb-3">
                <strong>4.2 Cabe à parte CONTRATANTE:</strong> A total
                responsabilização pela má utilização do serviço; A
                responsabilização pelo uso e distribuição da senha de acesso
                à(s) sua(s) conta(s); Não incluir ou distribuir imagens, vídeos
                e demais conteúdos pornográficos ou para finalidades ilegais no
                Brasil e em qualquer outro país.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                8 – DOS VALORES DOS SERVIÇOS
              </h3>
              <p className="mb-3">
                8.1 O(s) valor(es) estão publicados no formulário de contratação
                em nosso site: https://zaplia.com.br. O valor a ser pago pela
                CONTRATANTE será equivalente ao(s) serviço(s) selecionado(s).
              </p>
              <p className="mb-3">
                8.2 O não acesso à plataforma e/ou não utilização dos serviços
                não isentará a CONTRATANTE do pagamento da mensalidade, pois o
                pagamento é devido pela simples disponibilização do serviço.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                9 – DO REEMBOLSO
              </h3>
              <p className="mb-3">
                9.1 Conforme o Código de Defesa do Consumidor, o cliente tem
                direito de arrependimento para contratação de produtos ou
                serviços realizados de forma online de até 7 dias após a
                primeira compra e receberá o reembolso referente à sua
                mensalidade.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                11 – DAS CONDIÇÕES GERAIS
              </h3>
              <p className="mb-3">
                11.2 O Zaplia é um serviço desenvolvido principalmente para o
                atendimento automático de comunicação iniciada por terceiros.
                Por isso, se houver reclamações pelo envio de mensagens para
                pessoas que não pediram para receber seus conteúdos (SPAM), o
                WhatsApp poderá categorizar o acesso da CONTRATANTE como spam,
                podendo ocorrer o banimento.
              </p>
              <p className="mb-3">
                11.3 A CONTRATANTE pode ser banida/bloqueada pelo WhatsApp se
                não respeitar as regras de aprovação dos conteúdos enviados. A
                responsabilização pelo banimento é exclusiva da CONTRATANTE.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-semibold text-yellow-800 mb-2">IMPORTANTE</h3>
              <p className="text-yellow-700">
                📌 Válido a partir da data de cadastro ou início do teste grátis
                na plataforma e por tempo indeterminado.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          {!hasScrolledToBottom && (
            <div className="text-center mb-4">
              <p className="text-orange-600 font-medium">
                ⬇️ Role até o final para continuar
              </p>
            </div>
          )}

          {hasScrolledToBottom && (
            <div className="flex flex-col items-center space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={e => setTermsAccepted(e.target.checked)}
                  className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-gray-700 font-medium">
                  Li e concordo com os Termos de Uso e Contrato
                </span>
              </label>

              <div className="flex space-x-4">
                <button
                  onClick={onDecline}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={onAccept}
                  disabled={!termsAccepted}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Aceitar e Continuar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RegisterPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<FormData | null>(
    null
  );

  const params = qs.parse(window.location.search);
  const partnerToken = params.token;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17522613958';
    script.async = true;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-17522613958');
      `;
    document.head.appendChild(inlineScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(inlineScript);
    };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      }
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const formatCpfCnpj = (value: string): string => {
    const numbers = value.replace(/\D/g, '').slice(0, 14);
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      return numbers.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue('phone', formatted, { shouldValidate: true });
  };

  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpfCnpj(e.target.value);
    setValue('cpfCnpj', formatted, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FormData> = async data => {
    // Salva os dados do formulário e mostra o modal de termos
    setFormDataToSubmit(data);
    setShowTermsModal(true);
  };

  const handleTermsAccept = async () => {
    if (!formDataToSubmit) return;

    setShowTermsModal(false);
    setTermsAccepted(true);

    try {
      setIsSubmitting(true);

      const dataToBd = {
        name: formDataToSubmit.companyName,
        email: formDataToSubmit.email,
        phone: formDataToSubmit.phone?.replace(/\D/g, '') || '',
        cpfCnpj: formDataToSubmit.cpfCnpj.replace(/\D/g, ''),
        password: formDataToSubmit.password,
      };

      if (partnerToken) {
        Object.assign(dataToBd, { partnerToken });
      }

      await apiClient.post('/companies/cadastro', dataToBd);

      window.location.href = '/trial-obrigado';
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTermsDecline = () => {
    setShowTermsModal(false);
    setFormDataToSubmit(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-300 via-white to-green-300 flex items-center justify-center p-5">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 w-full max-w-md transform hover:-translate-y-1 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                Z
              </div>
              <span className="text-4xl font-bold text-gray-800">Zaplia</span>
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-center text-gray-800">
            Criar sua conta
          </h1>
          <p className="text-lg text-gray-500 mt-3 mb-8 text-center">
            🎉 Não precisa de cartão de crédito
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Empresa
              </label>
              <input
                type="text"
                {...register('companyName')}
                placeholder="Digite o nome da sua empresa"
                className={`w-full px-5 py-4 border-2 rounded-xl outline-none transition-all duration-200 hover:-translate-y-0.5 ${
                  errors.companyName ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="seu@email.com"
                className={`w-full px-5 py-4 border-2 rounded-xl outline-none transition-all duration-200 hover:-translate-y-0.5 ${
                  errors.email ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone (com DDD)
              </label>
              <input
                type="tel"
                {...register('phone')}
                onChange={handlePhoneChange}
                placeholder="(11) 99999-9999"
                className={`w-full px-5 py-4 border-2 rounded-xl outline-none transition-all duration-200 hover:-translate-y-0.5 ${
                  errors.phone ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CPF / CNPJ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('cpfCnpj')}
                onChange={handleCpfCnpjChange}
                placeholder="000.000.000-00 ou 00.000.000/0001-00"
                maxLength={18}
                className={`w-full px-5 py-4 border-2 rounded-xl outline-none transition-all duration-200 hover:-translate-y-0.5 ${
                  errors.cpfCnpj ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.cpfCnpj && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cpfCnpj.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register('password')}
                placeholder="Digite uma senha segura"
                className={`w-full px-5 py-4 border-2 rounded-xl outline-none transition-all duration-200 hover:-translate-y-0.5 ${
                  errors.password ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register('passwordConfirmation')}
                placeholder="Confirme sua senha"
                className={`w-full px-5 py-4 border-2 rounded-xl outline-none transition-all duration-200 hover:-translate-y-0.5 ${
                  errors.passwordConfirmation
                    ? 'border-red-300'
                    : 'border-gray-200'
                }`}
              />
              {errors.passwordConfirmation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passwordConfirmation.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg uppercase tracking-wide hover:from-green-600 hover:to-green-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Criando conta...' : 'Obter teste grátis'}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-600">Já possui uma conta? </span>
            <button
              onClick={() =>
                window.open('https://app.zaplia.com.br/login', '_blank')
              }
              className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors duration-200"
            >
              Fazer login
            </button>
          </div>
        </div>
      </div>

      <TermsModal
        isOpen={showTermsModal}
        onAccept={handleTermsAccept}
        onDecline={handleTermsDecline}
      />
    </>
  );
};

export default RegisterPage;
