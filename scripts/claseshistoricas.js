/* CLASES */
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


/* "JSON DEL SERVIDOR" */
const clasesHistoricasJSON = "../scripts/claseshistoricas.json"

/* LISTADO DE ALUMNOS EN HTML */
let seccionAlumnos = document.getElementById("Alumnos")


/* BOTONES */
const buscarClaseBoton= document.getElementById("buscarClase")

const formulario= document.getElementById("buscarClaseForm")

/* FUNCIONES */
const obtenerClasesServidor = async () => {
    try {
        const clasesHistoricas = await fetch(clasesHistoricasJSON)
            .then(res => res.json());

        return clasesHistoricas;
    } catch (error) {
        console.log(error);
    }
}

const obtenerClases = async () => {
    try {
        const clasesHistoricas = await obtenerClasesServidor();
        return clasesHistoricas;
    } catch (e) {
        console.log(e);
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

function mostrarAlumnos(listado){
    seccionAlumnos.innerHTML+=`<div class="indentificador__items">
        <span class="nombre">Nombre</span>
        <span class="apellido">Apellido</span>
        <span class="notas">Notas</span>
        <span class="promedio">Promedio</span>
        <span class="condicion">Condicion</span>
        </div>`
        listado.forEach(alumno=>{
        let item = document.createElement("li")
        let texto
        
        if (alumno.aprobado){
            texto = "Aprobado"
            item.style.background = "#8ad45a"
        }else{
            texto= "Desaprobado"
            item.style.backgroundColor= "#b94c4c"
        }
        item.className += "alumno"
        item.innerHTML = `<div class="contenedor__borrador" }> <span class="nombre">${alumno.nombre}</span>
                            <span class="apellido">${alumno.apellido}</span>
                            <span class="notas">${ mostrarNotas(alumno.notas)}</span>
                            <span class="promedio">${alumno.promedio}</span>
                            <span class="condicion">${texto}</span> </div>`
        seccionAlumnos.appendChild(item)
    })
}

function borrarListado(){
    while (seccionAlumnos.firstChild) {
        seccionAlumnos .removeChild(seccionAlumnos .firstChild);
    }
}

function mostrarClaseNoEncontrada(año){
    seccionAlumnos.innerHTML+=`<h3 class="sin__clase">LA CLASE DEL AÑO ${año} NO SE ENCUANTRA CARGADA`
}

const cargarClase = async () => {
    try {
        const clasesHistoricas = await obtenerClases();

        buscarClaseBoton.addEventListener("click", (event) => {
            event.preventDefault();
            const año = document.getElementById("inputBuscarClase").value;
            let contador = 0
            borrarListado()
            clasesHistoricas.forEach(clase => {
                if (clase.nombre===año){
                    contador ++
                    mostrarAlumnos(clase.alumnos)
                }
            })
            if (contador==0){
                mostrarClaseNoEncontrada(año)
            }
            
            formulario.reset()
        });
    } catch (error) {
        console.error('Error al cargar clases:', error);
    }
    
};

cargarClase();

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
    toggle.classList.toggle("active");
})

linkNav.forEach(link => {
    link.addEventListener("click", function () {
        links.classList.remove("active")
        toggle.classList.remove("active")
    })})