import * as path from 'path';
import { DnsValidatedCertificate } from '@aws-cdk/aws-certificatemanager';
import {
  CloudFrontWebDistribution,
  ViewerProtocolPolicy,
  OriginAccessIdentity,
  ViewerCertificate,
  SecurityPolicyProtocol,
  CfnDistribution,
} from '@aws-cdk/aws-cloudfront';
import { ARecord, HostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
  BucketEncryption,
} from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import { CfnOutput, Stack, Construct, RemovalPolicy } from '@aws-cdk/core';


/** DUMMY RELEASE */
/**
 * Single Page Application Pattern properties
 */
export interface IErrorCode {

  /**
   * Error Code for the incoming Single Page
   */
  readonly errorCode: number;
  /**
   * Overwrite the above response code to the new response code
   */
  readonly responseCode: number;
  /**
   * Redirect the routing page in the single page application
   */
  readonly responsePagePath: string;
}
export interface SinglePageApplicationPatternProps {
  /**
   * Bucket name that will be used in combination with account id and region for a uniqe name.
   *
   * @default none
   */
  readonly bucketName: string;

  /**
   * Source to put as bucket content to be deployed
   */
  readonly bucketSourcePath?: string;

  /**
   * Site URL to host your site on
   */
  readonly siteUrl: string;

  /**
   * Error Configuration in cloudfront to host the site
   */
  readonly errorConf?: IErrorCode[];
}

/**
 * Construct that exposes an S3 bucket publically that fronts the endpoint with a Cloudfront distrubution
 *
 * @summary Constructs a new instance of the Husqvarna public site construct. This includes a public Cloudfront distrubution that will be exposing your bucket to the internet.
 * @param {cdk.App} scope - represent ths scope for all resources.
 * @param {string} id - this is a scope-unique id.
 * @param {PublicBucketProps} props - user provided props for the bucket.
 * @stability experimental
 */
export class SinglePageApplicationPattern extends Construct {
  readonly bucket: Bucket;
  readonly distrubution: CloudFrontWebDistribution;
  readonly r53record: ARecord;

  constructor(
    scope: Construct,
    id: string,
    props: SinglePageApplicationPatternProps,
  ) {
    super(scope, id);

    const aUrl = props.siteUrl.split('.');
    aUrl.shift();
    const spaHostedZoneDomain = aUrl.join('.');

    /* istanbul ignore next */
    const hostedZone = HostedZone.fromLookup(this, 'spaHostedZone', {
      domainName: spaHostedZoneDomain,
    });

    const certificate = new DnsValidatedCertificate(this, 'spaCertificate', {
      domainName: props.siteUrl,
      hostedZone,
      region: 'us-east-1',
    });

    const oai = new OriginAccessIdentity(this, 'hqvOriginAccessIdentity');

    let bucketName = props.bucketName;
    bucketName += Stack.of(this).account ? '-' + Stack.of(this).account : '';
    bucketName += Stack.of(this).region ? '-' + Stack.of(this).region : '';

    this.bucket = new Bucket(this, 'siteBucket', {
      bucketName: bucketName,
      encryption: BucketEncryption.S3_MANAGED,
      accessControl: BucketAccessControl.PRIVATE,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    this.distrubution = this.configureDistribution(props, oai, certificate);

    // eslint-disable-next-line no-new
    this.r53record = new ARecord(this, 'spaR53Record', {
      zone: hostedZone,
      recordName: props.siteUrl,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.distrubution)),
    });

    new s3deploy.BucketDeployment(this, 'hqvDeployment', {
      destinationBucket: this.bucket,
      sources: [
        s3deploy.Source.asset(
          props.bucketSourcePath
            ? props.bucketSourcePath
            : path.join(__dirname, '../bucket-content/PublicBucket/'),
        ),
      ],
      distribution: this.distrubution,
    });

    this.bucket.grantRead(oai);

    new CfnOutput(this, 'bucketPublicEndpoint', {
      exportName: Stack.of(this).stackName + '-domainName',
      value: this.distrubution.distributionDomainName,
    });

    new CfnOutput(this, 'siteUrl', {
      value: this.r53record.domainName,
      exportName: Stack.of(this).stackName + '-spaUrl',
    });
  }

  private configureDistribution(
    props: SinglePageApplicationPatternProps,
    oai: OriginAccessIdentity,
    certificate: DnsValidatedCertificate,
  ) {
    let distrubution: CloudFrontWebDistribution;
    if (props.errorConf != undefined) {
      const errorConfigurations: CfnDistribution.CustomErrorResponseProperty[] =
        [];
      for (let i = 0; i < props.errorConf.length; i++) {
        errorConfigurations.push({
          errorCode: props.errorConf[i].errorCode,
          responsePagePath: props.errorConf[i].responsePagePath,
          responseCode: props.errorConf[i].responseCode,
        });
      }
      distrubution = new CloudFrontWebDistribution(this, 'hqvDistrubution', {
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        originConfigs: this.createoriginconf(oai),
        viewerCertificate: this.retrieveVieweCert(certificate, props),
        errorConfigurations: errorConfigurations,
      });
    } else {
      distrubution = new CloudFrontWebDistribution(this, 'hqvDistrubution', {
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        originConfigs: this.createoriginconf(oai),
        viewerCertificate: this.retrieveVieweCert(certificate, props),
      });
    }
    return distrubution;
  }

  private retrieveVieweCert(
    certificate: DnsValidatedCertificate,
    props: SinglePageApplicationPatternProps,
  ) {
    return ViewerCertificate.fromAcmCertificate(certificate, {
      aliases: [props.siteUrl],
      securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2019,
    });
  }

  private createoriginconf(oai: OriginAccessIdentity) {
    return [
      {
        s3OriginSource: {
          s3BucketSource: this.bucket,
          originAccessIdentity: oai,
        },
        behaviors: [{ isDefaultBehavior: true }],
      },
    ];
  }
}
