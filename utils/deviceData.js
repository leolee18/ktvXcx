let mServer = require('server.js');

let mOptions = null;
let deviceId = '';
let mUrl = '';
let mPid = '';


function init(mOpt, sucFun) {
  mOptions = mOpt;
  setUrlId(mOptions, sucFun);
}
function setUrlId(mOpti, sucFun) {
  if (mOpti && mOpti.q && mOpti.q != '') {
    mUrl = decodeURIComponent(mOpti.q);
    deviceId = getQrParam(mUrl, 'devid');
  }
  if (typeof sucFun == 'function') sucFun(deviceId);
}
function getQrParam(mStr, mName) {
  let mUrlArr = mStr.split("?");
  if (mUrlArr && mUrlArr.length > 1) {
    let mParArr = mUrlArr[1].split("&");
    let mArr;
    for (var i = 0; i < mParArr.length; i++) {
      mArr = mParArr[i].split("=");
      if (mArr != null && mArr[0] == mName) {
        return mArr[1];
      }
    }
  }
  return "";
}
function setDevId(erData){
  if (erData && erData != ''){
    mUrl = decodeURIComponent(erData);
    deviceId = getQrParam(mUrl, 'devid');
  }
  return deviceId;
}
function getDevId(){
  return deviceId;
}

function binding(pid, sucFun){
  if (deviceId && deviceId != ''){
    bindingLoad(pid, deviceId, sucFun);
  }else{
    mScanCode(function(did){
      bindingLoad(pid, did, sucFun);
    });
  }
}
function mScanCode(sucFun){
  wx.showModal({
    content: '需要绑定设备才能操作', showCancel: false, success(res) {
      wx.scanCode({onlyFromCamera: false, success: (res) => {
          setDevId(res.result);
          if(typeof sucFun == 'function') sucFun(deviceId);
        }
      })
    }
  })
}
function bindingLoad(pid, did, sucFun){
  mServer.serverReq('binding', { playerId: pid, deviceId: did}, function (data) {
    //console.log('binding:'+JSON.stringify(data));
    if (data.result === 'success') {}
    if (typeof sucFun == 'function') sucFun(data);
  });
}
  

module.exports = {
  init: init,
  setDevId: setDevId,
  getDevId: getDevId,
  binding: binding
}