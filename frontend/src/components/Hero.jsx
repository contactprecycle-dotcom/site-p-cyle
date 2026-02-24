import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://customer-assets.emergentagent.com/job_cycle-repair/artifacts/wacgsfxj_fond%20d%27accueil.png"
          alt="Fond d'accueil Precycle"
          className="w-full h-full object-cover brightness-125"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-red-900/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Spacer to push content down */}
        <div style={{ height: '200px' }}></div>

        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
            Precycle est un atelier dédié à l'entretien, la réparation et la remise en état de vos vélos. 
            Que vous soyez cycliste du quotidien, sportif ou amateur, nous prenons soin de votre vélo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
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
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
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