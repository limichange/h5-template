import $ from 'jquery'

var WeixinShare = {
  config: function (title, desc, link, imgUrl, debug, type, callback) {
    var self = this

    self.title = title
    self.desc = desc
    self.link = link
    self.imgUrl = imgUrl
    self.debug = debug || false
    self.type = type || 'desc'
    self.callback = callback
    var currentUrl = window.location.href
    $.ajax({
      url: 'http://bonus.yi-cifang.com/h5/home/share_config?url=' + encodeURIComponent(currentUrl),
      timeout: 5000,
      error: function (xhr, textStatus) {
      },
      success: function (data) {
        window.access_token = data.token
        wx.config({
          debug: self.debug,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ]
        })

        wx.ready(function () {
          self.updateInfo(self.title, self.desc, self.link, self.imgUrl, self.type, self.callback)
        })
      }
    })
  },
  updateInfo: function (title, desc, link, imgUrl, type, callback) {
    if (wx) {
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        trigger: function (res) {
        },
        success: function (res) {
          if (callback) {
            callback(res)
          }
        },
        cancel: function (res) {
        },
        fail: function (res) {
          alert(JSON.stringify(res))
        }
      })

      var timelineTitle = ''

      if (type === 'desc') {
        timelineTitle = desc
      } else {
        timelineTitle = title
      }
            // 朋友圈
      wx.onMenuShareTimeline({
        title: timelineTitle,
        link: link,
        imgUrl: imgUrl,
        trigger: function (res) {
        },
        success: function (res) {
          if (callback) {
            callback(res)
          }
        },
        cancel: function (res) {
        },
        fail: function (res) {
          alert(JSON.stringify(res))
        }
      })
    }
  },
  updateDesc: function (desc) {
    var self = this
    self.desc = desc
    self.updateInfo(self.title, self.desc, self.link, self.imgUrl, self.type, self.callback)
  },
  updateLink: function (link) {
    var self = this
    self.link = link
    self.updateInfo(self.title, self.desc, self.link, self.imgUrl, self.type, self.callback)
  },
  updateImgUrl: function (imgUrl) {
    var self = this
    self.imgUrl = imgUrl
    self.updateInfo(self.title, self.desc, self.link, self.imgUrl, self.type, self.callback)
  }
}

export default WeixinShare
