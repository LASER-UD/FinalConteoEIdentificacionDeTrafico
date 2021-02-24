const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const url = require('url');
const router = Router();

router.get('/', (req,res) =>{    
    archivo = "/src/public/pages/index.html";
    res.sendFile(archivo, {root: path.join(__dirname,"..","..") });
});

module.exports = router;