import React from 'react';
import { Heart, Award, Mountain } from 'lucide-react';

export const WhoAmI = () => {
  return (
    <section id="whoami" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-white">Qui </span>
            <span className="bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">suis-je</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-light text-white mb-6">
              Plus qu'une réparation, un moment de partage entre passionnés
            </h3>
            <div className="text-xl text-red-400 font-semibold mb-8">
              Salut, moi c'est Laurent !
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <p className="text-lg">
              Si vous cherchez un technicien en blouse blanche un peu froid, vous n'êtes sans doute pas au bon endroit. 
              Chez moi, la mécanique, ça rime avec sourire et accent du Sud !
            </p>

            <p className="text-lg">
              Tout a commencé à 8 ans, les genoux écorchés sur un VTT. Depuis, la passion ne m'a jamais lâché : 
              de la boue des sentiers au bitume des courses de route, le vélo est mon mode de vie. 
              Après 10 ans passés en magasin et trois diplômes de technicien en poche (parce qu'on ne plaisante pas avec la sécurité !), 
              j'ai eu envie de créer un service qui me ressemble : humain, honnête et chaleureux.
            </p>

            {/* Why choose me */}
            <div className="my-12">
              <h4 className="text-xl text-white font-semibold mb-8 text-center">
                Pourquoi venir me voir (ou m'appeler chez vous) ?
              </h4>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 flex-shrink-0">
                    <Heart className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-2">On prend le temps</h5>
                    <p className="text-gray-300">
                      Que je vienne chez vous avec mon camion ou que l'on se croise à mon atelier fixe, 
                      je ne suis pas là pour faire défiler les vélos à la chaîne. On discute, on analyse ensemble, 
                      et je vous explique ce que je fais.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 flex-shrink-0">
                    <Award className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-2">L'amour du beau matos</h5>
                    <p className="text-gray-300">
                      En tant que compétiteur, je sais ce qu'un vélo représente pour son propriétaire. 
                      Je chouchoute votre monture comme si c'était la mienne, que ce soit pour une révision de sécurité 
                      ou un réglage de précision.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30 flex-shrink-0">
                    <Mountain className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-2">Réparer plutôt que jeter</h5>
                    <p className="text-gray-300">
                      Ma philosophie, c'est la durabilité. On cherche la solution la plus juste pour faire durer 
                      votre plaisir de rouler, sans pousser à la consommation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg text-center">
              Au-delà des outils et de la technique, ce que je préfère dans mon métier, c'est vous écouter raconter 
              votre dernière sortie ou votre prochain défi. Le vélo, c'est avant tout du partage.
            </p>

            <div className="text-center py-8">
              <p className="text-lg text-white mb-4">
                Alors, on se voit quand pour une petite révision ?
              </p>
              <p className="text-gray-300 mb-6">
                Je m'occupe de la mécanique, et la bonne humeur est offerte !
              </p>
              <p className="text-red-400 font-semibold text-lg">
                Et attention on dit une chocolatine, c'est non négociable ! 😉
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-3 rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-red-500/25"
            >
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};