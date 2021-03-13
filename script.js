let apiKey = '&appid=cffe501940779b25824bab372a571e3e';
// let oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?';
let currentApi = 'https://api.openweathermap.org/data/2.5/weather?q=';
let searchContainer = $('.search-form-container');
let currentWeatherContainer = $('.current-weather');
let fiveDayForecast = $('.forecast');
let searchBtn = $('.custom-button');
let search = $('.custom-input');

// fetch function to retrieve api data
function getCurrentApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayCurrentWeather(data);
        });
}
function get5dayApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            display5dayForecast(data);
        });
}
function displayCurrentWeather(data) {
    console.log(data);
    console.log(data.name);
    var iconcode = data.weather[0].icon
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    console.log(iconurl);
    console.log('temp: ' + convertKelvin(data.main.temp));
    console.log('himidity ' + data.main.humidity + '%');
    console.log('Wind speed ' + data.wind.speed + 'mph');


    localStorage.setItem('Name', data.name)

}
function display5dayForecast(data){
    console.log(data);

}
//function to save search 
searchBtn.on('click', function (event) {
    event.preventDefault();
    console.log('button clicked')
    let city = $('.custom-input').val();
    // let finalForecastApi = forecastApi + city + apiKey;
    let finalCurrentWeather = currentApi + city + apiKey;
    // oneCallApi(finalForecastApi);
    getCurrentApi(finalCurrentWeather);
})
function convertKelvin(kelvin){
    let results = (kelvin - 273.15) * 9/5 + 32;
    return results.toFixed(0);
}
function previousSearch(){
    //to render search history
}