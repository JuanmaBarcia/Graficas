let apiKey = "d29114ce0d3d754700c440e4af5cd481"
let ciudad = "London"
    // Gráfica1
let temperatura
let sensTermica
let tempMinima
let tempMaxima
let myChart
    // Gráfica2
let velocidadViento
    // Gráfica3
let presionMar
let presionSuelo

document.getElementById("formCity").addEventListener("submit", function(event) {
    event.preventDefault()
    if (myChart != undefined) {
        myChart.destroy()
        myChartViento.destroy()
        myChartPresion.destroy()
    }
    ciudad = event.target.elements.city.value
    cargarDatos(ciudad)
})



function cargarDatos(city) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.list[0])
            console.log(data.list[0].main)
            console.log(data.list[0].main.temp)
            temperatura = data.list[0].main.temp
            console.log(temperatura)
            sensTermica = data.list[0].main.feels_like
            tempMinima = data.list[0].main.temp_min
            tempMaxima = data.list[0].main.temp_max
            velocidadViento = data.list[0].wind.speed * 3.6
            presionMar = data.list[0].main.sea_level
            presionSuelo = data.list[0].main.grnd_level
            pintarTemperatura()
            pintarViento()
            pintarPresion()
        })

}


function pintarTemperatura() {
    const labels = ["Temperaturas"];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            data: [temperatura],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1
        }, {
            label: 'Sensación términca',
            data: [sensTermica],
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgb(255, 159, 64)'],
            borderWidth: 1
        }, {
            label: 'Temperatura mínima',
            data: [tempMinima],
            backgroundColor: ['rgba(255, 205, 86, 0.2)'],
            borderColor: ['rgb(255, 205, 86)'],
            borderWidth: 1
        }, {
            label: 'Temperatura máxima',
            data: [tempMaxima],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgb(75, 192, 192)'],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ºC'
                    }
                }
            }
        },
    };

    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}

function pintarViento() {
    const labels = ["Velovidad viento"];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Viento',
            data: [velocidadViento],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Km/h'
                    }

                }
            }
        },
    };

    myChartViento = new Chart(
        document.getElementById('myChartViento'),
        config
    );

}

function pintarPresion() {
    const labels = ["Presión Atmosférica"];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Presión Atmosférica a nivel del mar',
            data: [presionMar],
            backgroundColor: ['rgba(255, 205, 86, 0.2)'],
            borderColor: ['rgb(255, 205, 86)'],
            borderWidth: 1
        }, {
            label: 'Presión Atmosférica a nivel del suelo',
            data: [presionSuelo],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1
        }]
    }

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'hPa'
                    }
                }
            }
        },
    };

    myChartPresion = new Chart(
        document.getElementById('myChartPresion'),
        config
    );

}