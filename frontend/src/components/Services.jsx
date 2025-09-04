import React from 'react';
import { Shield, Wrench, Plus, CheckCircle } from 'lucide-react';
import { services } from '../data/mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const iconMap = {
  'shield-check': Shield,
  'wrench': Wrench,
  'plus-circle': Plus
};

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Nos </span>
            <span className="bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">Prestations</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Découvrez nos forfaits adaptés à tous vos besoins d'entretien et de réparation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Card key={service.id} className="bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/10 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
                    <IconComponent className="w-8 h-8 text-red-400" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {service.title}
                  </CardTitle>
                  <div className="text-3xl font-bold bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
                    {service.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center mb-6 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-6 bg-gradient-to-r from-red-600/80 to-red-500/80 text-white py-3 rounded-lg hover:from-red-600 hover:to-red-500 transition-all duration-300 transform hover:scale-105 font-semibold">
                    Choisir ce forfait
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-red-500 text-red-400 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Voir tous les tarifs
          </button>
        </div>
      </div>
    </section>
  );
};