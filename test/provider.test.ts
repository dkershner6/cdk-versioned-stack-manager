import {
    CloudFormationClient,
    DeleteStackCommand,
    ListStacksCommand,
} from "@aws-sdk/client-cloudformation";
import { mockClient } from "aws-sdk-client-mock";

import { VersionedStackManagerCreateAndUpdater } from "../src/provider";
import { IVersionedStackManagerProps } from "../src/types";

const cloudformationMock = mockClient(CloudFormationClient)
    .on(ListStacksCommand)
    .resolves({
        StackSummaries: [
            {
                StackName: "TestVersionedStack-1",
                CreationTime: new Date(),
                StackStatus: "CREATE_COMPLETE",
            },
            {
                StackName: "TestVersionedStack-2",
                CreationTime: new Date(),
                StackStatus: "CREATE_COMPLETE",
            },
            {
                StackName: "TestVersionedStack-3",
                CreationTime: new Date(),
                StackStatus: "CREATE_COMPLETE",
            },
            {
                StackName: "TestVersionedStack-4",
                CreationTime: new Date(),
                StackStatus: "CREATE_COMPLETE",
            },
            {
                StackName: "TestVersionedStack-5",
                CreationTime: new Date(),
                StackStatus: "CREATE_COMPLETE",
            },
        ],
    });

const TEST_PROPS: IVersionedStackManagerProps = {
    numberOfStacksToKeep: 3,
    stackNamePrefix: "TestVersionedStack",
    requestId: "TestRequestId",
};

describe("VersionedStackManagerCreateAndUpdater", () => {
    afterEach(() => {
        cloudformationMock.resetHistory();
    });

    it("Should validate props", () => {
        // @ts-expect-error - Testing this
        expect(() => new VersionedStackManagerCreateAndUpdater({})).toThrow(
            "requestId must be provided",
        );
    });

    it("Should call for all of the stacks", async () => {
        const manager = new VersionedStackManagerCreateAndUpdater(TEST_PROPS);

        await manager.createOrUpdate();

        expect(cloudformationMock.call(0).firstArg).toBeInstanceOf(
            ListStacksCommand,
        );
    });

    it("Should delete the two lowest stacks (Keep 3, 5 total, 5-3 = 2) with SortOrder DESCENDING", async () => {
        const manager = new VersionedStackManagerCreateAndUpdater(TEST_PROPS);

        await manager.createOrUpdate();

        expect(cloudformationMock.call(1).firstArg).toBeInstanceOf(
            DeleteStackCommand,
        );
        expect(cloudformationMock.call(1).firstArg.input.StackName).toEqual(
            "TestVersionedStack-2",
        );

        expect(cloudformationMock.call(2).firstArg).toBeInstanceOf(
            DeleteStackCommand,
        );
        expect(cloudformationMock.call(2).firstArg.input.StackName).toEqual(
            "TestVersionedStack-1",
        );
    });

    it("Should delete the two lowest stacks (Keep 3, 5 total, 5-3 = 2) with SortOrder ASCENDING", async () => {
        const manager = new VersionedStackManagerCreateAndUpdater({
            ...TEST_PROPS,
            sortDirection: "ASCENDING",
        });

        await manager.createOrUpdate();

        expect(cloudformationMock.call(1).firstArg).toBeInstanceOf(
            DeleteStackCommand,
        );
        expect(cloudformationMock.call(1).firstArg.input.StackName).toEqual(
            "TestVersionedStack-4",
        );

        expect(cloudformationMock.call(2).firstArg).toBeInstanceOf(
            DeleteStackCommand,
        );
        expect(cloudformationMock.call(2).firstArg.input.StackName).toEqual(
            "TestVersionedStack-5",
        );
    });

    it("Should not delete anything with dryRun set to true", async () => {
        const manager = new VersionedStackManagerCreateAndUpdater({
            ...TEST_PROPS,
            dryRun: true,
        });

        await manager.createOrUpdate();

        const calls = cloudformationMock.calls();
        expect(calls.length).toEqual(1);

        for (const call of calls) {
            expect(call.firstArg).not.toBeInstanceOf(DeleteStackCommand);
        }
    });
});
