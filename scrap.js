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
async function getAppIdList(gplay){
    var appIdList_1 =  [];
    var appIdList_2 =  [];
    var appIdList_3 =  [];
    var appIdList_4 =  [];
    var appIdList_5 =  [];
    var appIdList_6 =  [];
    var appIdList_7 =  [];
    var appIdList_8 =  [];
    var appIdList = [];
    var tries = 0;
    var maxTries = 10;
    while(true){
        try{
            appIdList_1 =  await gplay.developer({devId: "Google LLC",throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(1000);
            appIdList_2 =  await gplay.developer({devId: "Amazon Mobile LLC",throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(1000);
            appIdList_3 =  await gplay.developer({devId: "Apple Inc.",throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(1000);
            appIdList_4 =  await gplay.developer({devId: "Samsung Electronics Co.,  Ltd.",throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(1000);
            appIdList_5 =  await gplay.developer({devId: "Facebook",throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(1000);
            appIdList_6 =  await gplay.developer({devId: "Microsoft Corporation",throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(1000);
            appIdList_7 =  await gplay.developer({devId: "Adobe",throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(1000);
            appIdList_8 =  await gplay.developer({devId: "Motorola Mobility LLC.",throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
 
            break;
        }catch(err){

            if (++tries == maxTries){
                throw err;
            }
            console.log("Retreis:"+tries);
            await sleep(5000*tries);

        }
    }
    appIdList = appIdList_1.concat(appIdList_2,appIdList_3,appIdList_4,appIdList_5,appIdList_6,appIdList_7,appIdList_8);
    var i;
    var l = appIdList.length;
    console.log("There are "+l+" apps to scrap, starting job...");
    const appDataList = [];
    for (i = 0;i < appIdList.length;i++){
        var appData;
        var appId = appIdList[i];
        var tries = 0;
        var maxTries = 10;
        var appInfo;
        var appPer;
        while(true){
            try{
                appInfo =  await gplay.app({appId: appId,throttle:2}).then(result=>result);
                await sleep(1000);
                appPer = await gplay.permissions({appId: appId,throttle:2}).then(result=>result.map(getAppPer));
                break;
            }catch(err){
                if (++tries == maxTries){
                    i = i + 1;
                    tries = 0;
                    appId = appIdList[i];
                    continue;
                }
                console.log("Retreis:"+tries);
                await sleep(5000*tries);
            }
        }
        //Drop apps with ratings below 2.5
        var appRating = appInfo.score;
        if(appRating < 3.0){continue};
        var appDes = appInfo.description;

        
        await sleep(1000);
        appData = {
            appId: appId,
            appDes: appDes,
            appPer: appPer
        };
        appDataList.push(appData);
        console.log((i+1) + "/"+l+"...");
    }
    return appDataList;

}
async function writeAsCsv(gplay,csvWriter){
    const appDataList = await getAppIdList(gplay);
    csvWriter
    .writeRecords(appDataList)
    .then(()=> console.log('The CSV file was written successfully'));
}
var gplay = require('google-play-scraper');
writeAsCsv(gplay,csvWriter);

