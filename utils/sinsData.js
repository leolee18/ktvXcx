let mServer = require('server.js');
let err = require('inteError.js');

let jiaZai = {
  jBool: false,
  jNum: 0
}
let mSList = [];

function mInit() {
  mSList = [];
  jiaZai = {
    jBool: false,
    jNum: 0
  }
}
function sinsLoad(mcaId, mcazm, sucFun) {
  wx.showToast({ title: '数据加载中', mask: true, icon: 'loading', duration: 10000 });
  mServer.serverReq('songs/getSingersByCategoryAndAlphabet', { categoryId: mcaId, alphabet: mcazm, start: jiaZai.jNum, count: 30 }, function (data) {
    wx.hideToast();
    //console.log('listgetSingersByCategoryTea:' + JSON.stringify(data));
    if (data.result === 'success') {
      if (data.items) {
        let mArr = data.items[mcazm];
        if (mArr.length >= 10) {
          setJZ(true, 10);
        } else {
          setJZ(false, 0);
        }
        mSList = setSonList(mArr);
        if (typeof sucFun == 'function') sucFun(mSList);
      }
    } else {
      err.inteE(data);
    }
  });
}
//缓存列表
function setJZ(mBool, mNum) {
  let nmN = jiaZai.jNum + mNum;
  jiaZai = {
    jBool: mBool,
    jNum: nmN
  };
}
function getJZ() {
  return jiaZai;
}
function setSonList(mArr) {
  mSList = mSList.concat(mArr);
  return mSList;
}
function getList() {
  return mSList;
}



module.exports = {
  getJZ: getJZ,
  setJZ: setJZ,
  sinsLoad: sinsLoad,
  mInit: mInit,
  getList: getList
}