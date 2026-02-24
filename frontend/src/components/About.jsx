import React from 'react';
import { Heart, Award, Clock, MapPin } from 'lucide-react';
import { workshopImages, professionalImages } from '../data/mock';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                Precycle est né de la passion du vélo et de l'envie de promouvoir une mobilité durable. 
                Situé à Trégueux, notre atelier est ouvert à tous les cyclistes, du loisir au sportif confirmé.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Nous vous garantissons un service de proximité, rapide et de qualité. 
                Notre expertise couvre tous types de vélos : VTC, VTT, vélos de route et vélos urbains.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                  <Heart className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Passion du vélo</h3>
                  <p className="text-gray-400 text-sm">Une équipe passionnée à votre service</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                  <Award className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Expertise technique</h3>
                  <p className="text-gray-400 text-sm">Réparations de qualité professionnelle</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                  <Clock className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Service rapide</h3>
                  <p className="text-gray-400 text-sm">Délais respectés et transparents</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                  <MapPin className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Proximité</h3>
                  <p className="text-gray-400 text-sm">Atelier local à Trégueux</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-3 rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-red-500/25"
              >
                Nous rencontrer
              </button>
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://customer-assets.emergentagent.com/job_cycle-repair/artifacts/8i6mpqai_IMG_8182.PNG"
                alt="Atelier Precycle - Mécanicien au travail"
                className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-105"
              />
              <img
                src="https://customer-assets.emergentagent.com/job_cycle-repair/artifacts/fr6j7nw3_IMG_8180.PNG"
                alt="Atelier Precycle - Espace de travail professionnel"
                className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-105"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://customer-assets.emergentagent.com/job_cycle-repair/artifacts/2l16wft9_IMG_8102.jpeg"
                alt="Atelier Precycle - Laurent en action"
                className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-105"
              />
              <img
                src="https://customer-assets.emergentagent.com/job_cycle-repair/artifacts/86yy7338_IMG_8181.PNG"
                alt="Atelier Precycle - Vélo en réparation"
                className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};