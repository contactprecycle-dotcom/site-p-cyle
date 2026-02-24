import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { logo } from '../data/mock';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-900/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={logo.url} 
              alt={logo.alt}
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-red-400 transition-colors duration-300 font-medium"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-red-400 transition-colors duration-300 font-medium"
            >
              À propos
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-red-400 transition-colors duration-300 font-medium"
            >
              Prestations
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-white hover:text-red-400 transition-colors duration-300 font-medium"
            >
              Tarifs
            </button>
            <button 
              onClick={() => scrollToSection('whoami')}
              className="text-white hover:text-red-400 transition-colors duration-300 font-medium"
            >
              Présentation
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-lg hover:from-red-500 to-red-400 transition-all duration-300 transform hover:scale-105 font-medium"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-red-400 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-red-900/20 pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-red-400 transition-colors duration-300 font-medium text-left"
              >
                Accueil
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-red-400 transition-colors duration-300 font-medium text-left"
              >
                À propos
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-white hover:text-red-400 transition-colors duration-300 font-medium text-left"
              >
                Prestations
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-white hover:text-red-400 transition-colors duration-300 font-medium text-left"
              >
                Tarifs
              </button>
              <button 
                onClick={() => scrollToSection('whoami')}
                className="text-white hover:text-red-400 transition-colors duration-300 font-medium text-left"
              >
                Présentation
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-lg hover:from-red-500 to-red-400 transition-all duration-300 transform hover:scale-105 font-medium w-fit"
              >
                Contact
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};