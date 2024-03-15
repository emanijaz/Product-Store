
const bcrypt = require('bcrypt');
const catchAsyncError = require('../middleware/asyncError');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
const secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";

exports.signup = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email: email, password: hashedPassword, username: username });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    return next(new ErrorHandler(500, `${error}. Registration failed`));
  }
});

exports.login = catchAsyncError(async(req,res,next)=> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler(401, "User isn't found for given email"));
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Authentication failed, password didn't match"));

    }
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: '2h',
    });
    res.status(200).json({ token, user: user });
  } catch (error) {
      return next(new ErrorHandler(500, `Authentication failed , ${error}`));
  }
})