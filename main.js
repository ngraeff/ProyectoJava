//Bienvenida
let nombre_user = prompt("Por favor ingrese su nombre:")
alert(`Bienvenido ${nombre_user}`)

// Definicion de las Variables
let nombre_alumno= prompt("Ingrese el nombre del alumno")
let ingreso_programa = prompt("Ingrese 1 para ingresar una nota o 0 para terminar")
let nota_alumno
let suma_nota = 0
let promedio_nota
let contador = 0

//Defincion de las funciones

function calcular_promedio(suma_total,cantidad){
    return suma_total/cantidad
}

//Comienzo del Bucle
while (ingreso_programa!= 0){
    if (ingreso_programa != 1){ingreso_programa = prompt("--ERROR--\nIngrese 1 para ingresar una nota o 0 para terminar")}
    contador ++
    nota_alumno =  Number(prompt(`Ingrese la nota numero ${contador} de ${nombre_alumno}`))
    suma_nota = suma_nota + nota_alumno
    ingreso_programa = prompt("Ingrese 1 para ingresar una nota o 0 para terminar")
}
promedio_nota = calcular_promedio(suma_nota,contador)

// Ver si aprobo o no
if (promedio_nota >= 6){alert(`El alumno ${nombre_alumno} APROBO CON PROMEDIO ${promedio_nota}\nEn Total tuvo ${contador} notas`)}
else{ alert(`El alumno ${nombre_alumno} DESAPROBO CON PROMEDIO ${promedio_nota}\nEn Total tuvo ${contador} notas`)}