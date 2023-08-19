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


const nombreDeLasClases= []
let claseSeleccionada = ""

/* Botones */
const botonNuevaClase = document.getElementById("botonNuevaClase")
const formularioClaseBoton = document.getElementById("formularioClaseBoton")
const botonAlumno = document.getElementById("botonAlumno")
const botonVolverInicio = document.getElementById("botonVolverInicio")
const botonOtroAlumno = document.getElementById("botonOtroAlumno") 

let formularioAlumno = document.getElementById("formularioAlumno")
let formularioClase = document.getElementById("formularioClase")
let formularioEditarClase = document.getElementById("formularioEditarClase")
const botonEditarClase= document.getElementById("botonEditarClase")
const botonBuscarClase= document.getElementById("botonBuscarClase")



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
        toastr.warning("Ingrese texto", "Alerta", { timeOut: 2000 })
        val= false}
    return val
}

function validarNuevaClase(clase){
    let val= true
    clases= JSON.parse(localStorage.getItem("ArraydeClases"))
    if (clases != undefined){
        if (clases.includes(clase)){
            toastr.warning("La clase ya existe", "Alerta", { timeOut: 2000 })
            val= false
        }
    }
    
    return val
    
    
}

function validarInputNotas(nota) {
    let val = true
    if (nota > 10 || nota <= 0 || isNaN(nota) || nota === "") {
    toastr.warning("Ingrese las notas en un rango de 0 - 10", "Alerta", { timeOut: 2000 })
    
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
    if  (validarInputTexto(claseSeleccionada) &&  validarNuevaClase(claseSeleccionada)){

        let nuevaClase = new GrupoDeClase(claseSeleccionada)
        let nuevaClaseJSON = JSON.stringify(nuevaClase)
        localStorage.setItem(claseSeleccionada,nuevaClaseJSON)
        contenedorForm.style.display= "none"
        contenedorAlumno.style.display= "flex"

        guardarNombreDeClases(claseSeleccionada)
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
    if (!(localStorage.hasOwnProperty(nombreClase))){
        toastr.error("La clase que busca no existe", "Error", { timeOut: 2000 })
    }
    else{
        toastr.success(`La clase ${nombreClase.toUpperCase()} ha sido encontrada. Ahora puede agregarle mas alumnos`, "Exito", { timeOut: 2000 })
        
        claseSeleccionada = nombreClase
        contenedorEditar.style.display= "none"
        contenedorAlumno.style.display= "flex"
        formularioEditarClase.reset()
    }
})




/* scroll */
window.addEventListener("scroll", () => {
    let header = document.querySelector("nav")
    header.classList.toggle("abajo", window.scrollY > 0)
})

/* NAVBAR */
const toggle= document.querySelector(".toggle")
const links = document.querySelector(".navbar")
const linkNav= document.querySelectorAll(".navbar--link")

toggle.addEventListener("click", function () {
    links.classList.toggle("active")
    toggle.classList.toggle("active")
})

linkNav.forEach(link => {
    link.addEventListener("click", function () {
        links.classList.remove("active")
        toggle.classList.remove("active")
    })})

    