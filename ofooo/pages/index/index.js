//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    latitude: 28.698505,//纬度
    longitude: 115.855414,
    scale: 18,   //缩放级别
    marks:[
    {
      id: 0,
      title: "去这里",
      iconPath: "/images/markers.png",
      latitude: 28.714621,
      longitude: 115.82749,
      width: 45,
      height: 50
    }]
  },
  //事件处理函数
  bindregionchange: function(e) {
    if (e.type == "begin") {
      console.log("begin");
    }
    else if (e.type == "end") {
      console.log("end");
    }
  },
  bindcontroltap: function(e) {
    switch(e.controlId){
      case 1:
      this.movetoPosition();
      break;
      case 2:
      wx.scanCode({
        success: (res) => {
          console.log(res);
        }
      })
      break;
    }
  },
  movetoPosition: function() {
    this.mapCtx.moveToLocation();
  },

  onLoad: function () {
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    wx.getLocation({
      type:"gcj02",
      success: (res) => {
        console.log(res);
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    }),
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls:[{
            id: 1,
            iconPath: '/images/location.png',
            position: {
              left: 20,
              top: res.windowHeight - 80,
              width: 50,
              height: 50
            },
            clickable: true
          },
          {
            id: 2,
            iconPath: '/images/use.png',
            position: {
              left: res.windowWidth/2 - 45,
              top: res.windowHeight - 100,
              width: 90,
              height: 90
            },
            clickable: true
          },
          {
            id: 3,
            iconPath: '/images/warn.png',
            position: {
              left: res.windowWidth - 70,
              top: res.windowHeight - 80,
              width: 50,
              height: 50
            },
            clickable: true
          },
          {
            id: 4,
            iconPath: '/images/marker.png',
            position: {
              left: res.windowWidth/2 - 11,
              top: res.windowHeight/2 - 45,
              width: 22,
              height: 45
            },
            clickable: true
          },
          {
            id: 5,
            iconPath: '/images/avatar.png',
            position: {
              left: res.windowWidth - 68,
              top: res.windowHeight - 155,
              width: 45,
              height: 45
            },
            clickable: true
          }]

        })
      }
    })
  },
  onShow: function() {
    console.log("onShow");
    this.mapCtx = wx.createMapContext("ofoMap");
    this.movetoPosition();
  }
})
