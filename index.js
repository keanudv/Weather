/**
Description: Takes a city name from the client and returns weather data from an API.

Name: Keanu Valencia
Date: 2/28/24
Class: ICS 385
**/

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path.
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form.
app.post("/", function(req, res) {
    
    // takes in the city from the html form and console logs it.
    var cityName = String(req.body.cityInput);
    console.log(req.body.cityInput);
    
    const units = "imperial";
    const apiKey = "e7dfd634660c6044b98fa6f22b0dd6a1";

    //API URL with parameters.
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherAPI.
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // Creating variables based on the data from the API.
        response.on("data", function(data){
          const weatherData = JSON.parse(data);

          console.log(weatherData);
          
          const temp = weatherData.main.temp;
          const city = weatherData.name;
          const humidity = weatherData.main.humidity;
          const windSpeed = weatherData.wind.speed;
          const weatherDescription = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
          // displays the output of the results.
          res.write("<h1> The weather is " + weatherDescription + "<h1>");
          res.write("<h2>The temperature in " + city + " is " + temp + " Degrees Fahrenheit<h2>");
          res.write("<h2>The humidity in " + city + " is " + humidity + "% </h2>");
          res.write("<h2> The winds in " + city + " are " + windSpeed + " miles per hour </h2>");
          res.write("<img src=" + imageURL +">");
          res.send();
        });
    });
})

// Output on the termial.
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});

/**
Test Scripts: Enter different city names and press the Go button to see if it works.

AI used and Prompt: None.
**/
