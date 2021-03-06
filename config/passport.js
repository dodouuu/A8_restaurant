const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// 引用 Facebook 登入策略
const FacebookStrategy = require('passport-facebook').Strategy

// 引用 bcrypt
const bcrypt = require('bcryptjs')

// 引用 User model
const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy({
    // 把驗證項目從預設的 username 改成 email
    usernameField: 'email',
    passReqToCallback: true
  },
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          // console.log('passport user=', user)
          if (user === null) { // email not exist
            // 第一個參數 err 代表讀不到資料庫，null 代表有進入資料庫
            // 第二個參數 false 代表資料庫之中找不到
            // 第三個參數為提示訊息
            return done(null, false, { message: 'The email is not registered!' })
          } else {
            // user.password 是資料庫內 hash 過的
            // password 是剛剛輸入還沒 hash 過的
            // 無法直接比對，需要經過 bcrypt.compare()
            return bcrypt.compare(password, user.password)
              .then(isMatch => {
                if (!isMatch) { // wrong password
                  return done(null, false, { message: 'Password incorrect.' })
                } else {
                  return done(null, user) // 第二個參數 user 代表有找到
                }
              })
          }
        })
        .catch(err => done(err, false))
    }
  ))

  // 設定 Facebook 登入策略
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName'] // 要求 Facebook 開放的資料
  },
    (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      User.findOne({ email })
        .then(user => {
          if (user === null) { // email not exist，註冊新 email
            const randomPassword = Math.random().toString(36).slice(-8) // 產生8位亂數
            bcrypt.genSalt(10) // 產生複雜度係數為 10的「鹽」
              .then(salt => bcrypt.hash(randomPassword, salt)) // 為使用者密碼「加鹽」，產生雜湊值
              .then(hash => User.create({
                name,
                email,
                password: hash
              }))
              .then(user => done(null, user))
              .catch(err => done(err, false))
          } else { // email exist 直接 return user
            return done(null, user)
          }
        })
    }
  ))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    // 第二個參數 id = MongoDB 預設的 _id
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
