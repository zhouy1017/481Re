const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'data/raw_data.csv',
  header: [
    {id: 'appId', title: 'AppID'},
    {id: 'appDes', title: 'AppDescription'},
    {id: 'appPer', title: 'AppPermission'},
  ]
});

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }  

function getAppIDs(app){
    id = app.appId;
    return id;
}
function getAppDes(app){
    des = app.description;
    return des;
}
function getAppPer(app){
    per = app.permission;
    return per;
}
async function getAppIdList(gplay,appIdList){
    
    var appIdList =  await gplay.developer({devId: "Avelog",throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
    console.log("Loop starts");
    console.log(appIdList);
    var i;
    const appDataList = [];
    for (i = 0;i < appIdList.length;i++){
        var appData;
        var appId = appIdList[i];
        var appDes = await gplay.app({appId: appId,throttle:2}).then(result=>result.description);
        await sleep(1000);
        var appPer = await gplay.permissions({appId: appId,throttle:2}).then(result=>result.map(getAppPer));
        await sleep(1000);
        appData = {
            appId: appId,
            appDes: appDes,
            appPer: appPer
        };
        console.log(appData);
        appDataList.push(appData);
    }
    return appDataList;

}
var gplay = require('google-play-scraper');
var appDataList = getAppIdList(gplay);

