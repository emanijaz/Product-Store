
const bcrypt = require('bcrypt');
const catchAsyncError = require('../middleware/asyncError');

const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');

const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
const secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
// Registration endpoint
exports.signup = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    console.log(email, password)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    return next(new ErrorHandler(500, 'Registration failed'));
  }
});

exports.login = catchAsyncError(async(req,res,next)=> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler(401, "User isn't found for given credentials"));
    }
    console.log(user.password)
    console.log(password)
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Authentication failed, password didn't match"));

    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: '2h',
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {

    return next(new ErrorHandler(500, "Authentication failed"));
    
  }
})