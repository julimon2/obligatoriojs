//let usuariosCensistas = new Array();
//let censados = new Array();
//let departamentos = new Array("Montevideo","San José","Canelones","Maldonado","Rocha","Colonia","Flores","Florida","Lavalleja","Rio Negro","Soriano","Cerro Largo","Treinta y Tres","Durazno","Tacuarembó","Rivera","Salto","Paysandú","Artigas",)
/*let generos = new Array("comedia","drama","ciencia ficción");
let peliculas = new Array();
let marcas = new Array("Samsung","Sony","LG");
let ventasCelulares = new Array();
let origen = new Array("Importado","Nacional");
let zapatos = new Array();*/


/*let contador1 = 0;
let contador2 = 0;


function preCargaPeliculas() {
    let pelicula1 = new Pelicula();
 // el id se actuliza en el objeto.  
    pelicula1.nombre = "Hola";
    pelicula1.año = 1995;
    pelicula1.genero = "comedia";
    pelicula1.cantidadVotantes = "50";
    pelicula1.puntos = "100";
    peliculas.push(pelicula1);
}*/


class Sistema {

    constructor() {
        this.usuarioLogueado = null;
        this.indiceProximoCensistaAsignar = 0;
        this.censados = new Array();
        this.usuariosCensistas = new Array();
        this.departamentos = new Array("Montevideo","San José","Canelones","Maldonado","Rocha","Colonia","Flores","Florida","Lavalleja","Rio Negro","Soriano","Cerro Largo","Treinta y Tres","Durazno","Tacuarembó","Rivera","Salto","Paysandú","Artigas");
    }

    existeNombreUsuario(pNombreUsuario) {

        let existe = false;
        let i = 0;
        let minusculasPnombre = pNombreUsuario.toLowerCase();
        while (i < this.usuariosCensistas.length && !existe){ 
            let usuarioX = this.usuariosCensistas[i];
            let nombreUsuarioX = usuarioX.nombreUsuario;
            let nombreUsuarioXminu = nombreUsuarioX.toLowerCase(); //deberíamos guardarlo en minuscula y no es necesario pasarlo a minuscula     
          if(nombreUsuarioXminu === minusculasPnombre){
              existe = true;
          }  
          i++;
       }
    
    
    return existe;
    
    }

    validarContraseña(pContraseña){
        let cumple = false;
        let contadorMayuscula = 0;
        let contadorMinuscula = 0;
        let contadorNumero = 0;

        for (let i = 0; i < pContraseña.length; i++) {
            let caracter = pContraseña.charAt(i);

                if (caracter === caracter.toUpperCase()) {

                    contadorMayuscula += 1;
                    
                 }

                if (caracter === caracter.toLowerCase()) {

                    contadorMinuscula += 1;
                    
                 }

                 if (!isNaN(caracter)) {

                    contadorNumero += 1;
                    
                 }

        }

        if (pContraseña.length >= 5 && contadorMayuscula > 0 && contadorMinuscula > 0 && contadorNumero > 0) {

             cumple = true;
            
        }

        
       return cumple;

    
    }

    login(pNombreUsuario, pContraseña) {
        let logIn = false;
        let pNombreMin = pNombreUsuario.toLowerCase();
        //Hay que pasar pNombre a min
        let usuario = this.obtenerUsuarioCensista(pNombreMin);
        if (usuario !== null) {
            if (usuario.contraseña === pContraseña) {
                logIn = true;
                this.usuarioLogueado = usuario;
            }
        }
        return logIn;
    }



    obtenerUsuarioCensista(pNombreUsuario) {
        let censista = null;
        let i = 0;
        while (i < this.usuariosCensistas.length && censista === null) {
            let usuX = this.usuariosCensistas[i];
            if (usuX.nombreUsuario === pNombreUsuario) {
                censista = usuX; 
            }
            i++;
        }
        return censista;
    }


    guardarCensista(pNombre, pNombreUsuario, pContraseña) { 
        let usuarioX = new Censista();     
        usuarioX.nombre = pNombre;
        usuarioX.nombreUsuario = pNombreUsuario;
        usuarioX.contraseña = pContraseña;
        this.usuariosCensistas.push(usuarioX);
    }

    guardarCensadoXcensista(pNombre, pApellido, pEdad, pCedula, pDepartamento, pOcupacion) { 
        let censadoX = new Censado();     
        censadoX.nombre = pNombre;
        censadoX.apellido = pApellido;
        censadoX.edad = pEdad;
        censadoX.cedula = pCedula;
        censadoX.departamento = pDepartamento;
        censadoX.ocupacion = pOcupacion;
        censadoX.censistaId = this.usuarioLogueado.id;
        censadoX.validado = true;
        this.censados.push(censadoX);
    }

