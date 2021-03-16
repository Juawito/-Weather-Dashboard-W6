let apiKey = '&appid=cffe501940779b25824bab372a571e3e';
let currentApi = 'https://api.openweathermap.org/data/2.5/weather?q=';
let searchContainer = $('.search-form-container');
let currentWeatherContainer = $('.current-weather');
let fiveDayForecastContainer = $('.forecast');
let searchBtn = $('.custom-button');
let search = $('.custom-input');

// fetch functions to retrieve api data
function getCurrentApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayCurrentWeather(data);
        });
}
function getUvi(lat, lng) {
    let excludeHourly = '&exclude=hourly,minutely'
    let oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?' + lat + lng + excludeHourly + apiKey;
    fetch(oneCallApi)
    .then(function(respone){
        return respone.json();
    })
    .then (function(data){
        display5dayForecast(data);
    })
}
function convertUnixToDate(unixTimestamp){
    let unixTime = unixTimestamp * 1000;
    let dateObject = new Date(unixTime);
    let dateFormat = dateObject.toLocaleString()
    console.log(dateFormat);
}
function displayCurrentWeather(data) {
    console.log(data);
    let cityName = console.log(data.name);
    var iconcode = data.weather[0].icon
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    let temp = console.log('Temperature: ' + convertKelvin(data.main.temp));
    let humidity = console.log('Humidity: ' + data.main.humidity + '%');
    let windSpeed = console.log('Wind speed: ' + data.wind.speed + ' MPH');
    let lat = 'lat=' + data.coord.lat;
    let lng = '&lon=' + data.coord.lon;
    getUvi(lat, lng);

    // localStorage.setItem('Name', data.name)

}
function display5dayForecast(data){
    console.log(data);
    let uviIndex = data.current.uvi;
    console.log(uviIndex);
    convertUnixToDate(data.daily[0].dt);
}
//function to save search 
searchBtn.on('click', function (event) {
    event.preventDefault();
    console.log('button clicked')
    let city = $('.custom-input').val();
    let finalCurrentWeather = currentApi + city + apiKey;
    getCurrentApi(finalCurrentWeather);
})
function convertKelvin(kelvin){
    let results = (kelvin - 273.15) * 9/5 + 32;
    return results.toFixed(0);
}
function previousSearch(){
    //to render search history
}