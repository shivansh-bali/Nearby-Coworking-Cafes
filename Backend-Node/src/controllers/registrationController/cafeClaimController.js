const catchAsyncErrors = require('../../middleware/catchAsyncErrors')
const syncCafeClaim = require('../../modals/registration/syncCafeClaim')
const syncCafeRegistration = require('../../modals/cafeRegistration/cafeRegistration')
const syncRegistration = require('../../modals/registration/syncRegistration')
const sendEmail = require('../../utils/sendEmail')
const { errFunc } = require('../../utils/sendResponse')
const crypto = require('crypto')

exports.syncClaim = catchAsyncErrors(async (req, res, next) => {
  const isUser = await syncCafeClaim.findOne({ email: req.body.email })
  if (isUser) {
    if (isUser && isUser?.isVerified === false) {
      // Get verifyUser Token
      const verifyToken = isUser.getVerifyUserToken()
      await isUser.save({ validateBeforeSave: false })
      const verifyUserUrl = `${req.protocol}://${process.env.HOST}/cafeclaim/${verifyToken}`
      const message = `Thanks so much for signing up to claim your free business profile on Sync! We're really excited to have you as part of our community. Please click the link below to verify your email: \n\n ${verifyUserUrl}`

      res.status(200).json({
        success: true,
        message: `Email sent to ${isUser.email} successfully`
      })
      await sendEmail({
        email: isUser.email,
        subject: 'Welcome to Sync! Please verify your email ',
        message
      })
    } else {
      return next(errFunc(res, 401, false, 'Email ID already exist'))
    }
  }

  const isCafe = await syncCafeRegistration.findOne({ email: req.body.email })
  if (isCafe) {
    return next(errFunc(res, 401, false, 'Email ID already exist'))
  }

  const isAlreadyUser = await syncRegistration.findOne({ email: req.body.email })
  if (isAlreadyUser) {
    if (isAlreadyUser && isAlreadyUser?.isVerified === false) {
      // Get verifyUser Token
      const verifyToken = isAlreadyUser.getVerifyUserToken()
      await isAlreadyUser.save({ validateBeforeSave: false })
      const verifyUserUrl = `${req.protocol}://${process.env.HOST}/cafeclaim/${verifyToken}`
      const message = `Thanks so much for signing up to claim your free business profile on Sync! We're really excited to have you as part of our community. Please click the link below to verify your email: \n\n ${verifyUserUrl}`

      res.status(200).json({
        success: true,
        message: `Email sent to ${isAlreadyUser.email} successfully`
      })
      await sendEmail({
        email: isAlreadyUser.email,
        subject: 'Welcome to Sync! Please verify your email ',
        message
      })
    } else {
      return next(errFunc(res, 401, false, 'Email ID already exist'))
    }
  }

  const user = await syncCafeClaim.create(req.body)

  // Get verifyUser Token
  const verifyToken = user.getVerifyUserToken()

  await user.save({ validateBeforeSave: false })

  const verifyUserUrl = `${req.protocol}://${process.env.HOST}/cafeclaim/${verifyToken}`

  const message = `Thanks so much for signing up to claim your free business profile on Sync! We're really excited to have you as part of our community. Please click the link below to verify your email: \n\n ${verifyUserUrl}`

  try {
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`
    })

    await sendEmail({
      email: user.email,
      subject: 'Welcome to Sync! Please verify your email ',
      message
    })
  } catch (error) {
    user.verifyUserToken = undefined
    user.verifyUserExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(errFunc(res, 500, false, error.message))
  }
})

exports.verifyCafeClaim = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const verifyUserToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  const user = await syncCafeClaim.findOne({
    verifyUserToken
  })

  if (user && user.isVerified === false && user.verifyUserExpire < Date.now()) {
    await user.deleteOne()
    return errFunc(
      res,
      400,
      false`Verify User Token is invalid or has been expired`
    )
  }

  if (user && user.isVerified === true) {
    return errFunc(res, 400, false, 'User already verified')
  }

  if (!user) {
    return errFunc(
      res,
      400,
      false,
      'Verify User Token is invalid or has been expired'
    )
  }
  user.isVerified = true

  await user.save()
  res.status(200).json({
    status: true,
    message: 'Email verified successfully'
  })
})

exports.getAllClaimRequest = catchAsyncErrors(async (req, res, next) => {
  if (!req?.params?.id) {
    const users = await syncCafeClaim.find().populate({ path: 'cafeId', model: syncCafeRegistration, select: 'establishmentName pictures streetAddress city' }).exec()
    res.status(200).json({
      success: true,
      users: users.reverse()
    })
  } else {
    const users = await syncCafeClaim.findById(req.params.id).populate({ path: 'cafeId', model: syncCafeRegistration, select: 'establishmentName pictures streetAddress city' }).exec()
    if (!users) {
      return next(errFunc(res, 404, false, `cafe does not exist with Id: ${req.params.id}`))
    }
    res.status(200).json({
      success: true,
      users
    })
  }
})

exports.claimResult = catchAsyncErrors(async (req, res, next) => {
  const cafe = await syncCafeClaim.findById(req.body.id).select('+password').populate({ path: 'cafeId', model: syncCafeRegistration, select: 'establishmentName pictures streetAddress city' }).exec()
  const pass = cafe.password
  if (!cafe) {
    return next(errFunc(res, 404, false, `cafe does not exist with Id: ${req.body.id}`))
  }
  cafe.isApproved = req.body.resolution
  await cafe.save()
  if (req.body.resolution === 'Approved') {
    // await syncCafeRegistration.create({ ...cafe, ...cafe.cafeId, establishmentName: cafe?.establishmentName, email: cafe.email, isAccepted: true })
    const searchCafe = await syncCafeRegistration.findOne(cafe.cafeId?._id).select('+password')
    if (!searchCafe) {
      return next(errFunc(res, 404, false, `cafe does not exist with Id: ${req.body.id}`))
    }
    searchCafe.email = cafe?.email
    searchCafe.name = cafe?.name
    searchCafe.password = pass
    searchCafe.phone = cafe?.phone
    searchCafe.dialCode = cafe?.dialCode
    searchCafe.countryCode = cafe?.countryCode
    searchCafe.position = cafe?.position
    searchCafe.isVerified = cafe?.isVerified
    searchCafe.isAccepted = cafe?.isApproved
    searchCafe.syncClaim = true
    searchCafe.isFirst = true
    searchCafe.isSubmitted = true
    searchCafe.isCertify = true
    searchCafe.isAgreeUser = true
    await searchCafe.save()
    res.status(200).json({
      success: true,
      message: `${searchCafe.establishmentName} is ${req.body.resolution} successfully.`
    })
  }
  await sendEmail({
    email: cafe.email,
    subject: req.body.resolution === 'Approved' ? 'Welcome aboard! Your business listing access is approved' : 'Update on your business profile',
    message: req.body.message
  })
})
