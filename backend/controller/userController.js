const User = require('../models/User')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/asyncError');

exports.createUser = catchAsyncError(async (req,res, next)=> {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password

    });
    
    const savedUser = await newUser.save()
    res.status(201).json({message: "User created successfully!", savedUser})
});