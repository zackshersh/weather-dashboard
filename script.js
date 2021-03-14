

// 4cfa8391d48a0b8394a66f203037d51e
var form = $('form')
var input = $('input')
var formBtn = $("#formBtn")
var currentWeather =  $("#currentWeatherCont")

form.on("submit", getApi)

function getApi(event){
    event.preventDefault()


    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=+" + input[0].value + "&appid=4cfa8391d48a0b8394a66f203037d51e&units=imperial"
    console.log(requestUrl)
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        }) 
        .then(function(data) {
            console.log(data)

            var city = $("<h3>")
            city.text(input[0].value)
            currentWeather.append(city)

            var temp = $("<p>")
            temp.text("Temperature: " + data.main.temp + "°F")
            currentWeather.append(temp)

            var humid = $("<p>")
            humid.text("Humidity: " + data.main.humidity + "%")
            currentWeather.append(humid)

            var wind = $("<p>")
            wind.text("Wind Speed: " + data.wind.speed + " MPH")
            currentWeather.append(wind)
        });
}



