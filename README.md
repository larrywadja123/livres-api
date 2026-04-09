# API Librairie – Node.js / Express / MySQL

---

## 1. Présentation du projet

Ce projet consiste à développer une API REST complète pour la gestion d’une librairie en ligne.
L’application permet de gérer les utilisateurs, les ouvrages, les catégories, le panier, les commandes, les avis, les commentaires et les listes de cadeaux.

L’API respecte les principes REST et intègre les règles métier définies dans le cahier des charges.

---

## 2. Membres et répartition des tâches

**Nom : Larry Wadja**
**Nom : christ elie n'dah**


### Répartition des tâches :

* Conception de la base de données (modèle relationnel)
* Création des tables MySQL (DDL)
* Développement du backend (Node.js + Express)
* Implémentation de l’authentification (JWT + bcrypt)
* Mise en place des middlewares (auth, validation, rôles)
* Implémentation des endpoints REST (CRUD)
* Gestion des règles métier (stock, avis, commentaires)
* Tests avec Postman
* Rédaction du README et du rapport

---

## 3. Installation et exécution du projet

### Prérequis

* Node.js installé
* MySQL installé
* Postman

---

### Installation des dépendances

```bash
npm install
```

---

### Configuration de la base de données

Créer la base de données :

```sql
CREATE DATABASE livres_db;
```

Importer les tables via les scripts SQL fournis.

Configurer la connexion dans le fichier :

```
config/db.js
```

---

### Lancement du serveur

```bash
node server.js
```

---

L’API est accessible à l’adresse suivante :

```
http://localhost:3000
```

---

## 4. Authentification

### Inscription

```
POST /api/auth/register
```

### Connexion

```
POST /api/auth/login
```

### Utilisation du token

```
Authorization: TOKEN
```

---

## 5. Endpoints principaux

### Utilisateurs

* POST /api/auth/register
* POST /api/auth/login
* GET /api/users/me
* GET /api/users

---

### Ouvrages

* GET /api/ouvrages
* GET /api/ouvrages/:id
* POST /api/ouvrages
* PUT /api/ouvrages/:id
* DELETE /api/ouvrages/:id

---

### Catégories

* GET /api/categories
* POST /api/categories
* PUT /api/categories/:id
* DELETE /api/categories/:id

---

### Panier

* GET /api/panier
* POST /api/panier/items
* PUT /api/panier/items/:id
* DELETE /api/panier/items/:id

---

### Commandes

* POST /api/commandes
* GET /api/commandes
* GET /api/commandes/:id
* PUT /api/commandes/:id/status

---

### Avis

* POST /api/ouvrages/:id/avis
* GET /api/avis/ouvrage/:id

---

### Commentaires

* POST /api/commentaires/ouvrages/:id/commentaires
* PUT /api/commentaires/:id/valider

---

### Listes de cadeaux

* POST /api/listes
* GET /api/listes/:code
* POST /api/listes/:id/acheter

---

## 6. Exemples de requêtes (Postman / curl)

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d "{\"email\":\"larry@test.com\",\"password\":\"123456\"}"
```

---

### Ajouter un ouvrage

```bash
curl -X POST http://localhost:3000/api/ouvrages \
-H "Authorization: TOKEN" \
-H "Content-Type: application/json" \
-d "{\"titre\":\"Livre\",\"auteur\":\"Larry\",\"prix\":20,\"stock\":5,\"categorie_id\":1}"
```

---

## 7. Règles métier implémentées

* Seuls les ouvrages avec un stock supérieur à 0 sont affichés
* Le stock est décrémenté lors d’une commande
* Une commande échoue si le stock est insuffisant
* Un utilisateur doit avoir acheté un ouvrage avant de laisser un avis
* Les commentaires sont soumis avec valide = false
* Les commentaires doivent être validés par un éditeur
* Gestion des rôles (client, éditeur, administrateur)

---

## 8. Sécurité

* Les mots de passe sont hashés avec bcrypt
* Authentification basée sur JWT
* Middleware de protection des routes
* Validation des données avec Joi
* Vérification des rôles pour les actions sensibles

---

## 9. Structure du projet

```
livres-api/
│
├── config/
├── controllers/
├── routes/
├── middlewares/
├── server.js
├── package.json
└── README.md
```

---

## 10. Limitations

* Pas de système de paiement réel
* Pas d’interface utilisateur
* Fonctionnalités simplifiées

---

## 11. Améliorations possibles

* Intégration d’un système de paiement
* Développement d’une interface frontend
* Pagination et filtres avancés
* Gestion avancée des rôles

---

## 12. Auteur

Larry Wadja
christ elie N'dah
---
 