    guardarCensadoXcensado(pNombre, pApellido, pEdad, pCedula, pDepartamento, pOcupacion) { 
        let censadoX = new Censado();     
        censadoX.nombre = pNombre;
        censadoX.apellido = pApellido;
        censadoX.edad = pEdad;
        censadoX.cedula = pCedula;
        censadoX.departamento = pDepartamento;
        censadoX.ocupacion = pOcupacion;
        censadoX.censistaId = this.obtenerIdCensistaRandom();
        this.censados.push(censadoX);
    }

    obtenerIdCensistaRandom() {
        let censista = this.usuariosCensistas[this.indiceProximoCensistaAsignar];
        let censistaId = censista.id;
        if (this.indiceProximoCensistaAsignar === this.usuariosCensistas.length-1) {
            this.indiceProximoCensistaAsignar = 0;
        }else{

            this.indiceProximoCensistaAsignar++;

        }  

        return censistaId;
  
    }

    buscarCensadoXcedula(pCedula) {

        let censado = null;
        let i = 0;
        while (i < this.censados.length && censado === null) {
            let usuX = this.censados[i];
            if (usuX.cedula === pCedula) {
                censado = usuX; 
            }
            i++;
        }
        return censado;

    } 

    buscarCensistaXid(pId) {

        let censista = null;
        let i = 0;
        while (i < this.usuariosCensistas.length && censista === null) {
            let usuX = this.usuariosCensistas[i];
            if (usuX.id === pId) {
                censista = usuX; 
            }
            i++;
        }
        return censista;

    } 

    obtenerListadoPersonasXvalidar(pCensista) { //objeto
        let miTabla = `<table border="1">`;
        miTabla += `<tr><th> Censista</th> <th> ${pCensista.nombre}</th></tr>`;
        miTabla += `<tr><th> Censado nombre</th> <th> Apellido</th> <th> Cédula</th></tr>`;
        for (let unCensado of this.censados) {
            if (unCensado.censistaId === pCensista.id) {
                if (unCensado.validado === null) {
                        miTabla += `<tr class="filaTablaXvalidar" censadoElegido="${unCensado.cedula}"><td> ${unCensado.nombre} </td> <td> ${unCensado.apellido} </td> <td> ${unCensado.cedula}</td></tr>`;

                }
            }
        }
        return miTabla;
    }

    cantidadCensados() { 
        let contadorCensados = 0;
        for (let i = 0; i < this.censados.length; i++) {
            let censadoX = this.censados[i];
            if (censadoX.validado === true) {
                contadorCensados++;
              }

            }


        return contadorCensados;
    }

    cantidadCensadosXdepartamento() { 
        let contadorMdeo = 0;
        let contadorMaldo = 0;
        let contadorSanJose = 0;
        let contadorCanelones = 0;
        let contadorColonia = 0;
        let contadorRocha = 0;
        let contadorLavalleja = 0;
        let contadorFlores = 0;
        let contadorFlorida = 0;
        let contadorTreinaTres = 0;
        let contadorRioNegro = 0;
        let contadorDurazno = 0;
        let contadorRivera = 0;
        let contadorPaysandu = 0;
        let contadorSalto = 0;
        let contadorTacuarembo = 0;
        let contadorArtigas = 0;
        let contadorCerroLargo = 0;
        let contadorSoriano = 0;
        let miTabla = `<table border="1">`;
        miTabla += `<tr><th> Departamento</th> <th> Cantidad de censados</th></tr>`;
        for (let i = 0; i < this.censados.length; i++) {
            let censadoX = this.censados[i];
            if (censadoX.validado === true) {
                switch (censadoX.departamento) {
                    case "Montevideo":
                        contadorMdeo++;
                        break;
                    case "Maldonado":
                        contadorMaldo++;
                        break;
                    case "San José":
                        contadorSanJose++;
                        break;
                    case "Canelones":
                        contadorCanelones++;
                        break;
                    case "Colonia":
                        contadorColonia++;
                        break;
                    case "Rocha":
                        contadorRocha++;
                        break;
                    case "Rivera":
                        contadorRivera++;
                        break;
                    case "Lavalleja":
                        contadorLavalleja++;
                        break;
                    case "Flores":
                        contadorFlores++;
                        break;
                    case "Florida":
                        contadorFlorida++;
                        break;
                    case "TreintaTres":
                        contadorTreinaTres++;
                        break;
                
                    default:
                        break;
                }


              }

            }


        return contadorCensados;
    }
    
    
    /*tablaCensadosXdepartamento() { //objeto
        let miTabla = `<table border="1">`;
        let contadorMdeo = 0;
        let contadorSanJose = 0;
        let 
        miTabla += `<tr><th> Departamento</th> <th> Cantidad de censados</th></tr>`;
        for (let unCensado of this.censados) {
            if (unCensado.censistaId === pCensista.id) {
                if (unCensado.validado === null) {
                        miTabla += `<tr class="filaTablaXvalidar" censadoElegido="${unCensado.cedula}"><td> ${unCensado.nombre} </td> <td> ${unCensado.apellido} </td> <td> ${unCensado.cedula}</td></tr>`;

                }
            }
        }
        return miTabla;
    }*/

    

