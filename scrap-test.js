// Scrap AppInfo from toplists and filter out those already in Reference set

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'data/test_data.csv',
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
    var appIdList_9 =  [];
    var appIdList_10 =  [];
    var appIdList_11 =  [];
    var appIdList = [];
    var tries = 0;
    var maxTries = 10;


    while(true){
        try{

            appIdList_1 =  await gplay.list({collection: gplay.collection.TOP_FREE,num:250,throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(250);
            console.log("1 Done!");
            tries = 0;
            break;
        }catch(err){

            tries++;
            console.log("1 Failed!")
            console.log("Retreis:"+tries);
            await sleep(250*tries);

        }
    }
    while(true){
        try{

            appIdList_2 =  await gplay.list({collection: gplay.collection.TOP_PAID,num:1000,}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(250);
            console.log("2 Done!");
            tries = 0;
            break;
        }catch(err){

            tries++;
            console.log("2 Failed!")
            console.log("Retreis:"+tries);
            await sleep(250*tries);

        }
    }
    while(true){
        try{


            appIdList_3 =  await gplay.list({collection: gplay.collection.GROSSING,num:1000}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(250);
            console.log("3 Done!");
            tries = 0;
            break;
        }catch(err){

            tries++;
            console.log("3 Failed!")
            console.log("Retreis:"+tries);
            await sleep(250*tries);

        }
    }


    
    while(true){
        try{

            appIdList_5 =  await gplay.list({collection: gplay.collection.TOP_FREE_GAMES,num:500,throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(250);
            console.log("5 Done!");
            tries = 0;
            break;
        }catch(err){

            tries++;
            console.log("5 Failed!")
            console.log("Retreis:"+tries);
            await sleep(250*tries);
        }
    }
    while(true){
        try{

            appIdList_6 =  await gplay.list({collection: gplay.collection.TOP_PAID_GAMES,num:500,throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(250);
            console.log("6 Done!");
            tries = 0;
            break;
        }catch(err){

            tries++;
            console.log("6 Failed!")
            console.log("Retreis:"+tries);
            await sleep(250*tries);

        }
    }    
    while(true){
        try{

            appIdList_7 =  await gplay.list({collection: gplay.collection.TOP_GROSSING_GAMES,num:500,throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(250);
            console.log("7 Done!");
            tries = 0;
            break;
        }catch(err){

            tries++;
            console.log("7 Failed!")
            console.log("Retreis:"+tries);
            await sleep(250*tries);

        }
    }    
    while(true){
        try{

            appIdList_8 =  await gplay.list({collection: gplay.collection.NEW_FREE,num:250,throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(250);
            console.log("8 Done!");
            tries = 0;
            break;
        }catch(err){

            tries++;
            console.log("8 Failed!")
            console.log("Retreis:"+tries);
            await sleep(250*tries);

        }
    }
    while(true){
        try{

            appIdList_11 =  await gplay.list({collection: gplay.collection.NEW_PAID_GAMES,num:250,throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(250);
            console.log("11 Done!");
            tries = 0;
            break;
        }catch(err){

            tries++;
            console.log("11 Failed!")
            console.log("Retreis:"+tries);
            await sleep(250*tries);

        }
    }
    while(true){
        try{

            appIdList_9 =  await gplay.list({collection: gplay.collection.NEW_PAID,num:250,throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(250);
            console.log("9 Done!");
            tries = 0;
            break;
        }catch(err){

            tries++;
            console.log("9 Failed!")
            console.log("Retreis:"+tries);
            await sleep(250*tries);

        }
    }
    while(true){
        try{

            appIdList_10 =  await gplay.list({collection: gplay.collection.NEW_FREE_GAMES,num:250,throttle:2}).then((apps)=>{return apps.map(getAppIDs)});
            await sleep(250);
            console.log("10 Done!");
            tries = 0;
            break;
        }catch(err){

            tries++;
            console.log("10 Failed!")
            console.log("Retreis:"+tries);
            await sleep(250*tries);

        }
    }

    console.log("All Lists Done!");
    appIdList = appIdList_1.concat(appIdList_2,appIdList_3,appIdList_5,appIdList_6,appIdList_7,appIdList_8,appIdList_9,appIdList_10,appIdList_11);
    var i;
    var l = appIdList.length;
    console.log("There are "+l+" apps to scrap, starting job...");
    const appDataList = [];
    for (i = 0;i < appIdList.length;i++){
        var appData;
        var appId = appIdList[i];
        var tries = 0;
        var maxTries = 30;
        var appInfo;
        var appPer;
        while(true){
            try{
                appInfo =  await gplay.app({appId: appId,throttle:2}).then(result=>result);
                await sleep(150);
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
                await sleep(1500*tries);
            }
        }
        //Drop apps with ratings below 2.5
        var appRating = appInfo.score;
        if(appRating < 3.0){continue};
        var appDes = appInfo.description;

        
        await sleep(250);
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

