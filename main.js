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
let nombre_alumno= prompt("Ingrese el nombre del alumno")
let ingreso_programa 
let nota_alumno
let suma_nota = 0
let promedio_nota
let contador = 0

//Defincion de las funciones

function calcular_promedio(suma_total,cantidad){
    return suma_total/cantidad
}

function ingreso_bucle_verificado(){
    ingreso_programa = prompt("Ingrese 1 para ingresar una nota o 0 para terminar")
    while(ingreso_programa!= 1 && ingreso_programa!= 0){ingreso_programa = prompt("--ERROR--\nIngrese 1 para ingresar una nota o 0 para terminar")}
}

function ingreso_nota_verificado(){
    nota_alumno = Number(prompt(`Ingrese la nota numero ${contador} de ${nombre_alumno}`))
    while (isNaN(nota_alumno)){
        nota_alumno =  Number(prompt(`--ERROR--\nIngrese la nota numero ${contador} de ${nombre_alumno}`))
    }
}

//Comienzo del Bucle

nombre_alumno= ingreso_nombre_verificado(nombre_alumno)

ingreso_bucle_verificado()
while (ingreso_programa!= 0){
    contador ++
    ingreso_nota_verificado()
    suma_nota = suma_nota + nota_alumno
    ingreso_bucle_verificado()
}
promedio_nota = calcular_promedio(suma_nota,contador)

// Ver si aprobo o no
if (contador== 0){alert("Programa invalido. No ha ingresado ninguna nota")}
else if (promedio_nota >= 6){alert(`El alumno ${nombre_alumno} APROBO CON PROMEDIO ${promedio_nota}\nEn Total tuvo ${contador} notas`)}
else{ alert(`El alumno ${nombre_alumno} DESAPROBO CON PROMEDIO ${promedio_nota}\nEn Total tuvo ${contador} notas`)}