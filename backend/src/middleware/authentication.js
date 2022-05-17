// ---------------- IMPORTATIONS GÉNÉRALES ---------------------- // 

// Importation du package de chiffrement bcrypt pour crypter les mots de passe
const bcrypt = require('bcrypt')


// Fonction d'authentification//

function addAuthentication (User) {
    const encryptPassword = user => {
        if (user.changed('password')) {
            return bcrypt.hash(user.password, 12).then(hash => {
                user.password = hash
            })
        }
    }

    User.authenticate = async (email, password) => {
        const user = await User.findOne({ where: { email, deleted: false } })

        if (!user) {
            return { valid: false, message: 'Utilisateur non trouvé !' }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) return { valid: true, user }
        else return { valid: false, message: 'Mot de passe incorrect !' }
    }

    User.beforeCreate(encryptPassword)
    User.beforeUpdate(encryptPassword)
}



// --------------------- EXPORTATIONS ---------------------- //

module.exports = {
    addAuthentication
}
