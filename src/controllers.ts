import { PelisCollection, Peli } from "./models";

type SearchOptions = { title?: string; tag?: string };

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  peliculas: PelisCollection;

  opciones: Options
  constructor() {
    this.peliculas = new PelisCollection();
    this.peliculas.getAll().then(
      resp=> {
        console.log("SE CArgo DAta", resp)
      }
    )
  }

 async get(options?: Options) {
    //Si el objeto tiene la propiedad id, debe devolver la película con ese id.
    console.log("Opciones: ", options)
    if (options.id && options.id != 0) {
      console.log("Entro al ID:", options.id)
      
      const respuesta = await this.peliculas.getById(options.id).then(resp => {
        return resp
      })
      return respuesta
    } else if (options.search) {
      console.log("Entro al SEarch")
      const respuesta = await this.peliculas.search(options.search).then(resp => {
      return resp
    }     
      )
      return respuesta
    }
  }
}

const testClase = new PelisController();
const testOpciones: Options = {
  id : 0,
  search: {
    title: "",
    tag : "retro"
  }
};

testClase.get(testOpciones).then(
  resp => console.log("funciona:",resp)
)

export { PelisController };
