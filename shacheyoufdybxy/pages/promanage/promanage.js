// pages/promanage/promanage.js
var app = getApp();
Page({
  data: {
    page: 2
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Product/myshop_prolists',
      method: 'post',
      data: {uid:app.globalData.userInfo.id},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(res.data.status==1){
          var list = res.data.err;
          that.setData({
            list: list
          });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 30000
        });
      },
    })
  },
  getMore: function (e) {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Product/myshop_prolists',
      method: 'post',
      data: {
        uid: app.globalData.userInfo.id,
        page: that.data.page
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.status == 1) {
          var list = res.data.err;
          that.setData({
            page: that.data.page + 1,
            list: that.data.list.concat(list),
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 30000
        });
      },
    })
  },
  del:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否删除该商品？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.d.ceshiUrl + '/Api/Product/myshop_prodel',
            method: 'post',
            data: {
              uid: app.globalData.userInfo.id,
              proid: id
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.status == 1) {
                wx.showToast({
                  title: res.data.err
                })               
                that.reload();
              } else {
                wx.showToast({
                  title: res.data.err,
                  duration: 2000
                });
              }
            },
            error: function (e) {
              wx.showToast({
                title: '网络异常！',
                duration: 30000
              });
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })   
  },
  reload:function (e){
    var that = this;
    that.setData({
      page:2
    })
    wx.request({
      url: app.d.ceshiUrl + '/Api/Product/myshop_prolists',
      method: 'post',
      data: { uid: app.globalData.userInfo.id },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var list = res.data.err;
        that.setData({
          list: list
        });
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 30000
        });
      },
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