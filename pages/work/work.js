// pages/work/work.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  lifetimes:{
    ready(){
      wx.getUserInfo({
        success(res) {
          var tmp = res.userInfo
          wx.login({
            success: res => {
              tmp.code = res.code
              wx.request({
                //url:"http://127.0.0.1:3000/login",
                url: 'http://47.96.26.134:3001/login',
                method: 'post',
                data: tmp,
                success(res) {
                  app.globalData.new_user = res.data.new_user == 1
                  app.globalData.sk = res.data.sk
                  if (app.globalData.new_user) {
                    console.log("dsdsd")
                    wx.navigateTo({
                      url: '../../pages/interest/interest',
                    })
                  }
                }
              })
              wx.getWeRunData({
                success(res) {
                  wx.request({
                    //url:"http://127.0.0.1:3000/runData_in",
                    url: 'http://47.96.26.134:3001/runData_in',
                    method: "POST",
                    data: {
                      iv: res.iv,
                      encryptedData: res.encryptedData,
                      sk: getApp().globalData.sk
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  pageLifetimes: {
    show(){
      var that = this;
      wx.request({
        //url:"http://127.0.0.1:3000/posts",
        url: 'http://47.96.26.134:3001/posts',
        success(res) {
          that.setData({
            posts: res.data
          })
        }
      });
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    current:"work",
    show: false,
    life: true,
    me: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(e) {
      console.log(e.detail.key)
      if (e.detail.key == "work") {
        this.setData({
          current:"work",
          show: false,
          life: true,
          me: true
        })
      }
      if(e.detail.key == "life"){
        this.setData({
          current:"life",
          show: true,
          life: false,
          me: true
        })
      }
      if (e.detail.key == "me") {
        this.setData({
          current:"me",
          show: true,
          life: true,
          me: false
        })
      }
    },
    handleWrite(e){
      wx.navigateTo({
        url: '../../pages/write_post/write_post',
      })
    }
  }
})
