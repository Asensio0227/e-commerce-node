const Order = require('../models/Order');
const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided');
  }

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError('Please provide tax and shipping fee');
  }
  
  res.send('create orders')
};
 
const getAllOrders = async (req, res) => {
  res.send('get all orders')
};

const getSingleOrder = async (req, res) => {
  res.send('get single order')
};

const getCurrentUserOrders = async (req, res) => {
  res.send('get current orders')
};


const updateOrder = async (req, res) => {
  res.send('update orders')
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder
};