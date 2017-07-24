var fs = require('fs'); //file system
var request = require('request'); //npm packages
var Spotify = require('node-spotify-api');
var twitter = require('twitter');

var keys = require('./keys.js'); //grabs keys for twitter

var action = process.argv[2]; //grabs user arguement / action
var value = process.argv[3]; //grabs specific search item


switch (action) { //if / else for user arguement input. calls proper function
    case "my-tweets":
        twitterFunction();
        break;

    case "spotify-this-song":
        spotifyFunction();
        break;

    case "movie-this":
        omdbFunction();
        break;

    case "do-what-it-says":
        randomFunction();
        break;
}

function twitterFunction() { //twitter function

    var twitterKeys = keys.twitterKeys; //keys needed for file
    var client = new twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
    });
    var handleName = { screen_name: 'jaybiz03', count: 20 }; //provides name for api call
    client.get('statuses/user_timeline', handleName, function(error, tweets, response) {
        if (error) {
            return console.log('Error occurred: ' + err);
        }

        for (var i = 0; i < tweets.length; i++) { //loops through response data
            console.log(tweets[i].text + " created at " + tweets[i].created_at); //console logs result
            console.log("(╯°□°）╯︵ ┻━┻)"); //i do not use twitter
        }

    });
}

function spotifyFunction() { //spotify function
    var spotify = new Spotify({ //keys
        id: 'd65ef172b2f14af9815b15b1332fd0ec',
        secret: '37676f67c2fb4f0da5797d7ce93ebe0e'
    });

    var songSearch;
    if (value === undefined) { //if else statement if there is no argv[3] or specific item
        songSearch = 'The Sign ace of base';
    } else {
        songSearch = value;
    }

    spotify.search({ type: 'track', query: songSearch }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (i = 0; i < data.tracks.items.length; i++) { //loops through results and console logs the data
            console.log('');
            console.log('Artist Name: ' + data.tracks.items[i].artists[0].name);
            console.log('Track Name: ' + data.tracks.items[i].name);
            console.log('Preview Link: ' + data.tracks.items[i].preview_url);
            console.log('Album Name: ' + data.tracks.items[i].album.name);
        }
    });
};

function omdbFunction() { //movie function

    var movie;

    if (value === undefined) { //if else statement if there is no argv[3] or specific item
        movie = 'Mr. Nobody';
    } else {
        movie = value;
    }
    var movieUrl = 'https://www.omdbapi.com/?t=' + movie + '&apikey=40e9cece';

    request(movieUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var results = JSON.parse(body)
            console.log('ლ(ಠ益ಠლ)'); //used this api for project. did not play well with results
            console.log(results);
            console.log('Title: ' + results.Title);
            console.log('');
            console.log('Year: ' + results.Year);
            console.log('');
            console.log('IMDB rating: ' + results.imdbRating);
            console.log('');
            console.log('Rotten Tomato rating: ' + results.Ratings[1].Value);
            console.log('');
            console.log('Country Produced: ' + results.Country);
            console.log('');
            console.log('Language: ' + results.Language);
            console.log('');
            console.log('Plot: ' + results.Plot);
            console.log('');
            console.log('Actors: ' + results.Actors)
        } else
            console.error('Error occurred: ' + err);
    });
}

function randomFunction() { //random function
    fs.readFile('random.txt', 'utf8', function(err, data) { //grabs data from random.text file

        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var dataArr = data.split(',');
        command = dataArr[0];
        value = dataArr[1];

        spotifyFunction(dataArr[1]) //unsure if this is the right way to go about the problem of calling the items in the .txt file?

    });
}