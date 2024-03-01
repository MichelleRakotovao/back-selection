# base Node et Moongo Serveur

## Dépendances

Les dépendances suivantes sont nécessaires pour exécuter ce serveur :

- bcrypt : Utilisé pour le hachage de mots de passe.
- body-parser : Middleware Express pour analyser les corps de requêtes HTTP.
- cookie-parser : Middleware Express pour analyser les cookies des requêtes HTTP.
- dotenv : Charge les variables d'environnement à partir d'un fichier `.env` dans process.env.
- express : Framework web pour Node.js.
- express-async-handler : Utilitaire pour gérer les erreurs asynchrones dans les middlewares et les routeurs Express.
- jsonwebtoken : Implémentation JSON Web Tokens (JWT) pour Node.js.
- mongoose : ODM (Object Data Modeling) pour MongoDB.

## Installation

Pour installer les dépendances, exécutez la commande suivante dans le répertoire racine de votre projet :

- `npm install bcrypt`
- `npm install body-parser`
- `npm install cookie-parser`
- ` npm install dotenv`
- ` npm install cookie-parser`
- ` npm install dotenv`
- ` npm install express`
- ` npm install express-async-handler`
- ` npm install jsonwebtoken`
- ` npm install mongoose`
- ou directement
- `  npm install bcrypt body-parser cookie-parser dotenv express express-async-handler jsonwebtoken mongoose`

### Démarrage du serveur

- ` npm run server`

## Utilisation de cURL pour s'inscrire en tant qu'utilisateur

````bash
curl --request POST \
  --url http://localhost:5000/api/user/register \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: Insomnia/2023.5.6' \
  --data '{
	"firstname":"tovo",
	"lastname":"JB",
	"email":"tovojb@gmail.com",
	"mobile":"0325896069",
	"password":"0000"
}'
````
## Utilisation de cURL pour login en tant qu'utilisateur
```bash
curl --request POST \
  --url http://localhost:5000/api/user/login \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: Insomnia/2023.5.6' \
  --cookie refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGYyNjVlMjg4YTYyYTJmMWRkYWNhMiIsImlhdCI6MTcwOTEyMzgwMCwiZXhwIjoxNzA5MzgzMDAwfQ.PvMUrtYyg7Up4TPHIvxjvZ1V6Wbg-stIfPaxloW0aoM \
  --data '{
	"email":"tovojb@gmail.com",
	"password":"0000"
}'
````
## Utilisation de cURL pour avoir tous les Utilisateurs 
```bash
curl --request GET \
  --url http://localhost:5000/api/user/all-user \
  --header 'User-Agent: Insomnia/2023.5.6' \
  --cookie refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGYyNjVlMjg4YTYyYTJmMWRkYWNhMiIsImlhdCI6MTcwOTEyMzgwMCwiZXhwIjoxNzA5MzgzMDAwfQ.PvMUrtYyg7Up4TPHIvxjvZ1V6Wbg-stIfPaxloW0aoM
  ```
## Utilisation de cURL pour avoir suggestion de l IA et des liens youtube
```bash
  curl --request POST \
  --url http://localhost:5000/api/ia/gemini \
  --header 'Content-Type: multipart/form-data' \
  --header 'User-Agent: Insomnia/2023.5.6' \
  --cookie refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGYyNjVlMjg4YTYyYTJmMWRkYWNhMiIsImlhdCI6MTcwOTE0Mjc0MiwiZXhwIjoxNzA5NDAxOTQyfQ.6s05yAHZRje_ODktYFAwNho1eXDAYOnpNS1iPekr75w \
  --form 'file=@C:\Users\TovoJB\Pictures\btplast.jpg'
  ```