    preCargarTestCensados() {
        let censado1 = new Censado();
        censado1.nombre = "Melanie";
        censado1.apellido = "Grostein";
        censado1.edad = 27;
        censado1.cedula = 47137218;
        censado1.departamento = "Montevideo";
        censado1.ocupacion = "dependiente";
        censado1.censistaId = 0;
        censado1.validado = true;
        this.censados.push(censado1);
        let censado2 = new Censado();
        censado2.nombre = "Melaniee";
        censado2.apellido = "Grosteinn";
        censado2.edad = 27;
        censado2.cedula = 47137216;
        censado2.departamento = "Montevideo";
        censado2.ocupacion = "dependiente";
        censado2.censistaId = 0;
        //censado1.validado = true;
        this.censados.push(censado2);
        let censado3 = new Censado();
        censado3.nombre = "Melaniee";
        censado3.apellido = "";
        censado3.edad = "";
        censado3.cedula = 47137219;
        censado3.departamento = "Montevideo";
        censado3.ocupacion = "Seleccione";
        censado3.censistaId = 1;
        //censado1.validado = true;
        this.censados.push(censado3);
    }

    preCargarTestCensista() {
        let censista1 = new Censista();
        censista1.nombre = "MelanieCensista";
        censista1.nombreUsuario = "melangros";
        censista1.contraseña = "Melanie1";
        this.usuariosCensistas.push(censista1);
        let censista2 = new Censista();
        censista2.nombre = "MelanieCensista2";
        censista2.nombreUsuario = "melangros2";
        censista2.contraseña = "Melanie2";
        this.usuariosCensistas.push(censista2);
    }












