const Users = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const { CustomHttpError } = require("../utils/customError");


const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const userCheck = await Users.findOne({ email });
    if (userCheck) {
        return next(new CustomHttpError(400, "Email already exists"));
    }
    const user = await Users.create({
        name,
        email,
        password,
    });
    sendToken(user, 201, res);
});

const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new CustomHttpError(400, "Please provide email and password"));
    }
    const user = await Users.findOne({ email }).select("+password");
    if (!user) {
        return next(new CustomHttpError(401, "Invalid Credentials"));
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return next(new CustomHttpError(401, "Invalid Credentials"));
    }
    sendToken(user, 200, res);
});

const getUsers=catchAsyncErrors(async(req,res,next)=>{
    const allUsers=await Users.find({role:{$ne:"admin"}});
    res.status(200).json({
        success: true,
        allUsers
    });
})

const logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});



module.exports = {
    registerUser,
    loginUser,
    logOut,
    getUsers
}