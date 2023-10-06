const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require( "../config/config" );

// Store JWT secret directly here 
//const secrete = "NINDIIS382RR7RG4RU0HR49RJHN32"; 

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource ", 401));
    }

    try {
        const decodedData = jwt.verify(token,config.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token", 401));
    }
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) { //handling user role admin or user
            return next(
                new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403)
            );
        }
        next();
    };
};
