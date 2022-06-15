// 第三方登入相關
// 引用 Express
const express = require('express')
// 引用 Express 路由器
const router = express.Router()
// 引用 passport
const passport = require('passport')

// 按下 Facebook 登入的 btn
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// 獲得使用者同意授權 Facebook 資訊，繼續登入驗證
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
