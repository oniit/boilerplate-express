let express = require('express')
let app = express()


console.log('Hello World')

app.use((req, res, next) => {
  let string = req.method + " " + req.path + " - " + req.ip
  console.log(string)
  next()
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

app.use('/public', express.static(__dirname + "/public"))

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toUpperCase()
    res.json({ message: response })
  } else {
    response = "Hello json"
    res.json({ message: response })
  }
})

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next()
}

app.get('/now', middleware, (req, res) => {
  res.json({ time: req.time })
})

app.get('/:word/echo', (req, res) => {
  const { word } = req.params
  res.json({ echo: word })
})

app.get('/name', (req, res) => {
  const { first: firstName, last: lastName } = req.query
  res.json({ name: `${firstName} ${lastName}` })
})

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/name', (req, res) => {
  const { first, last } = req.query
  res.json({ name: `${first} ${last}` })
})

app.post('/name', (req, res) => {
  const { first, last } = req.body
  res.json({ name: `${first} ${last}` })
})



module.exports = app;
