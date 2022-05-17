 
// Importation de file system pour la gestion des fichiers 
const fs = require('fs')

// fonction pour supprimer l'image
function deleteFile (imageUrl) {
    if (!imageUrl) return
    // Recherche du nom du fichier de l'image
    const filename = imageUrl.split('/images/')[1]
    // Utilisation de 'file system' pour supprimer le fichier du dossier 'images'
    fs.unlink(`images/${filename}`, () => {})
}

// On exporte
module.exports = {
    deleteFile
}