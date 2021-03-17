const apiKey = '&appid=cffe501940779b25824bab372a571e3e';
const currentApi = 'https://api.openweathermap.org/data/2.5/weather?q=';
const searchContainer = $('.search-form-container');
const currentWeatherContainer = $('.current-weather');
const fiveDayForecastContainer = $('.forecast');
const searchBtn = $('.custom-button');
const search = $('.custom-input');
const currentTitle = $(".current-weather-title");

// fetch functions to retrieve api data
function getCurrentApi(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getLatAndlon(data);
        });
}
function getWeatherData(lat, lng) {
    let excludeHourly = '&exclude=hourly,minutely'
    let oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?' + lat + lng + excludeHourly + apiKey;
    fetch(oneCallApi)
        .then(function (respone) {
            return respone.json();
        })
        .then(function (data) {
            displayWeather(data);
        })
}
function convertUnixToDate(unixTimestamp) {
    let unixTime = unixTimestamp * 1000;
    let dateObject = new Date(unixTime);
    let dateFormat = dateObject.toLocaleString()
    return dateFormat
}
function getLatAndlon(data) {
    console.log(data);
    let cityName = data.name;
    currentTitle.append(cityName);
    let lat = 'lat=' + data.coord.lat;
    let lng = '&lon=' + data.coord.lon;
    getWeatherData(lat, lng);

    // localStorage.setItem('Name', data.name)

}
function displayWeather(data) {
    console.log(data);
    let date = convertUnixToDate(data.daily[0].dt);
    let dateWithTime = date.split(',');
    let currentDate = ' (' + dateWithTime[0] + ')';
    var iconcode = data.daily[0].weather[0].icon
    var iconurl = "http://openweathermap.org/img/wn/" + iconcode + ".png";
    let temp = 'Temperature: ' + convertKelvin(data.daily[0].temp.day);
    let humidity = 'Humidity: ' + data.daily[0].humidity + '%';
    let windSpeed = 'Wind speed: ' + data.daily[0].wind_speed + ' MPH';
    let uviIndex = data.daily[0].uvi;
    let ul = $('<ul>');
    let currentInfoArr = [temp, humidity, windSpeed, uviIndex];
    for (let i = 0; i < currentInfoArr.length; i++) {
        let weatherInfo = $('<li>');
        weatherInfo.text(currentInfoArr[i]);
        ul.append(weatherInfo);
    }
    currentTitle.append(currentDate);
    currentTitle.append("<img src='" + iconurl + "'/>");
    currentWeatherContainer.append(currentTitle);
    currentWeatherContainer.append(ul);
    displayForecast(data);
}
function displayForecast(data) {
    let containerTitle = $('<h2>5-Day Forecast:</h2>');
    let forecastArr = data.daily;
    console.log(forecastArr);
    for (let i = 1; i < 7; i++) {
        let date = convertUnixToDate(data.daily[i].dt);
        let dateWithTime = date.split(',');
        let currentDate = ' (' + dateWithTime[0] + ')';
        var iconcode = data.daily[0].weather[0].icon
        var iconurl = "http://openweathermap.org/img/wn/" + iconcode + ".png";
    }
}
//function to save search input
searchBtn.on('click', function (event) {
    event.preventDefault();
    let city = $('.custom-input').val();
    let finalCurrentWeather = currentApi + city + apiKey;
    getCurrentApi(finalCurrentWeather);
})
function convertKelvin(kelvin) {
    let results = (kelvin - 273.15) * 9 / 5 + 32;
    return results.toFixed(0);
}
function previousSearch() {
    //to render search history
}