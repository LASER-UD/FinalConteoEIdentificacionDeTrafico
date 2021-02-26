$(document).ready(function(){    
    $("#btnEntrar").click(function(){
        var text = $("#txtCodigo").val();
        console.log(text);
        if(text!==""){
            $.getJSON("http://localhost:3000/entrar", function(data){    
                if(text === data.codigo){
                    $.getJSON("http://localhost:3000/iniciarSesion", function(data){
                        if(data.allowAccess){
                            location.href="http://localhost:3000/Index";
                        }
                    });                    
                }  
                else{
                    alert('Código incorrecto');
                }      
            });
        }
        else{
            alert("El campo no puede estar vacío");
        }
    });
    $("#txtCodigo").keypress(function(event){
        if(event.keyCode == 13){
            $("#btnEntrar").click();
        }
    });    
});