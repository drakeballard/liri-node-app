// Liri needs to pull data from the key.js file
var keys = require('./keys.js');

// get all the different variables from the jey.js
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;

// console logging this right now, but it may be deleted due to the fact that it reveals information
for (var key in twitterKeys) {
  console.log("Twitter key: " + twitterKeys[key]);
};
for (var key in spotifyKeys) {
  console.log("Spotify key: " + spotifyKeys[key]);
};
