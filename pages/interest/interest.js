// pages/interest/interest.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e){
      wx.request({
        //url:"http://127.0.0.1:3001/tags",
        url: 'http://47.96.26.134:3001/tags',
        method:"post",
        data:{
          sk: getApp().globalData.sk,
          tags:getApp().globalData.tags
        },
        success(res){
          if(res.data.success==1){
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
  }
})
