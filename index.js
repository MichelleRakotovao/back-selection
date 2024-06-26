const express = require('express');
const dbConnection = require('./config/dbconnect');
const app = express()
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const IARouter = require("./routes/IARoutes")
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const cookieParser = require("cookie-parser")
const { errorHnadler, notFond } = require("./middlewares/errorHandler")
const cors = require('cors');

const options = {
    key: fs.readFileSync('./key/cle-privee.pem'),
    cert: fs.readFileSync('./key/certificat.pem')
};
const ProductRouter = require("./routes/product.route.js")
dbConnection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
//app.use(cors());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use('/api/user' , authRouter )
app.use('/api/ia' , IARouter )
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(cookieParser());
app.use('/product', ProductRouter)
const staticFile = require("./routes/staticFile.route.js")
app.use('/file', staticFile)

app.use(errorHnadler)
app.use(notFond)
//const server = https.createServer(options, app);

/*server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});*/
app.listen(PORT, () => {
    console.log(`serveur is running at port  ${PORT}`)
});