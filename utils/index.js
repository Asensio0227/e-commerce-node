const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse
} = require('./jwt');

const createTokenUser = require("./create-token");
const checkPermissions = require("./checkPermissions");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions
};