const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {

    // takes in the zip from the html form, display in // console. Takes in as string, ex. for zip 02139
        var city_id = String(req.body.cityInput);
        console.log(req.body.cityInput);

    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "e7dfd634660c6044b98fa6f22b0dd6a1";

          const url = "https://api.openweathermap.org/data/2.5/weather?id=" + city_id + "&units=" + units + "&appid=" + apiKey;

           
          //"https://api.openweathermap.org/data/2.5/weather?zip=" + zip +  "&units=" + units + "&APPID=" + apiKey;

    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);

        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const winddirection = weatherData.wind.deg;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2>The Temperature in " + city + " " + " is " + temp + " Degrees Fahrenheit<h2>");
            res.write(humidity)
            res.write(windSpeed)
            res.write(winddirection)
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
