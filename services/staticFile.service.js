const resizeImg = require('resize-img')
const fs = require("fs")
const ResponseFormat = require("../utils/response.js")
const uploadService = async (files) => {
    try {
        let reqFiles = []
        for (var i = 0; i < files.length; i++) reqFiles.push(files[i].filename)
        if (reqFiles.length === 0) return new ResponseFormat(403, 'FAILURE', {}, `Vous devez envoyer des images`)
        else {
            for (let i = 0; i < files.length; i++) {
                const url = files[i].path
                let image = await resizeImg(fs.readFileSync(url), { width: 600 })
                fs.writeFileSync(url, image)
            }
            return new ResponseFormat(200, 'SUCCESS', reqFiles, `Voici les noms des fichiers`)
        }
    } catch (errorMessage) { return new ResponseFormat(500, 'FAILURE', { errorMessage }, `erreur interne u serveur`) }
}
module.exports = uploadService