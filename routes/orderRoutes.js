const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizedPermissions
} = require('../middleware/authentication');

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder
} = require('../controllers/orderController');

router
  .route('/')
  .get([authenticateUser, authorizedPermissions('admin')], getAllOrders)
  .post(authenticateUser, createOrder);

router
  .route('/showAllMyOrders')
  .get(authenticateUser, getCurrentUserOrders);

router
  .route('/:id')
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder)


module.exports = router;