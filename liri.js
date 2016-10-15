// Liri needs to pull data from the key.js file
var keys = require('./keys.js');


var Twitter = require('twitter');
var Spotify = require('spotify');
var client = new Twitter(keys.twitterKeys);
var fs = require('fs');
//
// console.log(keys.twitterKeys);

function twitter(){
  var params = {screen_name: 'drakeba11', count: 20, trim_user: true};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at + " : " + tweets[i].text);
        console.log("=============================================");
      }
      } else {
        console.log(error);
      }

});
};



if(process.argv[2] == "my-tweets") {
  twitter();
};
