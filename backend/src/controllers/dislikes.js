// ---------------- IMPORTATIONS GÉNÉRALES ---------------------- // 

// Importation de l'ORM Sequelize
const db = require('../models')

// Importatin du modèle 'Likes' pour l'utiliser dans les fonctions
const { Dislikes } = db.sequelize.models



// --------------------- CONTROLLERS ---------------------- // 

// ---- Fonction/Middleware 'likeOnePost' permettant de liker une publication ---- //

exports.dislikeOnePost = async (req, res, next) => {
    try {
        const existingDislike = await Dislikes.findOne({
            where: { userId: req.user.id, postId: req.params.postId }
        })

        if (existingDislike) {
            await existingDislike.destroy()
            res.status(200).json({ dislike: false })
        } else {
            await Dislikes.create({ userId: req.user.id, postId: req.params.postId })
            res.status(201).json({ like: true })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}


exports.getDislikeOnOnePost = async (req, res, next) => {
    try {
        const ex = await Dislikes.findOne({
            where: { userId: req.user.id, postId: req.params.postId }
        })
        res.status(200).json({ like: existingLike ? true : false })
    } catch (error) {
        res.status(400).json({ error })
    }
}


exports.getAllDislikesOfOnePost = async (req, res, next) => {
    try {
        const allDislikes = await Dislikes.findAll({
            where: { postId: req.params.postId },
            include: db.User
        })
        res.status(200).json({ allDislikes })
    } catch (error) {
        res.status(400).json({ error })
    }
}
