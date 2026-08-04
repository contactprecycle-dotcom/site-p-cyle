import React, { useState } from 'react';
import { Cog, Disc, StopCircle, Wrench } from 'lucide-react';
import { detailedPricing } from '../data/mock';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const categoryIcons = {
  transmission: Cog,
  wheels: Disc,
  braking: StopCircle,
  accessories: Wrench
};

const categoryNames = {
  transmission: 'Transmission',
  wheels: 'Roues',
  braking: 'Freinage',
  accessories: 'Accessoires'
};

export const Pricing = () => {
  // On gère l'onglet actif (votre code d'origine)
  const [activeTab, setActiveTab] = useState('transmission');
  
  // NOUVEAU : On ajoute une mémoire pour savoir si l'image en grand est ouverte
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-white">Tarifs </span>
            <span className="bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">Détaillés</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Découvrez nos tarifs transparents pour tous les services de réparation et d'entretien
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 rounded-lg p-2 border border-gray-700">
              {Object.entries(categoryNames).map(([key, name]) => {
                const IconComponent = categoryIcons[key];
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex items-center space-x-2 py-3 px-4 rounded-md transition-all duration-300 data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300 hover:text-white"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(detailedPricing).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-8">
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardHeader className="border-b border-gray-800">
                    <CardTitle className="text-2xl font-bold text-white flex items-center space-x-3">
                      {React.createElement(categoryIcons[category], { className: "w-6 h-6 text-red-400" })}
                      <span>{categoryNames[category]}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-800">
                      {items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-4 hover:bg-gray-800/30 transition-colors duration-200">
                          <span className="text-gray-300 flex-1">{item.service}</span>
                          <span className="text-xl font-bold text-red-500 ml-4">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            * Les tarifs peuvent varier selon la complexité et l'état du vélo
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-red-500 text-red-400 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Demander un devis
          </button>

          {/* L'IMAGE CLASSIQUE SUR LA PAGE */}
          <div className="mt-12 flex justify-center relative">
            <div className="group relative cursor-pointer" onClick={() => setIsImageOpen(true)}>
              <img 
                src="/photo-frais-de-deplacement.jpg" 
                alt="Atelier Precycle" 
                className="rounded-xl shadow-lg border border-gray-800 max-w-full h-auto w-[600px] object-cover transition-all duration-300 group-hover:opacity-75"
              />
              {/* Petit effet visuel pour indiquer qu'on peut cliquer */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-black/70 text-white px-4 py-2 rounded-lg font-medium shadow">
                  Voir en grand
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* NOUVEAU : LA FENÊTRE MODALE POUR L'IMAGE EN GRAND */}
      {isImageOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          onClick={() => setIsImageOpen(false)} // Ferme l'image quand on clique n'importe où
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            {/* Bouton de fermeture */}
            <button 
              className="absolute top-4 right-4 text-white hover:text-red-500 text-4xl p-2 z-50"
              onClick={() => setIsImageOpen(false)}
            >
              &times;
            </button>
            {/* L'image en grand */}
            <img 
              src="/photo-frais-de-deplacement.jpg" 
              alt="Atelier Precycle en grand" 
              className="max-h-[90vh] max-w-full rounded-lg shadow-2xl object-contain border border-gray-700"
            />
          </div>
        </div>
      )}
    </section>
  );
};
