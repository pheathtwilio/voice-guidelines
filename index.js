const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const dotenv = require("dotenv")
dotenv.config()

const { getCountriesFromURL } = require('./countries')

// getCountriesFromURL('https://www.twilio.com/en-us/guidelines/voice')

const app = express()
const server = http.createServer(app)

app.use(express.static("public/"))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.post("/getCountries", async (req, res) => {

    const countries = await getCountriesFromURL(req.body.url)

    const response = {
        countries: countries
    }

    res.json(response)
})

server.listen(process.env.PORT, () => {
    console.log('listening on http://localhost:' + process.env.PORT)
})