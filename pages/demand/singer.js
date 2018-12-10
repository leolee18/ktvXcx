let mSinD = require('../../utils/sinsData.js');
Page({
  data: {
    mList:[],
    sinZm:'A'
  },
  sinId:'',
  sinZM:'A',
  zmTap:function(e){
    let mTag = e.target;
    if (mTag.id && mTag.id != '') {
      this.sinZM = mTag.id;
      this.setData({ sinZm: mTag.id });
    }
    mSinD.mInit();
    this.updataList();
  },
  singTap: function (e) {
    let mTag = e.target;
    if (mTag.id == 'sinone') {
      wx.navigateTo({ url: 'song?id=' + mTag.dataset.muid + '&mname=' + mTag.dataset.mname });
    }
  },
  onLoad: function (options) {
    let that = this;
    if (options.id && options.id != ''){
      that.sinId = options.id;
    }
    if (options.mname && options.mname != ''){
      wx.setNavigationBarTitle({ title: options.mname});
    }

    mSinD.mInit();
    that.updataList();
  },
  onReachBottom: function () {
    let that = this;
    let mJZ = mSinD.getJZ();
    if (mJZ.jBool) {
      mSinD.setJZ(false, 0);
      that.updataList();
    }
  },
  updataList: function () {
    let that = this;
    mSinD.sinsLoad(that.sinId, that.sinZM,function (mList) {
      that.setData({ mList: mList });
    });
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  }
})