    /*obtenerTablaPersonas() {
        let miTabla = `<table border="1">`;
        miTabla += `<tr><th> Nombre</th> <th> Edad</th> <th> Nacionalidad</th></tr>`;
        for (let unaPersona of personas) {
            // miTabla += `<tr><td> ${unTipo.tipo} </td> <td> ${totalVentasXtipo}</td></tr>`;
            miTabla += `<tr><td> ${unaPersona.nombre} </td> <td> ${unaPersona.edad}</td> <td> ${unaPersona.nacionalidad}</td></tr>`;
        }
        miTabla += `</table>`;
        return miTabla;
    }

    obtenerTablaPersonas18() {
        let miTabla = `<table border="1">`;
        miTabla += `<tr><th> Nombre</th> <th> Edad</th> <th> Nacionalidad</th></tr>`;
        for (let i = 0; i < personas.length; i++) {
            let personaX = personas[i];
            if (personaX.edad > 18) {
                miTabla += `<tr><td> ${personaX.nombre} </td> <td> ${personaX.edad}</td> <td> ${personaX.nacionalidad}</td></tr>`;
            }
        
        
        /*for (let unaPersona of personas) {
            if (unaPersona.edad > 18 ) {
                 miTabla += `<tr><td> ${unaPersona.nombre} </td> <td> ${unaPersona.edad}</td> <td> ${unaPersona.nacionalidad}</td></tr>`;
            }
            // miTabla += `<tr><td> ${unTipo.tipo} </td> <td> ${totalVentasXtipo}</td></tr>`;
           
        }
        
        }
        miTabla += `</table>`;
        return miTabla;
    }

    
 
    existe(pNombre){

        let existe = false;
        let i = 0;
        while (i < peliculas.length && !existe){ 
            let peliculaX = peliculas[i]       
          if( peliculaX.nombre === pNombre){
              existe = true;
          }  
          i++;
       }
    
    
    return existe;
    
    }

    guardarPelicula(pNombre, pAño, pGenero, pVotantes, pPuntos) { //se asume llegan datos válidos
        let peliculaX = new Pelicula();
        //id queda a nivel de objeto      
        peliculaX.nombre = pNombre;
        peliculaX.año = pAño;
        peliculaX.genero = pGenero;
        peliculaX.cantidadVotantes = pVotantes;
        peliculaX.puntos = pPuntos;
        peliculas.push(peliculaX);
    }

    obtenerTablaPromedio() {
        let miTabla = `<table border="1">`;
        miTabla += `<tr><th> Nombre</th> <th> </th></tr>`;
        let promedio = 0;
        for (let i = 0; i < peliculas.length; i++) {
            let peliculaX = peliculas[i];
            promedio = peliculaX.puntos/peliculaX.cantidadVotantes;
            if (promedio > 4) {
                miTabla += `<tr><td> ${peliculaX.nombre} </td> <td> ${promedio}</td></tr>`;
            } 

        
        
        /*for (let unaPersona of personas) {
            if (unaPersona.edad > 18 ) {
                 miTabla += `<tr><td> ${unaPersona.nombre} </td> <td> ${unaPersona.edad}</td> <td> ${unaPersona.nacionalidad}</td></tr>`;
            }
            // miTabla += `<tr><td> ${unTipo.tipo} </td> <td> ${totalVentasXtipo}</td></tr>`;
           
        }
        
        }
        miTabla += `</table>`;
        return miTabla;
    }

    mostrarPelicula(pNombre){

        let mensaje = "";
        let i = 0;
        while (i < peliculas.length){ 
            let peliculaX = peliculas[i]       
          if( peliculaX.nombre === pNombre){
              mensaje = `Nombre: ${peliculaX.nombre} - Año: ${peliculaX.año} - Genero: ${peliculaX.genero} ` ;
          }  
          i++;
       }
    
    
    return mensaje;
    
    }

    guardarVentaCelular(pMarca, pModelo, pPrecio, pCantidad) { //se asume llegan datos válidos
        let ventaX = new Venta();
        //id queda a nivel de objeto      
        ventaX.marca = pMarca;
        ventaX.modelo = pModelo;
        ventaX.precio = pPrecio;
        ventaX.cantidad = pCantidad;
        ventasCelulares.push(ventaX);
    }

    obtenerTablaVentas() {
        let miTabla = `<table border="1">`;
        miTabla += `<tr><th> Marca</th> <th> Modelo</th> <th> Nro de venta</th> <th> Monto</th></tr>`;
        let sumaVentas = 0;
        for (let i = 0; i < ventasCelulares.length; i++) {
            let ventaX = ventasCelulares[i];
            sumaVentas = ventaX.cantidad * ventaX.precio;
            if (sumaVentas > 2000) {
                miTabla += `<tr><td> ${ventaX.marca} </td> <td> ${ventaX.modelo}</td> <td> ${ventaX.id}</td> <td> ${sumaVentas}</td></tr>`;
            } 

        
        
        /*for (let unaPersona of personas) {
            if (unaPersona.edad > 18 ) {
                 miTabla += `<tr><td> ${unaPersona.nombre} </td> <td> ${unaPersona.edad}</td> <td> ${unaPersona.nacionalidad}</td></tr>`;
            }
            // miTabla += `<tr><td> ${unTipo.tipo} </td> <td> ${totalVentasXtipo}</td></tr>`;
           
        }
        
        }
        miTabla += `</table>`;
        return miTabla;
    }

    obtenerCantidadesXModelo(pModelo) {
        let cantidadTotal = 0;
        for (let i = 0; i < ventasCelulares.length; i++) {
            let ventaX = ventasCelulares[i];
            if (ventaX.modelo === pModelo) {
                let cantidadXobjeto = ventaX.cantidad;
                cantidadTotal += cantidadXobjeto;
            } 
        
        }

        return cantidadTotal;
    }
    guardarZapato(pOrigen, pMarca, pTalle, pColor) { //se asume llegan datos válidos
        let zapatoX = new Zapato();
        //id queda a nivel de objeto      
        zapatoX.origen = pOrigen;
        zapatoX.marca = pMarca;
        zapatoX.talle = pTalle;
        zapatoX.color = pColor;
        zapatos.push(zapatoX);
    }

    obtenerZapato38(pZapatos,pOrigen) {
        let contador = 0;
        for (let i = 0; i <pZapatos.length; i++) {
            let zapatoX = pZapatos[i];
            if (zapatoX.talle > 38 && zapatoX.origen === pOrigen) {
                contador += 1;
            }
        
        }

        return contador;
    }

    
    obtenerZapato382(pZapatos,pOrigen1,pOrigen2) {
        for (let i = 0; i <pZapatos.length; i++) {
            let zapatoX = pZapatos[i];
            if (zapatoX.talle > 38)
                if (zapatoX.origen === pOrigen1) {
                     contador1 += 1;
                } else {
                    contador2 += 1;
                }
        
        }


    }



}*/

}


function validarIngresoAlgo(pAlgo) {
    return pAlgo.trim().length > 0;
}
function validarNroPositivo(pNro) {
    return !isNaN(pNro) && Number(pNro) >= 0;
}




/*preCargaPeliculas();*/