import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Send, CheckCircle, Loader2, Star } from 'lucide-react';
import { contactInfo } from '../data/mock';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    city: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Send data to backend
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        setIsSubmitted(true);
        setSuccessMessage(response.data.message);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', firstName: '', city: '', email: '', phone: '', message: '' });
          setSuccessMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      
      let errorMsg = "Erreur lors de l'envoi du message. Veuillez réessayer.";
      
      if (error.response?.data?.detail) {
        errorMsg = error.response.data.detail;
      } else if (error.message) {
        errorMsg = `Erreur de connexion: ${error.message}`;
      }
      
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/precycle22/', '_blank');
  };

  // Avis clients
  const reviews = [
    {
      id: 1,
      name: "Marie L.",
      rating: 5,
      text: "Ponctuel, très pro et très gentil ! Laurent a réparé mon VTC en un temps record.",
      date: "Il y a 2 semaines"
    },
    {
      id: 2,
      name: "Thomas D.",
      rating: 5,
      text: "Service impeccable ! Réparation à domicile très pratique. Je recommande vivement.",
      date: "Il y a 1 mois"
    },
    {
      id: 3,
      name: "Claire M.",
      rating: 5,
      text: "Laurent est passionné et ça se sent. Mon vélo n'a jamais été aussi bien réglé !",
      date: "Il y a 3 semaines"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-white">Nous </span>
            <span className="bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">Contacter</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Une question ? Un devis ? N'hésitez pas à nous contacter !
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Envoyez-nous un message</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Success/Error Messages */}
              {successMessage && (
                <div className="mb-4 p-4 bg-green-600/20 border border-green-500/50 rounded-lg">
                  <p className="text-green-400 text-sm">{successMessage}</p>
                </div>
              )}
              {errorMessage && (
                <div className="mb-4 p-4 bg-red-600/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                </div>
              )}

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-white mb-2 font-medium">
                        Nom *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="firstName" className="block text-white mb-2 font-medium">
                        Prénom *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white mb-2 font-medium">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-white mb-2 font-medium">
                        Téléphone *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                        placeholder="06 XX XX XX XX"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-white mb-2 font-medium">
                        Ville *
                      </label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                        placeholder="Votre ville"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white mb-2 font-medium">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 resize-none"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                  <p className="text-gray-300">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Info & Reviews */}
          <div className="space-y-8">
            {/* Instagram CTA */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <button
                  onClick={openInstagram}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 w-full justify-center"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Suivez-nous sur Instagram</span>
                </button>
                <p className="text-gray-400 mt-3">@precycle22</p>
              </CardContent>
            </Card>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Address */}
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mx-auto mb-3">
                    <MapPin className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-sm">Adresse</h3>
                  <p className="text-gray-300 text-xs">{contactInfo.address}</p>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mx-auto mb-3">
                    <Phone className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-sm">Téléphone</h3>
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-xs"
                  >
                    {contactInfo.phone}
                  </a>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mx-auto mb-3">
                    <Mail className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-sm">Email</h3>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-xs"
                  >
                    {contactInfo.email}
                  </a>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 mx-auto mb-3">
                    <Clock className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Horaires</h3>
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

            {/* Customer Reviews */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white text-center">Avis clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-800 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold text-sm">{review.name}</span>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">"{review.text}"</p>
                      <span className="text-gray-500 text-xs">{review.date}</span>
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