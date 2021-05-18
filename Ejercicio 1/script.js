// Pediremos las películas de Star Wars y pintaremos una gráfica de líneas en la que podamos ver cada una de las películas.
// En el eje X el nombre de la película
// En el eje Y año de publicación
// API ENDPOINT --> https://swapi.dev/api/films/s
console.log("graficas")

let titulos = []
let years = []

function cargarDatos() {
    fetch('https://swapi.dev/api/films/')
        .then(res => res.json())
        .then(peliculas => {
            // console.log(data.results)
            peliculas.results.map(pelicula => {
                // console.log(pelicula.title)
                titulos.push(pelicula.title) // rellenar el array titulos con los títulos de las películas
                    // console.log(pelicula.release_date.split("-")[0])
                years.push(parseInt(pelicula.release_date.split("-")[0])) // Rellena el array de years 
                    //parseInt lo que se mete entre los parentesis te lo devuelve a numero entero
            })
            pintarDatos()
        })
}

function pintarDatos() {

    let data = {
        // A labels array that can contain any sort of values
        labels: titulos,
        // Our series array that contains series objects or in this case series data arrays
        series: [years]
    };

    let options = {
        high: 2010,
        low: 1970,
        axisY: {
            onlyInteger: true,
            scaleMinSpace: 40,
            type: Chartist.FixedScaleAxis, // Escala en el eje : Auto, Fixed,Step
            ticks: years,
        }
    };
    new Chartist.Line('.ct-chart', data, options);
};;


cargarDatos()