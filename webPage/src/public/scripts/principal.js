$(document).ready(function(){    
    window.setInterval(function(){
        
    },5000);
    $("#btnEmpezar").click(function(){
        $.get("http://localhost:3500/start",function(){
            console.log("Boton start clickeado");
            location.reload();
        })
    });
    $("#btnParar").click(function(){
        $.get("http://localhost:3500/stop",function(){
            console.log("Boton parar clickeado");
            location.reload();
        })
    });
    $("#btnSalir").click(function(){
        console.log("Clicked");
        $.getJSON("http://localhost:3000/cerrarSesion",function(data){            
            if(data){
                location.href="http://localhost:3000";
            }
        });
    });
    $("#btnGraficas").click(function(){
        location.href="http://localhost:3000/graficos";
    });
});