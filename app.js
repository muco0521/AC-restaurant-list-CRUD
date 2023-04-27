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
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

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

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log('error'))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const filteredRestaurants = restaurants.filter((item) => 
         item.name.toLowerCase().includes(keyword) ||
         item.category.toLowerCase().includes(keyword)
    )
      res.render('index', { restaurants: filteredRestaurants })
    })
    .catch((error) => console.log('error'))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log('error'))
})

app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch((error) => console.log('error'))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const restaurant = req.body
  return Restaurant.findByIdAndUpdate(id, restaurant)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log('error'))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log('error'))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}` )
})