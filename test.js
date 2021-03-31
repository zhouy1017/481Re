function getAppIDs(app){
    id = app.appId;
    return id;
}

var gplay = require('google-play-scraper');

gplay.developer({devId: "Avelog",throttle: 10}).then((apps)=>{return apps.map(getAppIDs)}).then(console.log);