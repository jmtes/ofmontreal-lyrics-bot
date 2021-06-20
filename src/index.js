const { TwitterClient } = require('twitter-api-client');
const lyrics = require('./lyrics');

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const client = new TwitterClient({
  apiKey: process.env.OM_API_KEY,
  apiSecret: process.env.OM_API_SECRET,
  accessToken: process.env.OM_ACCESS_TOKEN,
  accessTokenSecret: process.env.OM_ACCESS_SECRET,
});

const lyric = getRandomElement(lyrics);

client.tweets
  .statusesUpdate({ status: lyric })
  .then(res => console.log(res.text))
  .catch(err => console.log(err));
