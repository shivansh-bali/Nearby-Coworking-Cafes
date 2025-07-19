const express = require('express')
const compression = require('compression')
const apicache = require('apicache')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const errorMiddleware = require('./middleware/error')
const user = require('./routes/userRoutes')
const blog = require('./routes/blogRoutes')
const inquiry = require('./routes/contactInquiryRoutes')
const cafe = require('./routes/cafeRoutes')
const cafeClaim = require('./routes/cafeClaimRoutes')
const recommend = require('./routes/recommendRoutes')
const imageUrl = require('./routes/imageRoutes')
const profileRoutes = require('./routes/profileRoutes')
const healthcheckRoutes = require('./routes/healthcheckRoutes')
app.use(cors({
  credentials: true,
  origin: true
}))
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=3, must-revalidate')
  next()
})
app.use(compression({ filter: shouldCompress }))
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  const cache = apicache.middleware
  app.use(cache('5 minutes'))
  // fallback to standard filter function
  return compression.filter(req, res)
}
app.use(errorMiddleware)
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.use('/api/v1', user, blog, inquiry, imageUrl, profileRoutes, cafeClaim)
app.use('/cafe/v1', cafe, recommend)
app.use('/healthcheck', healthcheckRoutes)

module.exports = app
