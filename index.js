/**
Description: Takes latitue and longitude from the client and returns weather data from an API based on the client's input.

Name: Keanu Valencia
Date: 3/5/24
Class: ICS 385
**/

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// displays index.html of root path.
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

// invoked after hitting go in the html form.
app.post("/", function(req, res) {
    
    // takes in the Lat and Long from the client and stores them in a String variable.
    var lat = String(req.body.latInput);
    console.log(req.body.latInput);
    var long = String(req.body.longInput);
    console.log(req.body.longInput);

    const units = "imperial";
    const apiKey = "e7dfd634660c6044b98fa6f22b0dd6a1";

    // API URL with parameters.
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + units + "&appid=" + apiKey;
    
    // this gets the data from Open WeatherAPI.
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // Creating variables based on the data from the API.
        response.on("data", function(data){
          const weatherData = JSON.parse(data);

          console.log(weatherData);

          // Variables for Description, Temp, Icon, Humidity, Wind Speed, and Cloudiness
          const temp = weatherData.main.temp;
          const city = weatherData.name;
          const humidity = weatherData.main.humidity;
          const windSpeed = weatherData.wind.speed;
          const cloudiness = weatherData.clouds.all;
          const weatherDescription = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
          // displays the output of the results.
          res.write("<h1> The weather is " + weatherDescription + "<h1>");
          res.write("<h2>The temperature in " + city + " is " + temp + " Degrees Fahrenheit<h2>");
          res.write("<h2>The humidity in " + city + " is " + humidity + "% </h2>");
          res.write("<h2> The winds in " + city + " are " + windSpeed + " miles per hour </h2>");
          res.write("<h2> The cloudiness in " + city + " is " + cloudiness + "% </h2>");
          res.write("<img src=" + imageURL +">");
          res.send();
        });
    });
})

// Output on the terminal.
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});

/**
Test Scripts: See if the submit button returns all required data from the API.

AI used and Prompt: None.
**/
