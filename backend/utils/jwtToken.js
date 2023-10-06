//creating token and saving in cookie

const config = require( "../config/config" );

const sendToken = (user, statuscode, res) => {
    const token = user.getJWTToken();

    // Define the cookie expiration period in hours
    // const cookieExpireHours = 24;

    // Calculate the expiration time for the cookie
    const expirationDate = new Date(Date.now() + config.COOKIE_EXPIRES_IN * 60 * 60 * 1000);

    // Options for cookie
    const options = {
        expires: expirationDate,
        httpOnly: true
    };

    res.status(statuscode).cookie('token', token, options).json({
        success: true,
        token,
        user
    });
};

module.exports = sendToken;
