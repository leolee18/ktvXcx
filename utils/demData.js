let mServer = require('server.js');
let err = require('inteError.js');

let mDemList = [];

function getDemData(sucFun) {
  if (mDemList.length >0){
    if (typeof sucFun == 'function') sucFun(mDemList);
  }else{
    mServer.serverReq('songs/getSingerCategories', {}, function (data) {
      //console.log('getSingerCategories:' + JSON.stringify(data));
      if (data.result === 'success') {
        listClass(data.items);
        if (typeof sucFun == 'function') sucFun(mDemList);
      } else {
        err.inteE(data);
      }
    });
  }
}
function listClass(mArr){
  mArr.forEach(function (value, index, array) {
    let midArr = value.uid.split("_");
    mDemList[midArr[0]];
    if (!mDemList[midArr[0]]) mDemList[midArr[0]] = [];
    mDemList[midArr[0]].push(value);
  });
}


module.exports = {
  getDemData: getDemData
}