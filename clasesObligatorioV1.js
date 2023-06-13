class Censista{
    static idUsuarios = 0;
    constructor(){
       this.id = Censista.idUsuarios++;
       this.nombre;
       this.nombreUsuario;
       this.contraseña;
    }        
}

class Censado{
    static idCensados = 0;
    constructor(){
       this.id = Censado.idCensados++;
       this.nombre;
       this.apellido;
       this.edad;
       this.cedula;
       this.departamento;
       this.ocupacion;
       this.censistaId;
       this.validado = null;
    }        
}

