const catchAsyncErrors = require('../../middleware/catchAsyncErrors')

// Healthcheck
exports.healthcheck = catchAsyncErrors(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Healthcheck Ok'
  })
})
