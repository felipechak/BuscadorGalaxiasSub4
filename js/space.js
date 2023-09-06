const LIST_URL = "https://images-api.nasa.gov/search?q="

const crearTarjeta = (imagen, description, titulo, fecha) => {
    let content = `<div class="card">
        <img src= "${imagen}" alt="Card Image">
        <div class="card-content">
            <h2>${titulo}</h2>
            <p>${description}</p>
            <a>${fecha}</a>
        </div>`
    return content
}

function getJSONData(LIST_URL){
    let result = {};
    return fetch(LIST_URL) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;     
        return result;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById("inputBuscar");
    const btn = document.getElementById("btnBuscar");

    btn.addEventListener("click", () => {
        document.getElementById("contenedor").innerHTML = ""

        getJSONData(LIST_URL + buscador.value).then((respuesta) => {
            respuesta.data.collection.items.forEach(element => {
                let titulo = element.data[0].title;
                let description = element.data[0].description;
                let imagen = element.links[0].href;
                let fecha = element.data[0].date_created;
                let nuevaTarjeta = crearTarjeta(imagen, description, titulo, fecha); 

                document.getElementById("contenedor").innerHTML += nuevaTarjeta;

            });
        })
    })
})