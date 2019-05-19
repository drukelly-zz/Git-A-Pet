const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const PORT = process.env.PORT || 3000

let pets = []

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routing for default page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// API link to tables
app.get('/api/getPets', (req, res) => {
  fetch('')
  let allPets = req.body
  allPets.hasOwnProperty === true ? pets.push(allPets) : ""
  res.json(pets)
})

// Start express Server
app.listen(PORT, error => {
  if (error) throw error
  console.log(`App listening on ${PORT}`)
})
