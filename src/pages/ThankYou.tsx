import { useEffect } from 'react';

const ThankYouPage: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = 'https://app.zaplia.com.br/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-green-300 via-white to-green-300 flex items-center justify-center p-5">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full ">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
          Z
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Bem-vindo ao Zaplia!
        </h1>
        <p className="text-gray-600 text-xl leading-relaxed mb-10">
          Sua conta foi criada com sucesso! 🎉
          <br />
          Agora você pode começar a usar nossa plataforma.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-xl uppercase tracking-wide hover:from-green-600 hover:to-green-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 "
        >
          Ir para Página Principal
        </button>
      </div>
    </div>
  );
};
export default ThankYouPage;
