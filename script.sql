CREATE DATABASE livres_db;
USE livres_db;
-- Création de la base
CREATE DATABASE IF NOT EXISTS livres_db;
USE livres_db;

-- ======================
-- TABLE USERS
-- ======================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('client','editeur','gestionnaire','administrateur') DEFAULT 'client',
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ======================
-- TABLE CATEGORIES
-- ======================
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) UNIQUE,
  description TEXT
);

-- ======================
-- TABLE OUVRAGES
-- ======================
CREATE TABLE ouvrages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255),
  auteur VARCHAR(255),
  isbn VARCHAR(100) UNIQUE,
  description TEXT,
  prix DECIMAL(10,2),
  stock INT CHECK (stock >= 0),
  categorie_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (categorie_id) REFERENCES categories(id)
);

-- ======================
-- TABLE PANIER
-- ======================
CREATE TABLE panier (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  actif BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES users(id)
);

-- ======================
-- TABLE PANIER_ITEMS
-- ======================
CREATE TABLE panier_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  panier_id INT,
  ouvrage_id INT,
  quantite INT,
  prix_unitaire DECIMAL(10,2),
  FOREIGN KEY (panier_id) REFERENCES panier(id),
  FOREIGN KEY (ouvrage_id) REFERENCES ouvrages(id)
);

-- ======================
-- TABLE COMMANDES
-- ======================
CREATE TABLE commandes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  date DATETIME,
  total DECIMAL(10,2),
  statut ENUM('en_cours','payee','annulee','expediee'),
  adresse_livraison TEXT,
  mode_livraison VARCHAR(100),
  mode_paiement VARCHAR(100),
  payment_provider_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES users(id)
);

-- ======================
-- TABLE COMMANDE_ITEMS
-- ======================
CREATE TABLE commande_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  commande_id INT,
  ouvrage_id INT,
  quantite INT,
  prix_unitaire DECIMAL(10,2),
  FOREIGN KEY (commande_id) REFERENCES commandes(id),
  FOREIGN KEY (ouvrage_id) REFERENCES ouvrages(id)
);

-- ======================
-- TABLE LISTES CADEAUX
-- ======================
CREATE TABLE listes_cadeaux (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255),
  proprietaire_id INT,
  code_partage VARCHAR(100) UNIQUE,
  date_creation DATETIME,
  FOREIGN KEY (proprietaire_id) REFERENCES users(id)
);

-- ======================
-- TABLE LISTE_ITEMS
-- ======================
CREATE TABLE liste_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  liste_id INT,
  ouvrage_id INT,
  quantite_souhaitee INT,
  FOREIGN KEY (liste_id) REFERENCES listes_cadeaux(id),
  FOREIGN KEY (ouvrage_id) REFERENCES ouvrages(id)
);

-- ======================
-- TABLE AVIS
-- ======================
CREATE TABLE avis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  ouvrage_id INT,
  note INT CHECK (note BETWEEN 1 AND 5),
  commentaire TEXT,
  date DATETIME,
  UNIQUE (client_id, ouvrage_id),
  FOREIGN KEY (client_id) REFERENCES users(id),
  FOREIGN KEY (ouvrage_id) REFERENCES ouvrages(id)
);

-- ======================
-- TABLE COMMENTAIRES
-- ======================
CREATE TABLE commentaires (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  ouvrage_id INT,
  contenu TEXT,
  valide BOOLEAN DEFAULT false,
  date_soumission DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_validation DATETIME,
  valide_par INT,
  FOREIGN KEY (client_id) REFERENCES users(id),
  FOREIGN KEY (ouvrage_id) REFERENCES ouvrages(id),
  FOREIGN KEY (valide_par) REFERENCES users(id)
);

-- ======================
-- TABLE PAYMENTS (OPTIONNEL)
-- ======================
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  commande_id INT,
  provider VARCHAR(100),
  provider_payment_id VARCHAR(255),
  statut VARCHAR(50),
  amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (commande_id) REFERENCES commandes(id)
);