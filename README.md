# -Weather-Dashboard-W6
## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```
## Technologies Used 
-JQuery  
-Bootstrap  
-Open Weather API  
-HTML  
-CSS  

## Creating the Application  

- Started out by creating the basic html with 3 containers.  
    1. Container for search button and previous search inputs.
    2. Container for the current weather.  
    3. Container for the 5 day forecast.  
- I then added bootstrap classes to style them to look presentable.  
- After I started on the javascript functions.  
    1. The first step was to make an on click function to save the users input to retrieve data from the api.   
    2. Created two functions to retrieve the data that I needed for the weather  
    from both of the API's that I used. 
    3. I used the first API to retrieve the latitude and longitude from a city name so that I could pass  
    it to the next function to retrieve all of the neccessary information as well as the  
    forecast information.  
    4. I then started to create functions that would allow me to render the information into the correct containers on the page.  
    5. The final step was to save the previous search inputs and display them and also make them clickable.  

## Deployed Application  

[Weather Dashboard](https://juawito.github.io/-Weather-Dashboard-W6/)  
  
  

![Image of weather dashboard](assets/images/dashboard-img.png 'Weather Dashboard')

