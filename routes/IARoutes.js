const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Endpoint pour la génération de contenu
const {  IA_Generate_input_text_image_respo_text, 
        IA_Generate_input_text_respos_text ,
        IA_Generate_input_text_respos_text_2 ,
} =  require('../controller/IAGemini');
const{ processDocument } = require("../controller/IAdocument")

router.post('/gemini', upload.single('file'), IA_Generate_input_text_image_respo_text);
router.post("/IA_doc_PDF", processDocument)
router.post("/IAGenerative", IA_Generate_input_text_respos_text_2)
module.exports = router