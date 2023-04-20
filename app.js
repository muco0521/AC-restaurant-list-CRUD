const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}

//set MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB error')
})

db.once('open', () => {
  console.log('MongoDB connected!')
})


app.engine('hbs', exphbs({ defaultLayout: 'main' , extname: 'hbs'}))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find((item) => item.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const filteredRestaurants = restaurantList.results.filter(
    (item) => 
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) 
  )
  res.render('index', { restaurants: filteredRestaurants, keyword: keyword })
})

app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch((error) => console.log('error'))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}` )
})

