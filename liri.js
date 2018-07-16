var dotenv = require("dotenv").config();
console.log("dotenv: ", dotenv);
var request = require("request");
console.log("request: ", request);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
console.log("spotify key: ", spotify);
console.log("twitter key: ", client);

var operation = process.argv[2];
var input = process.argv[3];

switch (operation) {
    case "my-tweets":
    tweets();
    break;

    case "spotify-this-song":
    spotify();
    break;

    case "movie-this":
    movie();
    break;

    case "do-what-it-says":
    doWhat();
    break;
}

function tweets() {
    console.log("twitter do something");
}

function spotify() {
    console.log("spotify do something");
}

function movie() {
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body);
            console.log ("Title: " + JSON.parse(body).imdbRating);
    }
});

   


function doWhat() {
    console.log("do what it says");
}