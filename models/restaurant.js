const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: false },
  location: { type: String, required: true },
  phone: { type: String, required: false },
  google_map: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: false },
  userId: {  // 加入關聯設定 去參照 User 的 ObjectId
    type: Schema.Types.ObjectId, // 連向另一個資料物件
    ref: 'User', // 定義參考對象是 User model
    index: true, // 把 userId 設定成「索引」，當我們常常用某個欄位來查找資料時，可以考慮把欄位設成索引，查詢資料時增加效能
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
