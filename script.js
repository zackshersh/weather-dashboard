

// 4cfa8391d48a0b8394a66f203037d51e
var form = $('form')
var input = $('input')
var formBtn = $("#formBtn")

form.on("submit", getApi)

function getApi(event){
    event.preventDefault()


    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=+" + input[0].value + "&appid=4cfa8391d48a0b8394a66f203037d51e"
    console.log(requestUrl)
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        }) 
        .then(function(data) {
            console.log(data)
            
        });
}



