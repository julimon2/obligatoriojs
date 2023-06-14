let usuariosCensistas = new Array();
let censados = new Array();
let departamentos = new Array("Montevideo","San José","Canelones","Maldonado","Rocha","Colonia","Flores","Florida","Lavalleja","Rio Negro","Soriano","Cerro Largo","Treinta y Tres","Durazno","Tacuarembó","Rivera","Salto","Paysandú","Artigas",)

function preCargarTestCensados() {
    let censado1 = new Censado();
    censado1.nombre = "Melanie";
    censado1.apellido = "Grostein";
    censado1.edad = 27;
    censado1.cedula = 47137218;
    censado1.departamento = "Montevideo";
    censado1.ocupacion = "dependiente";
    censado1.censistaId = 0;
    //censado1.validado = true;
    censados.push(censado1);
    let censado2 = new Censado();
    censado2.nombre = "Melaniee";
    censado2.apellido = "Grosteinn";
    censado2.edad = 27;
    censado2.cedula = 47137216;
    censado2.departamento = "Montevideo";
    censado2.ocupacion = "dependiente";
    censado2.censistaId = 0;
    //censado1.validado = true;
    censados.push(censado2);
    let censado3 = new Censado();
    censado3.nombre = "Melaniee";
    censado3.cedula = 47137219;
    censado3.departamento = "Montevideo";
    //censado1.validado = true;
    censados.push(censado3);
}



function preCargarTestCensista() {
    let censista1 = new Censista();
    censista1.nombre = "MelanieCensista";
    censista1.nombreUsuario = "melangros";
    censista1.contraseña = "Melanie1";
    usuariosCensistas.push(censista1);
    let censista2 = new Censista();
    censista2.nombre = "MelanieCensista2";
    censista2.nombreUsuario = "melangros2";
    censista2.contraseña = "Melanie2";
    usuariosCensistas.push(censista2);
}

preCargarTestCensados();
preCargarTestCensista();

class Sistema {

    constructor() {
        this.usuarioLogueado = null;
        this.indiceProximoCensistaAsignar = 0;
    }

    existeNombreUsuario(pNombreUsuario) {

        let existe = false;
        let i = 0;
        let minusculasPnombre = pNombreUsuario.toLowerCase();
        while (i < usuariosCensistas.length && !existe){ 
            let usuarioX = usuariosCensistas[i];
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
        let usuario = this.obtenerUsuarioCensista(pNombreUsuario);
        if (usuario !== null) {
            if (usuario.contraseña === pContraseña) {
                logIn = true;
                this.usuarioLogueado = usuario;
            }
        }
        return logIn;
    }

    logout() {
      this.usuarioLogueado = null;
    }

    obtenerUsuarioCensista(pNombreUsuario) {
        let censista = null;
        let i = 0;
        while (i < usuariosCensistas.length && censista === null) {
            let usuX = usuariosCensistas[i];
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
        usuariosCensistas.push(usuarioX);
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
        censados.push(censadoX);
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
        censados.push(censadoX);
    }

    obtenerIdCensistaRandom() {
        let censista = usuariosCensistas[this.indiceProximoCensistaAsignar];
        let censistaId = censista.id;
        if (this.indiceProximoCensistaAsignar === usuariosCensistas.length-1) {
            this.indiceProximoCensistaAsignar = 0;
        }else{

            this.indiceProximoCensistaAsignar++;

        }  

        return censistaId;
  
    }

    buscarCensadoXcedula(pCedula) {

        let censado = null;
        let i = 0;
        while (i < censados.length && censado === null) {
            let usuX = censados[i];
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
        while (i < usuariosCensistas.length && censista === null) {
            let usuX = usuariosCensistas[i];
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
        for (let unCensado of censados) {
            if (unCensado.censistaId === pCensista.id) {
                if (unCensado.validado === null) {
                        miTabla += `<tr class="filaTablaXvalidar" censadoElegido="${unCensado.cedula}"><td> ${unCensado.nombre} </td> <td> ${unCensado.apellido} </td> <td> ${unCensado.cedula}</td></tr>`;

                }
            }
        }
        return miTabla;
    }


}


function validarIngresoAlgo(pAlgo) {
    return pAlgo.trim().length > 0;
}
function validarNroPositivo(pNro) {
    return !isNaN(pNro) && Number(pNro) >= 0;
}




let miSistema = new Sistema();

/*preCargaPeliculas();*/