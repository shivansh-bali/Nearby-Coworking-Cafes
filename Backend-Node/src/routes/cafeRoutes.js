const express = require('express')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const upload = require('../middleware/multer')
const { createCafe, allCafeData, verifyCafe, submittedAllForms, cafeResolution, updateCafeStatus, isFirstOnCafe, updateCafeDetails, updateReviews, bulkUpload, bulkImageUpload } = require('../controllers/cafeRegistrationControllers/cafeControllers')
const router = express.Router()

router.route('/caferegistration').post(createCafe)
router.route('/verifycafe').post(verifyCafe)
router.route('/submitcafe').post(isAuthenticatedUser, submittedAllForms)
router.route('/allcafe/:id?').get(allCafeData)
router.route('/resolution').post(isAuthenticatedUser, authorizeRoles('admin'), cafeResolution)
router.route('/updateCafeStatus/:id').patch(isAuthenticatedUser, authorizeRoles('admin'), updateCafeStatus)
router.route('/updateCafeDetails/:id?').put(isAuthenticatedUser, updateCafeDetails)
router.route('/updateFirst/:id').patch(isFirstOnCafe)
router.route('/updateReview').put(isAuthenticatedUser, updateReviews)
router.route('/bulkuploadcafe').post(isAuthenticatedUser, authorizeRoles('admin'), bulkUpload)
router.route('/bulkimageuploadcafe').post(isAuthenticatedUser, authorizeRoles('admin'), upload.single('image'), bulkImageUpload)

module.exports = router
