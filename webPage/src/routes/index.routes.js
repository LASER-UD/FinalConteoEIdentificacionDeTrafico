const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const url = require('url');
const router = Router();

router.get('/', (req,res) =>{    
    archivo = "/src/public/pages/index.html";
    res.sendFile(archivo, {root: path.join(__dirname,"..","..") });
});

router.get('/entrar',(req,res)=>{
    res.json({
        "codigo":"12345"
    });
});
router.get('/Index',(req,res)=>{
    archivo = "/src/public/pages/principal.html";
    res.sendFile(archivo, {root: path.join(__dirname,"..","..") });
});
module.exports = router;