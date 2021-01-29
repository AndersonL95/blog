const express = require('express')
var bodyParser = require('body-parser')
const connect = require('./config/db');
const router = require('./routes/usuario_rotas')
require('dotenv').config()
const app = express();

connect()
app.use(bodyParser.json())
app.use('/', router);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('O processo está rodando na porta:'+ PORT)
});