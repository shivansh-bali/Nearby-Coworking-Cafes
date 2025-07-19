const express = require('express')
const { updateDetails, saveCafe, reviews, pinCafe, reviewsFilter, subscribe, isSearchLocation, getAllSubscribe } = require('../controllers/registrationController/profileController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const router = express.Router()

router.route('/updateDetails').put(isAuthenticatedUser, updateDetails)
router.route('/saveCafe/:id').patch(isAuthenticatedUser, saveCafe)
router.route('/reviews/:id').put(isAuthenticatedUser, reviews)
router.route('/reviewsfilter/:id').put(isAuthenticatedUser, reviewsFilter)
router.route('/cafepin/:id').patch(isAuthenticatedUser, pinCafe)
// router.route('/map').get(mapFunc)
router.route('/subscribetoconnect').put(subscribe)
router.route('/getsubscribers').get(isAuthenticatedUser, authorizeRoles('admin'), getAllSubscribe)
router.route('/issearchlocation').put(isAuthenticatedUser, isSearchLocation)

module.exports = router
