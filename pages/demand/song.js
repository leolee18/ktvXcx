let mSonD = require('../../utils/sonData.js');
Page({
  data: {
    mList:[]
  },
  sonId: '',
  songTap:function(e){
    let mTag = e.target;
    if (mTag.id == 'songone') {
      console.log(this.data.mList[mTag.dataset.mid])
    }
  },
  onLoad: function (options) {
    let that = this;
    if (options.id && options.id != '') {
      that.sonId = options.id;
    }
    if (options.mname && options.mname != '') {
      wx.setNavigationBarTitle({ title: options.mname });
    }

    mSonD.mInit();
    that.updataList();
  },
  onReachBottom: function () {
    let that = this;
    let mJZ = mSonD.getJZ();
    if (mJZ.jBool) {
      mSonD.setJZ(false, 0);
      that.updataList();
    }
  },
  updataList: function () {
    let that = this;
    mSonD.sonLoad(that.sonId, function (mList) {
      that.setData({ mList: mList });
    });
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})