let mServer = require('server.js');

let mToken = '';
let mUser = null;
let pageLogin = true;
let userFunt = [];
let shareId = '';
let userId = '';

function mLogin(sucFun) {
  wx.checkSession({
    success: function () {
      let value = wx.getStorageSync('userToken');
      if (value) {
        mToken = value;
        mUserToken(mToken, sucFun);
      } else {
        loginCode(sucFun);
      }
    },
    fail: function () {
      loginCode(sucFun);
    }
  })
}
function loginCode(sucFun) {
  wx.login({
    success: function (res) {
      if (res.code) {
        let mSendObj = { code: res.code, type:7};
        mUserCode(mSendObj, sucFun);
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
}
function mUserCode(mSend, sucFun) {
  mServer.serverReq('social/login', mSend, function (data) {
    //console.log('login:'+JSON.stringify(data));
    if (data.result === 'success') {
      let mObj = data.items.info;
      mToken = mObj.playerId;
      if (mUser){
        mUser.nickName = mObj.nickName;
        mUser.headImgPath = mObj.headImgPath;
        mUser.appType = mObj.appType;
        mUser.deviceId = mObj.deviceId;
      }else{
        mUser = {
          nickName: mObj.nickName,
          headImgPath: mObj.headImgPath,
          appType: mObj.appType,
          deviceId: mObj.deviceId
        }
      }
      
      try {
        wx.setStorageSync('userToken', mToken);
      } catch (e) { }
      
      if (typeof sucFun == 'function') sucFun(mToken);
      pageRedirect(mObj.nickName == '');
    }
  });
}
function mUserToken(mToken, sucFun) {
  mServer.serverReq('player/getPlayer', { playerId: mToken }, function (data) {
    //console.log('getUser:' +JSON.stringify(data));
    if (data.result === 'success') {
      let mObj = data.items.info;
      mToken = mObj.playerId;
      if (mUser) {
        mUser.nickName = mObj.nickName;
        mUser.headImgPath = mObj.headImgPath;
        mUser.appType = mObj.appType;
        mUser.deviceId = mObj.deviceId;
      } else {
        mUser = {
          nickName: mObj.nickName,
          headImgPath: mObj.headImgPath,
          appType: mObj.appType,
          deviceId: mObj.deviceId
        }
      }
      if (typeof sucFun == 'function') sucFun(mToken);
      pageRedirect(mObj.nickName == '');
    } else {
      console.log('重新授权');
      loginCode(sucFun);
    }
  });
}
function pageRedirect(mBool){
  if (mBool && getCurrentPages().length >= 1) {
    let mCur = getCurrentPages()[(getCurrentPages().length - 1)];
    if (mCur.route !== 'pages/login/login' && pageLogin) {
      pageLogin = false;
      wx.navigateTo({ url: '/pages/login/login' });//wx.navigateTo//wx.reLaunch
    }
  }
}

//用户主动触发登录
function bGUinfo(detail, sucFun) {
  if (detail.errMsg !== 'getUserInfo:ok'){
    return;
  }
  let mInfo = detail.userInfo;
  mUser = {
    nickName: mInfo.nickName,
    headImgPath: mInfo.avatarUrl
  }

  let mSendObj = {};
  mSendObj.type = 7;
  if (detail.encryptedData) mSendObj.encrpytdata = detail.encryptedData;
  if (detail.iv) mSendObj.encrpytiv = detail.iv;
  wx.login({
    success: function (res) {
      if (res.code) {
        mSendObj.code = res.code;
        mUserCode(mSendObj, sucFun);
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
}


function getToken() {
  return mToken;
}
function setToken(mTo) {
  mToken = mTo;
}
function getUser() {
  let myUser = {nickName: '匿名', headImgPath: '' };
  if (mUser){
    myUser = JSON.parse(JSON.stringify(mUser));
    if (!myUser.nickName || myUser.nickName == '') {
      myUser.nickName = '匿名';
    }
    if (!myUser.headImgPath || myUser.headImgPath == '') {
      myUser.headImgPath = '';
    }
  }
  return myUser;
}

////////////////////////////////////////////////////////
function getUserInfo(infoFun) {
  let that = this;
  userFunt.push(infoFun);
  if (userFunt.length > 1) {
    return;
  }

  if (mToken != '') {
    let mLeng = userFunt.length;
    mUserToken(mToken, function (mToken) {
      for (let i = 0; i < mLeng; i++) {
        let nCb = userFunt.shift();
        typeof nCb == "function" && nCb(mToken);
      }
    });
  } else {
    mLogin(function (mToken) {
      let mLeng = userFunt.length;
      for (let i = 0; i < mLeng; i++) {
        let nCb = userFunt.shift();
        typeof nCb == "function" && nCb(mToken);
      }
    })
  }
}
////////////////////////////////////////////////////////////
function setShareid(mId){
  shareId = mId;
}
function getUserId() {
  let mId = '';
  if (userId) {
    mId = userId;
  }else{
    let value = wx.getStorageSync('userId');
    if (value) {
      mId = value;
    }
  }
  return mId;
}

module.exports = {
  mLogin: mLogin,
  getToken: getToken,
  setToken: setToken,
  getUser: getUser,
  bGUinfo: bGUinfo,
  getUserInfo: getUserInfo,
  setShareid: setShareid,
  getUserId: getUserId
}