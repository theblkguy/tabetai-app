//set up the mongoose Connection

const mongoose = require('mongoose');
//load variables from .env
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB is connected!');
})
.catch((err) => {
  console.error('MongoDB not connected', err);
});