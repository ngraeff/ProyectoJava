//Bienvenida
let nombre_user = prompt("Por favor ingrese su nombre:")

//Funcion ingreso nombre verificado
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
    if (estado.toLowerCase() == "no"){estadoPrograma= false}
}

function mostrarAlumnos(){
    for (let i= 0; i <listadoAlumnos.length; i++) {
        if (listadoAlumnos[i].aprobado){
            alert(`El alumno: ${listadoAlumnos[i].nombre} APROBO con promedio ${listadoAlumnos[i].promedio} :)`)
        }else{ alert(`El alumno: ${listadoAlumnos[i].nombre} DESAPROBO con promedio ${listadoAlumnos[i].promedio} :(`)}
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

// Creacion de clase Alumno
class Alumno{
    constructor(nombre,promedio,aprobado) {
        this.nombre = nombre
        this.promedio = promedio
        this.aprobado = aprobado
        this.sistema= "Sin cargar"
    }

    cargarNotaSistema(){
        this.sistema= "Nota Cargada"
    }
}


//Comienzo del Bucle general

while (estadoPrograma) {
    nombreAlumno = prompt("Ingrese el nombre del alumno")
    nombreAlumno= ingreso_nombre_verificado(nombreAlumno)
    ingresoBucleVerificado()
    contador = 0
    sumaNota = 0

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

