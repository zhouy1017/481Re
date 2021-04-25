var gplay = require('google-play-scraper');

gplay.list({
    collection: gplay.collection.TRENDING,num:500,throttle:2
  })
  .then(console.log, console.log);