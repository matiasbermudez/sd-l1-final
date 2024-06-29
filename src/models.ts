import * as jsonfile from "jsonfile";
import "../pelis.json";

type SearchOptions = { title?: string; tag?: string };
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = []

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile('../pelis.json').then((data) => {
      const respuesta: Peli[] = data;
      this.data = data
       console.log("SeCargoData");
       return data
    }).catch(error => {
      console.error("El error al cargar data fue: ", error)
    })
  }

  // getAll():Peli[] {
  //   return this.data
  // }
  getById(id: number): Promise<Peli> {
    return new Promise((resolve) => {
      const encontrado: Peli = this.data.find((peli) =>  peli.id == id  )
      if (encontrado) {
        resolve(encontrado)
      } else {
        let noEncontrado = new Peli
        noEncontrado ={
          id: 0,
          title: "noEncontrado",
          tags : []
        }
        resolve(noEncontrado)
      }
    })
  }
  add(peli: Peli): Promise<boolean> {
    const agregandoPeli = this.getById(peli.id).then((peliEncontrada)=>{
      console.log("PeliEncontrada: ", peliEncontrada)
      if(peliEncontrada.id != 0){
        return false
      }else{
        console.log("entro al else")
        this.data.push(peli)
        const respuestaDelWrite = jsonfile.writeFile('../pelis.json', this.data)
        return respuestaDelWrite.then(()=>{
          return true
        }).catch(error => console.error(error))
      }
    })
    return agregandoPeli
  }
  async search(options:SearchOptions):Promise<Peli[]>{

    const lista = await this.getAll();
    
    
     if(options.title){
         const arrayCoincidencias: Peli[]  = lista.filter( elemento => 
                elemento.title.toLowerCase().includes(options.title.toLowerCase()) )
            return arrayCoincidencias
      }
      else if(options.tag){
        const coincidencia = lista.filter(elemento => {
          let coincide = false

          //RECORRO EL ARRAY DE TAGS DENTRO DE ELEMENTO Y SI COINCIDE DEVUELVO TRUE
            elemento.tags.forEach(element => {
              if(element == options.tag){
                return coincide = true
              }})

            //SI COINCIDE ES TRUE RETORNO EL ELEMENTO(EL OBJETO CON SU TITLE, TAGS Y ID)
            if(coincide){
              return elemento
            }
        })
        return coincidencia
      }
  }
}

// const prueba = new PelisCollection()
// let peliDePrueba = new Peli

// peliDePrueba = {
//   id: 7,
//   title: "Prueba",
//   tags : ["Nose1", "Nose2", "Nose3"]
// }

// prueba.load().then((data) => { 
//   prueba.data = data
//   prueba.add(peliDePrueba).then((respuesta)=>{
//     if(respuesta){
//       console.log("Se Cargo", respuesta)
//   }else{
//     console.log("No se cargo por que habia uno igual", respuesta )
   
//   }
// })
//     .catch(error => console.error("ERROR: ", error))
// })



// async function buscarPelis() {
//   const opciones: SearchOptions = { tag: "apta para mayores"}
//   try{
//     const resultado = await prueba.search(opciones)
//     return resultado
//   }catch(error){
//     console.error("El Error: ", error)
//   }
// }

// console.log(buscarPelis().then(
//   resultado => { console.log(resultado)}
// ))


  

export { PelisCollection, Peli };
