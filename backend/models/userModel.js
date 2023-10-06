const mongoose = require( "mongoose" );
const config = require("../config/config");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});



// JWT Token
// userSchema.methods.getJWTToken = function () {
//   const secrete = "NINDIIS382RR7RG4RU0HR49RJHN32"; // secrete
//   const expiresIn = "5d"; // expire date

//   return jwt.sign({ id: this._id }, secrete, {
//     expiresIn: expiresIn,
//   });
// };


userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, config.JWT_SECRET, {
    expiresIn: config.EXPIRES_IN,
  })
};
//compere password
userSchema.pre( "save", async function ( next ) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  //console.log('Hashed Password Stored in Database:', this.password);
});
 
userSchema.methods.comparePassword = async function (enteredPassword) {
  //console.log('Entered Password:', enteredPassword);
  //console.log('Stored Hashed Password:', this.password);

  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  //console.log('Password Match Result:', isMatch);

  return isMatch;
};
//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  //Generate Token
  const resetToken = crypto.randomBytes( 20 ).toString( "hex" );
  //Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256") //algorithm
    .update(resetToken)
    .digest("hex"); //get hax value
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // resetPasswordExpire 15 minutes
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);

