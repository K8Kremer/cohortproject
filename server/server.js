const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const keys = require('./config/keys');
var cloudinary = require('cloudinary').v2;

//mongoose.connect('mongodb://localhost/psGroupProject', { useNewUrlParser: true })

mongoose.connect(keys.MONGODB_URI,  { useNewUrlParser: true });


const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const dataRoutes = require('./routes/generate-data');
const studentRoutes = require('./routes/students');
const packageRoutes = require('./routes/packages'); 

app.use('/data', dataRoutes);
app.use('/students', studentRoutes);
app.use('/packages', packageRoutes);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server Setup
const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

