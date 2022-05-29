// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant') // 引用 Schema

// 定義首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' }) // 根據 _id ascending sort
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// 搜尋餐廳
router.get('/search', (req, res) => {
  const originalKeyword = req.query.keyword.trim()
  const lowerCaseKeyword = originalKeyword.toLowerCase()

  Restaurant.find()
    .lean()
    .then(restaurantList => {
      const restaurants = restaurantList.filter(
        restaurant => {
          return restaurant.name.toLowerCase().includes(lowerCaseKeyword) || restaurant.category.toLowerCase().includes(lowerCaseKeyword)
        }
      )
      res.render('index', { restaurants, keywords: originalKeyword })
    })

    .catch(error => console.error(error))
})

module.exports = router