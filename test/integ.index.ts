import * as cdk from '@aws-cdk/core';
import { SinglePageApplicationPattern } from '../src';
const app = new cdk.App();

class BucketStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    new SinglePageApplicationPattern(this, 'HqvPublicBucket', {
      bucketName: 'TestPublicBucket',
      bucketSourcePath: __dirname + '/../test',
      siteUrl: 'https://www.test.husqvarnagrouptest.se',
    });

  }
}

new BucketStack(app, 'hqv-bucket-stack');
app.synth();