# API Reference

**Classes**

Name|Description
----|-----------
[SinglePageApplicationPattern](#hqv-cdk-hqv-patterns-singlepageapplicationpattern)|Construct that exposes an S3 bucket publically that fronts the endpoint with a Cloudfront distrubution.


**Structs**

Name|Description
----|-----------
[SinglePageApplicationPatternProps](#hqv-cdk-hqv-patterns-singlepageapplicationpatternprops)|*No description*


**Interfaces**

Name|Description
----|-----------
[IErrorCode](#hqv-cdk-hqv-patterns-ierrorcode)|Single Page Application Pattern properties.



## class SinglePageApplicationPattern 🔹 <a id="hqv-cdk-hqv-patterns-singlepageapplicationpattern"></a>

Construct that exposes an S3 bucket publically that fronts the endpoint with a Cloudfront distrubution.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new SinglePageApplicationPattern(scope: Construct, id: string, props: SinglePageApplicationPatternProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SinglePageApplicationPatternProps](#hqv-cdk-hqv-patterns-singlepageapplicationpatternprops)</code>)  *No description*
  * **bucketName** (<code>string</code>)  Bucket name that will be used in combination with account id and region for a uniqe name. 
  * **siteUrl** (<code>string</code>)  Site URL to host your site on. 
  * **bucketSourcePath** (<code>string</code>)  Source to put as bucket content to be deployed. __*Optional*__
  * **errorConf** (<code>Array<[IErrorCode](#hqv-cdk-hqv-patterns-ierrorcode)></code>)  Error Configuration in cloudfront to host the site. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**bucket**🔹 | <code>[Bucket](#aws-cdk-aws-s3-bucket)</code> | <span></span>
**distrubution**🔹 | <code>[CloudFrontWebDistribution](#aws-cdk-aws-cloudfront-cloudfrontwebdistribution)</code> | <span></span>
**r53record**🔹 | <code>[ARecord](#aws-cdk-aws-route53-arecord)</code> | <span></span>



## interface IErrorCode  <a id="hqv-cdk-hqv-patterns-ierrorcode"></a>


Single Page Application Pattern properties.

### Properties


Name | Type | Description 
-----|------|-------------
**errorCode** | <code>number</code> | Error Code for the incoming Single Page.
**responseCode** | <code>number</code> | Overwrite the above response code to the new response code.
**responsePagePath** | <code>string</code> | Redirect the routing page in the single page application.



## struct SinglePageApplicationPatternProps  <a id="hqv-cdk-hqv-patterns-singlepageapplicationpatternprops"></a>






Name | Type | Description 
-----|------|-------------
**bucketName** | <code>string</code> | Bucket name that will be used in combination with account id and region for a uniqe name.
**siteUrl** | <code>string</code> | Site URL to host your site on.
**bucketSourcePath**? | <code>string</code> | Source to put as bucket content to be deployed.<br/>__*Optional*__
**errorConf**? | <code>Array<[IErrorCode](#hqv-cdk-hqv-patterns-ierrorcode)></code> | Error Configuration in cloudfront to host the site.<br/>__*Optional*__



