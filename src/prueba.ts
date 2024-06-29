const palabras = ["Hola", "Chau", "Twenty one Pilots", "Imagine Dragons", "Artic Monkeys", "Foo Fighters"]
const letra = "Chau"
const respuesta = palabras.find((palabras)=> palabras === letra )
const serch = "o"
const buscar = (serch) =>{
    const respuesta = palabras.filter(elemento => elemento.toLowerCase().includes(serch.toLowerCase()))

    return respuesta
}

const arrayDeObjetos = [{
    nombre : "LuFFy",
    edad: 19,
    profesion : ["PiRaTa", "caballero", "prueba"]
},{
    nombre : "Zoro",
    edad: 20,
    profesion : ["PiRaTa", "Espadachin", "prueba"]
},{
    nombre : "SanJi",
    edad: 19,
    profesion : ["PiRaTa", "caballero", "prueba2"]
},{
    nombre : "Brook",
    edad: 19,
    profesion : ["PiRaTa", "caballero", "prueba2"]
},
,{
    nombre : "Jimbe",
    edad: 19,
    profesion : ["PiRaTa", "gyojin", "prueba2"]
}]

const testArray = (buscar) =>{
    const coincidencia = arrayDeObjetos.filter(elemento => {

       let coincide = false
        elemento.profesion.forEach(element =>{
        console.log(element)
        if(element === buscar){
            console.log(`element ${element} buscar ${buscar}`)
            return coincide = true
        }
        
        
       })
       if(coincide){
        console.log(coincide)
        return elemento
       }
        }
    
    )
    return coincidencia
}
const buscar2 = "prueba"


console.log(testArray(buscar2))