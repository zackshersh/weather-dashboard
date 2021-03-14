

// 4cfa8391d48a0b8394a66f203037d51e

// b1f0d531886e4cd4997e94988f276ef5
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

            currentWeather.children().remove()

            var icon = $("<img>")
            icon.attr("src","http://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png")
            currentWeather.append(icon)

            var city = $("<h3>")
            city.text(input[0].value + " (" +  moment().format("M/D/YYYY") + ")")
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

            // var uvReading = $("<span>")
            // uvReading.text()
            // var uv = $("<p>")
            // uv.text()


        });
        fiveDayForecast(event)
}


var fiveDayCont = $("#fiveDayCont")

function fiveDayForecast(event){
    event.preventDefault();
    console.log(input[0].value)
    // var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=35.90538825669122&lon=-79.06749555615329&exclude=minutely,hourly&appid=4cfa8391d48a0b8394a66f203037d51e"
    var requestUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + input[0].value + "&key=b1f0d531886e4cd4997e94988f276ef5"
    console.log(requestUrl)
    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var lati = data.results[0].geometry.lat
            var longi = data.results[0].geometry.lng

            var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + longi +"&exclude=current,minutely,hourly,alerts&appid=4cfa8391d48a0b8394a66f203037d51e&units=imperial"

            fetch(weatherUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data)

                    for(var i=0;i<5;i++){
                        var dayDiv = $("<div>")

                        dayDiv.attr("class","")

                        var icon = $("<img>")
                        icon.attr("src","http://openweathermap.org/img/wn/"+ data.daily[i].weather[0].icon +"@2x.png")
                        dayDiv.append(icon)

                        var dayTitle = $("<h4>")
                        var currentDate = moment().add(i+1,'days')
                        dayTitle.text(currentDate.format("M/D/YYYY"))
                        dayDiv.append(dayTitle)

                        var dayTemp = $("<p>")
                        dayTemp.text("Temp: " + data.daily[i].temp.day + "°F")

                        var dayHumid = $("<p>")
                        dayHumid.text("Humidity: " + data.daily[i].humidity + "%")

                        dayDiv.append(dayTemp).append(dayHumid)

                        fiveDayCont.append(dayDiv)


                    }
                })
        })
}

