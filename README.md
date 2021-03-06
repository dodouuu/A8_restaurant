![cover](https://raw.githubusercontent.com/dodouuu/pictures/main/semester3_A1%20v2.png)
# Express app - Restaurant List ext CRUD, Login
打造一個網站來收集另一種愛好：餐廳
> extended function: 
> Create
> Read
> Update
> Delete
> Login
> Register
> Login with Facebook

---
## 功能列表

1. 在首頁瀏覽餐廳資料，包含全部餐廳：
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
4. 在首頁，按【新增餐廳】可以新增一間餐廳；非必須欄位：
	1. 圖片網址
	2. 電話號碼
	3. 描述
5. 在首頁，按【Edit】可以更新餐廳資料，記得按【Save】
6. 在首頁，按【Delete】可以刪除餐廳
7. 右上角 dropdown list 可以排序
	1. 按照餐廳的英文名稱 A~Z排序 (不分大小寫)
	2. 按照餐廳的英文名稱 Z~A排序 (不分大小寫)
	3. 按照餐廳的分類升冪排序 (不分大小寫)
	4. 按照餐廳的地址升冪排序 (不分大小寫)
	5. 前一次選擇的排序選項會保留下來
8. 登入前，按左上角【Restaurant List】，顯示：請先登入才能使用！
9. 註冊功能：
	1. 註冊過，顯示：此 Email 已註冊
	2. 未填Email，顯示：未填 email
	3. 未填Password，顯示：未填 password
	4. 兩個密碼不同，顯示：密碼、確認密碼不相符！
10. 登入功能：
	1. Email不存在，顯示：The email is not registered!
	2. 密碼錯，顯示：Password incorrect.
	3. 在 login page 和 register page 都可以使用 Facebook Login
11. 登入成功後
	1. 有填 Name 的用戶，例如Joe，左上角會顯示：Joe's Restaurant List
	2. 沒填 Name 的用戶，左上角會顯示：Restaurant List
12. 登出，顯示：你已經成功登出。
13. 密碼經過 bcrypt 加密
14. 登入後才能使用餐廳清單
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
nvm i 14.16.0
npm i express@4.16.4
npm i nodemon
npm i express-handlebars@4.0.2
npm i mongoose@5.9.7
npm i body-parser
npm i method-override@3.0.0
npm i dotenv@8.2.0
npm i express-session@1.17.1
npm i passport@0.4.1 passport-local@1.0.0
npm i connect-flash@0.1.1
npm i bcryptjs@2.4.3
npm i passport-facebook@3.0.0
npm i standard --save-dev
```
4. 資料庫
    1. 開啟 MongoDB Atlas
    2. 開啟 Robo3T 
    3. 設定環境變數，新創一個.env檔案，可以模仿.env.example：
    ```
    FACEBOOK_APP_ID=SKIP
	FACEBOOK_APP_SECRET=SKIP
	FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
	SESSION_SECRET=ThisIsMySecret
	MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.am8naws.mongodb.net/<DatabaseName>?retryWrites=true&w=majority
	PORT=3000
    ```

5. 執行
```
npm run seed
```
6. 確認 Terminal 顯示
```
mongoDB connected!
start restaurantSeeder
SEED_USER_1 done
SEED_USER_2 done
```
7. 執行
```
npm run dev
```
8. 確認 Terminal 顯示
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

9. 停止伺服器
```
ctrl + C
```

---
## 開發工具
1. Node.js 14.16.0
2. bcryptjs 2.4.3
3. body-parser1.20.0
4. connect-flash 0.1.1
5. dotenv 8.2.0
6. express 4.16.4
7. express-handlebars 4.0.2
8. express-session 1.17.1
9. method-override 3.0.0
10. MongoDB mongoose 5.9.7
11. nodemon 2.0.16
12. passport 0.4.1
13. passport-facebook 3.0.0
14. passport-local 1.0.0
15. Font-awesome 5.15.4
16. Bootstrap 5.0.2
