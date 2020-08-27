const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const {v4: uuidv4} = require('uuid');

const keys = require('../keys.json');

aws.config.update({
    secretAccessKey: keys.AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: keys.AWS_S3_ACCESS_KEY,
    region: keys.AWS_S3_REGION
})

var s3 = new aws.S3()
 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: keys.AWS_S3_BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA'});
    },
    key: function (req, file, cb) {
      cb(null,  uuidv4()+"_"+file.fieldname)
    }
  })
})

module.exports = upload;