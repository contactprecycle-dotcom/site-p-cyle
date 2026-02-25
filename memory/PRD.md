# Precycle - Site Web de Réparation Vélo

## Problème Original
Création d'un site web professionnel pour l'entreprise de réparation de vélos "Precycle" à domicile, basée en Bretagne (Trégueux, Côtes-d'Armor).

## Persona Utilisateur
- **Client cible** : Propriétaires de vélos dans les Côtes-d'Armor recherchant un service de réparation à domicile
- **Propriétaire** : Laurent, fondateur de Precycle

## Exigences Principales

### Sections du Site
- [x] **Accueil (Hero)** : Bannière principale avec CTA
- [x] **À propos** : Présentation de l'entreprise
- [x] **Prestations** : Liste des services offerts
- [x] **Tarifs** : Grille tarifaire détaillée
- [x] **Présentation** : Texte personnel du fondateur Laurent
- [x] **Contact** : Formulaire fonctionnel + avis Google + coordonnées

### Fonctionnalités
- [x] Design responsive (mobile/desktop)
- [x] Thème noir/rouge/blanc
- [x] Lien vers Instagram (@precycle22)
- [x] Formulaire de contact avec envoi d'email (Resend)
- [x] Avis clients Google intégrés
- [x] Navigation fluide entre sections

## Architecture Technique

```
/app
├── backend/
│   ├── server.py           # API FastAPI
│   ├── services/
│   │   └── resend_email_service.py  # Service d'envoi email
│   ├── .env
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.js
    │   └── components/
    │       ├── Header.jsx
    │       ├── Hero.jsx
    │       ├── About.jsx
    │       ├── Services.jsx
    │       ├── Pricing.jsx
    │       ├── WhoAmI.jsx
    │       ├── Contact.jsx
    │       └── Footer.jsx
    └── package.json
```

## Intégrations Tierces
- **MongoDB** : Stockage des messages de contact
- **Resend** : Service d'envoi d'emails (API Key configurée)

## Ce qui a été implémenté

### 25 Février 2026
- [x] Correction du formulaire de contact
- [x] Intégration Resend pour l'envoi d'emails fiable
- [x] Lazy initialization du service email pour éviter les erreurs de démarrage
- [x] Configuration de l'email expéditeur (onboarding@resend.dev pour compte gratuit)
- [x] Test complet frontend et backend validé

### Sessions Précédentes
- [x] Site complet avec toutes les sections
- [x] Design moderne noir/rouge/blanc
- [x] Intégration des images et contenus fournis
- [x] Avis clients Google
- [x] Lien Instagram fonctionnel

## État Actuel
✅ **SITE ENTIÈREMENT FONCTIONNEL**

- Backend : API FastAPI opérationnelle
- Frontend : React + TailwindCSS
- Email : Resend configuré et testé
- Base de données : MongoDB connectée

## Backlog / Améliorations Futures
- [ ] Vérification domaine personnalisé sur Resend (pour email @precycle.fr)
- [ ] SEO optimisation (meta tags, sitemap)
- [ ] Analytics (Google Analytics)
- [ ] Galerie photos des réparations

## Informations de Contact
- **Email** : contact.precycle@gmail.com
- **Téléphone** : 06 70 94 48 19
- **Adresse** : Trégueux, Côtes-d'Armor, Bretagne
- **Instagram** : @precycle22
