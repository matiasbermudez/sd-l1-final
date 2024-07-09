import { PelisCollection, Peli } from "./models";

class PelisControllerOptions {
  action: "get" | "add" | "tag" | "search";
  params: Peli;
}

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

  }

  async get(options?: Options): Promise<any> {
    //Si el objeto tiene la propiedad id, debe devolver la película con ese id.
    console.log("OPTIONS: ", options)
    if (!options) {
      return await this.peliculas.getAll()
    }

    if (options.id && options.id != 0) {
      const respuesta: Peli = await this.peliculas.getById(options.id)
      return respuesta
    }
    console.log(options)
    if (options.search.title && !options.search.tag) {
      const respuestaTitle: Peli[] = await this.peliculas.search(options.search).then(resp => {
        return resp
      })
      let peliculasFiltradas: Peli[] = respuestaTitle.filter(peli => peli.title.includes(options.search.title));
      return peliculasFiltradas
    }
    //Si el objeto tiene la propiedad search y tiene la propiedad title o tag, debe buscar las pelis que tengan ese string en el títuloo tag .
    //Si recibe las dos debe filtrar por ambas.
    else if (options.search) {

      if (options.search.tag != "" && options.search.title != "") {
        const respuestaTitle: Peli[] = await this.peliculas.search(options.search).then(resp => {
          options.search.title = ""
          return resp
        })
        const respuestaTag: Peli[] = await this.peliculas.search(options.search).then(resp => {
          return resp
        })
        //PRIMERO TRAIGO EN RESPUESTATAG Y TITLE LAS PELICULAS QUE CUMPLAN CON LOS IDS Y TAGS, LUEGOS LAS FILTRO Y ELIMINO LOS DUPLICADOS
        const respuestaConcatenada = respuestaTitle.concat(respuestaTag)
        let peliculasFiltradas: Peli[] = respuestaConcatenada.filter(peli => peli.title.includes(options.search.title));
        peliculasFiltradas = peliculasFiltradas.filter(peli => peli.tags.includes(options.search.tag))
        const peliculasSinDuplicados: Peli[] = peliculasFiltradas.filter((peli, index, self) =>
          index === self.findIndex((t) => (
            t.id === peli.id
          )))
        return peliculasSinDuplicados

      }
      const respuesta: Peli | Peli[] = await this.peliculas.search(options.search).then(resp => {
        return resp
      })
      return respuesta
    } else if (options.search.tag) {
      console.log("ENTRA?", options.search.tag)
      const respuestaTag: Peli[] = await this.peliculas.search(options.search).then(resp => {
        return resp
      })
      return respuestaTag
    }
    const respuesta: Peli[] = await this.peliculas.getAll()
    return respuesta
  }


  async add(peli: Peli) {
    const peliNew: Peli = {
      id: peli.id,
      title: peli.title,
      tags: peli.tags
    }
    try {
      await this.peliculas.add(peliNew)
    }
    catch (error) {
      console.error("El Error Fue ", error)
    }
  }


}
//ACA TERMINE PELISCONTROLLERS
export {
  PelisController,
  PelisControllerOptions
};


// Asegúrate de tener el repositorio clonado en tu computadora.
// Abre tu terminal y navega hasta la carpeta de tu proyecto.
// Para reemplazar todos los cambios en tu repositorio local con la versión más reciente del repositorio en GitHub, puedes usar el comando git fetch origin && git reset--hard origin / main
// Esto traerá la última versión del repositorio remoto y reemplazará todos los cambios locales con esa versión.
//   Luego, para subir estos cambios al repositorio remoto, puedes usar git push - f origin main
// Con esto, habrás reemplazado todos los cambios locales con la versión del repositorio remoto y subido estos cambios nuevamente a GitHub.
// Siguiendo estos pasos, podrás reemplazar todos los cambios en tu repositorio local y enlazarlo nuevamente con tu repositorio en GitHub. ¡Si necesitas más ayuda, no dudes en consultarme! ¡Estoy aquí para ayudarte!