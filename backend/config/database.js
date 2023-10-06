const mongoose = require( 'mongoose' );
const config = require( './config' );
//error IPv4
//const uri = 'mongodb://localhost:27017/Test';

// Used IPv6
// const uri = 'mongodb://127.0.0.1:27017/Test';

const connectDatabase = () => {
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(() => {
    console.log(`MongoDB connected with server: ${mongoose.connection.host} `);
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
};
module.exports = connectDatabase;
