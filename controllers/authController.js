const User = require('../models/User');
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require('../utils');

const register = async (req, res) => {
  const { email,name,password } = req.body;

  const emailAlreadyExist = await User.findOne({ email });
  
  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError("Email already exists")
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const roles = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, roles });
  const tokenUser = { name: user.name, userId: user._id, roles: user.roles };
  attachCookiesToResponse({res,user:tokenUser})
  res.status(StatusCodes.CREATED).json({ user: tokenUser});
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("please provide all values")
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials")
  }

  const isPasswordCorrect = await user.ComparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid password")
  }

  const tokenUser = { name: user.name, userId: user._id, roles: user.roles };
  attachCookiesToResponse({res,user:tokenUser})
  res.status(StatusCodes.OK).json({ user: tokenUser});
}

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
    // expires: new Date(Date.now() + 5 *1000)
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
} 

module.exports = {
  register,
  login,
  logout,
}