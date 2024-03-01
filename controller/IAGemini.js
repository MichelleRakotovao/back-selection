
//const model = require("../config/IAconnect")
const https = require('https')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });


async function IA_Generate_input_text_respos_text(text_input) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "Recapituler en quelques mots clés en anglais pour une recherche sur YouTube le texte :. " + text_input;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text.split(" ");
}

const IA_Generate_input_text_image_respo_text = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const imageBuffer = req.file.buffer;
        const imagePart = fileToGenerativePart(imageBuffer, 'image/jpeg');

        const prompt = "J'ai une image d'un objet que j'aimerais recycler en d'autres objets utiles. Que puis-je créer à partir de cet objet ? Décris-moi les étapes à suivre.";

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        const keywords = await extractKeywords(text);
        const videoLinks = await searchYouTube(keywords);

        res.json({
            text: text,
            videoLinks: videoLinks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la génération du contenu' });
    }
};

async function searchYouTube(keywords) {
    const searchQuery = keywords.join(" ");
    const options = {
        hostname: "www.googleapis.com",
        path: `/youtube/v3/search?q=${encodeURIComponent(searchQuery)}&part=snippet&type=video&key=${process.env.YOUTUBE_API_KEY}`,
        method: "GET",
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                const videos = JSON.parse(data);
                const videoLinks = videos.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`);
                resolve(videoLinks);
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

// Fonction pour convertir les informations du fichier en objet GoogleGenerativeAI.Part
function fileToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType
        },
    };
}

async function extractKeywords(text_input) {
    const keywords = await IA_Generate_input_text_respos_text(text_input);
    return keywords;
}


module.exports={
    IA_Generate_input_text_image_respo_text,
    IA_Generate_input_text_respos_text,
    searchYouTube
}