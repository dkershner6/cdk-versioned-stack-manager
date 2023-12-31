import { Node20AwsCdkConstructLibrary } from "dkershner6-projen-typescript";
import { Nvmrc } from "projen-nvm";

const GITHUB_USERNAME_OR_ORG = "dkershner6";
const GITHUB_USERNAME_OR_ORG_PASCAL_CASE = "DKershner6";
const PROJECT_NAME = "cdk-versioned-stack-manager";
const PROJECT_NAME_PASCAL_CASE = "CdkVersionedStackManager";

const project = new Node20AwsCdkConstructLibrary({
    author: "Derek Kershner",
    authorAddress: "https://dkershner.com",
    cdkVersion: "2.101.1",
    defaultReleaseBranch: "main",
    jsiiVersion: "~5.0.0",
    name: PROJECT_NAME,
    projenrcTs: true,
    repositoryUrl:
        "https://github.com/dkershner6/cdk-versioned-stack-manager.git",
    majorVersion: 1,

    // deps: [],
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

    devDeps: [
        "@types/aws-lambda",
        "aws-sdk-client-mock",
        "esbuild",
        "dkershner6-projen-typescript",
        "projen-nvm",
    ],
    bundledDeps: ["@aws-sdk/client-cloudformation"],
    packageName: PROJECT_NAME,

    gitignore: [".DS_Store"],

    // Publish to other languages
    publishToPypi: {
        distName: PROJECT_NAME,
        module: PROJECT_NAME.replace("-", "_"),
    },

    publishToNuget: {
        packageId: `${GITHUB_USERNAME_OR_ORG_PASCAL_CASE}.${PROJECT_NAME_PASCAL_CASE}`,
        dotNetNamespace: `${GITHUB_USERNAME_OR_ORG_PASCAL_CASE}.${PROJECT_NAME_PASCAL_CASE}`,
    },

    publishToGo: {
        moduleName: `github.com/${GITHUB_USERNAME_OR_ORG}/${PROJECT_NAME}`,
    },

    // publishToMaven: {
    //     mavenGroupId: `io.github.${GITHUB_USERNAME_OR_ORG}`,
    //     javaPackage: `io.github.${GITHUB_USERNAME_OR_ORG}.${PROJECT_NAME.replace(
    //         "-",
    //         "",
    //     )}`,
    //     mavenArtifactId: PROJECT_NAME,
    //     mavenEndpoint: "https://s01.oss.sonatype.org",
    // },
});

new Nvmrc(project);

project.synth();
