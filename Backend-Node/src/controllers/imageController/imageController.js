const catchAsyncErrors = require('../../middleware/catchAsyncErrors')

// create ImageURL
exports.createImage = catchAsyncErrors(async (req, res, next) => {
  res.status(201).json({
    success: true,
    image: { image: req.file.location }
  })
})
