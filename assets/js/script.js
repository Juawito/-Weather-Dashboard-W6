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
    let iconCode = data.daily[0].weather[0].icon
    let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    let temp = 'Temperature: ' + convertKelvin(data.daily[0].temp.day) + ' ºF';
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
    currentTitle.append("<img src='" + iconUrl + "'/>");
    currentWeatherContainer.append(currentTitle);
    currentWeatherContainer.append(ul);
    displayForecast(data);
}
function displayForecast(data) {
    let containerTitle = $('<h3>5-Day Forecast:</h3>');
    containerTitle.attr('class', 'forecast-title');
    fiveDayForecastContainer.append(containerTitle);
    let forecastArr = data.daily;
    let cardsContainer = $('<div>');
    cardsContainer.attr('class', 'cards-container');
    fiveDayForecastContainer.append(cardsContainer);
    for (let i = 1; i < 7; i++) {
        //assigning variables to data inside of the objects in the array
        let date = convertUnixToDate(forecastArr[i].dt);
        let dateWithTime = date.split(',');
        let currentDate = dateWithTime[0];
        let iconCode = forecastArr[i].weather[0].icon
        let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
        let temp = 'Temp: ' + convertKelvin(forecastArr[i].temp.day) + ' ºF';
        let humidity = 'Humidity: ' + forecastArr[i].humidity + '%';
        //creating card to contain the information
        let card = $('<div>');
        card.attr('class', 'card'); 
        card.addClass ('custom-card');
        let cardDate = $('<h4>');
        cardDate.attr('class', 'card-title');
        let cardIcon = $('<img>');
        cardIcon.attr('class', 'card-icon');
        cardIcon.attr('src', iconUrl);
        let cardTemp = $('<p>');
        cardTemp.attr('class', 'card-text');
        let cardHumidity= $('<p>');
        cardHumidity.attr('class', 'card-text');
        //adding the data to the card 
        cardDate.text(currentDate);
        cardTemp.text(temp);
        cardHumidity.text(humidity);
        //appending elements to card and card to page
        card.append(cardDate);
        card.append(cardIcon);
        card.append(cardTemp);
        card.append(cardHumidity);
        cardsContainer.append(card);
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