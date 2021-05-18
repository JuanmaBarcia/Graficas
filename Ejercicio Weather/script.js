let apiKey = "d7a661ea96306817ac50a6068ff7d4bd"
let ciudad

let temperatura
let sensTermica
let tempMinima
let tempMaxima
let velocidadViento
let nivelMar
let nivelSuelo

let temp
let wind
let levels

document.getElementById("ciudadForm").addEventListener("submit", function(e) {
    e.preventDefault()
    if (temp && wind && levels) {
        temp.destroy();
        wind.destroy();
        levels.destroy();
    }
    ciudad = e.target.elements.ciudad.value
    console.log(ciudad)

    cargarDatos(ciudad, apiKey)
})

let cargarDatos = async(city, key) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`)
        .then(res => res.json())
        .then(data => {

            temperatura = data.main.temp ? data.main.temp : 0
            sensTermica = data.main.feels_like ? data.main.feels_like : 0
            tempMinima = data.main.temp_min ? data.main.temp_min : 0
            tempMaxima = data.main.temp_max ? data.main.temp_max : 0
            velocidadViento = data.wind.speed ? data.wind.speed : 0
            nivelMar = data.main.sea_level ? data.main.sea_level : 0
            nivelSuelo = data.main.grnd_level ? data.main.grnd_level : 0

            pintarTemperatura()
        })
}

function pintarTemperatura() {
    const dataTemp = {
        labels: ["Temperatura", "Sesación térmica", "Temperatura mínima", "Temperatura máxima"],
        datasets: [{
            label: `Temperaturas en ${ciudad}`,
            data: [temperatura, sensTermica, tempMinima, tempMaxima],
            backgroundColor: ['rgba(255, 159, 132, 0.2)'],
            borderColor: ['rgb(255, 159, 132)'],
            borderWidth: 1
        }]
    };
    const configTemp = {
        type: 'bar',
        data: dataTemp,
    };
    temp = new Chart(
        document.getElementById('temp'),
        configTemp
    );

    const dataWind = {
        labels: [`Velocidad del viento`],
        datasets: [{
            label: `Velocidad del viento en ${ciudad}`,
            data: [velocidadViento],
            backgroundColor: ['rgba(25, 99, 132, 0.2)'],
            borderColor: ['rgb(25, 99, 132)'],
            borderWidth: 1
        }]
    };
    const configWind = {
        type: 'bar',
        data: dataWind,
        options: {
            indexAxis: 'y',
        }
    };
    wind = new Chart(
        document.getElementById('wind'),
        configWind
    );

    const dataLevels = {
        labels: [`Nivel del mar`, `Nivel del suelo`],
        datasets: [{
            label: `Niveles del terreno en ${ciudad}`,
            data: [nivelMar, nivelSuelo],
            backgroundColor: ['rgba(200, 199, 12, 0.2)'],
            borderColor: ['rgb(200, 199, 12)'],
            borderWidth: 1
        }]
    };
    const configLevels = {
        type: 'bar',
        data: dataLevels,
    };
    levels = new Chart(
        document.getElementById('levels'),
        configLevels
    );
}