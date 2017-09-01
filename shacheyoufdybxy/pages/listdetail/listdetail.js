var app = getApp()
Page({
  data: {
    current: 0,
    shopList: [],
    page:2,
  },
  showModal: function () {
  // 显示遮罩层
  var animation = wx.createAnimation({
   duration: 200,
   timingFunction: "linear",
   delay: 0
  })
  this.animation = animation
  animation.translateY(300).step()
  this.setData({
   animationData: animation.export(),
   showModalStatus: true
  })
  setTimeout(function () {
   animation.translateY(0).step()
   this.setData({
    animationData: animation.export()
   })
  }.bind(this), 200)
 },
 hideModal: function () {
  // 隐藏遮罩层
  var animation = wx.createAnimation({
   duration: 200,
   timingFunction: "linear",
   delay: 0
  })
  this.animation = animation
  animation.translateY(300).step()
  this.setData({
   animationData: animation.export(),
  })
  setTimeout(function () {
   animation.translateY(0).step()
   this.setData({
    animationData: animation.export(),
    showModalStatus: false
   })
  }.bind(this), 200)
 },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },
  onLoad: function (options) {
  var objectId = options.title;
  console.log(objectId)
 wx.setNavigationBarTitle(
    {
      title: objectId,
      success: function() {
        console.log('setNavigationBarTitle success')
      },
    })
    return false
},
onLoad: function (options) {
    //页面初始化 options为页面跳转所带来的参数
    //var groupId = wx.getStorageSync('groupId')
    var brand_id = options.brand_id;
    var cat_id = options.cat_id;
    var ptype = options.ptype;
    var that = this;
    that.setData({
       op_brand_id:brand_id,
       op_cat_id:cat_id,
       op_ptype:ptype,
    });
    //ajax请求数据
    wx.request({
      url: app.d.ceshiUrl + '/Api/Product/lists',
      method:'post',
      data: {
        brand_id:brand_id,
        cat_id:cat_id,
        ptype:ptype
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var shoplist = res.data.pro;
        that.setData({
          shopList: shoplist
        })
      },
      error: function(e){
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
     
    //对商品进行价格排序
    // console.log(that.data.listgoods);
    // switch1(that.data.listgoods);
    // function switch1(odata) {
    //   for (var i = 0; i < odata.length - 1; i++) {
    //     //console.log(odata[i].price);
    //     for (var j = 0; j < odata.length - i - 1; j++) {
    //       // console.log(parseInt(odata[j].price)+"-----"+parseInt(odata[j+1].price));
    //       if (parseInt(odata[j].market_price) > parseInt(odata[j + 1].market_price)) {
    //         var temp = odata[j];
    //         odata[j] = odata[j + 1];
    //         odata[j + 1] = temp;
    //       }
    //     }
    //   }
    //   console.log(odata)
    //   that.setData({
    //     listgoods: odata
    //   })
    // }
  },
  //详情页跳转
  lookdetail: function (e) {
    console.log(e)
    var lookid = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: "../index/detail?id=" + lookid.id
    })
  },
  switchSlider: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
  },
  changeSlider: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  //点击加载更多
  getMore: function (e) {
    var that = this;
    var page = that.data.page;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Product/getlist',
      method: 'post',
      data: { 
        page: page,
        brand_id: that.data.op_brand_id,
        cat_id: that.data.op_cat_id,
        ptype: that.data.op_ptype
       },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var prolist = res.data.pro;
        if (prolist == '') {
          wx.showToast({
            title: '没有更多数据！',
            duration: 2000
          });
          return false;
        }
        //that.initProductData(data);
        that.setData({
          page: page + 1,
          shopList: that.data.shopList.concat(prolist)
        });
        //endInitData
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }

})
