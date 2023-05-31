import express from "express"
import bodyParser from "body-parser"
import configViewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"
const cors = require('cors');

require('dotenv').config()
let app = express()
var cookieParser = require('cookie-parser')
app.use(cookieParser())
let port = process.env.PORT || 6969;
// Add headers before the routes are defined

var cookieParser = require('cookie-parser')

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "localhost:6969"); 

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
const corsOptions = {
    origin:'localhost:6969',
    credentials: true,
    optionSuccessStatus: 200,
  }

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

configViewEngine(app);
initWebRoutes(app);
connectDB();
app.listen(port, () => {
    console.log("Backend BookManagement is running on the port: " + port);
})
