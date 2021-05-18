console.log(`Mapa`)

let apiKey = "d29114ce0d3d754700c440e4af5cd481"
let ciudad
let lat
let lng
let coords = []
let map
let wind
let temp
let presion
let humedad

const mapId = 'mapid';

const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

const ATTRIBUTION = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const ACCESS_TOKEN = 'pk.eyJ1IjoiY2Nhc3RpbGxvMDZtYiIsImEiOiJja2k1eXpybXU3em1mMnRsNjNqajJ0YW12In0.aFQJlFDBDQeUpLHT4EiRYg';

document.getElementById("formCity").addEventListener("submit", function(event) {
    event.preventDefault()
    ciudad = event.target.elements.city.value
    cargarDatos(ciudad)
})

let cargarDatos = async(city) => {
    let datos = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    let res = await datos.json()

    coords = [res.coord.lat, res.coord.lon];
    wind = res.wind.speed * 3, 6
    temp = res.main.temp
    presion = res.main.pressure
    humedad = res.main.humidity

    pintarMapa(coords)
}

function pintarMapa(params) {
    map != undefined ? map.remove() : ""
    map = L.map(mapId).setView(params, 13);
    let marker = L.marker([params[0], params[1]]).bindPopup(
        `<strong>Velocidad del Viento: </strong>${wind.toFixed(2)} Km/h<br>
        <strong>Temperatura: </strong>${temp} ºC<br>
        <strong>Presión atmosférica: </strong>${presion} hPa<br>
        <strong>Humedad: </strong>${humedad} %
        `
    ).addTo(map)

    L.tileLayer(MAPBOX_API, {
        attribution: ATTRIBUTION,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: ACCESS_TOKEN
    }).addTo(map);
}