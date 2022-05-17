// ---------------- IMPORTATIONS GÉNÉRALES ---------------------- // 

// Importation de l'ORM Sequelize et des schémas de données nécessaires
const db = require('../models/index')
const Sequelize = db.Sequelize

// Importation du package jsonwebtoken pour la création et la vérification des tokens
const jwt = require('jsonwebtoken')

// Importatin du modèle 'User' pour l'utiliser dans les deux fonctions 'signup' et 'login'
const { User } = db.sequelize.models

// Importation de la constante permettant de renvoyer
// l'identifiant de l'utilisateur et un TOKEN permettant de se connecter à sa session (pendant 24h)
const newToken = user => {
    token = jwt.sign(
        { userId: user.id }, 
        process.env.TOKEN_KEY,
        {expiresIn: '24h'}
        )
    return { user, token }
}



// --------------------- CONTROLLERS ---------------------- // 

// ---- Fonction/Middleware 'signup' permettant d'enregistrer de nouveaux utilisateurs ---- //

exports.signup = (req, res, next) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
        .then(user => res.status(201).json(newToken(user)))
        .catch(error => res.status(401).json({ error: error }))
}

// ---- Fonction/Middleware 'login' permettant de connecter les utilisateurs existants ---- //

exports.login = async (req, res, next) => {
    try {
        const response = await User.authenticate(req.body.email, req.body.password)

        if (response.valid) {
            res.status(201).json(newToken(response.user))
        } else {
            res.status(401).json({ error: response.message })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// ---- Fonction/Middleware 'editUser' pour modifier le profil d'un utilisateur existant ---- //

exports.editUser = (req, res, next) => {
    try {
        const userObject = req.file
            ? {
                ...JSON.parse(req.body.user),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${
                    req.file.filename
                }`
            }
            : { ...req.body }

        console.log(userObject)
        req.user.update(userObject).then(user => res.status(200).json({ user }))
    } catch (error) {
        res.status(400).json({ error })
    }
}

// ---- Fonction/Middleware 'getOneUser' pour récupérer le profil d'un utilisateur existant ---- //

exports.getOneUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then(user => res.status(200).json({ user }))
        .catch(error => res.status(404).json({ error }))
}

// ---- Fonction/Middleware 'getAllUsers' pour chercher le profil d'un utilisateur existant ---- //

exports.getAllUsers = (req, res, next) => {
    const options = {
        where: Sequelize.where(
            Sequelize.fn(
                'concat',
                Sequelize.col('firstName'),
                ' ',
                Sequelize.col('lastName')
            ),
            {
                [Sequelize.Op.like]: `%${req.query.search}%`
            }
        ),
        limit: 10
    }

    User.findAll(options)
        .then(users => {
            res.status(200).json({ users })
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({ error })
        })
}

// ---- Fonction/Middleware 'deleteUserAccount' pour supprimer le profil d'un utilisateur existant ---- //

exports.deleteUserAccount = async (req, res, next) => {
    try {
        const user = req.user.admin
            ? await User.findOne({ where: { id: req.params.id } })
            : req.user
        await user.softDestroy()
        res.status(200).json({ message: 'Compte supprimé !' })
    } catch (error) {
        res.status(400).json({ error })
    }
}