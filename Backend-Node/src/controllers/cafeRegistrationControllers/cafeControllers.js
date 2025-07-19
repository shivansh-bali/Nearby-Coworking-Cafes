const syncCafeRegistration = require('../../modals/cafeRegistration/cafeRegistration')
const catchAsyncErrors = require('../../middleware/catchAsyncErrors')
const sendEmail = require('../../utils/sendEmail')
const sendToken = require('../../utils/jwtToken')
const syncRegistration = require('../../modals/registration/syncRegistration')
const syncAdminRegistration = require('../../modals/registration/syncAdminRegistration')
const { errFunc } = require('../../utils/sendResponse')
const AdmZip = require('adm-zip')
const axios = require('axios')
const fs = require('fs')

const aws = require('aws-sdk')
aws.config.update({
  secretAccessKey: 'VnK3drNQH1Q69ISbWHzUmXORzR3/HSe2ztd2QfV5',
  accessKeyId: 'AKIASRKSEXEJRTN7MFVJ',
  region: 'us-east-1'
})
const s3 = new aws.S3()

// create cafe registration
exports.createCafe = catchAsyncErrors(async (req, res, next) => {
  const user = await syncRegistration.findOne({ email: req.body.email }).select('+password')
  const admin = await syncAdminRegistration.findOne({ email: req.body.email }).select('+password')
  const cafes = await syncCafeRegistration.findOne({ email: req.body.email }).select('+password')
  if (user || admin || cafes) {
    if (cafes && cafes?.isVerified === false) {
      await syncCafeRegistration.updateOne({ email: req.body.email }, req.body)
      cafes.password = req.body.password
      const otp = Math.floor(100000 + Math.random() * 900000)
      const message = `Thanks so much for signing up to claim your free business profile on Sync! We're really excited to have you as part of our community. Please verify your email using below code: \n\n ${otp}`
      cafes.otp = otp
      await cafes.save()
      res.status(200).json({
        success: true,
        message: `OTP sent to ${cafes.email} successfully`,
        cafe: cafes._id
      })

      await sendEmail({
        email: cafes.email,
        subject: 'Welcome to Sync! Please verify your email ',
        message
      })
    } else {
      return next(errFunc(res, 401, false, 'Email ID already exist'))
    }
  } else {
    const cafe = await syncCafeRegistration.create(req.body)
    const otp = Math.floor(100000 + Math.random() * 900000)
    const message = `Thanks so much for signing up to claim your free business profile on Sync! We're really excited to have you as part of our community. Please verify your email using below code: \n\n ${otp}`
    cafe.otp = otp
    await cafe.save({ validateBeforeSave: false })
    res.status(200).json({
      success: true,
      message: `OTP sent to ${cafe.email} successfully`,
      cafe: cafe._id
    })

    await sendEmail({
      email: cafe.email,
      subject: 'Welcome to Sync! Please verify your email ',
      message
    })
  }
})

// verify cafe
exports.verifyCafe = catchAsyncErrors(async (req, res, next) => {
  const cafe = await syncCafeRegistration.findById(req.body.cafeId)
  if (cafe.isVerified === true) {
    return res.status(200).json({
      success: true,
      message: 'Email already verified'
    })
  }
  if (cafe.otp === req.body.otp) {
    cafe.isVerified = true
    cafe.status = true
    cafe.save()
    sendToken(cafe, 200, res)
  } else {
    res.status(403).json({
      success: false,
      message: 'Entered OTP is wrong'
    })
  }
})

exports.submittedAllForms = catchAsyncErrors(async (req, res, next) => {
  const allCafe = await syncCafeRegistration.findByIdAndUpdate(req.user.id, req.body, {
    new: true
  })
  if (!allCafe) {
    return next(errFunc(res, 401, false, `Cafe does not exist with Id: ${req.user.id}`))
  }
  if (req?.body?.name) {
    allCafe.isSubmitted = true
    allCafe.save()
  }
  res.status(200).json({
    success: true,
    message: 'Cafe is submitted successfully',
    allCafe
  })
})

exports.allCafeData = catchAsyncErrors(async (req, res, next) => {
  if (req.params.id) {
    const allCafe = await syncCafeRegistration.findById(req.params.id).populate([{
      path: 'ratingReviews',
      populate: [
        { path: 'cafeData', model: syncCafeRegistration, select: 'establishmentName pictures streetAddress city' },
        { path: 'userProfile', model: syncRegistration, select: 'name profileImage position country city' }
      ]
    },
    {
      path: 'ratingFilters',
      populate: [
        { path: 'cafeData', model: syncCafeRegistration, select: 'establishmentName pictures streetAddress city' },
        { path: 'userProfile', model: syncRegistration, select: 'name profileImage position country city' }
      ]
    }]).exec()
    if (!allCafe) {
      return next(errFunc(res, 401, false, `Cafe does not exist with Id: ${req.params.id}`))
    }
    res.status(200).json({
      success: true,
      allCafe
    })
  } else {
    const allCafe = await syncCafeRegistration.find()

    res.status(200).json({
      success: true,
      allCafe: allCafe.reverse()
    })
  }
})

