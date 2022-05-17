// ---------------- IMPORTATIONS GÉNÉRALES ---------------------- // 

// Importation d'Express
const express = require('express'); 


// Importation de Path pour accéder au path de notre serveur
const path = require('path'); 

// Importation de Cors (pour éviter erreur CORS)
const cors = require('cors');

// ----------------- VARIABLES D'ENVIRONNEMENT ---------------------- //

// Utilisation de variables d'environnement pour récupérer les informations confidentielles (localisées dans fichier .env)
require('dotenv').config();



// ----------------- IMPORTATIONS ROUTEURS ---------------------- //

const userCtrl = require('./src/controllers/user')


// ----------------- IMPORTATIONS ROUTEURS ---------------------- //

const userRoutes = require('./src/routes/user')
const postsRoutes = require('./src/routes/posts')



// ----------------------- MIDDLEWARES --------------------------- //
// app.use = Applique le middleware à toutes les requêtes

// Middleware permettant l'authentification des utilisateurs
const auth = require('./src/middleware/auth')

// Fonction permettant d'appeler la fonction express (créer une application Express)
const app = express();

// Middleware global remplaçant body-parser (méthode de body-parser pour transformer le corps de la requête en JSON / objet JS utilisable)
app.use(express.json());

// Message s'affichant dans la console quand une requête est reçue
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

// Middleware général appliqué à toute les réquêtes et réponses
// Headers permettent d'accéder : à notre API depuis n'importe quelle origine ( '*' )
// d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
// d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware global pour éviter erreur CORS
app.use(cors());


// Middleware pour la gestion de l'enregistrement des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware servant à utiliser les routes 'Utilisateur' et 'Publications'
app.use('/api/auth', userRoutes)
app.use('/api/posts', postsRoutes)

// Middleware utilisant l'authentification avant les fonctions 'getOneUser', 'getAllUsers', 'deleteUserAccount'
app.get('/api/users/:id', auth, userCtrl.getOneUser)
app.get('/api/users', auth, userCtrl.getAllUsers)
app.delete('/api/users/:id', auth, userCtrl.deleteUserAccount)

// ----------------------- EXPORTATIONS --------------------------- //

// Exporter cette application pour pouvoir y accéder depuis d'autres fichiers du projet (serveur Node)
module.exports = app;