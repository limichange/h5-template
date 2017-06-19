import './raven'
import gta from '../gta'
import 'yuki-wechat-js-sdk'
import 'yuki-remove-dialog-title'
import WeixinShare from './weixin-share'
// import shareImg from './share.jpg'

WeixinShare.config(
  '寻芳探草，发现黑润生气的秘密',
  '女神节和吕相约花房，探索花草间的盈亮秘籍！',
  'http://lightapp.socialtower.cn/static_assets/lv_vr',
  '',
  false,
  'desc',
  res => {
    gta.event({
      category: 'share',
      action: `${res.errMsg}`
    })
  }
)

// 屏蔽滑动页面
document.addEventListener('touchmove', function (e) {
  e.preventDefault()
}, false)
