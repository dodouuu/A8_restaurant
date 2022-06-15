// 引用 Express
const express = require('express')
// 引用 Express 路由器
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// 新增餐廳頁面的路由
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增餐廳的動作
router.post('/', (req, res) => {
  const userId = req.user._id // User _id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body // 從 req.body 拿出餐廳各項資料

  name_en_insensitive = name_en.toLowerCase()
  category_insensitive = category.toLowerCase()
  location_insensitive = location.toLowerCase()

  Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId, name_en_insensitive, category_insensitive, location_insensitive })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// 顯示餐廳detail頁面的路由
router.get('/:id', (req, res) => {
  const userId = req.user._id // User _id
  const _id = req.params.id // Restaurant _id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.error(error))
})

// 編輯餐廳頁面的路由
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id // User _id
  const _id = req.params.id // Restaurant _id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

// update 的動作
router.put('/:id', (req, res) => {
  const userId = req.user._id // User _id
  const _id = req.params.id // Restaurant _id
  const body = req.body
  body.name_en_insensitive = body.name_en.toLowerCase()
  body.category_insensitive = body.category.toLowerCase()
  body.location_insensitive = body.location.toLowerCase()
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.error(error))
})

// delete 的動作
router.delete('/:id', (req, res) => {
  const userId = req.user._id // User _id
  const _id = req.params.id // Restaurant _id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
