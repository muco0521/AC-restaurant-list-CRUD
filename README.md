# Restaurant List ( AC 2-3 A7 )

![image](https://raw.githubusercontent.com/muco0521/AC-restaurant-list-CRUD/main/public/image/restaurant_list_image_1.png)
![image](https://raw.githubusercontent.com/muco0521/AC-restaurant-list-CRUD/main/public/image/restaurant_list_image_2.png)
![image](https://raw.githubusercontent.com/muco0521/AC-restaurant-list-CRUD/main/public/image/restaurant_list_image_3.png)

## About - 介紹
這是使用 Node.js + Express + MongoDB + Mongoose 來架構的一個餐廳網站。

## Features - 功能

1. 可以瀏覽全部餐廳
2. 可以依餐廳名稱、分類使用關鍵字來搜尋
3. 可以查看餐廳的詳細資訊，地址、電話...等等資訊
4. 可以新增餐廳清單
5. 可以編輯餐廳資訊
6. 可以刪除餐廳清單

## Prerequisites - 環境建置與需求

* Node.js
* Express @4.16.4
* Express-handlebars @3.0.0
* MongoDB
* mongoose @5.9.7
* dotenv @16.0.3

## Installation and Execution - 安裝與執行步驟

1.開啟Terminal, Clone此專案至本機:
```
git clone https://github.com/muco0521/AC-restaurant-list-CRUD.git
```

2.進入專案資料夾，安裝 npm 套件
```
npm install
```

3.安裝nodemon 
```
npm install nodemon
```

4.在專案資料夾內新增一個.env檔案，並輸入 MongoDB 你的連線字串
```
MONGODB_URI = "<你的連線字串>"
```

5.製作種子資料
```
npm run seed
```

6.啟動伺服器
```
npm run dev 
```

7.出現以下字樣表示伺服器連線成功
```
Express is listening on localhost:3000
MongoDB is connect!
```

8.開啟瀏覽器，輸入以下網址，使用本專案
```
http://localhost:3000 
```