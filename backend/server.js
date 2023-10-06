// const dotenv = require("dotenv");
// const path = require("path");
const app = require("./app"); // Corrected path
const connectDatabase = require("./config/database");
const config = require("./config/config"); // Corrected path
const cloudinary = require("cloudinary");
// Load the configuration directly (remove dotenv and .config)
// dotenv.config();

// Define configuration here
//const PORT = 4000;


const server = app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});

// Database connection
connectDatabase();

//Cloudinary connection
cloudinary.config({
    cloud_name:config.CLOUDINARY_NAME,
    api_key:config.CLOUDINARY_API_KEY,
    api_secret:config.CLOUDINARY_API_SECRET,
});

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Unhandled promise rejection error
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log( `Shutting down the server due to unhandled promise rejection` );
  
  server.close(() => {
    process.exit(1);
  });
});
