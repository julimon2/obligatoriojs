function eventos() {
    document.querySelector("#btnRegistrarCensista").addEventListener("click", registrarCensista);
    document.querySelector("#btnLogIn").addEventListener("click",logIn);
    document.querySelector("#btnPreFormCenso").addEventListener("click",ocultarBotonInvitado);
    document.querySelector("#btnBuscarCedula").addEventListener("click",validarCedula);
    document.querySelector("#btnBuscarCedulaCensista").addEventListener("click",validarCedulaCensista);
    document.querySelector("#mostrarInvitado").addEventListener("click",buscarInvitado);

    //document.querySelector("#btnPendientesValidar").addEventListener("click",listadoPersonasPendientesXvalidar);
    /*document.querySelector("#btnEjercicio123").addEventListener("click", ejercicio1Tabla2);
    document.querySelector("#btnEjercicio2").addEventListener("click", ejercicio2Guardar);
    document.querySelector("#btnEjercicio22").addEventListener("click", ejercicio2Tabla1);
    document.querySelector("#btnEjercicio24").addEventListener("click", ejercicio2buscar);
    document.querySelector("#btnEjercicio4").addEventListener("click", ejercicio4Guardar);
    document.querySelector("#btnEjercicio41").addEventListener("click", ejercicio4Tabla1);
    document.querySelector("#btnEjercicio42").addEventListener("click", ejercicio4mostrar);
    document.querySelector("#btnEjercicio5").addEventListener("click", ejercicio5Guardar);
    document.querySelector("#btnEjercicio52").addEventListener("click", ejercicio5test);
    document.querySelector("#btnMostrar").addEventListener("click", mostrarVentasUI);
    document.querySelector("#btnTestMostrarTotalVentas").addEventListener("click", testMostrarTotalVentasUI);
    document.querySelector("#btnMostrarTablaVentasXtipo").addEventListener("click", mostrarTablaVentasXtipoUI);*/
}
eventos()

ocultarDiv("divFormularioCenso");
ocultarDiv("campoCedulaCensista");


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
                ocultarDiv("divFormRegistro") 
                ocultarDiv("btnPreFormCenso")
                mostrarDiv("divLogin"); // no es necesario
                
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
            if (miSistema.login(nombreUsuario,contraseña)) { //tengo que hacer que si son el mismo usuario en mayusucla me lea la contraseña igual
            mensaje = `Inició sesión correctamente`;
            //acá se tienen que mostrar las cosas, osea que pueda hacer click en el menú y aparezca la info
            mostrarDiv("campoCedulaCensista"); 
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
    
}

