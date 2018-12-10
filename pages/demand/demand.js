let mDemD = require('../../utils/demData.js');
Page({
  data: {
    mList:[]
  },
  demTap:function(e){
    let mTag = e.target;
    if (mTag.id == 'demone') {
      wx.navigateTo({ url: 'singer?id=' + mTag.dataset.muid + '&mname=' + mTag.dataset.mname});
    }
  },
  onLoad: function (options) {
    let that = this;
    wx.showToast({ title: '数据加载中', mask: true, icon: 'loading', duration: 10000 });
    mDemD.getDemData(function(data){
      wx.hideToast();
      that.setData({ mList: data})
    })
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})