const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({roles:"user"}).select('-password');
  // console.log(user);
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId }).select('-password');
  // console.log(user);
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`)
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.send("show current user")
};

const updateUser = async (req, res) => {
  res.send(req.body)
};

const updateUserPassword = async (req, res) => {
  res.send(req.body)
};

module.exports={
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
};