// Mock data for Precycle website

export const services = [
  {
    id: 1,
    title: "Forfait Sécurité",
    price: "45€",
    description: "Contrôle et réglage des serrages et des systèmes de freinage, contrôle des dérailleurs et réglage, plus lubrification de la chaîne, pression des pneus",
    icon: "shield-check",
    features: [
      "Contrôle et réglage des serrages",
      "Systèmes de freinage",
      "Contrôle des dérailleurs",
      "Lubrification de la chaîne",
      "Pression des pneus"
    ]
  },
  {
    id: 2,
    title: "Forfait Complet",
    price: "85€",
    description: "Le forfait sécurité + nettoyage du vélo, graissage de boîtier de pédalier, changement des câbles et gaines",
    icon: "wrench",
    features: [
      "Tout le forfait sécurité",
      "Nettoyage du vélo",
      "Graissage boîtier de pédalier",
      "Changement câbles et gaines",
      "Réglage complet"
    ]
  },
  {
    id: 3,
    title: "Options",
    price: "10€",
    description: "Services complémentaires pour votre vélo",
    icon: "plus-circle",
    features: [
      "Gros lavage de vélo",
      "Montage accessoires"
    ]
  }
];

export const detailedPricing = {
  transmission: [
    { service: "Réglage des dérailleurs", price: "15€" },
    { service: "Changement câbles + gaines dérailleurs", price: "20€" },
    { service: "Changement câbles + gaines (passage interne)", price: "25€" },
    { service: "Changement de chaîne", price: "17€" },
    { service: "Changement cassette / roue libre / plateau", price: "15€" },
    { service: "Changement manette (câble, gaine, réglage)", price: "25€" },
    { service: "Changement manette (passage interne)", price: "30€" },
    { service: "Changement cocotte (câble, gaine, réglage)", price: "30€" },
    { service: "Changement pédalier ou patte de dérailleur", price: "25€" },
    { service: "Changement boîtier de pédalier", price: "35€" },
    { service: "Remplacement transmission complète", price: "120€" }
  ],
  wheels: [
    { service: "Changement chambre à air", price: "15€" },
    { service: "Changement chambre à air (moteur/tambour/nexus)", price: "20€" },
    { service: "Changement pneu", price: "18€" },
    { service: "Changement pneu (moteur/tambour/nexus)", price: "25€" },
    { service: "Dévoilage de roue", price: "17€" },
    { service: "Dévoilage roue - écrous internes", price: "40€" },
    { service: "Changement de roue", price: "28€" },
    { service: "Changement roue (moteur/tambour/nexus)", price: "35€" },
    { service: "Graissage ou changement roulement avant", price: "25€" },
    { service: "Graissage ou changement roulement arrière", price: "30€" },
    { service: "Changement rayons + dévoilage (max 5)", price: "30€" },
    { service: "Changement rayons + dévoilage (+5)", price: "40€" },
    { service: "Montage roue complet", price: "140€" }
  ],
  braking: [
    { service: "Réglage frein", price: "14€" },
    { service: "Changement patins/plaquettes (paire)", price: "18€" },
    { service: "Changement câble et gaine frein", price: "20€" },
    { service: "Changement câble et gaine (passage interne)", price: "25€" },
    { service: "Changement étrier/durite (avec purge)", price: "35€" },
    { service: "Changement levier de frein", price: "30€" },
    { service: "Purge système hydraulique", price: "25€" }
  ],
  accessories: [
    { service: "Montage accessoire", price: "15€" },
    { service: "Changement selle avec réglages", price: "15€" },
    { service: "Remplacement guidoline", price: "18€" },
    { service: "Montage paire de pédales", price: "10€" },
    { service: "Remplacement potence", price: "15€" },
    { service: "Remplacement jeu de direction", price: "30€" },
    { service: "Changement de cadre", price: "240€" },
    { service: "Montage vélo neuf", price: "50€" }
  ]
};

export const contactInfo = {
  address: "Trégueux, Côtes-d'Armor, Bretagne",
  phone: "06 70 94 48 19",
  email: "contact.precycle@gmail.com",
  hours: {
    "Lundi - Vendredi": "9h00 - 18h00",
    "Samedi": "9h00 - 17h00",
    "Dimanche": "Fermé"
  }
};

export const workshopImages = [
  {
    url: "https://customer-assets.emergentagent.com/job_cycle-repair/artifacts/fcghyy66_IMG_8182.PNG",
    alt: "Atelier Precycle - Mécanicien au travail"
  },
  {
    url: "https://customer-assets.emergentagent.com/job_cycle-repair/artifacts/8w9cgddy_IMG_8180.PNG",
    alt: "Atelier Precycle - Espace de travail"
  },
  {
    url: "https://customer-assets.emergentagent.com/job_cycle-repair/artifacts/86yy7338_IMG_8181.PNG",
    alt: "Atelier Precycle - Vélo en réparation"
  }
];

export const professionalImages = [
  {
    url: "https://images.unsplash.com/photo-1607109181641-74f8e7f4eb11?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxiaWtlJTIwcmVwYWlyfGVufDB8fHx8MTc1NzAyMTMyNnww&ixlib=rb-4.1.0&q=85",
    alt: "Mécanicien professionnel travaillant sur une roue"
  },
  {
    url: "https://images.unsplash.com/photo-1562615193-cbeef074a501?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxiaWtlJTIwcmVwYWlyfGVufDB8fHx8MTc1NzAyMTMyNnww&ixlib=rb-4.1.0&q=85",
    alt: "Établi avec outils et pièces de vélo"
  },
  {
    url: "https://images.unsplash.com/photo-1671040726131-746880d06bb5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwdG9vbHN8ZW58MHx8fHwxNzU3MDIxMzM5fDA&ixlib=rb-4.1.0&q=85",
    alt: "Mur d'outils de vélo organisés"
  },
  {
    url: "https://images.unsplash.com/photo-1669024554525-7a5173a769a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxiaWN5Y2xlJTIwdG9vbHN8ZW58MHx8fHwxNzU3MDIxMzM5fDA&ixlib=rb-4.1.0&q=85",
    alt: "Mécanicien tenant une roue de vélo"
  }
];

export const logo = {
  url: "https://customer-assets.emergentagent.com/job_9fdedbe0-974a-485a-966a-cf1b3bb7bdf0/artifacts/gwh6ajcn_brandmark-design%20%2816%29.png",
  alt: "Logo Precycle"
};