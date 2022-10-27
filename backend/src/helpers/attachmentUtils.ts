import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk') 

const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new XAWS.S3({
    signatureVersion: 'v4'
})
  
const bucketname = process.env.ATTACHMENT_S3_BUCKET
// const XAWS = AWSXRay.captureAWS(AWS)

// // TODO: Implement the fileStogare logic

export async function getUploadUrl(todoId: string): Promise<string> {

  const url = s3.getSignedUrl('putObject', {
    Bucket: bucketname,
    Key: todoId,
    Expires: 300
  });
  console.log(url);

  return url as string
  }