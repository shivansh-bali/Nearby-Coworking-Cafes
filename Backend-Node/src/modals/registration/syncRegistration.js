const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const Schema = mongoose.Schema

const ratingReviews = {
  uniqueId: String,
  cafeData: {
    type: Schema.Types.ObjectId,
    ref: 'syncCafeRegistration'
  },
  message: String,
  photos: Array,
  point: Number,
  userProfile: {
    type: Schema.Types.ObjectId,
    ref: 'syncRegistration'
  },
  reply: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}

const ratingFilters = {
  atmosphere: Number,
  cafeData: {
    type: Schema.Types.ObjectId,
    ref: 'syncCafeRegistration'
  },
  outletAvaibility: Number,
  userProfile: {
    type: Schema.Types.ObjectId,
    ref: 'syncRegistration'
  },
  wifiQuality: Number
}

const subcribers = {
  name: String,
  email: String,
  terms: Boolean
}

const registerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
    select: false
  },
  mobileNumber: {
    type: Number
  },
  dialCode: {
    type: Number
  },
  countryCode: {
    type: String
  },
  role: {
    type: String,
    default: 'user'
  },
  status: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  bannerImage: {
    type: String
  },
  headline: {
    type: String
  },
  companyName: {
    type: String
  },
  position: {
    type: String
  },
  industry: {
    type: String
  },
  showCompany: {
    type: Boolean,
    default: false
  },
  schoolName: {
    type: String
  },
  showEducation: {
    type: Boolean,
    default: false
  },
  country: {
    type: String
  },
  postalCode: {
    type: String
  },
  city: {
    type: String
  },
  landline: {
    type: Number
  },
  address: {
    type: String
  },
  birthdayMonth: {
    type: String
  },
  birthdayDate: {
    type: Number
  },
  website: {
    type: String
  },
  about: {
    type: String
  },
  photos: {
    type: Array
  },
  savedCafe: [{
    type: Schema.Types.ObjectId,
    ref: 'syncCafeRegistration'
  }],
  ratingReviews: [
    ratingReviews
  ],
  ratingFilters: [
    ratingFilters
  ],
  pinnedCafe: {
    type: Array
  },
  profileImage: {
    type: String
  },
  searchLocation: {
    type: Array
  },
  isSearchLocation: {
    type: Boolean
  },
  subscribeToConnect: {
    type: subcribers
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String,
    select: false
  },
  resetPasswordExpire: {
    type: Date,
    select: false
  },
  verifyUserToken: {
    type: String,
    select: false
  },
  verifyUserExpire: {
    type: Date,
    select: false
  }
})

registerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

// JWT TOKEN
registerSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// Generating Verify User Reset Token
registerSchema.methods.getVerifyUserToken = function () {
  // Generating Token
  const verifyToken = crypto.randomBytes(20).toString('hex')

  // Hashing and adding verifyToken to userSchema
  this.verifyUserToken = crypto
    .createHash('sha256')
    .update(verifyToken)
    .digest('hex')

  this.verifyUserExpire = Date.now() + 15 * 60 * 1000

  return verifyToken
}

// Compare Password

registerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// Generating Password Reset Token
registerSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

  return resetToken
}

const syncRegistration = mongoose.model(
  'sync_registration',
  registerSchema
)

module.exports = syncRegistration
