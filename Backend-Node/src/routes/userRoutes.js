const express = require('express')
const {
  registerSync,
  loginSync,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  getAllUser,
  getSingleUser,
  updateUserStatus,
  verifyUser,
  registerAdminSync,
  addUser,
  registerUserSocial,
  updateAdminData,
  updateAdminPassword,
  loginAdminSync,
  loginUserSocial
} = require('../controllers/registrationController/registerController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const { locationSearch } = require('../controllers/registrationController/profileController')

const router = express.Router()

router.route('/register').post(registerSync)

router.route('/registeradmin').post(registerAdminSync)

router.route('/socialLogin').post(registerUserSocial)

router.route('/social').post(loginUserSocial)

router.route('/login').post(loginSync)

router.route('/adminlogin').post(loginAdminSync)

router.route('/verify/:token').get(verifyUser)

router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').put(resetPassword)

router.route('/logout').get(logout)

router.route('/me').get(isAuthenticatedUser, getUserDetails)

router.route('/password/update').put(isAuthenticatedUser, updatePassword)

router
  .route('/admin/addusers')
  .post(isAuthenticatedUser, authorizeRoles('admin'), addUser)

router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllUser)

router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)
  .patch(isAuthenticatedUser, authorizeRoles('admin'), updateUserStatus).put(isAuthenticatedUser, authorizeRoles('admin'), updateAdminData)

router.route('/admin/changepassword').put(isAuthenticatedUser, authorizeRoles('admin'), updateAdminPassword)

router.route('/searchLocation').put(isAuthenticatedUser, locationSearch)

module.exports = router
