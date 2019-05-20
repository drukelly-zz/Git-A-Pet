const express = require('express')
const app = express()
require('dotenv').config()
const fetch = require('node-fetch')
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

// api call to get pets
app.get('/api/getpets', (req, res) => {
  const formData = new URLSearchParams()
  formData.append('grant_type', 'client_credentials'),
  formData.append('client_id', process.env.PETFINDER_ID),
  formData.append('client_secret', process.env.PETFINDER_SECRET)
  fetch('https://api.petfinder.com/v2/oauth2/token', {
    body: formData.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post'
  })
  .then(tokenResult => tokenResult.json())
  .then(tokenResponse => {
    let accessToken = tokenResponse.access_token
    fetch(`https://api.petfinder.com/v2/animals?type=dog`, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      method: 'get',
      mode: 'cors'
    })
    .then(result => result.json())
    .then(response => {
      pets.push(response)
      res.json(pets)
    })
  })
})

// Start express Server
app.listen(PORT, error => {
  if (error) throw error
  console.log(`Click to open => http://localhost:${PORT}/api/getpets`)
})