function guardarDatosCensadoXcensista() {
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
                    //me falta sacarle todos los guiones y cosas a la cédula - ESTO FALTA
                    //me falta lo del digito verificador - LO HIZO JULI
                    //me falta una función de existeCédula - ANTES DE GUARDAR HAY QUE VERIFICAR QUE NO EXISTA CEDULA YA HICE UNA FUNCION DE ESO
                    //después de validar todo hay que guardar:
                    //Para llamar a la funcion de abajo es importante pasarle la varieble cedula sin guiones ni puntos ni espacio para que se guarde así
                    miSistema.guardarCensadoXcensista(nombre, apellido, edadNro, cedula, departamento, ocupacion)
                    ocultarDiv("divFormRegistro"); //debería quedar solo formulario log in vacío con el menú
                    mensaje = "Sus datos fueron guardados correctamente";

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

function guardarDatosCensadoXcensado() {
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
                    miSistema.guardarCensadoXcensado(nombre, apellido, edadNro, cedula, departamento, ocupacion)
                    ocultarDiv("divFormRegistro"); //debería quedar solo formulario log in vacío con el menú
                    let censado = miSistema.buscarCensadoXcedula(cedula);
                    let censadoIdNum = Number(censado.censistaId)
                    let censista = miSistema.buscarCensistaXid(censadoIdNum)
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
                        mostrarDiv("divFormularioCenso");
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
                        document.querySelector("#btnEditarFormularioCensado").addEventListener("click",editarInfoCensado);

                        //Falta botón de eliminar info con la función

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



}

function validarDatosXcensista() {
    let censado = miSistema.buscarCensadoXcedula(Number(ciCensado));
    censado.validado = true;
    let mensaje = "Se validó el censado";
    document.querySelector("#pMostrarFormulario").innerHTML = mensaje;
}


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


function ejercicio1Tabla() {
    let mensaje = miSistema.obtenerTablaPersonas();
    document.querySelector("#pMostrar1").innerHTML = mensaje;
}

function ejercicio1Tabla2() {
    let mensaje = miSistema.obtenerTablaPersonas18();
    document.querySelector("#pMostrar1").innerHTML = mensaje;
}

function ejercicio2Guardar() {
    let mensaje = "";
    let nombre = document.querySelector("#txtTexto2").value;
    let año = document.querySelector("#txtTexto22").value;
    let genero = document.querySelector("#generoPelicula").value;
    let cantidadVotantes = document.querySelector("#txtTexto23").value;
    let totalPuntos = document.querySelector("#txtTexto24").value;
    if (validarIngresoAlgo(nombre) && validarIngresoAlgo(año) && validarIngresoAlgo(genero) && validarIngresoAlgo(cantidadVotantes) && validarIngresoAlgo(totalPuntos)) {
        if (validarNroPositivo(año) && validarNroPositivo(cantidadVotantes)&& validarNroPositivo(totalPuntos)) {
            let añoNro = Number(año);
            let cantidadVotNro = Number(cantidadVotantes);
            let totalPuntosNro = Number(totalPuntos);
            if (!miSistema.existe(nombre)) {
                miSistema.guardarPelicula(nombre,añoNro,genero,cantidadVotNro,totalPuntosNro);

               mensaje = `se guardó la pelicula`;
            } else {
                mensaje = `la pelicula existe`
            /**/}

            
        } else {
            mensaje = `debe ingresar un nro en año.`;
        }
    } else {
        mensaje = `ingrese cantidad y selecione tipo`;
    }
    document.querySelector("#pMostrar2").innerHTML = mensaje;
}

function ejercicio2Tabla1() {
    let mensaje = miSistema.obtenerTablaPromedio();
    document.querySelector("#pMostrar2").innerHTML = mensaje;
}

function ejercicio2buscar() {
    let mensaje = "";
    let nombre = document.querySelector("#txtTexto25").value;
    if (validarIngresoAlgo(nombre)) {
        if (miSistema.existe(nombre)) {
            mensaje = miSistema.mostrarPelicula(nombre);
        } else {
            mensaje = "el objeto no existe"
        }
    
    } else {
        mensaje = `debe ingresar algo`;
    }
    document.querySelector("#pMostrar2").innerHTML = mensaje;
}

function ejercicio4Tabla1() {
    let mensaje = miSistema.obtenerTablaVentas();
    document.querySelector("#pMostrar4").innerHTML = mensaje;

}

function ejercicio4mostrar() {
    let mensaje = "";
    let modelo = document.querySelector("#txtTexto43").value;
    if (validarIngresoAlgo(modelo)) {
         
        mensaje = `La cantidad vendida del modelo: ${modelo} es ${miSistema.obtenerCantidadesXModelo(modelo)} `


    } else {
        mensaje = `complete los campos`;
    }
    document.querySelector("#pMostrar4").innerHTML = mensaje;
}

ocultarDiv("prueba2");








function buscarInvitado() {
    console.log("mostrar invi")
    NavegarEntrePantallas("IngreseCedula")
}
function mostrarInvitado() {
    console.log("mostrar invi")
    NavegarEntrePantallas("pantallaInvitado")
}
function registrarCensista() {
    let mensaje = "";
    let nombre = document.querySelector("#txtNombreCensista").value;
    let nombreUsuario = document.querySelector("#txtNombreDeUsuario").value;
    let contraseña = document.querySelector("#txtContraseña").value;
    if (validarIngresoAlgo(nombre) && validarIngresoAlgo(nombreUsuario) && validarIngresoAlgo(contraseña)) {
        if (!miSistema.existeNombreUsuario(nombreUsuario)) {
            if (miSistema.validarContraseña(contraseña)) {

                miSistema.guardarCensista(nombre,nombreUsuario,contraseña); //agregar idúnico
                

                mensaje = "Se registró correctamente"; //se puede eliminar
                ocultarDiv("divFormRegistro") //falta ver qué hacemos después de cargarlo
                mostrarDiv("divLogin");// eliminar form registro y mostrar form log in, dejar siempre arriba el menú
                

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
        if (miSistema.login(nombreUsuario,contraseña)) {
            mensaje = `Inició sesión correctamente`;
            NavegarEntrePantallas("pantallaCensista")
            document.querySelector("#Salir").addEventListener("click",function(){
                miSistema.logout();
                NavegarEntrePantallas("divLogin")
            })
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


function cargarComboDepartamentos() {
    let lasOpciones = `<option value="Seleccione"> Seleccione departamento</option>`;
    for (let i = 0; i < departamentos.length; i++) {
        let departamentoX = departamentos[i]; 
        lasOpciones += `<option value="${departamentoX}"> ${departamentoX} </option>`;
    }
    document.querySelector("#selDepartamentosCenso").innerHTML = lasOpciones;
}
//cargarComboDepartamentos()

function mostrarDiv(pDiv) {
    document.querySelector(`#${pDiv}`).style.display = "block";
}

function ocultarDiv(pDiv) {
    //document.querySelector(`#${pDiv}`).style.display = "none";

}



function ejercicio1Tabla() {
    let mensaje = miSistema.obtenerTablaPersonas();
    document.querySelector("#pMostrar1").innerHTML = mensaje;
}

function ejercicio1Tabla2() {
    let mensaje = miSistema.obtenerTablaPersonas18();
    document.querySelector("#pMostrar1").innerHTML = mensaje;
}

function cargarComboGeneros() {
    let lasOpciones = `<option value=""> Seleccione Tipo </option>`;
    for (let i = 0; i < generos.length; i++) {
        let generoX = generos[i]; //es un objeto de tipo "tipo"
        //los combos y otros elementos se cargar en su value con el indentificador único.
        /*if(i === 0){

            lasOpciones += `<option value="${tipoX.tipo}" selected> ${tipoX.nombre} - ${tipoX.precio} </option>`;
        }else{*/
        lasOpciones += `<option value="${generoX}"> ${generoX} </option>`;


        // console.log(lasOpciones);
    }
    document.querySelector("#generoPelicula").innerHTML = lasOpciones;
}

//cargarComboGeneros();

function ejercicio2Guardar() {
    let mensaje = "";
    let nombre = document.querySelector("#txtTexto2").value;
    let año = document.querySelector("#txtTexto22").value;
    let genero = document.querySelector("#generoPelicula").value;
    let cantidadVotantes = document.querySelector("#txtTexto23").value;
    let totalPuntos = document.querySelector("#txtTexto24").value;
    if (validarIngresoAlgo(nombre) && validarIngresoAlgo(año) && validarIngresoAlgo(genero) && validarIngresoAlgo(cantidadVotantes) && validarIngresoAlgo(totalPuntos)) {
        if (validarNroPositivo(año) && validarNroPositivo(cantidadVotantes)&& validarNroPositivo(totalPuntos)) {
            let añoNro = Number(año);
            let cantidadVotNro = Number(cantidadVotantes);
            let totalPuntosNro = Number(totalPuntos);
            if (!miSistema.existe(nombre)) {
                miSistema.guardarPelicula(nombre,añoNro,genero,cantidadVotNro,totalPuntosNro);

               mensaje = `se guardó la pelicula`;
            } else {
                mensaje = `la pelicula existe`
            /**/}

            
        } else {
            mensaje = `debe ingresar un nro en año.`;
        }
    } else {
        mensaje = `ingrese cantidad y selecione tipo`;
    }
    document.querySelector("#pMostrar2").innerHTML = mensaje;
}

function ejercicio2Tabla1() {
    let mensaje = miSistema.obtenerTablaPromedio();
    document.querySelector("#pMostrar2").innerHTML = mensaje;
}

function ejercicio2buscar() {
    let mensaje = "";
    let nombre = document.querySelector("#txtTexto25").value;
    if (validarIngresoAlgo(nombre)) {
        if (miSistema.existe(nombre)) {
            mensaje = miSistema.mostrarPelicula(nombre);
        } else {
            mensaje = "el objeto no existe"
        }
    
    } else {
        mensaje = `debe ingresar algo`;
    }
    document.querySelector("#pMostrar2").innerHTML = mensaje;
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


