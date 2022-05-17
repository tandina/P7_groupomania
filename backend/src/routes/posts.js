// ---------------- IMPORTATIONS GÉNÉRALES ---------------------- // 

// Importation de l'infrastructure d'application Web Node.js
const express = require('express')

// Création du routeur
const router = express.Router()

// Importation des controlleurs 'posts', 'comments', 'likes'
const postsCtrl = require('../controllers/posts')
const commentsCtrl = require('../controllers/comments')
const likesCtrl = require('../controllers/likes')


// Importations des middlewares d'authentification et de gestion des fichiers
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')



// ---------------- ROUTES PUBLICATIONS ---------------------- // 

// Route utilisant la méthode POST pour ajouter une publication (utilisation du controlleur 'createPost')
router.post('/', auth, multer, postsCtrl.createPost)

// Route utilisant la méthode GET pour récupérer une publication avec son identifiant (utilisation du controlleur 'getOnePost')
// ':' indique que la route est dynamique
router.get('/:id', auth, postsCtrl.getOnePost)

// Route utilisant la méthode GET pour récupérer toutes les publications (utilisation du controlleur 'getAllPosts')
router.get('/', auth, postsCtrl.getAllPosts)

// Route utilisant la méthode PUT pour modifier une publication existante (utilisation du controlleur 'modifyPost')
router.put('/:id', auth, multer, postsCtrl.modifyPost)

// Route utilisant la méthode DELETE pour supprimer une publication existante (utilisation du controlleur 'deletePost')
router.delete('/:id', auth, postsCtrl.deletePost)



// ---------------- ROUTES PUBLICATIONS/COMMENTAIRES ---------------------- // 

// Route utilisant la méthode POST pour ajouter un commentaire à une publication (utilisation du controlleur 'createComment')
router.post('/:postId/comments', auth, commentsCtrl.createComment)

// Route utilisant la méthode GET pour récupérer un commentaire d'une publication (avec son identifiant et celui l'identifiant de la publication) (utilisation du controlleur 'getOneComment')
// ':' indique que la route est dynamique
router.get('/:postId/comments/:id', auth, commentsCtrl.getOneComment)

// Route utilisant la méthode GET pour récupérer tous les commentaires d'une publication (avec identifiant de la publication) (utilisation du controlleur 'getAllComments')
router.get('/:postId/comments/', auth, commentsCtrl.getAllComments)

// Route utilisant la méthode PUT pour modifier un commentaire d'une publication (utilisation du controlleur 'modifyComment')
router.put('/:postId/comments/:id', auth, commentsCtrl.modifyComment)

// Route utilisant la méthode DELETE pour supprimer un commentaire d'une publication (utilisation du controlleur 'deleteComment')
router.delete('/:postId/comments/:id', auth, commentsCtrl.deleteComment)



// ---------------- ROUTES PUBLICATIONS/LIKES ---------------------- // 

// Route utilisant la méthode POST pour ajouter un like à une publication (utilisation du controlleur 'likeOnePost')
router.post('/:postId/likes', auth, likesCtrl.likeOnePost)

// Route utilisant la méthode GET pour récupérer un like d'une publication (avec identifiant de la publication) (utilisation du controlleur 'getLikeOnOnePost')
router.get('/:postId/like', auth, likesCtrl.getLikeOnOnePost)

// Route utilisant la méthode GET pour récupérer tous les likes d'une publication (avec identifiant de la publication) (utilisation du controlleur 'getAllLikesOfOnePost')
router.get('/:postId/likes', auth, likesCtrl.getAllLikesOfOnePost)

// ---------------- EXPORTATIONS ---------------------- // 

// Exportation des routeurs
module.exports = router