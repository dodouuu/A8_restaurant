![cover](https://raw.githubusercontent.com/dodouuu/pictures/main/A8_restaurant.png)
# Express app - Restaurant List ext CRUD
打造一個網站來收集另一種愛好：餐廳
> extended function: 
> Create
> Read
> Update
> Delete

---
## 功能列表

1. 在首頁瀏覽餐廳資料，包含：
    1. 餐廳照片
    2. 餐廳中文名稱、英文名稱
    3. 餐廳分類
	4. 餐廳地址
    5. 餐廳評分
2. 點餐廳的照片，或者【Detail】按鈕，可以查看詳細資訊：
    1. 類別
    2. 地址 (結尾的箭頭點進去會跳轉到 Google Map)
    3. 電話
    4. 描述
    5. 圖片
3. 可以搜尋【名稱】或者【類別】來找到特定餐廳
4. 在首頁，按【新增餐廳】可以新增一間餐廳，記得每一個欄位都必須輸入
5. 在首頁，按【Edit】可以更新餐廳資料，記得按【Save】
6. 在首頁，按【Delete】可以刪除餐廳
7. 右上角 dropdown list 可以排序
	1. 按照餐廳的英文名稱 A~Z排序
	2. 按照餐廳的英文名稱 Z~A排序
	3. 按照餐廳的分類升冪排序
	4. 按照餐廳的地址升冪排序
---
安裝
1. 從 Terminal (command line interface) 移動到想存放專案的位置，執行：
```
git clone https://github.com/dodouuu/A8_restaurant.git
```
2. 進入 repository 
```
cd A8_restaurant
```
3. 安裝套件
```
macOS 請至nvm 的 GitHub 頁面：https://github.com/creationix/nvm。安裝 nvm
Windows 請至nvm 的 GitHub 頁面：https://github.com/coreybutler/nvm-windows/releases。安裝 nvm
nvm install 14.16.0
npm i express@4.16.4
npm i express-handlebars@4.0.2
npm i mongoose@5.9.7
npm install body-parser
npm install method-override@3.0.0
npm install standard --save-dev
```
4. 資料庫
    1. 開啟 MongoDB Atlas
    2. 開啟 Robo3T 
    3. 設定環境變數，以 Git Bash 為例，輸入：
    ```
    export MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.am8naws.mongodb.net/restaurant?retryWrites=true&w=majority"
    ```

5. 執行
```
npm run seed
npm run dev
```
6. 確認 Terminal 顯示
```
[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
App is running on http://localhost:3000
mongoDB connected!
```
代表啟動成功，打開瀏覽器，在網址列輸入http://localhost:3000

7. 停止伺服器
```
ctrl + C
```

---
## 開發工具
1. Node.js 14.16.0
2. Express 4.16.4
3. Express-Handlebars 4.0.2
4. MongoDB mongoose 5.9.7
5. Font-awesome 5.15.4
6. Bootstrap 5.0.2
7. method-override 3.0.0
