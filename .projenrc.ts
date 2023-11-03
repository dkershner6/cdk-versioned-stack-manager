import { awscdk } from "projen";

const project = new awscdk.AwsCdkConstructLibrary({
  author: "Derek Kershner",
  authorAddress: "https://dkershner.com",
  cdkVersion: "2.101.1",
  defaultReleaseBranch: "main",
  jsiiVersion: "~5.0.0",
  name: "cdk-versioned-stack-manager",
  projenrcTs: true,
  repositoryUrl:
    "https://github.com/dkershner6/cdk-versioned-stack-manager.git",

  // deps: [],                /* Runtime dependencies of this module. */
  description:
    "A CDK construct for dealing with Versioned Stacks - multiple copies of the same stack that would forever grow over time without...this.",
  keywords: [
    "awscdk",
    "aws",
    "cdk",
    "cloudformation",
    "stack",
    "versioned",
    "delete",
  ],

  devDeps: ["@types/aws-lambda"] /* Build dependencies for this module. */,
  bundledDeps: ["@aws-sdk/client-cloudformation"],
  packageName: "cdk-versioned-stack-manager" /* The "name" in package.json. */,

  prettier: true,
});

project.synth();
