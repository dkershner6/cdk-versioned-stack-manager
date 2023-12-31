import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";

import { IVersionedStackManagerProps, VersionedStackManager } from "../src";

const app = new cdk.App();
const stack = new cdk.Stack(app, "TestStack");

const TEST_PROPS: IVersionedStackManagerProps = {
    numberOfStacksToKeep: 3,
    stackNamePrefix: "TestVersionedStack",
    requestId: "TestRequestId",
};

new VersionedStackManager(stack, "TestConstruct", TEST_PROPS);

it("should create Custom::VersionedStackManager with the correct props", () => {
    const template = Template.fromStack(stack);

    template.hasResourceProperties("Custom::VersionedStackManager", TEST_PROPS);
});
