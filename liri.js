var dotenv = require("dotenv").config();
var request = require("request");
var Twitter = require("twitter");
const keys = require("./keys.js");


/* var spotify = new Spotify(keys.spotify); */ 


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

    default:
    console.log("Liri Didn't like that, try another command! :)")
}

 function tweets() {
    var client = new Twitter(keys.twitter); 
    var params = {screen_name: "realDonaldTrump", count: 10};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
        console.log("Hello its an error: " + error);
        console.log(client)
  }
        else {
            let data = []; //empty array to hold data
            for (let i = 0; i < tweets.length; i++) {
                data.push({
                    'Created at: ': tweets[i].created_at,
                    'Tweets: ': tweets[i].text,
                });
            }
            console.log(data);
        }
});
}; 

/* function spotify() {
    console.log("spotify do something");
} */

function movie() {
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log ("---------------------------------------");
            console.log ("The Movie Title: " + JSON.parse(body).Title);
            console.log ("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log ("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
            console.log ("Country Movie Produced in: " + JSON.parse(body).Country);
            console.log ("Language: " + JSON.parse(body).Language);
            console.log ("Plot: " + JSON.parse(body).Plot);
            console.log ("Actors: " + JSON.parse(body).Actors);
            console.log ("---------------------------------------");
         
        };
    });

};




/* 
function doWhat() {
    console.log("do what it says");
} */

/* 
1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
   * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
     * It's on Netflix!
   
   * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands. */