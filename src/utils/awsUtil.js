import AWS from 'aws-sdk';

const cognitoRegion = process.env.REACT_APP_COGNITO_REGION;
const identityPoolId = process.env.REACT_APP_IDENTITY_POOL_ID;
const bucketRegion = process.env.REACT_APP_BUCKET_REGION;
const bucketName = process.env.REACT_APP_BUCKET_NAME;

AWS.config.update({
    region: cognitoRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId,
    }),
});

export const authenticatePhotoBucket = new AWS.S3({
    region: bucketRegion,
    apiVersion: '2006-03-01',
    params: { Bucket: bucketName },
});

export const authenticateDynamoDB = new AWS.DynamoDB({apiVersion: '2012-08-10'});
