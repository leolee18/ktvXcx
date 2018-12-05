let iPh = {
  pxWH:1,
  pxW:375,
  pxH:667
};
let sdkV = '0.0.0';

function obtain() {
  wx.getSystemInfo({
    success: function (res) {
      iPh.pxWH = res.windowWidth / 750;
      iPh.pxW = res.windowWidth;
      iPh.pxH = res.screenHeight;
      sdkV = res.SDKVersion;
    }
  });
}
function getWH() {
  return iPh.pxWH;
}
function getW() {
  return iPh.pxW;
}
function getH() {
  return iPh.pxH;
}

function getSDKV(){
  return sdkV;
}
function verDet(){
  if (getSDKV() < '1.6.0') {
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用部分功能，请升级到最新微信版本后重试。'
    })
  }
}

module.exports = {
  obtain: obtain,
  getWH: getWH,
  getW: getW,
  getH: getH,
  getSDKV: getSDKV,
  verDet: verDet
}