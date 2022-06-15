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
  Restaurant.create(req.body) // 從 req.body 拿出餐廳各項資料
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 顯示餐廳detail頁面的路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// 編輯餐廳頁面的路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// update 的動作
router.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// delete 的動作
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
