const setDriver = require("mongoose")
const UploadService = require("../services/staticFile.service.js")
const UploadController = async (req, res) => {
    const { files } = req
    if (files) {
        const data = await UploadService(files)
        res.status(data.code).send(data)
    } else res.status(403).send(new ResponseFormat(403, 'FAILURE', {}, `Vous devez envoyer des images`))
}
module.exports = UploadController