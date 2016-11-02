// Liri needs to pull data from the key.js file
var keys = require('./keys.js');

//creating dependencies
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var client = new Twitter(keys.twitterKeys);
var fs = require('fs');
//



function twitter() {
    var params = {
        screen_name: 'drakeba11',
        count: 20,
        trim_user: true
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at + " : " + tweets[i].text);
                console.log("=============================================");
            }
        }

    });
}

//spotify npm set up
var getArtistNames = function(artist) {
    return artist.name;
}

var getMeSpotify = function(songName) {

    spotify.search({
        type: 'track',
        query: songName
    }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('=============================================');
        }
    });
}

var getMeMovie = function(movieName) {

    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function(error, response, body) {

        if (!error && response.statusCode == 200) {

            var jsonData = JSON.parse(body);
            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: ' + jsonData.Rated);
            console.log('IMDB Rating: ' + jsonData.imdbRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
            console.log('Rotten Tomatoes URL: ' + jsonData.tomatoURL);
        }
    });
}
var doWhatItSays = function() {

        fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) throw err;

            var dataArr = data.split(',');

            if (dataArr.length == 2) {
                pick(dataArr[0], dataArr[1]);
            } else if (dataArr.length == 1) {
                pick(dataArr[0]);
            }


        });
    }
    //switch statements
var pick = function(caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            twitter();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            getMeMovie(functionData);
            break;
        case 'do-what-it-says':
            doWhatItSays();
          break;
        default:
        console.log('LIRI DOES NOT KNOW HOW TO DO THIS');

    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
