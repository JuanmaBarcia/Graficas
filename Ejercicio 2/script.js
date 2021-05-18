console.log(`Ejercicio 2`)

let nombres = []
let numFilms = []

let cargarDatos = () => {
    fetch("https://swapi.dev/api/people/")
        .then(res => res.json())
        .then(personajes => {
            console.log(personajes)

            personajes.results.forEach(personaje => { // En cada iteración de foeEach nos va a dar los datos de cada personaje
                console.log(personaje)

                nombres.push(personaje.name) // Obtenemos el nombre del personaje y lo meteemos en el array nombres
                numFilms.push(personaje.films.length)
            });
            pintarDatos()
        })
}

let pintarDatos = () => {
    let data = {
        // A labels array that can contain any sort of values
        labels: nombres,
        // Our series array that contains series objects or in this case series data arrays
        series: [
            numFilms
        ]
    };
    let options = {
        high: 7,
        low: 0,
        axisY: {
            onlyInteger: true,
        }
    }

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.
    new Chartist.Bar('.ct-chart', data, options);
}

cargarDatos()