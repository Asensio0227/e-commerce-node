const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizedPermissions
} = require('../middleware/authentication');

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
} = require("../controllers/UserController");


router
  .route('/')
  .get(authenticateUser,authorizedPermissions('admin'),getAllUsers);

router
  .route('/showMe')
  .get(showCurrentUser);

router
  .route('/updateUser')
  .patch(updateUser);
  
router
  .route('/updateUserPassword')
  .patch(updateUserPassword);

  router
    .route('/:id')
    .get(authenticateUser,getSingleUser)

module.exports = router;