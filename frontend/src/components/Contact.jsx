import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';
import { contactInfo } from '../data/mock';
import { Card, CardContent } from './ui/card';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Contact = () => {
  const openInstagram = () => {
    window.open('https://www.instagram.com/precycle22/', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-white">Nous </span>
            <span className="bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">Contacter</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Suivez-nous sur Instagram pour découvrir nos dernières réalisations !
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Instagram CTA */}
          <div className="text-center mb-12">
            <button
              onClick={openInstagram}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              <Instagram className="w-6 h-6" />
              <span>Suivez-nous sur Instagram</span>
            </button>
            <p className="text-gray-400 mt-4">@precycle22</p>
          </div>

          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Adresse</h3>
                <p className="text-gray-300 text-sm">{contactInfo.address}</p>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mx-auto mb-4">
                  <Phone className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Téléphone</h3>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  {contactInfo.phone}
                </a>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mx-auto mb-4">
                  <Mail className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  {contactInfo.email}
                </a>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mx-auto mb-4">
                  <Clock className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-white font-semibold mb-3">Horaires</h3>
                <div className="space-y-1">
                  {Object.entries(contactInfo.hours).map(([day, hours]) => (
                    <div key={day} className="text-xs">
                      <span className="text-gray-300">{day}</span>
                      <br />
                      <span className="text-gray-400">{hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};