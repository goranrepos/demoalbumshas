// add mongoose to create queries to db
const mongoose = require('mongoose');
// add config to access mongo URI and get URI
const config = require('config');
const db = config.get('mongoURI');

// async func that connects to db

const connectDB = async () => {
  console.log('db running');
  try {
    // mongoose connects to db
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
