// Liri needs to pull data from the key.js file
var keys = require('./keys.js');

//creating dependencies
var Twitter = require('twitter');
var spotify = require('spotify');
var client = new Twitter(keys.twitterKeys);
var fs = require('fs');
//



function twitter(  ) {
  var params = {screen_name: 'drakeba11', count: 20, trim_user: true};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at + " : " + tweets[i].text);
        console.log("=============================================");
      }
      }

});
}

//spotify npm set up

var getMeSpotify = function(songName) {

  spotify.search({ type: 'track', query: songName }, function(err, data) {
      if (err) {
          console.log('Error occurred: ' + err);
          return;
      }
      console.log(data.tracks.items[0]);
  });
}
//switch statements
var pick = function(caseData, functionData) {
  switch(caseData) {
    case 'my-tweets':
      twitter( );
      break;
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;
    default:
    console.log('LIRI DOES NOT KNOW HOW TO DO THAT');

  }
}

var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

// if(process.argv[2] == "my-tweets") {
//   twitter();
// };
