import React, { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { professionalImages, workshopImages } from '../data/mock';
import { Card, CardContent } from './ui/card';

export const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('realisations');
  const [selectedImage, setSelectedImage] = useState(null);

  // Mock gallery images - you can replace with real gallery images
  const galleryData = {
    realisations: [
      {
        url: professionalImages[0].url,
        alt: "Réparation complète d'un VTT",
        title: "Révision complète VTT"
      },
      {
        url: workshopImages[0].url,
        alt: "Mécanicien travaillant sur un vélo",
        title: "Service professionnel"
      },
      {
        url: professionalImages[1].url,
        alt: "Établi avec outils organisés",
        title: "Atelier équipé"
      },
      {
        url: workshopImages[1].url,
        alt: "Espace de travail Precycle",
        title: "Notre atelier"
      },
      {
        url: professionalImages[2].url,
        alt: "Collection d'outils professionnels",
        title: "Outillage spécialisé"
      },
      {
        url: workshopImages[2].url,
        alt: "Vélo en cours de réparation",
        title: "Réparation en cours"
      }
    ],
    evenements: [
      {
        url: professionalImages[3].url,
        alt: "Événement vélo à Trégueux",
        title: "Journée portes ouvertes"
      },
      {
        url: professionalImages[0].url,
        alt: "Formation mécanique vélo",
        title: "Atelier formation"
      },
      {
        url: workshopImages[0].url,
        alt: "Démonstration réparation",
        title: "Démonstration technique"
      }
    ],
    equipe: [
      {
        url: workshopImages[0].url,
        alt: "Équipe Precycle au travail",
        title: "Notre équipe passionnée"
      },
      {
        url: professionalImages[1].url,
        alt: "Mécanicien expérimenté",
        title: "Expertise technique"
      },
      {
        url: workshopImages[1].url,
        alt: "Formation continue de l'équipe",
        title: "Formation continue"
      }
    ]
  };

  const categories = {
    realisations: { name: 'Réalisations', icon: Camera },
    evenements: { name: 'Événements', icon: Camera },
    equipe: { name: 'Équipe', icon: Camera }
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentImages = galleryData[selectedCategory];
    const currentIndex = currentImages.findIndex(img => img.url === selectedImage.url);
    const nextIndex = (currentIndex + 1) % currentImages.length;
    setSelectedImage(currentImages[nextIndex]);
  };

  const prevImage = () => {
    const currentImages = galleryData[selectedCategory];
    const currentIndex = currentImages.findIndex(img => img.url === selectedImage.url);
    const prevIndex = currentIndex === 0 ? currentImages.length - 1 : currentIndex - 1;
    setSelectedImage(currentImages[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-white">Notre </span>
            <span className="bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">Galerie</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre atelier, nos réalisations et l'équipe passionnée de Precycle
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold ${
                  selectedCategory === key
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryData[selectedCategory].map((image, index) => (
            <Card 
              key={index} 
              className="bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/10 backdrop-blur-sm overflow-hidden cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <CardContent className="p-0">
                <div className="relative group">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold text-sm">{image.title}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-500 text-white p-2 rounded-full transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-white font-semibold text-lg">{selectedImage.title}</h3>
                <p className="text-gray-300 text-sm">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Envie de confier votre vélo à notre équipe ?
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-3 rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-red-500/25"
          >
            Nous contacter
          </button>
        </div>
      </div>
    </section>
  );
};