let miSistema = new Sistema();
miSistema.preCargarTestCensados();
miSistema.preCargarTestCensista();


function eventos() {
    document.querySelector("#btnRegistrarCensista").addEventListener("click", registrarCensista);
    document.querySelector("#btnLogIn").addEventListener("click",logIn);
    document.querySelector("#btnPreFormCenso").addEventListener("click",ocultarBotonInvitado);
    document.querySelector("#btnBuscarCedula").addEventListener("click",validarCedula);
    document.querySelector("#btnBuscarCedulaCensista").addEventListener("click",validarCedulaCensista);
    document.querySelector("#btnEstadisticasCantidadCensados").addEventListener("click",estadisticasCantidadCensados);
    //document.querySelector("#btnPendientesValidar").addEventListener("click",listadoPersonasPendientesXvalidar);
    
}
eventos()

ocultarDiv("divFormularioCenso");



function cargarComboDepartamentos() {
    let lasOpciones = `<option value="Seleccione"> Seleccione departamento</option>`;
    for (let i = 0; i < miSistema.departamentos.length; i++) {
        let departamentoX = miSistema.departamentos[i]; 
        lasOpciones += `<option value="${departamentoX}"> ${departamentoX} </option>`;
    }
    document.querySelector("#selDepartamentosCenso").innerHTML = lasOpciones;
}

cargarComboDepartamentos();
//ocultarDiv("campoCedulaCensista");

function registrarCensista() {
    let mensaje = "";
    let nombre = document.querySelector("#txtNombreCensista").value;
    let nombreUsuario = document.querySelector("#txtNombreDeUsuario").value;
    let contraseña = document.querySelector("#txtContraseña").value;
    if (validarIngresoAlgo(nombre) && validarIngresoAlgo(nombreUsuario) && validarIngresoAlgo(contraseña)) {
        if (!miSistema.existeNombreUsuario(nombreUsuario)) {
            if (miSistema.validarContraseña(contraseña)) {
                
                let nombreUsuarioMin = nombreUsuario.toLowerCase();

                miSistema.guardarCensista(nombre,nombreUsuarioMin,contraseña)
                mensaje = "Se registró correctamente, ingrese sesión"; 
                //QUÉ PASA DESPUÉS DE REGISTRARSE QUÉ SE MUESTRA - SE MUESTRA LA HOME SIN EL BOTÓN DE REGISTRARSE
                //ocultarDiv("divFormRegistro") 
                //ocultarDiv("btnPreFormCenso")
                //mostrarDiv("divLogin"); // no es necesario
                
            } else {
                mensaje = "La contraseña no cumple con los requisitos"
            }          
        } else {
            mensaje = `El usuario ya existe.`;
        }
    } else {
        mensaje = `Debe completar todos los campos`;
    }
    document.querySelector("#pMostrarRegistroCensista").innerHTML = mensaje;
}

function logIn() {
    let mensaje = "";
    let nombreUsuario = document.querySelector("#txtNombreUsuarioLogIn").value;
    let contraseña = document.querySelector("#txtContraseñaLogIn").value;
    if (validarIngresoAlgo(nombreUsuario) && validarIngresoAlgo(contraseña)) {
        if (miSistema.existeNombreUsuario(nombreUsuario)) {
            if (miSistema.login(nombreUsuario,contraseña)) { 
            mensaje = `Inició sesión correctamente`; //Temporizador en este mensaje así se va y no queda fijo
            //Acá se tiene que mostrar menú (buscar ci, reasignar censista y estadisticas) y que se muestre por deafult el buscar cédula

            //mostrarDiv("campoCedulaCensista"); 
            //botonFormularioCensista();
            //document.querySelector("#btnFormularioCensista").addEventListener("click",guardarDatosCensadoXcensista);
        } else {
            mensaje = `contraseña incorrecta`;
        }
        } else {
            mensaje = `El usuario no existe`;
        }
        
        
       
    } else {
        mensaje = `Debe completar todos los campos`;
    }
    document.querySelector("#pMostrarLogInCensista").innerHTML = mensaje;
    
    //ejemplo timeout
    //setTimeout(function(){
        //document.querySelector("#pMostrarLogInCensista").innerHTML = "";
    //},10000)
    
}

