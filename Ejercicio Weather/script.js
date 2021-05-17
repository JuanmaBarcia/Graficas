let apiKey = "d29114ce0d3d754700c440e4af5cd481"
let city = "London"
// Gráfica1
let temperatura  
let sensTermica
let tempMinima
let tempMaxima

function cargarDatos() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            console.log(data.main)
            console.log(data.main.temp)
            temperatura = data.main.temp
            console.log (temperatura)
            sensTermica = data.main.feels_like
            tempMinima = data.main.temp_min
            tempMaxima = data.main.temp_max
            pintarTabla()
        })
}

cargarDatos()

function pintarTabla(){
    const labels = ["Temperatura","Sesación térmica","Temperatura mínima","Temperatura máxima"];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Temperaturas',
        data: [temperatura,sensTermica,tempMinima,tempMaxima],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          
        ],
        borderWidth: 1
      }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      };
    
     let myChart = new Chart(
        document.getElementById('myChart'),
        config
      );

}

