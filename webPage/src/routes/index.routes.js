const { Router } = require('express');
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
router.get('/cerrarSesion', (req,res)=>{
    res.json({"allowAccess":"false"});
    sess.active = false;    
    console.log(sess.active);  
});
module.exports = router;