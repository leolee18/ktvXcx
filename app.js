let mLogin = require('utils/mLogin.js');
let mPh = require('utils/iPhone.js');
let mDev = require('utils/deviceData.js');
App({
  onLaunch: function (e) {
    let that = this;
    //系统信息
    mPh.obtain();
    mPh.verDet();
    //设置设备号
    if (e.query && e.query.q) mDev.init(e.query);
    //调试
    //wx.setEnableDebug({ enableDebug: true });
    //登录（获取用户信息）
    mLogin.getUserInfo(function (mToken) {
      mDev.binding(mToken);
      //console.log('mToken::' + mToken);
      //console.log('uObj:' + JSON.stringify(mLogin.getUser()))
    });
  }
})