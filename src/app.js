const express = require('express');

const app = express();

app.listen(3000);
console.log("Servidor en puerto: 3000");
//En el método get vamos a enviar la página Home de los módulos
app.get(()=>{
    app.response();
});