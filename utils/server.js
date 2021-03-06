function serverReq(mUrl,mData,sucFun,errFun) {
    wx.request({
      url: serAdd(mUrl),
      data: mData,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method:"POST",
      success: function(res) {
        if (typeof sucFun == 'function') sucFun(res.data);
      },
      fail:function(res){
        if (typeof errFun == 'function'){
          errFun(res.data);
        }else{
          //if (res.errMsg.indexOf('TLS 版本必') == -1){
            wx.showModal({ title: '小程序提示', content: '网络错误，请稍后重试', showCancel: false });
            wx.hideToast();
          //}
        }
      }
    });
}
function getNetType(){
  wx.getNetworkType({
    success: function (res) {
      if (res.networkType == 'none') {
        wx.showModal({ title: '温馨提示', content: '网络错误，请稍后重试', showCancel: false });
      }
    }
  });
}
function serAdd(addres){
  var serInter = 'http://10.0.0.198:42090/';
	
  var kc = 'v1/';
	var returnStr = serInter;
	switch (addres){
    case 'social/login':
    case 'player/getPlayer':
    case 'binding':
    case 'songs/getSingerCategories':
    case 'songs/getSongsBySinger':
    case 'songs/getSingersByCategoryAndAlphabet':
			returnStr = serInter+kc+addres;
			break;		
		case 'local':
      returnStr = 'http://10.0.0.198:42090/v1/';
			break;	
		default:
			returnStr = serInter;
			break;
	}
	return returnStr;
}
function serUrl(url){
	var myUrl = "";
	if(url != null && url != undefined){
		myUrl = url;
	}
	if(myUrl.length > 5){
		var myType = url.substr(0,5);
    if (myType != "http:" && myType != "wxfil" && myType != "https"){
			myUrl = serAdd('local') + myUrl;
		}
	}
	return myUrl;
}
module.exports = {
  serverReq:serverReq,
  serAdd:serAdd,
	serUrl:serUrl,
  getNetType:getNetType
}