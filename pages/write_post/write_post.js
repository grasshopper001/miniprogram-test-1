// pages/write_post/write_post.js
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
    content:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e){
      var that = this
      wx.getUserInfo({
        success(res){
          console.log(res)
          var tmp = res.userInfo
          tmp.content = that.data.content 
          wx.request({
            //url:"http://127.0.0.1:3000/new_post",
            url: 'http://47.96.26.134:3001/new_post',
            method: "post",
            data: tmp,
            success(res1){
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    },
    handleInput(e){
      this.setData({
        content: e.detail.value
      })
    }
  }
})