function guardarDatosCensadoXcensista() { //acá guarda el censista los datos
    let mensaje = "";
    let nombre = document.querySelector("#txtNombreCensado").value;
    let apellido = document.querySelector("#txtApellidoCensado").value;
    let edad = document.querySelector("#txtEdadCensado").value;
    let cedula = document.querySelector("#txtCedulaCensado").value;
    let departamento = document.querySelector("#selDepartamentosCenso").value;
    let ocupacion = document.querySelector("#selOcupaciones").value;
    if (validarIngresoAlgo(nombre) && validarIngresoAlgo(apellido) && validarIngresoAlgo(edad) && validarIngresoAlgo(cedula)) {
        if (departamento !== "Seleccione" && ocupacion !== "Seleccione") {
            if (!isNaN(edad)) {
                let edadNro = Number(edad);
                if (edadNro >= 0 && edadNro <= 130) {
                    //Hay que preguntar si cedula es !NAN y luego pasarlo a numero (igual que con la edad)
                    //me falta sacarle todos los guiones y cosas a la cédula - ESTO FALTA
                    //me falta lo del digito verificador que sea una cedula real - LO HIZO JULI
                    //después de validar todo hay que guardar:
                    //Para llamar a la funcion de abajo es importante pasarle la varieble cedula sin guiones ni puntos ni espacio para que se guarde así
                    miSistema.guardarCensadoXcensista(nombre, apellido, edadNro, cedula, departamento, ocupacion) //guardar ci sin guiones ni nada
                    ocultarDiv("divFormRegistro"); //debería quedar solo formulario log in vacío con el menú
                    mensaje = "Sus datos fueron guardados correctamente";
                    //Debería quedar solo el campo cedula y boton buscar con el menú arriba

                } else {
                    mensaje = "La edad tiene que ser entre 0 y 130"
                }

            } else {
                mensaje = "Debe ingresar un nro";
            }

        } else {
            mensaje= "Debe seleccionar una opción";
        }
        
    } else {
        mensaje = `Debe completar todos los campos`;
    }
    document.querySelector("#pMostrarFormulario").innerHTML = mensaje;
}

function guardarDatosCensadoXcensado() { //el censado guarda sus datos
    let mensaje = "";
    let nombre = document.querySelector("#txtNombreCensado").value;
    let apellido = document.querySelector("#txtApellidoCensado").value;
    let edad = document.querySelector("#txtEdadCensado").value;
    let cedula = document.querySelector("#txtCedulaCensado").value;
    let departamento = document.querySelector("#selDepartamentosCenso").value;
    let ocupacion = document.querySelector("#selOcupaciones").value;
    if (validarIngresoAlgo(nombre) && validarIngresoAlgo(apellido) && validarIngresoAlgo(edad) && validarIngresoAlgo(cedula)) { 
        if (departamento !== "Seleccione" && ocupacion !== "Seleccione") {
            if (!isNaN(edad)) {
                let edadNro = Number(edad);
                if (edadNro >= 0 && edadNro <= 130) {
                    //me falta sacarle todos los guiones y cosas a la cédula
                    //me falta lo del digito verificador
                    //después de validar todo hay que guardar:
                    miSistema.guardarCensadoXcensado(nombre, apellido, edadNro, cedula, departamento, ocupacion) //guardar cedula sin guiones ni nada
                    ocultarDiv("divFormRegistro"); //debería quedar solo formulario log in vacío con el menú
                    let censado = miSistema.buscarCensadoXcedula(cedula);//ci sin guiones ni nada
                    let censadoIdNum = Number(censado.censistaId)
                    let censista = miSistema.buscarCensistaXid(censadoIdNum)
                    mensaje = "Sus datos fueron guardados correctamente y lo va a visitar " + censista.nombre ; //Habría que ver si le ponemos un temporizador

                } else {
                    mensaje = "La edad tiene que ser entre 0 y 130"
                }

            } else {
                mensaje = "Debe ingresar un nro";
            }

        } else {
            mensaje= "Debe seleccionar una opción";
        }
        
    } else {
       mensaje = `Debe completar todos los campos`;
    }
    document.querySelector("#pMostrarFormulario").innerHTML = mensaje;
}

