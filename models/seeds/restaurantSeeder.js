const Restaurant = require('../restaurant') // 載入 Restaurant model
const User = require('../user') // 載入 User model

const bcrypt = require('bcryptjs')

// 非 production mode 才引用 .env 設定環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const restaurantList = require('../../restaurant.json').results

const SEED_USER_1 = {
  email: 'user1@example.com',
  password: '12345678'
}
const SEED_USER_2 = {
  email: 'user2@example.com',
  password: '12345678'
}

db.once('open', () => {
  console.log('start restaurantSeeder')

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER_1.password, salt))
    .then(hash => User.create({
      email: SEED_USER_1.email,
      password: hash
    }))
    .then(user => { // 剛剛 create 好的 user
      const userId = user._id
      return Promise
        .all(Array.from(
          { length: 3 },
          (value, i) => Restaurant.create({
            name: restaurantList[i].name,
            name_en: restaurantList[i].name_en,
            category: restaurantList[i].category,
            image: restaurantList[i].image,
            location: restaurantList[i].location,
            phone: restaurantList[i].phone,
            google_map: restaurantList[i].google_map,
            rating: restaurantList[i].rating,
            description: restaurantList[i].description,
            userId: userId
          })
        ))
    })
    .then(() => {
      console.log('done. user1')
      // process.exit() // 等於 ctrl + C 關閉這段 Node 執行程序
    })

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER_2.password, salt))
    .then(hash => User.create({
      email: SEED_USER_2.email,
      password: hash
    }))
    .then(user => { // 剛剛 create 好的 user
      const userId = user._id
      return Promise
        .all(Array.from(
          { length: 3 },
          (value, i) => Restaurant.create({
            name: restaurantList[i + 3].name,
            name_en: restaurantList[i + 3].name_en,
            category: restaurantList[i + 3].category,
            image: restaurantList[i + 3].image,
            location: restaurantList[i + 3].location,
            phone: restaurantList[i + 3].phone,
            google_map: restaurantList[i + 3].google_map,
            rating: restaurantList[i + 3].rating,
            description: restaurantList[i + 3].description,
            userId: userId
          })
        ))
    })
    .then(() => {
      console.log('done. user2')
      process.exit() // 等於 ctrl + C 關閉這段 Node 執行程序
    })

  // Restaurant.create(restaurantList)
  //   .then(() => {
  //     console.log('restaurantSeeder create successfully!')
  //     db.close()
  //   })
  //   .catch(err => console.log(err))
})
