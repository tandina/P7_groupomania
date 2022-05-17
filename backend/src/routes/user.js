// ---------------- IMPORTATIONS GÉNÉRALES ---------------------- // 

// Importation de l'infrastructure d'application Web Node.js
const express = require('express');

// Création du routeur
const router = express.Router();

// Importation du controlleur 'user'
const userCtrl = require('../controllers/user');

// Importations des middlewares d'authentification et de gestion des fichiers
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')



// ---------------- ROUTES UTILISATEUR ---------------------- // 

// Les routes utilisent la méthode POST pour les fonctions 'signup' et 'login'
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

// La route utiliser la méthode PUT pour la fonction 'edit'
router.put('/edit', auth, multer, userCtrl.editUser)



// ---------------- EXPORTATIONS ---------------------- // 

// Exportation des routeurs 
module.exports = router;