function validarCedulaCensista() { //Acá el censista ingresa la cédula
    let cedula = document.querySelector("#txtCedulaBuscarCensista").value;
    let mensaje = "";

    if (validarIngresoAlgo(cedula)) {     
            if (!isNaN(cedula)) {
                let cedulaNro = Number(cedula);
                    //me falta sacarle todos los guiones y cosas a la cédulaNro
                    //después usar la función digito verificador para ver si es real la ci con la variable CedulaNro sin guines ni nada - Usar un if si da true llamar a la funcion buscar
                    //para llamar a la funcion buscar censadoxcedula hay que pasarle la varieble ci como numero y sin nada
                let buscarCedula = miSistema.buscarCensadoXcedula(cedulaNro);//variable cedulaNro sin guines ni nada
                if (buscarCedula !== null) {
                    if (buscarCedula.validado !== true) {
                        mostrarDiv("divFormularioCenso");
                        document.getElementById("txtNombreCensado").value = buscarCedula.nombre;
                        document.getElementById("txtApellidoCensado").value = buscarCedula.apellido;
                        document.getElementById("txtEdadCensado").value = buscarCedula.edad;
                        document.getElementById("txtCedulaCensado").value = buscarCedula.cedula;
                        let cedulaForm = document.getElementById("txtCedulaCensado");
                        cedulaForm.disabled = true;
                        document.getElementById("selDepartamentosCenso").value = buscarCedula.departamento;
                        document.getElementById("selOcupaciones").value = buscarCedula.ocupacion;
                        botonValidarDatos();
                        document.querySelector("#btnValidarDatos").addEventListener("click",validarInfoCensado)


                       

                    } else {
                        mensaje = "Esta persona ya fue censada y validada";
                    }
                } else {
                    mensaje = "Complete los datos del censado"
                    mostrarDiv("divFormularioCenso");
                    botonFormularioCensista();
                    document.querySelector("#btnFormularioCensista").addEventListener("click",guardarDatosCensadoXcensista);

                }           

            } else {
                mensaje = "Debe ingresar un nro";
            }   
    } else {
        mensaje = `Debe completar todos los campos`;
    }
    document.querySelector("#pMostrarCedula").innerHTML = mensaje;


    //Buscar cédula del campo
    //Llamar a la función buscar censado x cedula
    //guardar funcion en variable, si variable = null mostrar form vacio, si es dif de null y censado.valudado  dif de true mostrar form con datos sino mostrar error ya validad
    //como muestro los datos en el form: en el query censado.(la propiedad)
    //tengo que bloquear el campo cédula
    
}

function validarCedula() { //El censado ingresa su cédula para si existe 
    let cedula = document.querySelector("#txtCedulaBuscar").value;
    let mensaje = "";

    if (validarIngresoAlgo(cedula)) {     
            if (!isNaN(cedula)) {
                let cedulaNro = Number(cedula);
                //HACER LO MISMO QUE EN EL BUSCAR CEDULA POR CENSISTA
                    //me falta sacarle todos los guiones y cosas a la cédula
                    //me falta lo del digito verificador
                    //para llamar a la funcion buscar censadoxcedula hay que pasarle la varieble ci como numero y sin nada
                let buscarCedula = miSistema.buscarCensadoXcedula(cedulaNro); //BUSCAR CEDULA PERO QUE NO TENGA GUIONES NI NADA
                if (buscarCedula !== null) {
                    if (buscarCedula.validado !== true) {
                        mostrarDiv("divFormularioCenso");
                        document.getElementById("txtNombreCensado").value = buscarCedula.nombre;
                        document.getElementById("txtApellidoCensado").value = buscarCedula.apellido;
                        document.getElementById("txtEdadCensado").value = buscarCedula.edad;
                        document.getElementById("txtCedulaCensado").value = buscarCedula.cedula;
                        let cedulaForm = document.getElementById("txtCedulaCensado");
                        cedulaForm.disabled = true;
                        document.getElementById("selDepartamentosCenso").value = buscarCedula.departamento;
                        document.getElementById("selOcupaciones").value = buscarCedula.ocupacion;
                        botonEditarFormularioCensado();
                        //llamar botón eleminar info censado
                        document.querySelector("#btnEditarFormularioCensado").addEventListener("click",editarInfoCensado);
                        //llamar funcion eliminar info 


                    } else {
                        mensaje = "Esta persona ya fue censada y validada";
                    }
                } else {
                    mensaje = "Complete sus datos"
                    mostrarDiv("divFormularioCenso");
                    botonFormularioCensado();
                    document.querySelector("#btnFormularioCensado").addEventListener("click",guardarDatosCensadoXcensado);

                }           

            } else {
                mensaje = "Debe ingresar un nro";
            }   
    } else {
        mensaje = `Debe completar todos los campos`;
    }
    document.querySelector("#pMostrarCedula").innerHTML = mensaje;


    //Buscar cédula del campo
    //Llamar a la función buscar censado x cedula
    //guardar funcion en variable, si variable = null mostrar form vacio, si es dif de null y censado.valudado  dif de true mostrar form con datos sino mostrar error ya validad
    //como muestro los datos en el form: en el query censado.(la propiedad)
    //tengo que bloquear el campo cédula
    
}

