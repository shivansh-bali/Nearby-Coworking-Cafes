const multerS3 = require('multer-s3')
const multer = require('multer')

const aws = require('aws-sdk')
aws.config.update({
  secretAccessKey: 'VnK3drNQH1Q69ISbWHzUmXORzR3/HSe2ztd2QfV5',
  accessKeyId: 'AKIASRKSEXEJRTN7MFVJ',
  region: 'us-east-1'
})
const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'sync-react-images',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname)
    }
  })
})

module.exports = upload
