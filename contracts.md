# Contrats API - Site Precycle

## Vue d'ensemble
Ce document définit les contrats entre le frontend React et le backend FastAPI pour le site web de Precycle.

## Données Mock actuellement utilisées
- **Informations de contact** : Téléphone, email, adresse, horaires
- **Services et tarifs** : Forfaits et tarifs détaillés
- **Images** : Photos d'atelier et images professionnelles
- **Formulaire de contact** : Simulation d'envoi avec toast de confirmation

## APIs à implémenter

### 1. Contact Form Submission
**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "message": "string (required)"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Message envoyé avec succès"
}
```

**Response Error (400/500):**
```json
{
  "success": false,
  "error": "Message d'erreur"
}
```

**Fonctionnalité:**
- Validation des données côté backend
- Envoi d'email à contact.precycle@gmail.com
- Email contenant : nom, email expéditeur, message
- Réponse automatique optionnelle à l'expéditeur

### 2. PDF Download (optionnel)
**Endpoint:** `GET /api/pricing/pdf`

**Response:**
- Fichier PDF avec la grille tarifaire complète
- Headers appropriés pour téléchargement

## Intégration Frontend/Backend

### Modifications nécessaires dans le frontend:
1. **Contact.jsx** - Remplacer la soumission mock par un appel API réel
2. **Error handling** - Gérer les erreurs de réseau et serveur
3. **Loading states** - Afficher un spinner pendant l'envoi
4. **Toast notifications** - Afficher les messages de succès/erreur du backend

### Configuration Email Backend:
- Service d'email à utiliser (SMTP Gmail ou service tiers)
- Variables d'environnement pour les credentials
- Template d'email professionnel

### Variables d'environnement nécessaires:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact.precycle@gmail.com
SMTP_PASSWORD=app_password_or_token
EMAIL_FROM=contact.precycle@gmail.com
EMAIL_TO=contact.precycle@gmail.com
```

## État actuel vs État final

### Actuellement (Mock):
- Formulaire affiche un toast de confirmation
- Aucun email n'est envoyé
- Données stockées temporairement dans l'état React

### Après intégration:
- Formulaire envoie les données au backend
- Email réel envoyé à contact.precycle@gmail.com
- Gestion d'erreurs robuste
- Notifications utilisateur basées sur la réponse serveur

## Notes d'implémentation:
1. Utiliser des bibliothèques comme `nodemailer` ou équivalent Python
2. Validation côté backend avec `pydantic` 
3. Rate limiting pour éviter le spam
4. Logs des tentatives d'envoi pour le monitoring