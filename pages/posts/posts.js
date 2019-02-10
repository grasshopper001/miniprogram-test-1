// pages/posts/posts.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ''
    },
    avatar: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    number: {
      type: Number,
      value: ''
    },
    iid: {
      type: String,
      value: ''
    }
  },
  lifetimes: {
    ready() {
      var that = this
      this.setData({
        number_in: this.__data__.number
      })
      wx.request({
        //url:"http://127.0.0.1:3000/comments",
        url: 'http://47.96.26.134:3001/comments',
        method:"post",
        data:{
          id:that.__data__.iid
        },
        success(res){
          that.setData({
            comments:res.data
          })
        }
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    icon:"praise",
    icon1:"message",
    writing_comment: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e){
      if(this.data.icon == "praise"){
        var that = this
        wx.request({
          //url:"http://127.0.0.1:3000/good",
          url: 'http://47.96.26.134:3001/good',
          method:'post',
          data:{
            id: that.iid
          },
          success(res){
            if(res.data.success == 1){
              that.setData({
                icon: "praise_fill",
                number_in: that.data.number_in+1
              })
            }
          }
        })
      }else{
        this.setData({
          icon: "praise"
        })
      }
    },
    handleComment(e){
      if (this.data.icon1 == "message") {
        var that = this
        that.setData({
          icon1: "message_fill",
          writing_comment: true
        })
      } else {
        this.setData({
          icon1: "message",
          writing_comment: false
        })
      }
    },
    handleInput(e){
      this.setData({
        comment_content: e.detail.value
      })
    },
    send(e){
      var that = this
      wx.getUserInfo({
        success(res){
          var tmp = res.userInfo
          tmp.data = that.data.comment_content
          tmp.id = that.__data__.iid
          wx.request({
            //url:"http://127.0.0.1:3000/new_comment",
            url: 'http://47.96.26.134:3001/new_comment',
            method: "post",
            data: tmp,
            success(res){
              that.setData({
                icon1: "message",
                writing_comment: false
              })
              wx.request({
                //url:"http://127.0.0.1:3000/comments",
                url: 'http://47.96.26.134:3001/comments',
                method: "post",
                data: {
                  id: that.__data__.iid
                },
                success(res) {
                  that.setData({
                    comments: res.data
                  })
                }
              })
            }
          })
        }
      })
    }
  }
})
