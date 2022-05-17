// ---------------- IMPORTATIONS GÉNÉRALES ---------------------- // 

// Importation de l'ORM Sequelize
const db = require('../models')

// Importatin du modèle 'Likes' pour l'utiliser dans les fonctions
const { Likes } = db.sequelize.models



// --------------------- CONTROLLERS ---------------------- // 

// ---- Fonction/Middleware 'likeOnePost' permettant de liker une publication ---- //

exports.likeOnePost = async (req, res, next) => {
    try {
        const existingLike = await Likes.findOne({
            where: { userId: req.user.id, postId: req.params.postId }
        })

        if (existingLike) {
            await existingLike.destroy()
            res.status(200).json({ like: false })
        } else {
            await Likes.create({ userId: req.user.id, postId: req.params.postId })
            res.status(201).json({ like: true })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// ---- Fonction/Middleware 'getLikeOnOnePost' permettant de récupérer un like d'une publication ---- //

exports.getLikeOnOnePost = async (req, res, next) => {
    try {
        const existingLike = await Likes.findOne({
            where: { userId: req.user.id, postId: req.params.postId }
        })
        res.status(200).json({ like: existingLike ? true : false })
    } catch (error) {
        res.status(400).json({ error })
    }
}

// ---- Fonction/Middleware 'getAllLikesOfOnePost' permettant de récupérer tous les likes d'une publication ---- //

exports.getAllLikesOfOnePost = async (req, res, next) => {
    try {
        const allLikes = await Likes.findAll({
            where: { postId: req.params.postId },
            include: db.User
        })
        res.status(200).json({ allLikes })
    } catch (error) {
        res.status(400).json({ error })
    }
}
