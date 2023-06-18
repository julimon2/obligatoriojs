EliminarDatosCensado(ci){

    for (let i=0; i< this.censados.length; i++){
        let censo = this.censados[i];
        if(censo.cedula == ci){
            this.censados.splice(i,1)
        }
    }
}

    ReasignarCensistaACenso (ci, censistaId) {
        for (let i=0; i< this.censados.length; i++){
            if(this.censados[i].cedula == ci){
                this.censados[i].censistaId = censistaId;
                this.censados[i].validado = false;
            }
        }
    }


-

function validarIngresoAlgo(pAlgo) {
    return pAlgo.trim().length > 0;
}
function validarNroPositivo(pNro) {
    return !isNaN(pNro) && Number(pNro) >= 0;
}


function NavegarEntrePantallas(pPantalla){
    console.log(pPantalla);
    let array=["divFormRegistro"]
    for (let i=0; i<array.length; i++){

        if (array[i]==pPantalla){
            document.querySelector("#"+array[i]).style.display="block";
        }else {
            document.querySelector("#"+array[i]).style.display="none";
        }
    }

    
    if (pPantalla == "") {
        if(miSistema.usuarioLogueado) {
            //aca hace algo si esta logueado
        } else {
            //aca no
        }
        //pasa esto
    } else {
        //pasa otra cosa
    }
    if (miSistema.usuarioLogueado) {
        //document.querySelector("#Salir").style.display="block";
    } else {
        //document.querySelector("#Salir").style.display="none";
    }
    if (miSistema.usuarioLogueado !== null) {
        botonFormularioCensista();
    }
    if (miSistema.usuarioLogueado === null) {
        botonFormularioCensado();
    }


    NavegarEntrePantallas("divFormRegistro")
}

//la funcion navegar entre pantallas
function NavegarEntrePantallas(pPantalla){
    console.log(pPantalla);
    let array=["prueba3","divFormRegistro","divLogin","pantallaCensista","pantallaInvitado","IngreseCedula"]
    for (let i=0; i<array.length; i++){

        if (array[i]==pPantalla){
            document.querySelector("#"+array[i]).style.display="block";
        }else {
            document.querySelector("#"+array[i]).style.display="none";
        }
    }


}
NavegarEntrePantallas("divLogin")

//validaciones de cedulas - tener en cuenta que en las cedulas de un digito menos se omite el primer lugar
function eventos() {
    document.querySelector("#btnValidar").addEventListener("click", validarCedula)
}

eventos();

function validarCedula(){
    let cedula = document.querySelector("#txtCedula").value

    let carCedula = cedula.trim();
    let mensaje = "";

    if (validarCedula(cedula)) {
        //se procesa OK

    } // sino
    else
        mensaje = "la cedula ingresada no cumple con el formato 1.111.111-1"

    document.querySelector("#divResultado").innerHTML = mensaje;
}

function validarCedula(cedula){
    let esValida = false;
    
    let carCedula= cedula.trim();

    if(carCedula.lenth==11) {
        if(contadorCaracteres(cedula, ".") === 2 && contarCaracteres(cedula, "-") === 1){
            esValida = true;
        }
        
    }

    if(carCedula.lenght === 9) {
        if(contadorCaracteres(cedula, ".") === 1 && contarCaracteres(cedula, "-") === 1){
            esValuda = true;
        }
    }

    return esValida;
}
//funcion que cuenta cuantos puntos y cuantos guiones hay dentro de la cedula. primero cuantos puntos y despues cuantos guiones. se usa la misma fucnion para los dos casos 
function contarCaracteres(cedula) {
    let contadorCaracter = 0;

    for(let i = 0; i < cedula.length; i++){
        let caracterRecorrido = cedula.charAt(i);
        if (caracterRecorrido === caracter) {
            contadorCaracter++;
            
        }
    }

}

