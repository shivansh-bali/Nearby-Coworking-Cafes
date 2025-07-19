const catchAsyncErrors = require('../../middleware/catchAsyncErrors')
const syncCafeRegistration = require('../../modals/cafeRegistration/cafeRegistration')
const syncCafeRecommendation = require('../../modals/recommendModel/recommendSchema')
const sendEmail = require('../../utils/sendEmail')
const { errFunc } = require('../../utils/sendResponse')

exports.syncRecommend = catchAsyncErrors(async (req, res, next) => {
  await syncCafeRecommendation.create(req.body)
  res.status(200).json({
    success: true,
    message: 'Recommend Successul'
  })
})

exports.syncAllRecommend = catchAsyncErrors(async (req, res, next) => {
  if (!req?.params?.id) {
    const users = await syncCafeRecommendation.find()
    res.status(200).json({
      success: true,
      users: users.reverse()
    })
  } else {
    const users = await syncCafeRecommendation.findById(req.params.id)
    if (!users) {
      return next(errFunc(res, 404, false, `cafe does not exist with Id: ${req.params.id}`))
    }
    res.status(200).json({
      success: true,
      users
    })
  }
})

exports.recommendResult = catchAsyncErrors(async (req, res, next) => {
  const cafe = await syncCafeRecommendation.findById(req.body.id)
  if (!cafe) {
    return next(errFunc(res, 404, false, `Cafe does not exist with Id: ${req.body.id}`))
  }

  cafe.isAccepted = req.body.resolution

  if (req.body.resolution === 'Approved') {
    try {
      const dataCafe = { ...cafe.toObject(), email: `${Date.now()}@gmail.com`, status: true }
      await syncCafeRegistration.create(dataCafe)
    } catch (error) {
      console.error('Failed to create data in syncCafeRegistration:', error)
    }
  }

  await cafe.save()

  res.status(200).json({
    success: true,
    message: `${cafe.establishmentName} is ${req.body.resolution} successfully.`
  })

  await sendEmail({
    email: cafe.email,
    subject: req.body.resolution === 'Approved' ? 'Welcome aboard! Your business listing access is approved' : 'Update on your business profile',
    message: req.body.message
  })
})
