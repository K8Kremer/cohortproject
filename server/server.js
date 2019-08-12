const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/psGroupProject', { useNewUrlParser: true })

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const dataRoutes = require('./routes/generate-data');

app.use('/data', dataRoutes)

// Server Setup
const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

