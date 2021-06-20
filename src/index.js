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

const { lyric, spotifyUrl } = getRandomElement(lyrics);

client.tweets
  .statusesUpdate({ status: lyric })
  .then(res => {
    console.log(`Tweeted lyric "${res.text}"`);
    client.tweets
      .statusesUpdate({
        status: spotifyUrl,
        in_reply_to_status_id: res.id_str,
      })
      .then(res => console.log('Replied with Spotify URL'))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
