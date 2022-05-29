const Restaurant = require('../restaurant') // 引用 Schema
const restaurantList = require('../../restaurant.json').results

const db = require("../../config/mongoose")

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder create successfully!')
      db.close()
    })
    .catch(err => console.log(err))
})
