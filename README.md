# Project Management App

## Technologies

- **Frontend**: React, TypeScript, Chakra UI
- **Backend**: Node.js, Express, Prisma
- **Base de données**: PostgreSQL
- **Authentification**: JWT (JSON Web Tokens)

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js]
- [PostgreSQL]
- [npm]

## Installation

1. **Clonez le repo :**

   ```bash
   git clone https://github.com/elyesseb/project-management.git
   cd project-management
   ```

2. **Installez les dépendances du frontend :**

   ```bash
   cd frontend
   npm install
   ```

3. **Installez les dépendances du backend :**

   ```bash
   cd backend
   npm install
   ```

## Configuration

1. **Créez une base de données PostgreSQL et notez les informations d'identification.**

   - Connectez-vous à PostgreSQL en utilisant le terminal ou un client comme pgAdmin.
   - Créez une base de données vierge avec le nom spécifié dans votre fichier `.env` (par exemple, `NOM_DE_VOTRE_BASE`).

   ```sql
   CREATE DATABASE "NOM_DE_VOTRE_BASE";
   ```

2. **Configurer les variables d'environnement :**

Créez un fichier .env dans le dossier backend et ajoutez-y les informations suivantes :

    ```bash
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/NOM_DE_VOTRE_BASE"
    JWT_SECRET="votre_secret_jwt"
    ```

Remplacez USER, PASSWORD et NOM_DE_VOTRE_BASE par vos propres valeurs.

2. **Migrations de la base de données :**

Exécutez les migrations pour créer les tables nécessaires :

    ```bash
    npx prisma migrate dev --name init
    ```

## Lancement du projet

1. **Démarrer le serveur backend :**

Ouvrez un terminal et exécutez la commande suivante dans le dossier backend :

    ```bash
    npm run dev
    ```

Le serveur backend devrait être accessible sur http://localhost:3000.

2. **Démarrer le serveur frontend :**

Ouvrez un terminal different et exécutez la commande suivante dans le dossier frontend :

    ```bash
    npm run dev
    ```

Le serveur backend devrait être accessible sur http://localhost:5173.