function validarInfoCensado() { //Acá el censista valida la info del censado
    let mensaje = "";
    let nombre = document.querySelector("#txtNombreCensado").value;
    let apellido = document.querySelector("#txtApellidoCensado").value;
    let edad = document.querySelector("#txtEdadCensado").value;
    let cedula = document.querySelector("#txtCedulaCensado").value;
    let departamento = document.querySelector("#selDepartamentosCenso").value;
    let ocupacion = document.querySelector("#selOcupaciones").value;
    let cedulaNro = Number(cedula);
    if (validarIngresoAlgo(nombre) && validarIngresoAlgo(apellido) && validarIngresoAlgo(edad)) { 
        if (departamento !== "Seleccione" && ocupacion !== "Seleccione") {
            if (!isNaN(edad)) {
                let edadNro = Number(edad);
                if (edadNro >= 0 && edadNro <= 130) {
                    let censado = miSistema.buscarCensadoXcedula(cedulaNro)

                        if (censado.apellido !== apellido){
                            censado.apellido = apellido;
                            mensaje = " El apellido se cambió correctamente";
                        }

                        if (censado.edad !== edadNro){
                            censado.edad = edadNro;
                            mensaje += " La edad se cambió correctamente"; 
                        }

                        if (censado.departamento !== departamento){
                            censado.departamento = departamento;
                            mensaje += " El departamento se cambió correctamente";
                        }

                        if (censado.ocupacion !== ocupacion){
                            censado.ocupacion = ocupacion;
                            mensaje += " La ocupacion se cambió correctamente";
                        }

                        if (censado.nombre !== nombre){
                            censado.nombre = nombre;
                            mensaje += " El nombre se cambió correctamente";
                        }

                        censado.validado = true;

                        mensaje += " La persona fue validada correctamente"; 

                        censado.censistaId = miSistema.usuarioLogueado.id;

                        //debería regresar a la home del censista (solo menú con el buscar cédula)


                } else {
                    mensaje = "La edad tiene que ser entre 0 y 130"
                }

            } else {
                mensaje = "Debe ingresar un nro";
            }

        } else {
            mensaje= "Debe seleccionar una opción";
        }
        
    } else {
        mensaje = `Debe completar todos los campos`;
    }
    document.querySelector("#pMostrarFormulario").innerHTML = mensaje; //Función temporizador que se muestre el mensaje 2 segundos


}

function editarInfoCensado() { //El censado puede editar su informacion
    let mensaje = "";
    let nombre = document.querySelector("#txtNombreCensado").value;
    let apellido = document.querySelector("#txtApellidoCensado").value;
    let edad = document.querySelector("#txtEdadCensado").value;
    let cedula = document.querySelector("#txtCedulaCensado").value;
    let departamento = document.querySelector("#selDepartamentosCenso").value;
    let ocupacion = document.querySelector("#selOcupaciones").value;
    let cedulaNro = Number(cedula);
    if (validarIngresoAlgo(nombre) && validarIngresoAlgo(apellido) && validarIngresoAlgo(edad) && validarIngresoAlgo(cedula)) {
        if (departamento !== "Seleccione" && ocupacion !== "Seleccione") {
            if (!isNaN(edad)) {
                let edadNro = Number(edad);
                if (edadNro >= 0 && edadNro <= 130) {
                    let censado = miSistema.buscarCensadoXcedula(cedulaNro)

                        if (censado.apellido !== apellido){
                            censado.apellido = apellido;
                            mensaje = " su apellido se cambió correctamente"
                        }

                        if (censado.edad !== edadNro){
                            censado.edad = edadNro;
                            mensaje += " su edad se cambió correctamente" 
                        }

                        if (censado.departamento !== departamento){
                            censado.departamento = departamento;
                            mensaje += " su departamento se cambió correctamente"
                        }

                        if (censado.ocupacion !== ocupacion){
                            censado.ocupacion = ocupacion;
                            mensaje += " su ocupacion se cambió correctamente"
                        }

                        if (censado.nombre !== nombre){
                            censado.nombre = nombre;
                            mensaje += "Su nombre se cambió correctamente,"
                        }


                } else {
                    mensaje = "La edad tiene que ser entre 0 y 130"
                }

            } else {
                mensaje = "Debe ingresar un nro";
            }

        } else {
           mensaje= "Debe seleccionar una opción";
        }
        
    } else {
        mensaje = `Debe completar todos los campos`;
    }
    mensaje = "Usted no hizo ningún cambio"; //Si la persona no modifica nada

    document.querySelector("#pMostrarFormulario").innerHTML = mensaje;
}

