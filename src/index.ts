import * as fs from "fs";
import * as path from "path";

import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdanodejs from "aws-cdk-lib/aws-lambda-nodejs";

import * as cr from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import { IVersionedStackManagerProps } from "./types";

/**
 * This construct will create a custom resource that will manage the versioned stacks,
 * and if too many stacks are present, it will delete the oldest.
 *
 * This prevents inadvertent AWS Limit errors, and keeps your account clean.
 *
 * @param props IVersionedStackManagerProps
 */
export class VersionedStackManager extends Construct {
  private readonly provider: cr.Provider;

  constructor(
    scope: Construct,
    private readonly id: string,
    private readonly props: IVersionedStackManagerProps,
  ) {
    super(scope, id);

    this.validateProps();

    this.provider = this.createProductionPromoterProvider();
    this.createResource();
  }

  private validateProps(): boolean {
    return true;
  }

  private createProductionPromoterProvider(): cr.Provider {
    const providerFileName = "provider";
    const providerPathTs = path.join(__dirname, `${providerFileName}.ts`);
    const providerPathJs = path.join(__dirname, `${providerFileName}.js`);

    const onEventHandler = new lambdanodejs.NodejsFunction(
      this,
      `${this.id}-OnEventHandler`,
      {
        entry: fs.existsSync(providerPathTs) ? providerPathTs : providerPathJs,
        handler: "onEvent",
        runtime: lambda.Runtime.NODEJS_18_X,
        timeout: cdk.Duration.minutes(5),
      },
    );

    onEventHandler.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: [
          `arn:aws:cloudformation:${cdk.Stack.of(this).region}:${
            cdk.Stack.of(this).account
          }:stack/${this.props.stackNamePrefix}*`,
        ],
        actions: ["cloudformation:DeleteStack"],
      }),
    );

    onEventHandler.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: ["*"],
        actions: ["cloudformation:ListStacks"],
      }),
    );

    return new cr.Provider(this, `${this.id}-VersionedStackManagerProvider`, {
      onEventHandler,
    });
  }

  private createResource(): cdk.CustomResource {
    return new cdk.CustomResource(
      this,
      `${this.id}-VersionedStackManagerResource`,
      {
        serviceToken: this.provider.serviceToken,
        resourceType: "Custom::VersionedStackManager",
        properties: this.props,
      },
    );
  }
}

export * from "./types";
