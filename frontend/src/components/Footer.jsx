import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { logo, contactInfo } from '../data/mock';

export const Footer = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logo.url} 
                alt={logo.alt}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre atelier de confiance pour l'entretien et la réparation de tous types de vélos à Trégueux.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-gray-300 hover:text-white" />
              </a>
              <a 
                href="https://www.instagram.com/precycle22/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                aria-label="Instagram Precycle"
              >
                <Instagram className="w-4 h-4 text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  À propos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  Prestations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  Tarifs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400 text-sm">Forfait Sécurité</span></li>
              <li><span className="text-gray-400 text-sm">Forfait Complet</span></li>
              <li><span className="text-gray-400 text-sm">Réparation Transmission</span></li>
              <li><span className="text-gray-400 text-sm">Réparation Roues</span></li>
              <li><span className="text-gray-400 text-sm">Système de Freinage</span></li>
              <li><span className="text-gray-400 text-sm">Accessoires</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{contactInfo.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Precycle. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <button className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm">
                Mentions légales
              </button>
              <button className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm">
                Politique de confidentialité
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};