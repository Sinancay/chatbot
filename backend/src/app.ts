import express from 'express';
import indexRouter from './routes/index';
import bodyParser from 'body-parser';
import { v6 as uuidv6 } from 'uuid';
import questions_route from './routes/questions_route';


const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const connectDb = require('./dbConnections')
const app = express();
const port = 8000;

connectDb();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
app.use(cookieParser());

app.use(session({
    secret: uuidv6(),
    saveUninitialized: true,
    resave: true
}));

app.use(function (req, res, next) {

// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', 'true');

// Pass to next layer of middleware
next();
});

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/', indexRouter);
app.use('/questions', questions_route);

mongoose.connection.once('open', async () =>{
    console.log('Connected MongoDB');
});


app.listen(port, () => {
    console.log(`App http://localhost:${port} started.`);
});