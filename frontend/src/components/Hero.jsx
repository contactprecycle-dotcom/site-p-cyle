import React from 'react';
import { ChevronDown, Wrench } from 'lucide-react';
import { professionalImages } from '../data/mock';

export const Hero = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={professionalImages[0].url}
          alt={professionalImages[0].alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-red-900/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-600/20 to-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30 mb-6">
            <Wrench className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">PRE</span>
            <span className="bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">CYCLE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
            L'atelier vélo à Trégueux
          </p>
        </div>

        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
            Precycle est un atelier dédié à l'entretien, la réparation et la remise en état de vos vélos. 
            Que vous soyez cycliste du quotidien, sportif ou amateur, nous prenons soin de votre vélo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={scrollToServices}
            className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
          >
            Voir nos prestations
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Nous contacter
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToServices}
            className="text-white hover:text-red-400 transition-colors duration-300"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-16 w-1 h-1 bg-white rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse opacity-50"></div>
    </section>
  );
};