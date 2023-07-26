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

    verificarAprobado(){
        if (this.promedio >= 6){this.aprobado = true}
        else{this.aprobado = false}
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

    agregarAlumno(alumno){
        this.alumnos.push(alumno)
    }
    
}

/* Variables y Arrays */


let nombreDeLasClases= []
let claseSeleccionada = ""

/* Botones */
let botonNuevaClase = document.getElementById("botonNuevaClase")
let formularioClaseBoton = document.getElementById("formularioClaseBoton")
let botonAlumno = document.getElementById("botonAlumno")
let botonVolverInicio = document.getElementById("botonVolverInicio")
let botonOtroAlumno = document.getElementById("botonOtroAlumno") 

let formularioAlumno = document.getElementById("formularioAlumno")
let formularioClase = document.getElementById("formularioClase")
let formularioEditarClase = document.getElementById("formularioEditarClase")
let botonEditarClase= document.getElementById("botonEditarClase")
let botonBuscarClase= document.getElementById("botonBuscarClase")



/* Secciones del index */
let contenedorInicio = document.getElementById("contenedorInicio")
let contenedorForm = document.getElementById("contenedorForm")
let contenedorAlumno =  document.getElementById("contenedorAlumno")
let contenedorFinal =  document.getElementById("contenedorFinal")
let contenedorEditar = document.getElementById("contenedorEditar")

/* Funciones */

function reconstruirClases(clase){
    let nombre = clase.nombre
    let alumnos = [] 
    console.log(clase.alumnos)

    claseReconstruida = new GrupoDeClase(nombre)
    for (const alumno of clase.alumnos) {
        let alumnoReconstruido = new Alumno(alumno.nombre, alumno.apellido)
        alumnoReconstruido.promedio = alumno.promedio
        alumnoReconstruido.aprobado = alumno.aprobado
        alumnoReconstruido.notas = alumno.notas
        alumnos.push(alumnoReconstruido)
    }
    claseReconstruida.alumnos = alumnos
    return claseReconstruida
}

function validarInputTexto(valor){
    let val= true
    if (valor == null || valor.trim() == "" ){
        alert("Por favor ingrese texto")
        val= false}
    return val
}

function validarInputNotas(nota) {
    let val = true
    if (nota > 10 || nota <= 0 || isNaN(nota) || nota === "") {
    alert("Ingrese las notas en un rango de 0 - 10")
    console.log(nota)
    val = false
    }
    return val
}

function guardarNombreDeClases(nombre){
    let grupos = localStorage.getItem("ArraydeClases")
    if (grupos == null || grupos == ""){
        nombreDeLasClases.push(nombre)
        localStorage.setItem("ArraydeClases", JSON.stringify(nombreDeLasClases))}
    else{
        grupos = JSON.parse(grupos)
        grupos.push(nombre)
        alert(grupos)
        localStorage.setItem("ArraydeClases", JSON.stringify(grupos))
    }
}



/* Eventos */

botonNuevaClase.addEventListener("click",()=>{
    contenedorInicio.style.display= "none"
    contenedorForm.style.display= "flex"
})
/* Guarda el nombre de la Clase */
formularioClaseBoton.addEventListener("click",(event)=>{

    event.preventDefault()
    let claseInput = document.getElementById("formuladrioClaseInput")
    claseSeleccionada= claseInput.value.toLocaleLowerCase()
    if  (validarInputTexto(claseSeleccionada)){

        let nuevaClase = new GrupoDeClase(claseSeleccionada)
        let nuevaClaseJSON = JSON.stringify(nuevaClase)
        localStorage.setItem(claseSeleccionada,nuevaClaseJSON)
        contenedorForm.style.display= "none"
        contenedorAlumno.style.display= "flex"

        guardarNombreDeClases(claseSeleccionada)
        alert(claseSeleccionada)
        formularioClase.reset()
    }
    
    
})

/* Se guarda un alumno */
botonAlumno.addEventListener("click",(event)=>{
    event.preventDefault()
    
    let claseJSON = (localStorage.getItem(claseSeleccionada))
    let claseAlmacenada = JSON.parse(claseJSON)
    let claseReconstruida = reconstruirClases(claseAlmacenada)
    let nombre = document.getElementById("nombreInput").value
    let apellido = document.getElementById("apellidoInput").value
    let nota1 = parseInt(document.getElementById("nota1Input").value)
    let nota2 = parseInt(document.getElementById("nota2Input").value)
    let nota3 = parseInt(document.getElementById("nota3Input").value)
    let nota4 = parseInt(document.getElementById("nota4Input").value)

    if (validarInputNotas(nota1) && validarInputNotas(nota2) && validarInputNotas(nota3) && validarInputNotas(nota4) && validarInputTexto(nombre)&& validarInputTexto(apellido)){
        let nuevoAlumno = new Alumno(nombre, apellido)
        nuevoAlumno.subirNotas(nota1)
        nuevoAlumno.subirNotas(nota2)
        nuevoAlumno.subirNotas(nota3)
        nuevoAlumno.subirNotas(nota4)
        nuevoAlumno.calcularPromedio()
        nuevoAlumno.verificarAprobado()
        claseReconstruida.agregarAlumno(nuevoAlumno)
        localStorage.setItem( claseReconstruida.nombre,JSON.stringify(claseReconstruida))
        contenedorAlumno.style.display= "none"
        contenedorFinal.style.display= "flex"
        formularioAlumno.reset()
    }
    
})
botonOtroAlumno.addEventListener("click",()=>{
    contenedorFinal.style.display= "none"
    contenedorAlumno.style.display= "flex"
    
})

botonVolverInicio.addEventListener("click",()=>{
    contenedorFinal.style.display= "none"
    contenedorInicio.style.display= "flex"

})


botonEditarClase.addEventListener("click",()=>{
    contenedorInicio.style.display= "none"
    contenedorEditar.style.display= "flex"
})


botonBuscarClase.addEventListener("click",(event)=>{
    event.preventDefault()
    nombreClase= document.getElementById("inputEditar").value
    nombreClase = nombreClase.toLocaleLowerCase()
    console.log("Hola")
    if (!(localStorage.hasOwnProperty(nombreClase))){
        alert("La clase que busca no existe")
    }
    else{
        alert(`La clase ${nombreClase.toUpperCase()} ha sido encontrada. Ahora puede agregarle mas alumnos`)
        claseSeleccionada = nombreClase
        contenedorEditar.style.display= "none"
        contenedorAlumno.style.display= "flex"
        formularioEditarClase.reset()
    }
})

/* 

HACER LINEAS POR CADA ALUMNO  (26/7)

HACER QUE SE PUEDA BUSCAR LOS ALUMNOS   (proximamente)

// Recuperar el objeto GrupoDeClase del Local Storage
const grupoDeClaseString = localStorage.getItem("miGrupoDeClase");
const grupoDeClase = JSON.parse(grupoDeClaseString);

// Crear una nueva instancia de GrupoDeClase a partir de los datos recuperados
const miGrupo = new GrupoDeClase(grupoDeClase.nombre);
miGrupo.alumnos = grupoDeClase.alumnos;

// Ahora puedes utilizar los métodos de la instancia miGrupo
console.log(miGrupo.contarAlumnos()); // Output: Cantidad de alumnos en el grupo

// También puedes modificar el objeto y luego guardarlo nuevamente en el Local Storage
miGrupo.alumnos.push(new Alumno("Nuevo", "Alumno"));
localStorage.setItem("miGrupoDeClase", JSON.stringify(miGrupo));



*/