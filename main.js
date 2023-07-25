/* // Creacion de clase Alumno


//Bienvenida
let nombre_user = prompt("Por favor ingrese su nombre:")

//Funcion ingreso nombre verSificado
//La hago aca y no abajo para así tambien la agrego al alert del comienzo
function ingreso_nombre_verificado(nombre){
    while(nombre == null || nombre == ""){nombre = prompt("--ERROR--\nPor favor ingrese un nombre:")}
    return nombre
}

alert(`Bienvenido ${ingreso_nombre_verificado(nombre_user)}`)

// Definicion de las Variables
let nombreAlumno
let ingresoPrograma 
let notaAlumno
let sumaNota 
let promedioNota
let contador 
let estadoPrograma = true

//Definicion de Array
const listadoAlumnos = []

//Defincion de las funciones
function calcularPromedio(suma_total,cantidad){
    return suma_total/cantidad
}

function ingresoBucleVerificado(){
    ingresoPrograma = prompt("Ingrese 1 para ingresar una nota o 9 para terminar")
    while(ingresoPrograma!= 1 && ingresoPrograma!= 9 ){ingresoPrograma = prompt("--ERROR--\nIngrese 1 para ingresar una nota o 9 para terminar")}
}

function verificarPrimeraNota(){
    while(ingresoPrograma!=1){
        ingresoPrograma= prompt("Ingrese 1 para por lo menos ingresar 1 nota")
    }
}

function ingresoNotaVerificado(){
    notaAlumno = Number(prompt(`Ingrese la nota numero ${contador} de ${nombreAlumno}`))
    while (isNaN(notaAlumno) || (notaAlumno<=0 || notaAlumno>10)){
        if (isNaN(notaAlumno)){ notaAlumno =  Number(prompt(`--ERROR-- NO ES UN NUMERO\nIngrese la nota numero ${contador} de ${nombreAlumno}`))}
        else{notaAlumno =  Number(prompt(`--ERROR-- FUERA DE RANGO\nIngrese la nota numero ${contador} de ${nombreAlumno}`))}
    }
}

function seguirPrograma(){
    let estado
    estado= prompt("¿Desea ingresar un nuevo alumno? (Si/No)")
    while (estado.toLowerCase() != "no" && estado.toLowerCase() != "si"){estado = prompt("--ERROR--\t¿Desea ingresar un nuevo alumno? (Si/No)")}
    if (estado.toLowerCase() == "no"){estadoPrograma= false}
}

function mostrarAlumnos(){
    for (const alumnoIndividual of listadoAlumnos) {
        if (alumnoIndividual.aprobado){
            alert(`El alumno: ${alumnoIndividual.nombre} APROBO con promedio ${alumnoIndividual.promedio} :)`)
        }else{ alert(`El alumno: ${alumnoIndividual.nombre} DESAPROBO con promedio ${alumnoIndividual.promedio} :(`)}
    }
}

function ordenarLista(){
    let forma= Number(prompt("Seleccione como desea ordenas la lista por promedio de menor a mayor (1) o de mayor a menor (2) (1/2)"))

    while (forma != 1 && forma !=2){
        forma= prompt("Seleccione una opcion para organizar los datos (1/2)")
    }

    if (forma == 1){
        listadoAlumnos.sort((alumnoA, alumnoB)=> alumnoA.promedio - alumnoB.promedio)
    }
    else( listadoAlumnos.sort((alumnoA, alumnoB)=> alumnoB.promedio - alumnoA.promedio))
}

function cargarNotas(){
    for (let i= 0; i <listadoAlumnos.length; i++) {
        listadoAlumnos[i].cargarNotaSistema()
    }
    alert("Notas Cargadas correctamente")
}


//Comienzo del Bucle general

while (estadoPrograma) {
    nombreAlumno = prompt("Ingrese el nombre del alumno")
    nombreAlumno= ingreso_nombre_verificado(nombreAlumno)
    ingresoBucleVerificado()
    contador = 0
    sumaNota = 0
    verificarPrimeraNota()
    //Empieza el bucle de cada alumno
    while (ingresoPrograma!= 9){
        contador ++
        ingresoNotaVerificado()
        sumaNota = sumaNota + notaAlumno
        ingresoBucleVerificado()
    }

    if (contador != 0){
        promedioNota = calcularPromedio(sumaNota,contador)
        alumno = new Alumno(nombreAlumno,promedioNota,promedioNota >= 6)
    }
    //Array donde se guardan los distintos alumnos
    listadoAlumnos.push(alumno)

    seguirPrograma()
}

//Ordenar la lista segun promedio
ordenarLista()


// Ver si aprobo o no cada alumno
mostrarAlumnos()

cargarNotas()

console.log(listadoAlumnos) */


