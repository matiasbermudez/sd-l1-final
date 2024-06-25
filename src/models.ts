import * as jsonfile from "jsonfile";
import "../pelis.json";
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = []

  load(): Promise<Peli[]> {
    return jsonfile.readFile('../pelis.json').then((data) => {
      const respuesta: Peli[] = data;
      this.data = data
      return console.log("SeCargoData");
    }).catch(error => {
      console.error("El error al cargar data fue: ", error)
    })
  }

  getAll():Peli[] {
    return this.data
  }
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
}

//  const prueba = new PelisCollection()
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

  

export { PelisCollection, Peli };
