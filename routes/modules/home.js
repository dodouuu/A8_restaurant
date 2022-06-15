// 引用 Express
const express = require('express')
// 引用 Express 路由器
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' }) // 根據 _id ascending sort
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/sort', (req, res) => {
  const sortBy = req.query.sortBy

  if (sortBy === 'az') {
    Restaurant.find()
      .lean()
      .sort({ name_en: 'asc' }) // 根據 name_en ascending sort
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  } else if (sortBy === 'za') {
    Restaurant.find()
      .lean()
      .sort({ name_en: 'desc' }) // 根據 name_en descending sort
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  } else if (sortBy === 'category') {
    Restaurant.find()
      .lean()
      .sort({ category: 'asc' }) // 根據 category ascending sort
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  } else if (sortBy === 'location') {
    Restaurant.find()
      .lean()
      .sort({ location: 'asc' }) // 根據 location ascending sort
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  }
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
