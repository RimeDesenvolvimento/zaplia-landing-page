import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '@/services/api';
import qs from "query-string";

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

const RegisterPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
      setIsSubmitting(true);
     
      const dataToBd = {
        name: data.companyName,
        email: data.email,
        phone: data.phone?.replace(/\D/g, '') || '',
        cpfCnpj: data.cpfCnpj.replace(/\D/g, ''),
        password: data.password,
      };

      if (partnerToken) {
        Object.assign(dataToBd, { partnerToken: partnerToken });
      }

      await apiClient.post('/companies/cadastro', dataToBd);

      window.location.href = '/trial-obrigado';
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        <p className="text-lg text-gray-500 mt-3  mb-8 text-center">
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
            {isSubmitting ? 'Obtendo teste grátis...' : 'Obter teste grátis'}
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
  );
};

export default RegisterPage;
