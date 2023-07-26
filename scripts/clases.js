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



/* Secciones de clases */
let listaDeClases = document.getElementById("listaClasesUl")

console.log(listaDeClases)

/* Funciones */

function verificarContenido(elemento){
    if (elemento == "" || elemento== null){
        return false
    }else{
        return true
    }
}
function mostrarClases(clases) {
    if (verificarContenido(clases)){
        for (let clase of clases ){
            let claseStorage= localStorage.getItem(clase)
            let claseJSON= JSON.parse(claseStorage)
            let claseReconstruida = reconstruirClases(claseJSON)
    
            let item = document.createElement("li")
            item.className += "clase__individual"
            item.innerHTML = `  <button class="boton__invisible"><h2>${claseReconstruida.nombre}</h2>
                                <p >Alumnos: ${claseReconstruida.contarAlumnos()}</p></button>`
    
    
            listaDeClases.appendChild(item)
        }
    }else{
        let item = document.createElement("li")
        item.className += "clase__individual"
        item.innerHTML = `  <h2 class="h2NoHay"> No hay clases creadas</h2>`
        listaDeClases.appendChild(item)
    }
    
}

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


mostrarClases(JSON.parse(localStorage.getItem("ArraydeClases")))


