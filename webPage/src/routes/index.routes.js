const { Router } = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb://mongo/Vehiculos";
const path = require('path');
const fs = require('fs');
const url = require('url');
const router = Router();
const session = require('express-session');

//Variable de sesion
var sess;

router.get('/', (req,res) =>{    
    archivo = "/src/public/pages/index.html";
    res.sendFile(archivo, {root: path.join(__dirname,"..","..") });
    sess = req.session;
    sess.active=false;
});

router.get('/entrar',(req,res)=>{
    res.json({
        "codigo":"12345"
    });    
});

router.get('/iniciarSesion',(req,res)=>{
    res.json({"allowAccess":"true"});
    sess.active = true;    
    console.log(sess.active);    
});
router.get('/Index',(req,res)=>{    
    if(typeof sess !== 'undefined'){
        if(sess.active){            
            archivo = "/src/public/pages/principal.html";        
            res.sendFile(archivo, {root: path.join(__dirname,"..","..") });        
        }
        else{
            res.sendStatus(401);       
        }
    }
    else{
        res.sendStatus(401);       
    }
});

router.get('/graficos', (req, res)=>{
    if(typeof sess !== 'undefined'){
        if(sess.active){                        
            archivo = "/src/public/pages/graficas.html";               
            res.sendFile(archivo, {root: path.join(__dirname,"..","..") });            
        }
        else{
            res.sendStatus(401);       
        }
    }
    else{
        res.sendStatus(401);       
    }
});

router.get('/cerrarSesion', (req,res)=>{
    res.json({"allowAccess":"false"});
    sess.active = false;    
    console.log(sess.active);    
});

router.get('/getTrafficCount',(req,res)=>{
    let cuentaCarros = new Array();
    let objDato = req.query;    
    obtenerDatos(objDato.fechaInicio,objDato.fechaFin,objDato.buscarPor).then((data)=>{
        res.json(data);
    });    
});

async function obtenerDatos(fechaInicio,fechaFin,tipoBusqueda){
    let objetoRetorno;
    let cuentaCarros = new Array();
    let cuentaAmbulancia = new Array();
    let cuentaBicicleta = new Array();
    let cuentaBus = new Array();
    let cuentaCamion = new Array();
    let cuentaCarro = new Array();
    let cuentaMoto = new Array();
    let cuentaTaxi = new Array();
    let cuentaVan = new Array();
    let cuentaRojo = new Array();
    let cuentaVerde = new Array();
    let cuentaAzul = new Array();
    let cuentaNegro = new Array();
    let cuentaBlanco = new Array();
    let cuentaAmarillo = new Array();
    let dates = getDates(new Date(fechaInicio), new Date(fechaFin));                                                                                                           
    //Conexión a mongo
    let cliente = await MongoClient.connect(mongoUrl);
    var dbo = cliente.db("Vehiculos");        
    for(const date of dates){
        let fecha = date.toLocaleDateString("es-CO");            
        fecha = fecha.replaceAll("/","-");
        let detalle = fecha.split("-");
        if(parseInt(detalle[1]) < 10){
            detalle[1] = parseInt(detalle[1]).toString();
        }
        fecha = detalle[0]+"-"+detalle[1]+"-"+detalle[2];            
        console.log(fecha);
        let query;
        var fechas = new Array();
        dates.forEach(date => {
            fechas.push(date.toLocaleDateString("es-CO"));
        });
        let result, cuenta;
        switch(parseInt(tipoBusqueda)){
            case 1:
                query = {"fecha":fecha}
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaCarros.push(cuenta);                  
                break;
            case 2:
                //Clasificación por tipo
                //Ambulancia
                query = {"fecha":fecha, "tipo":"0"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaAmbulancia.push(cuenta);
                //Bicicleta
                query = {"fecha":fecha, "tipo":"1"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaBicicleta.push(cuenta);
                //Bus
                query = {"fecha":fecha, "tipo":"2"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaBus.push(cuenta);
                //Camion
                query = {"fecha":fecha, "tipo":"3"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaCamion.push(cuenta);
                //Carro
                query = {"fecha":fecha, "tipo":"4"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaCarro.push(cuenta);
                //Moto
                query = {"fecha":fecha, "tipo":"5"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaMoto.push(cuenta);
                //Taxi
                query = {"fecha":fecha, "tipo":"6"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaTaxi.push(cuenta);
                //Van
                query = {"fecha":fecha, "tipo":"7"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaVan.push(cuenta);
                break;
            case 3:
                //Clasificación por color
                //Rojo
                query = {"fecha":fecha, "color":"Rojo"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaRojo.push(cuenta);
                //Verde
                query = {"fecha":fecha, "color":"Verde"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaVerde.push(cuenta);
                //Azul
                query = {"fecha":fecha, "color":"Azul"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaAzul.push(cuenta);
                //Negro
                query = {"fecha":fecha, "color":"Negro"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaNegro.push(cuenta);
                //Negro
                query = {"fecha":fecha, "color":"Blanco"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaBlanco.push(cuenta);
                //Amarillo
                query = {"fecha":fecha, "color":"Amarillo"};
                result = await resultados(query,dbo);        
                cuenta = 0;   
                cuenta = result.length;
                cuentaAmarillo.push(cuenta);
                break;
        }        
    }
    switch(parseInt(tipoBusqueda)){
        case 1:
            objetoRetorno = {fechas,cuentaCarros}               
            break;
        case 2:
            objetoRetorno = {
                fechas,
                cuentaAmbulancia,
                cuentaBicicleta,
                cuentaBus,
                cuentaCamion,
                cuentaCarro,
                cuentaMoto,
                cuentaTaxi,
                cuentaVan
            }
            break;
        case 3:
            objetoRetorno = {
                fechas,
                cuentaRojo,
                cuentaVerde,
                cuentaAzul, 
                cuentaNegro,
                cuentaBlanco,
                cuentaAmarillo               
            }
            break;
    }    
    return objetoRetorno;
}

async function resultados(query,dbo){
    const result = await dbo.collection("Registro").find(query).toArray();
    return result;
}

var getDates = function(startDate, endDate) {
    var dates = [],
        currentDate = startDate,
        addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }; 
  

module.exports = router;