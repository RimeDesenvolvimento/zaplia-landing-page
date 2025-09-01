import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export const HeaderSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback for home
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <img
              src="/lovable-uploads/e7032f18-a75b-442b-9051-d727b94de356.png"
              alt="Zaplia"
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Funcionalidades
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Preços
            </button>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              className="bg-zaplia-green hover:bg-zaplia-green/90"
              onClick={() => window.open('/signup', '_blank')}
            >
              Teste Grátis
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('/login', '_blank')}
            >
              Entrar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-foreground/80 hover:text-primary transition-colors font-medium py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-foreground/80 hover:text-primary transition-colors font-medium py-2"
              >
                Funcionalidades
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-left text-foreground/80 hover:text-primary transition-colors font-medium py-2"
              >
                Preços
              </button>
              <div className="pt-4 space-y-3">
                <Button
                  className="w-full bg-zaplia-green hover:bg-zaplia-green/90"
                  onClick={() => window.open('/signup', '_blank')}
                >
                  Teste Grátis
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    window.open('https://app.zaplia.com.br/login', '_blank')
                  }
                >
                  Entrar
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
