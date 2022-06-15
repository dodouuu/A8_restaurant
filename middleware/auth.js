module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) { // Passport.js 提供的函式
      return next() // 驗證成功
    }
    req.flash('warning_msg', '請先登入才能使用！')
    res.redirect('/users/login') // 驗證失敗
  }
}