exports.cafeResolution = catchAsyncErrors(async (req, res, next) => {
  const cafe = await syncCafeRegistration.findById(req.body.id)
  if (!cafe) {
    return next(errFunc(res, 401, false, `Cafe does not exist with Id: ${req.body.id}`))
  }
  cafe.isAccepted = req.body.resolution
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

exports.updateCafeStatus = catchAsyncErrors(async (req, res, next) => {
  const cafe = await syncCafeRegistration.findById(req.params.id)

  if (!cafe) {
    return next(errFunc(res, 404, false, `cafe does not exist with Id: ${req.params.id}`))
  }

  cafe.status = !cafe.status

  res.status(200).json({
    success: true,
    message: `${cafe.name} is ${
        cafe.status === true ? 'Unarchive' : 'Archive'
      }`
  })

  await cafe.save()
})

exports.isFirstOnCafe = catchAsyncErrors(async (req, res, next) => {
  const cafe = await syncCafeRegistration.findById(req.params.id)

  if (!cafe) {
    return next(errFunc(res, 404, false, `cafe does not exist with Id: ${req.params.id}`))
  }

  cafe.isFirst = false

  res.status(200).json({
    success: true
  })

  await cafe.save()
})

exports.updateCafeDetails = catchAsyncErrors(async (req, res, next) => {
  if (!req.params.id) {
    const user = await syncCafeRegistration.findByIdAndUpdate(req.user.id, req.body, {
      new: true
    })
    if (!user) {
      return next(errFunc(res, 404, false, `Cafe does not exist with Id: ${req.user.id}`))
    }
    res.status(200).json({
      success: true,
      message: 'Cafe updated successfully',
      user
    })
  } else {
    const user = await syncCafeRegistration.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!user) {
      return next(errFunc(res, 404, false, `Cafe does not exist with Id: ${req.user.id}`))
    }
    res.status(200).json({
      success: true,
      message: 'Cafe updated successfully',
      user
    })
  }
})

exports.updateReviews = catchAsyncErrors(async (req, res, next) => {
  const user = await syncRegistration.findById(req.body.userId)
  const cafe = await syncCafeRegistration.findById(req.user.id)
  if (user && cafe) {
    const ratingReview = user.ratingReviews.filter((e) => e.uniqueId === req.body.reviewId)
    const ratingReviewCafe = cafe.ratingReviews.filter((e) => e.uniqueId === req.body.reviewId)
    if (ratingReview.length > 0 && ratingReviewCafe.length > 0) {
      // Update the desired fields of the ratingReview object
      ratingReview[0].reply = req.body.message

      // Save the changes
      await user.save()
      ratingReviewCafe[0].reply = req.body.message
      await cafe.save()
      res.status(200).json({
        success: true,
        message: 'Rating review updated successfully',
        ratingReview
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Rating review not found'
      })
    }
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    })
  }
})

exports.bulkUpload = catchAsyncErrors(async (req, res, next) => {
  req.body.cafeLists?.forEach(async (item) => {
    const cafe = await syncCafeRegistration.findOne({ poi_id: item.poi_id })
    if (!cafe) {
      const aminities = []
      Object.keys(item).forEach(e => {
        if (item[e] === true) {
          aminities.push(e)
        }
      })
      await syncCafeRegistration.create({ ...item, email: `${Date.now()}@gmail.com`, facilities: aminities, isAccepted: 'Approved', status: true })
    }
  })
  res.status(200).json({
    success: true,
    message: 'Cafes created successfully'
  })
})

exports.bulkImageUpload = catchAsyncErrors(async (req, res, next) => {
  const zipFile = req.file
  if (!zipFile) {
    res.status(400).send('No ZIP file provided')
    return
  }

  const response = await axios.get(zipFile.location, { responseType: 'arraybuffer' })
  const buffer = Buffer.from(response.data)

  const extractionPath = './extracted_folder'
  const zip = new AdmZip(buffer)

  zip.extractAllTo(extractionPath, true)

  const extractedFiles = zip.getEntries().map(entry => entry.entryName)

  for (const extractedFile of extractedFiles) {
    const folderName = extractedFile.split('/')
    if (folderName[1]) {
      const fileContent = fs.readFileSync(`${extractionPath}/${extractedFile}`)
      const params = {
        Bucket: 'sync-react-images',
        Key: `path/to/upload/${extractedFile}`,
        Body: fileContent
      }

      try {
        const uploadResult = await s3.upload(params).promise()

        const cafe = await syncCafeRegistration.findOne({ poi_id: folderName[0] })
        if (cafe) {
          const checkImage = cafe.images.some(e => e === uploadResult.Location)
          if (!checkImage) {
            cafe.images.push(uploadResult.Location)
            await cafe.save()
          }
        }
      } catch (error) {
        console.error('Error occurred while uploading file:', error)
      }
    }
  }

  // Clean up the extracted files
  fs.rmdirSync(extractionPath, { recursive: true })

  res.status(200).json({
    success: true,
    message: 'ZIP file extracted and uploaded successfully'
  })
})
