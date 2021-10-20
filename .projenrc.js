const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  author: 'Johannes Hansson',
  authorAddress: 'johannes.hansson@husqvarnagroup.com',
  cdkVersion: '1.85.0',
  defaultReleaseBranch: 'master',
  name: '@hqv-cdk/hqv-patterns',
  repositoryUrl: 'git@ssh.dev.azure.com:v3/HQV-DS/CAD-Internal/cdk-construct-patterns',
  npmRegistryUrl: 'https://husqvarnadss.jfrog.io/artifactory/api/npm/npm-local/',
  npmDistTag: 'latest',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-route53',
    '@aws-cdk/aws-route53-targets',
    '@aws-cdk/aws-cloudfront',
    '@aws-cdk/aws-cloudfront-origins',
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/aws-certificatemanager',
  ],
});


project.synth();
