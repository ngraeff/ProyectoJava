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


/* Botones */

let botonesInvisibles

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
            item.innerHTML = `  <button class="boton__invisible"><div class= "boton__invisible--divclass"><h2 class="nombre__de__clase">${claseReconstruida.nombre}</h2>
                                <p >Alumnos: ${claseReconstruida.contarAlumnos()}</p></div></button>`
    
    
            listaDeClases.appendChild(item)
            botonesInvisibles = document.querySelectorAll(".boton__invisible")
        
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
function mostrarNotas(notas) {
    let texto = ""
    for (let i = 0; i < notas.length; i++) {
        texto += notas[i]
        if (i !== notas.length - 1) {
            texto += " - "
        }
        }
    return texto
}

function eliminarEspacios(texto) {
    return texto.replace(/\s+/g, '');
}

mostrarClases(JSON.parse(localStorage.getItem("ArraydeClases")))

botonesInvisibles.forEach(boton=>{
    boton.addEventListener("click", (event)=>{
        
        let nombreDeClase = event.currentTarget.querySelector(".nombre__de__clase").innerText
        claseReconstruida = reconstruirClases(JSON.parse(localStorage.getItem(nombreDeClase)))
        let contenedor = document.querySelectorAll(`[data-nombre= '${eliminarEspacios(claseReconstruida.nombre)}']`)
        switch (contenedor){
            case contenedor.length== 0:
                
        }
        if(claseReconstruida.contarAlumnos()== 0 && contenedor.length== 0){
            boton.innerHTML+=`<div class="sin__alumnos" data-nombre= ${eliminarEspacios(claseReconstruida.nombre)}>
            <span class= "sin__alumnos--texto" >No hay ningun alumno en esta clase</span>
            </div>`
        }
        else if (contenedor.length== 0){
            boton.innerHTML+=`<div class="indentificador__items" data-nombre= ${eliminarEspacios(claseReconstruida.nombre)}>
            <span class="nombre">Nombre</span>
            <span class="apellido">Apellido</span>
            <span class="notas">Notas</span>
            <span class="promedio">Promedio</span>
            <span class="condicion">Condicion</span>
            </div>`

            for (const alumno of claseReconstruida.alumnos){
                let item = document.createElement("li")
                item.setAttribute("data-nombre",eliminarEspacios(claseReconstruida.nombre))
                let texto
                if (alumno.aprobado){
                    texto = "Aprobado"
                    item.style.background = "#8ad45a"
                }else{
                    texto= "Desaprobado"
                    item.style.backgroundColor= "#b94c4c"
                }
                
                item.className += "alumno__individual"
                item.innerHTML = `<div class="contenedor__borrador" }> <span class="nombre">${alumno.nombre}</span>
                                <span class="apellido">${alumno.apellido}</span>
                                <span class="notas">${ mostrarNotas(alumno.notas)}</span>
                                <span class="promedio">${alumno.promedio}</span>
                                <span class="condicion">${texto}</span> </div>`
                boton.appendChild(item)
        }
        }
        else{
            for(const elemento of contenedor){
                elemento.remove()
            }
            
            
        }
    })
})
