
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

/*------------------------------------- */
/*const IA_Generate_input_text_respos_text_2 = async (req, res)=> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const text_input = req.body.text_input; // Supposons que le texte provienne du corps de la requête
    const result = await model.generateContent(text_input);
    const response = await result.response;
    const text = response.text();
   // const words = text.split(" ");
    res.status(200).json({ words: text });
};*/
function parseInput (){

}

const IA_Generate_input_text_respos_text_2 = async (req, res) => {
    try {
        //const text_input = req.body.text_input;
        //console.log(req.body.description);
        const text_input = "Entre ces sources d'énergie: biogaz , panneau ,solaire éolienne ,quels sont les choix de meilleures sources d'énergie pour alimenter ";
        const description = req.body.description;
        const descriptionsArray = description.map(item => item.trim());
        const text_input_combined = `${text_input} ${descriptionsArray.join(', ')}. Donne juste les choix, sans aucune description.`;

       // console.log(text_input_combined);


        // Fonction pour générer les détails pour chaque choix d'énergie
        const generateEnergyDetails = async (energyChoices, kWhPrice, ariaryPrice) => {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const details = [];
        
            // Boucle pour obtenir les détails pour chaque choix d'énergie
            for (const choice of energyChoices) {
                const detailPrompt = `Parmi ces sources d'énergie: ${energyChoices.join(', ')}, quelles sont les meilleures options pour alimenter ${choice}? Décrivez brièvement le projet sur ${choice} et estimez le coût de consommation en un mois. Notez que le prix moyen du kWh dans votre région est de ${kWhPrice} euros et le prix en ariary est de ${ariaryPrice} ariary et comment reamiser le projet avec les materielles et prix.`;
                const detailResult = await model.generateContent(detailPrompt);
                const detailResponse = await detailResult.response;
                const detailText = detailResponse.text();
                details.push({ [choice]: detailText }); // Stocker les détails dans un tableau
            }
        
            return details;
        };
        
        const energyChoice = ["biogaz", "panneau solaire", "éolienne"];
        // Générer les choix d'énergie initiaux
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = text_input_combined;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const energyChoices = text.split("\n"); // Stocker les choix d'énergie dans un tableau

        // Générer les détails pour chaque choix d'énergie
        const kWhPrice = 0.15; // Exemple de prix moyen du kWh en euros
        const ariaryPrice = 5000; // Exemple de prix en ariary

        const details = await generateEnergyDetails(energyChoices, kWhPrice, ariaryPrice);


        // Envoyer la réponse avec les détails
       res.status(200).json({ energyChoices: energyChoices, details: details });
       // res.status(200).json({ energyChoices: energyChoices/*, details: details */});
        console.log(details)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la requête." });
    }
};

// Exemple d'utilisation
//const text_input = "décrire les détails"; // Texte d'entrée supplémentaire
/*IA_Generate_input_text_respos_text(text_input)
    .then(details => {
        console.log(details);
    })
    .catch(error => {
        console.error(error);
    });
*/



/*------------------------------------- */


module.exports={
    IA_Generate_input_text_image_respo_text,
    IA_Generate_input_text_respos_text,
    searchYouTube ,
    IA_Generate_input_text_respos_text_2
}

