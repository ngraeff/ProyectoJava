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


class Alumno{
    constructor(nombre,promedio,aprobado) {
        this.nombre = nombre
        this.promedio = promedio
        this.aprobado = aprobado
        this.sistema= "Sin cargar"
    }

    cargar_nota(){
        this.sistema= "Nota Cargada"
    }
}


//Comienzo del Bucle

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
    listadoAlumnos.push(alumno)
    seguirPrograma()
}


// Ver si aprobo o no

mostrarAlumnos()
/*  
if (contador== 0){alert("Programa invalido. No ha ingresado ninguna nota")}
else if (promedioNota >= 6){alert(`El alumno ${nombreAlumno} APROBO CON PROMEDIO ${promedioNota}\nEn Total tuvo ${contador} notas`)}
else{ alert(`El alumno ${nombreAlumno} DESAPROBO CON PROMEDIO ${promedioNota}\nEn Total tuvo ${contador} notas`)}*/