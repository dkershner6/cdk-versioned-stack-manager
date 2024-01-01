import {
    CloudFormationClient,
    DeleteStackCommand,
    ListStacksCommand,
    ListStacksCommandOutput,
    StackStatus,
    StackSummary,
} from "@aws-sdk/client-cloudformation";
import type {
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceEvent,
    CloudFormationCustomResourceResponse,
    CloudFormationCustomResourceUpdateEvent,
} from "aws-lambda";

import { IVersionedStackManagerProps, validateProps } from "./types";

const cloudformation = new CloudFormationClient();

export const onEvent = async (
    event: CloudFormationCustomResourceEvent,
): Promise<CloudFormationCustomResourceResponse> => {
    console.debug("Event Received:", JSON.stringify(event));

    try {
        switch (event.RequestType) {
            case "Create":
                return await onCreateOrUpdate(
                    event as CloudFormationCustomResourceCreateEvent,
                );
            case "Update":
                return await onCreateOrUpdate(
                    event as CloudFormationCustomResourceUpdateEvent,
                );
            case "Delete":
                return await onDelete(
                    event as CloudFormationCustomResourceDeleteEvent,
                );
            default:
                throw new Error(`Unknown event type in event ${event}`);
        }
    } catch (err) {
        console.error(err);
        throw new Error("Failed");
    }
};

const onCreateOrUpdate = async (
    event:
        | CloudFormationCustomResourceCreateEvent
        | CloudFormationCustomResourceUpdateEvent,
): Promise<CloudFormationCustomResourceResponse> => {
    const resourceProperties =
        event.ResourceProperties as unknown as IVersionedStackManagerProps;

    const createOrUpdater = new VersionedStackManagerCreateAndUpdater(
        resourceProperties,
    );

    const deletedStackNames = await createOrUpdater.createOrUpdate();

    return {
        Status: "SUCCESS",
        RequestId: event.RequestId,
        StackId: event.StackId,
        LogicalResourceId: event.LogicalResourceId,
        PhysicalResourceId: deletedStackNames?.join(",") ?? "None",
    };
};

const NON_DELETED_STACK_STATUSES: StackStatus[] = [
    StackStatus.CREATE_COMPLETE,
    StackStatus.CREATE_FAILED,
    StackStatus.CREATE_IN_PROGRESS,
    StackStatus.DELETE_FAILED,
    StackStatus.IMPORT_COMPLETE,
    StackStatus.IMPORT_IN_PROGRESS,
    StackStatus.IMPORT_ROLLBACK_COMPLETE,
    StackStatus.IMPORT_ROLLBACK_FAILED,
    StackStatus.IMPORT_ROLLBACK_IN_PROGRESS,
    StackStatus.REVIEW_IN_PROGRESS,
    StackStatus.ROLLBACK_COMPLETE,
    StackStatus.ROLLBACK_FAILED,
    StackStatus.ROLLBACK_IN_PROGRESS,
    StackStatus.UPDATE_COMPLETE,
    StackStatus.UPDATE_COMPLETE_CLEANUP_IN_PROGRESS,
    StackStatus.UPDATE_IN_PROGRESS,
    StackStatus.UPDATE_ROLLBACK_COMPLETE,
    StackStatus.UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS,
    StackStatus.UPDATE_ROLLBACK_FAILED,
    StackStatus.UPDATE_ROLLBACK_IN_PROGRESS,
];

const sortStacksAscending = (
    stackA: StackSummary,
    stackB: StackSummary,
): number => {
    return (stackA?.StackName ?? "ZZZZZ") < (stackB?.StackName ?? "ZZZZZ")
        ? -1
        : 1;
};

const sortStacksDescending = (
    stackA: StackSummary,
    stackB: StackSummary,
): number => {
    return (stackA?.StackName ?? "AAAAA") < (stackB?.StackName ?? "AAAAA")
        ? 1
        : -1;
};

export class VersionedStackManagerCreateAndUpdater {
    constructor(
        private readonly resourceProperties: IVersionedStackManagerProps,
    ) {
        validateProps(resourceProperties);
    }

    public async createOrUpdate(): Promise<string[] | undefined> {
        if (this.resourceProperties.numberOfStacksToKeep < 1) {
            return;
        }

        const allStacks = await this.listAllNonDeletedStacks();

        const relevantStacks = allStacks.filter(
            (stack) =>
                stack?.StackName?.startsWith(
                    this.resourceProperties.stackNamePrefix,
                ),
        );

        const stacksToDelete = relevantStacks
            .sort((stackA, stackB) => {
                if (this.resourceProperties.sortDirection === "ASCENDING") {
                    return sortStacksAscending(stackA, stackB);
                }

                return sortStacksDescending(stackA, stackB);
            })
            .slice(this.resourceProperties.numberOfStacksToKeep);

        console.debug(
            `Deleting ${stacksToDelete.length} Stacks (dryRun: ${
                this.resourceProperties.dryRun ?? false
            }): `,
            stacksToDelete.map((s) => s.StackName).join(","),
        );

        if (!this.resourceProperties.dryRun) {
            for (const stack of stacksToDelete) {
                await cloudformation.send(
                    new DeleteStackCommand({
                        StackName: stack.StackName,
                    }),
                );
            }
        }

        return stacksToDelete.map((s) => s.StackName) as string[];
    }

    public async listAllNonDeletedStacks(): Promise<StackSummary[]> {
        const stacks = new Array<StackSummary>();
        let cursor: string | undefined = undefined;

        do {
            const response: ListStacksCommandOutput = await cloudformation.send(
                new ListStacksCommand({
                    StackStatusFilter: NON_DELETED_STACK_STATUSES,
                    NextToken: cursor,
                }),
            );

            cursor = response.NextToken;

            stacks.push(...(response.StackSummaries ?? []));
        } while (cursor);

        return stacks;
    }
}

const onDelete = async (
    event: CloudFormationCustomResourceDeleteEvent,
): Promise<CloudFormationCustomResourceResponse> => {
    // Doing nothing, perhaps someday allow for deletion of all resources created using a retention policy prop.

    return {
        Status: "SUCCESS",
        RequestId: event.RequestId,
        StackId: event.StackId,
        LogicalResourceId: event.LogicalResourceId,
        PhysicalResourceId: event.PhysicalResourceId,
    };
};
