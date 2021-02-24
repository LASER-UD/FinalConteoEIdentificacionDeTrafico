const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb://mongo/Vehiculos";
const app = express();
const path = require('path');

//Creación de la base de datos
MongoClient.connect(mongoUrl, (err, db) => {
    if (err) throw err;
    console.log("Base de datos creada o correctamente conectada");
    var dbo = db.db("Vehiculos")
  dbo.createCollection("Registro", function(err, res) {
    if (err){ 
        console.log("La colección ya existía");
    }
    else{
        console.log("Colección creada");
    }
  });    
  test = {
    "score" : "0",
    "tipo" : "0",
    "color" : "0",
    "velocidad" : "0",
    "hora" : "00:00",
    "fecha" : "00-00-0000"                            
    }
  dbo.collection("Registro").insertOne(test, (err, res)=>{
      if(err) throw err;
      console.log("Documento test insertado");
  });
  db.close();
});

app.listen(3000);

app.use(require('./routes/index.routes'));
app.use(express.static(__dirname+'/public'));

console.log("Servidor en puerto: 3000");