function estadisticasCantidadCensados() {
    let mensaje = "";
    let cantidadCensados = miSistema.cantidadCensados();

    mensaje = `Total de personas censadas: ${cantidadCensados}`;

    document.querySelector("#pMostrarEstadisticasCantidadCensados").innerHTML = mensaje
}


//capturar evento click registrar censista
document.querySelector("#Registrar").addEventListener("click",function(event){
    
    NavegarEntrePantallas("divFormRegistro")
})

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








/*function listadoPersonasPendientesXvalidar() {
    let mensaje = "";
    let censista = miSistema.usuarioLogueado;
    if (censista !== null) {
        mensaje = miSistema.obtenerListadoPersonasXvalidar(censista);
       document.querySelector("#personasAvalidarInterno").innerHTML = mensaje;
       let filas = document.querySelectorAll(".filaTablaXvalidar"); 
    for (laFila of filas) {
        laFila.addEventListener("click", clickeasteUnaFila);
    }
    } else {
        mensaje = `NO hay nadie logueado.`;
        document.querySelector("#personasAvalidarInterno").innerHTML = mensaje;
    }
    

     

}*/


//let ciCensado;

/*function clickeasteUnaFila() {
    //this es la fila clickeada de HTML (dom) donde se di'o click.
    ciCensado = this.getAttribute("censadoElegido");
    let censado = miSistema.buscarCensadoXcedula(Number(ciCensado));

    mostrarDiv("divFormularioCenso");
    ocultarDiv("divBtnCensista");
    document.getElementById("txtNombreCensado").value = censado.nombre;
    document.getElementById("txtApellidoCensado").value = censado.apellido;
    document.getElementById("txtEdadCensado").value = censado.edad;
    document.getElementById("txtCedulaCensado").value = censado.cedula;
    let cedulaForm = document.getElementById("txtCedulaCensado");
    cedulaForm.disabled = true;
    document.getElementById("selDepartamentosCenso").value = censado.departamento;
    document.getElementById("selOcupaciones").value = censado.ocupacion;
    botonValidarDatos();
    document.querySelector("#btnValidarDatos").addEventListener("click",validarDatosXcensista)



}*/

/*function validarDatosXcensista() {
    let censado = miSistema.buscarCensadoXcedula(Number(ciCensado));
    censado.validado = true;
    let mensaje = "Se validó el censado";
    document.querySelector("#pMostrarFormulario").innerHTML = mensaje;
}*/


function ocultarBotonInvitado() {
    ocultarDiv("menuNavegador");
    ocultarDiv("divLogin");
    ocultarDiv("divFormRegistro");
    mostrarDiv("divFormularioCenso");
    mostrarBoton();


}



function botonFormularioCensista() {
    let boton = `<input type="button" id="btnFormularioCensista" value="Guardar datos"/><br>`;
    document.querySelector("#divBtnCensista").innerHTML = boton;
}

function botonValidarDatos() {
    let boton = `<input type="button" id="btnValidarDatos" value="Validar datos"/><br>`;
    document.querySelector("#divBtnCensistaValidar").innerHTML = boton;
}

function botonFormularioCensado() {
    let boton = `<input type="button" id="btnFormularioCensado" value="Guardar pre-carga"/><br>`;
    document.querySelector("#divBtnCensado").innerHTML = boton;
}

function botonEditarFormularioCensado() {
    let boton = `<input type="button" id="btnEditarFormularioCensado" value="Editar información"/><br>`;
    document.querySelector("#divBtnCensado").innerHTML = boton;
}




function mostrarBoton() {
    if (miSistema.usuarioLogueado !== null) {
        botonFormularioCensista();
    }
    if (miSistema.usuarioLogueado === null) {
        botonFormularioCensado();
    }
    
}





function mostrarDiv(pDiv) {
    document.querySelector(`#${pDiv}`).style.display = "block";
}

function ocultarDiv(pDiv) {
    document.querySelector(`#${pDiv}`).style.display = "none";

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


}