/* Clases */
class Alumno{
    constructor(nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
        this.promedio = 0
        this.aprobado = ""
        this.notas = []
        
    }

    subirNotas(nota){
        this.notas.push(nota)
    }

    calcularPromedio(){
        let sumaNotas = 0
        for (const nota of this.notas) {
            sumaNotas += nota
        }
        this.promedio = sumaNotas/this.notas.length
    }

}
class GrupoDeClase{
    constructor(nombre){
        this.nombre = nombre
        this.alumnos = []
    }

    contarAlumnos(){
        return this.alumnos.length
    }
    añadirAlumno(nuevoAlumno){
        this.alumnos.push(nuevoAlumno)
    }
}

/* Variables y Arrays */


let nombreDeLasClases= []
let claseSeleccionada = ""

/* Botones */
let botonNuevaClase = document.getElementById("botonNuevaClase")
let formularioClaseBoton = document.getElementById("formularioClaseBoton")
let botonAlumno = document.getElementById("botonAlumno")

/* Funciones */

function ValidarInputClase(valor){
    if (valor == null || valor == ""){alert("Por favor ingrese un nombre de clase")}
    else{alert(`Se ha agregado una nueva clase llamada: ${valor}`)}
}


/* Eventos */

botonNuevaClase.addEventListener("click",()=>{
    document.getElementById("contenedorInicio").style.display= "none"
    document.getElementById("contenedorForm").style.display= "flex"
})

formularioClaseBoton.addEventListener("click",(event)=>{
    event.preventDefault()
    let claseInput = document.getElementById("formuladrioClaseInput")
    nombreDeLaClase= claseInput.value
    claseSeleccionada = nombreDeLaClase
    ValidarInputClase(nombreDeLaClase)

    nombreDeLasClases.push(nombreDeLaClase)
    let nuevaClase = new GrupoDeClase(nombreDeLaClase)
    let nuevaClaseJSON = JSON.stringify(nuevaClase)
    localStorage.setItem(nombreDeLaClase,nuevaClaseJSON)
    document.getElementById("contenedorForm").style.display= "none"
    document.getElementById("contenedorAlumno").style.display= "flex"

    localStorage.setItem("Nombre de Clases", nombreDeLaClase)
    alert(nombreDeLaClase)
})


botonAlumno.addEventListener("click",(event)=>{
    event.preventDefault()
    

    let clase_almacenada = JSON.parse(localStorage.getItem(claseSeleccionada))

    


    let nombre = document.getElementById("nombreInput").value
    let apellido = document.getElementById("apellidoInput").value
    let nuevoAlumno = new Alumno(nombre, apellido)

    let nota1 = parseInt(document.getElementById("nota1Input").value)
    let nota2 = parseInt(document.getElementById("nota2Input").value)
    let nota3 = parseInt(document.getElementById("nota3Input").value)
    let nota4 = parseInt(document.getElementById("nota4Input").value)

    nuevoAlumno.subirNotas(nota1)
    nuevoAlumno.subirNotas(nota2)
    nuevoAlumno.subirNotas(nota3)
    nuevoAlumno.subirNotas(nota4)
    nuevoAlumno.calcularPromedio()

    clase_almacenada.añadirAlumno(nuevoAlumno)

    let clase_almacenadaJSON = JSON.stringify(clase_almacenada)
    localStorage.setItem(nombreDeLaClase,clase_almacenadaJSON)


})