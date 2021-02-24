const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb://mongo/Vehiculos";
const app = express();
const path = require('path');

//Creación de la base de datos


app.listen(3000);

app.use(require('./routes/index.routes'));
app.use(express.static(__dirname+'/public'));

console.log("Servidor en puerto: 3000");