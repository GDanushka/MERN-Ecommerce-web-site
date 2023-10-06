const mongoose = require("mongoose");
const ErrorHandler = require( "../utils/errorHandler" );
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require( "../utils/jwtToken" );
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");
const config = require( "../config/config" );

//register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    })
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    } );
  const token = user.getJWTToken();
  res.status( 201 ).json( {
    success: true,
    token
  })
    //sendToken(user, 200, res);
} );

//  Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Both email and password are required", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or Password", 401));
  }
const isPasswordMatched = await user.comparePassword(password);

if (!isPasswordMatched) {
    return next( new ErrorHandler( "Invalid email or Password", 401 ) );
    // console.log('Entered Password:', password);
    // console.log('Hashed Password from Database:', user.password);
    // console.log('Password Match Result:', isPasswordMatched);
}
    sendToken(user, 200, res);
} );


//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out",
    });
});

//Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

//get resetpassword token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl =`${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
    //`${ config.FRONTEND_URL }/password/reset/${ resetToken }`;
    // req.protocol }://${ req.get(
    //   "host"
    //  )
     const message = `Your password reset token is ttemp :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then  please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `I project Password Recovery`,
            message,
        } );
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token) 
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );}
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});


// get user details 

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id);//find by user id
    res.status(200).json({
        success: true,
        user,
    })
})

// update user password 

exports.updatePassword = catchAsyncErrors( async ( req, res, next ) => {
    // console.log("req.body.oldPassword:", req.body.oldPassword);
    // console.log("req.body.newPassword:", req.body.newPassword);
    // console.log("req.body.confirmPassword:", req.body.confirmPassword);
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("old password is incorrect ", 400));
    }
    if (req.body.newPassword != req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match ", 400));
    }
    user.password = req.body.newPassword
    await user.save()
    sendToken(user, 200, res);
});

// update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    //add cloudinary 
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id)
        const imageId = await user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        } )
        
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });

});

// Get all users
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();


    res.status(200).json({
        success: true,
        users
    })
})

// Get single users details (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with id:${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })
})

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });

//Delete user -->(admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById( req.params.id );
    // console.log("User Object:", user);
    // console.log("User Document Instance:", user instanceof mongoose.Document);
    // console.log("User Document Methods:", Object.keys(user));

    if (!user) {
        return next(new ErrorHandler(`user does nit exist with id : ${req.params.id}`))
    }
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    await user.deleteOne();
    res.status(200).json({
        success: true,
        message: `user deleted successfully`
    });
});
