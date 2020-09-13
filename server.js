// bring express server
const express = require('express');
// add seperate file that conects to db
const connectDB = require('./config/db');
const path = require('path');

//run dotenv if the app is run locally
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// init app variable
const app = express();

// Connects to Database using congig/db/connectDB()
connectDB();

// Init Middleware, allows access to req.body
app.use(express.json());

// single endpoint to check if it works
//app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/album', require('./routes/api/album'));
app.use('/api/artist', require('./routes/api/artist'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  //app.get('/', (req, res) => res.send('API Running 2'));
}

// if there is no env var (e.g. on Heroku) run it on 5000 locally
const PORT = process.env.PORT || 5000;
// listen at port, with callback once it is connected
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
