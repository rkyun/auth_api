const express = require('express');

const http = require('http');

const bodyParser = require('body-parser');

const morgan = require('morgan');

const app = express();

const router = require('./router');

const mongoose = require('mongoose');

const cors = require('cors');



//db

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/auth', { useMongoClient: true });
//app setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

router(app);

//server setup
const port = process.env.PORT || 1337;
const server = http.createServer(app);

server.listen(port);
console.log(`server listening on ${port}`)
