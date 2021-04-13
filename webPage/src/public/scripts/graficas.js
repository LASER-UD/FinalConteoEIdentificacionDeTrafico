var labels, data1;

$(document).ready(function(){    
    document.getElementById("fechaInicio").valueAsDate = new Date();
    document.getElementById("fechaFin").valueAsDate = new Date();
    $("#buscarPor").val(1);
    $("#btnSalir").click(function(){
        console.log("Clicked");
        $.getJSON("http://localhost:3000/cerrarSesion",function(data){            
            if(data){
                location.href="http://localhost:3000";
            }
        });
    });
    $("#btnPrincipal").click(function(){
        location.href="http://localhost:3000/Index";
    });
    $("#btnBuscar").click(function(){
        //Traer información de los controles
        let fechaInicio = $("#fechaInicio").val();
        let fechaFin = $("#fechaFin").val();
        let buscarPor = $("input[name='buscarPor']:checked").val();        
        let objetoBusqueda = {fechaInicio, fechaFin, buscarPor};
        
        //Funcion get async
        let respuesta = obtenerConteoDeCarros(objetoBusqueda).then((dataRes)=>{
            let ctx = $("#chartGrafico");
            var data;
            switch(parseInt(buscarPor)){
                case 1:
                    data = {
                        labels: dataRes.fechas,
                        datasets: [{
                        label: 'Número de vehículos',
                        data: dataRes.cuentaCarros,
                        fill: false,
                        borderColor: 'rgb(128, 0, 0)',
                        tension: 0.1
                        }]
                    };
                    break;
                case 2:
                    data = {
                        labels: dataRes.fechas,
                        datasets: [
                            {
                                label: 'Ambulancias',
                                data: dataRes.cuentaAmbulancia,
                                fill: false,
                                borderColor: 'rgb(255, 225, 25)',
                                tension: 0.1
                            },
                            {
                                label: 'Bicicletas',
                                data: dataRes.cuentaBicicleta,
                                fill: false,
                                borderColor: 'rgb(0, 130, 200)',
                                tension: 0.1
                            },                            
                            {
                                label: 'Buses',
                                data: dataRes.cuentaBus,
                                fill: false,
                                borderColor: 'rgb(245, 130, 48)',
                                tension: 0.1
                            },
                            {
                                label: 'Camiones',
                                data: dataRes.cuentaCamion,
                                fill: false,
                                borderColor: 'rgb(220, 190, 255)',
                                tension: 0.1
                            },
                            {
                                label: 'Carros',
                                data: dataRes.cuentaCarro,
                                fill: false,
                                borderColor: 'rgb(128, 0, 0)',
                                tension: 0.1
                            },
                            {
                                label: 'Motos',
                                data: dataRes.cuentaMoto,
                                fill: false,
                                borderColor: 'rgb(0, 0, 128)',
                                tension: 0.1
                            },
                            {
                                label: 'Taxis',
                                data: dataRes.cuentaTaxi,
                                fill: false,
                                borderColor: 'rgb(128, 128, 128)',
                                tension: 0.1
                            },
                            {
                                label: 'Vans',
                                data: dataRes.cuentaVan,
                                fill: false,
                                borderColor: 'rgb(0, 0, 0)',
                                tension: 0.1
                            }
                        ]
                    };
                    break;
                case 3:
                    data = {
                        labels: dataRes.fechas,
                        datasets: [
                            {
                                label: 'Rojos',
                                data: dataRes.cuentaRojo,
                                fill: false,
                                borderColor: 'rgb(255, 225, 25)',
                                tension: 0.1
                            },
                            {
                                label: 'Verdes',
                                data: dataRes.cuentaVerde,
                                fill: false,
                                borderColor: 'rgb(0, 130, 200)',
                                tension: 0.1
                            },                            
                            {
                                label: 'Azules',
                                data: dataRes.cuentaAzul,
                                fill: false,
                                borderColor: 'rgb(245, 130, 48)',
                                tension: 0.1
                            },
                            {
                                label: 'Negros',
                                data: dataRes.cuentaNegro,
                                fill: false,
                                borderColor: 'rgb(220, 190, 255)',
                                tension: 0.1
                            },
                            {
                                label: 'Blancos',
                                data: dataRes.cuentaBlanco,
                                fill: false,
                                borderColor: 'rgb(128, 0, 0)',
                                tension: 0.1
                            },
                            {
                                label: 'Amarillos',
                                data: dataRes.cuentaAmarillo,
                                fill: false,
                                borderColor: 'rgb(0, 0, 128)',
                                tension: 0.1
                            }
                        ]
                    };
                    break;
            }
          
            let myChart = new Chart(ctx,{
                type: 'line',
                data: data
            })    
        });
        console.log(respuesta)
        
    });
});

async function obtenerConteoDeCarros(objetoBusqueda){
    let objRetorno;
    await $.getJSON("http://localhost:3000/getTrafficCount",objetoBusqueda).done((data)=>{            
            objRetorno = data;
        });        
    return objRetorno;          
}