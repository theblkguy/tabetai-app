//set up the mongoose Connection
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//load variables from .env
dotenv.config();

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