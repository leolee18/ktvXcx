let mLogin = require('../../utils/mLogin.js');
Page({
  getUserInfo: function (e) {
    let that = this;
    wx.showToast({ title: '请求处理中……', mask: true, icon: 'loading', duration: 10000 });
    mLogin.bGUinfo(e.detail,function(mToken){
      wx.hideToast();
      //wx.switchTab({ url: '/pages/index/index' });
      wx.navigateBack();
    });
  }
})