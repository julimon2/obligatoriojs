function eventos() {
  document.querySelector("#btnRegistrarCensista").addEventListener("click", registrarCensista);
  document.querySelector("#btnLogIn").addEventListener("click",logIn);
  document.querySelector("#btnBuscarCedula").addEventListener("click",validarCedula);
  document.querySelector("#btnBuscarCedulaCensista").addEventListener("click",validarCedulaCensista);
  document.querySelector("#mostrarInvitado").addEventListener("click",buscarInvitado);
  document.querySelector("#Salir").addEventListener("click", Salir);
  document.querySelector("#Registrar").addEventListener("click", irARegistro);
}
eventos();

function Salir(){
  miSistema.logout();
  NavegarEntrePantallas("divLogin");
}

function cargarComboDepartamentos() {
    let lasOpciones = `<option value="Seleccione"> Seleccione departamento</option>`;
    for (let i = 0; i < departamentos.length; i++) {
        let departamentoX = departamentos[i]; 
        lasOpciones += `<option value="${departamentoX}"> ${departamentoX} </option>`;
    }
    document.querySelector("#selDepartamentosCenso").innerHTML = lasOpciones;
}
cargarComboDepartamentos()

function registrarCensista() {
    let mensaje = "";
    let nombre = document.querySelector("#txtNombreCensista").value;
    let nombreUsuario = document.querySelector("#txtNombreDeUsuario").value;
    let contraseña = document.querySelector("#txtContraseña").value;
    if (validarIngresoAlgo(nombre) && validarIngresoAlgo(nombreUsuario) && validarIngresoAlgo(contraseña)) {
        if (!miSistema.existeNombreUsuario(nombreUsuario)) {
            if (miSistema.validarContraseña(contraseña)) {
                //Antes de guardar el nombre de usuario hay que pasarlo a minuscula y guardarlo en una variable y cuando se llama la funcion guardarcensista colocarle la varieble con el nom usuario en minuscula

                miSistema.guardarCensista(nombre,nombreUsuario,contraseña)
                mensaje = "Se registró correctamente, ingrese sesión"; 
                NavegarEntrePantallas("pantallaCensista");
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

function guardarDatosCensado() {
    let mensaje = "";
    let nombre = document.querySelector("#txtNombreCensado").value;
    let apellido = document.querySelector("#txtApellidoCensado").value;
    let edad = document.querySelector("#txtEdadCensado").value;
    let cedula = document.querySelector("#txtCedulaCensado").value;
    let departamento = document.querySelector("#selDepartamentosCenso").value;
    let ocupacion = document.querySelector("#selOcupaciones").value;
    if (validarIngresoAlgo(cedula)) {
        //if (departamento !== "Seleccione" && ocupacion !== "Seleccione") {
            if (!isNaN(edad)) {
                let edadNro = Number(edad);
                if (edadNro >= 0 && edadNro <= 130) {
                    //me falta sacarle todos los guiones y cosas a la cédula
                    //me falta lo del digito verificador
                    //me falta una función de existeCédula
                    //después de validar todo hay que guardar:
                    if (miSistema.usuarioLogueado != null) {
                      miSistema.guardarCensadoXcensista(nombre, apellido, edadNro, cedula, departamento, ocupacion);
                    } else {
                      miSistema.guardarCensadoXcensado(nombre, apellido, edadNro, cedula, departamento, ocupacion);
                    }
                    ocultarDiv("divFormRegistro"); //debería quedar solo formulario log in vacío con el menú
                    let censado = miSistema.buscarCensadoXcedula(cedula);
                    let censadoIdNum = Number(censado.censistaId);
                    let censista = miSistema.buscarCensistaXid(censadoIdNum);
                    mensaje = "Sus datos fueron guardados correctamente y lo va a visitar " + censista.nombre ;
                } else {
                    mensaje = "La edad tiene que ser entre 0 y 130"
                }
            } else {
                mensaje = "Debe ingresar un nro";
            }

       // } else {
        //    mensaje= "Debe seleccionar una opción";
        //}
        
    } else {
       mensaje = `Debe completar el campo cédula`;
    }
    document.querySelector("#pMostrarFormulario").innerHTML = mensaje;
}

function validarCedulaCensista() {
    let cedula = document.querySelector("#txtCedulaBuscarCensista").value;
    let mensaje = "";
    console.log(cedula);
    if (validarIngresoAlgo(cedula)) {    
        console.log("fue validado") 
            if (!isNaN(cedula)) {
                console.log("valido cedula") 
                let cedulaNro = Number(cedula);
                    //me falta sacarle todos los guiones y cosas a la cédula
                    //me falta lo del digito verificador
                    //para llamar a la funcion buscar censadoxcedula hay que pasarle la varieble ci como numero y sin nada
                let buscarCedula = miSistema.buscarCensadoXcedula(cedulaNro);
                console.log(buscarCedula);
                if (buscarCedula !== null) {
                    if (buscarCedula.validado !== true) {
                        NavegarEntrePantallas("pantallaFormularioCenso");
                        document.getElementById("txtNombreCensado").value = buscarCedula.nombre;
                        console.log("txt nombre censado con valor " + buscarCedula.nombre);
                        console.log(document.getElementById("txtNombreCensado").value)
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
                    NavegarEntrePantallas("pantallaFormularioCenso");
                    botonFormularioCensista();
                    document.querySelector("#btnFormularioCensista").addEventListener("click",guardarDatosCensado);

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

function validarCedula() {
    let cedula = document.querySelector("#txtCedulaBuscar").value;
    let mensaje = "";

    if (validarIngresoAlgo(cedula)) {     
            if (!isNaN(cedula)) {
                let cedulaNro = Number(cedula);
                    //me falta sacarle todos los guiones y cosas a la cédula
                    //me falta lo del digito verificador
                    //para llamar a la funcion buscar censadoxcedula hay que pasarle la varieble ci como numero y sin nada
                let buscarCedula = miSistema.buscarCensadoXcedula(cedulaNro);
                if (buscarCedula !== null) {
                    if (buscarCedula.validado !== true) {
                        NavegarEntrePantallas("pantallaFormularioCenso");
                        document.getElementById("txtNombreCensado").value = buscarCedula.nombre;
                        document.getElementById("txtApellidoCensado").value = buscarCedula.apellido;
                        document.getElementById("txtEdadCensado").value = buscarCedula.edad;
                        document.getElementById("txtCedulaCensado").value = buscarCedula.cedula;
                        let cedulaForm = document.getElementById("txtCedulaCensado");
                        cedulaForm.disabled = true;
                        document.getElementById("selDepartamentosCenso").value = buscarCedula.departamento;
                        document.getElementById("selOcupaciones").value = buscarCedula.ocupacion;
                        botonEditarFormularioCensado();
                        document.querySelector("#btnEditarFormularioCensado").addEventListener("click",editarInfoCensado);
                        //Falta botón de eliminar info con la función
                    } else {
                        mensaje = "Esta persona ya fue censada y validada";
                    }
                } else {
                    mensaje = "Complete sus datos"
                    NavegarEntrePantallas("pantallaFormularioCenso");
                    botonFormularioCensado();
                    document.querySelector("#btnFormularioCensado").addEventListener("click",guardarDatosCensado);

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

function validarInfoCensado() {
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

function editarInfoCensado() {
    let mensaje = "";
    let nombre = document.querySelector("#txtNombreCensado").value;
    let apellido = document.querySelector("#txtApellidoCensado").value;
    let edad = document.querySelector("#txtEdadCensado").value;
    let cedula = document.querySelector("#txtCedulaCensado").value;
    let departamento = document.querySelector("#selDepartamentosCenso").value;
    let ocupacion = document.querySelector("#selOcupaciones").value;
    let cedulaNro = Number(cedula);
    //if (validarIngresoAlgo(nombre) && validarIngresoAlgo(apellido) && validarIngresoAlgo(edad) && validarIngresoAlgo(cedula)) {
        //if (departamento !== "Seleccione" && ocupacion !== "Seleccione") {
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

        //} else {
        //    mensaje= "Debe seleccionar una opción";
        //}
        
    //} else {
        //mensaje = `Debe completar todos los campos`;
    //}
    console.log(mensaje)
    document.querySelector("#pMostrarFormulario").innerHTML = mensaje;
}

function listadoPersonasPendientesXvalidar() {
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
}

let ciCensado;

function clickeasteUnaFila() {
    //this es la fila clickeada de HTML (dom) donde se di'o click.
    ciCensado = this.getAttribute("censadoElegido");
    let censado = miSistema.buscarCensadoXcedula(Number(ciCensado));

    NavegarEntrePantallas("pantallaFormularioCenso");
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

}

function validarDatosXcensista() {
    let censado = miSistema.buscarCensadoXcedula(Number(ciCensado));
    censado.validado = true;
    let mensaje = "Se validó el censado";
    document.querySelector("#pMostrarFormulario").innerHTML = mensaje;
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

function ocultarDiv(pDiv) {
    document.querySelector(`#${pDiv}`).style.display = "none";
}

function buscarInvitado() {
    console.log("mostrar invi")
    NavegarEntrePantallas("pantallaIngreseCedula")
}
function mostrarInvitado() {
    console.log("mostrar invi")
    NavegarEntrePantallas("pantallaFormularioCenso")
}

function logIn() {
    let mensaje = "";
    let nombreUsuario = document.querySelector("#txtNombreUsuarioLogIn").value;
    let contraseña = document.querySelector("#txtContraseñaLogIn").value;
    if (validarIngresoAlgo(nombreUsuario) && validarIngresoAlgo(contraseña)) {
        if (miSistema.login(nombreUsuario,contraseña)) {
            mensaje = `Inició sesión correctamente`;
            NavegarEntrePantallas("pantallaCensista");
            //acá se tienen que mostrar las cosas, osea que pueda hacer click en el menú y aparezca la info
        } else {
            mensaje = `Usuario o contraseña incorrecta`;
        }
    } else {
        mensaje = `Debe completar todos los campos`;
    }
    document.querySelector("#pMostrarLogInCensista").innerHTML = mensaje;
    
}

function guardarDatosCensado() {
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
                    //me falta una función de existeCédula
                    //después de validar todo hay que
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

//capturar evento click registrar censista
function irARegistro(event){
    NavegarEntrePantallas("divFormRegistro");
}

//la funcion navegar entre pantallas
function NavegarEntrePantallas(pPantalla){
    console.log(pPantalla);
    let array=[
      "divFormRegistro",
      "divLogin",
      "pantallaCensista",
      "pantallaIngreseCedula",
      "pantallaFormularioCenso"
    ]
    for (let i=0; i<array.length; i++){
        if (array[i]==pPantalla){
            document.querySelector("#"+array[i]).style.display="block";
        }else {
            document.querySelector("#"+array[i]).style.display="none";
        }
    }
    if (pPantalla != "divLogin"){
      document.getElementById("Salir").style.display="block";
    } else {
      document.getElementById("Salir").style.display="none";
    }
}
NavegarEntrePantallas("divLogin")


