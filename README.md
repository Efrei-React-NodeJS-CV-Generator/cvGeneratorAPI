# 🔧 **Backend - Générateur de CV**  

Ce dépôt contient la partie **backend** du projet **Générateur de CV**. Il utilise **Node.js**, **Express**, et **MongoDB** pour la gestion des données et des API.  

## 🚀 **Installation et Lancement**  

### **Prérequis :**  
- Node.js installé.  
- MongoDB en cours d'exécution.  

### **Étapes d'installation :**  

1. Clonez le dépôt :  
   ```bash
   git clone https://github.com/Mathias002/cvGeneratorAPI.git
   cd cvGeneratorAPI
   ```

2. Installez les dépendances :  
   ```bash
   npm install
   ```

3. Démarrez le serveur :  
   ```bash
   npm run dev
   ```

### 🌱 **Variables d'environnement**  

Créez un fichier `.env` à la racine du projet avec les clés suivantes :  

```env
DATABASE_URL=mongodb+srv://9276asahi:MVsh*4lS5LJTzhBi@nodejs.lxjlk.mongodb.net/?retryWrites=true&w=majority&appName=NodeJS  # Connexion à MongoDB
PORT=3000                    # Port pour le backend
JWT_SECRET=My$ecr&tK&y       # Clé secrète pour JWT
```

## 📂 **Structure du projet**  

La structure est la suivante :  

```plaintext
src/
├── controller/      
├── middlewares/     
├── models/          
├── roles/           
├── routes/          
├── Security/        
├── validator/       
├── app.http.js      
└── app.js           
```

## ✨ **Scripts utiles**  

- `npm run dev` : Démarrer le serveur en mode développement.  
- `npm run start` : Démarrer le serveur en production.  
