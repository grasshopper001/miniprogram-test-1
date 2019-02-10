// pages/interest/item.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icon: "flag"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handletap(e){
      if(this.data.icon=="flag"){
        app.globalData.tags.push(this.__data__.label)
        this.setData({
          icon: "flag_fill"
        })
      }else{
        app.globalData.tags.splice(app.globalData.tags.indexOf(this.__data__.label),1)
        this.setData({
          icon: "flag"
        })
      }
    }
  }
})
