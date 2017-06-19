var gulp = require('gulp')
var qiniuCDN = require('gulp-qiniu')
var fs = require('fs')
var axios = require('axios')
var qrcode = require('qrcode-terminal')
var tinypng = require('gulp-tinypng-compress')
const notifier = require('node-notifier')
const path = require('path')

gulp.task('qiniu', () => {
  gulp.src([
    'dist/**/*',
    '!dist/**/*.map',
    '!dist/index.html'
  ]).pipe(qiniuCDN({
    accessKey: "-",
    secretKey: "-",
    bucket: "one2ten",
    private: false
  }, {
    dir: 'moment',
    ignore: ['1']
  }))
})

gulp.task('notifier', () => {
  notifier.notify({
    title: '喵 ~',
    message: '喵 ~',
    icon: path.join(__dirname, 'icon.jpg')
  })
})

gulp.task('tinypng', function () {
  gulp.src('images/src/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({
        key: 'API_KEY',
        sigFile: 'images/.tinypng-sigs',
        log: true
    }))
    .pipe(gulp.dest('images'))
})

gulp.task('deploy', () => {
  fs.readFile('dist/index.html', 'utf-8', (err, file) => {
    axios.post('http://lightapp.socialtower.cn/static_assets', {
      content: file,
      url: 'zhouheiya-card'
    }).catch(() => {
      console.error(`\nWe're sorry, but something went wrong.`)
    })
  })
  qrcode.generate('http://lightapp.socialtower.cn/static_assets/zhouheiya-card');
})
