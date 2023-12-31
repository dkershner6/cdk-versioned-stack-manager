export interface IVersionedStackManagerProps {
    /**
     * Will only log what it was going to do, rather than actually doing it.
     * This might make you feel better about using this tool.
     */
    readonly dryRun?: boolean;
    /**
     * The number of stacks to keep.
     */
    readonly numberOfStacksToKeep: number;
    /**
     * Change this field whenever you would like the VersionedStackManager to run.
     * The value can be anything, it is simply here as a trigger, and will do so on every change.
     */
    readonly requestId: string;
    /**
     * The beginning of the stack name must be consistent for the versioned stacks.
     *
     * In this way, we can only give minimal access to ONLY the stacks needed, so it is impossible to delete the wrong stacks.
     */
    readonly stackNamePrefix: string;
    /**
     * In case you want to sort the stacks in a different way than the default.
     * The FIRST stacks will be kept, and the rest will be deleted.
     *
     * @default DESCENDING
     */
    readonly sortDirection?: "ASCENDING" | "DESCENDING";
}

export const validateProps = (props: IVersionedStackManagerProps): boolean => {
    if (props.numberOfStacksToKeep < 1) {
        throw new Error(
            "numberOfStacksToKeep must be greater than or equal to 1",
        );
    }

    if (!props.requestId) {
        throw new Error("requestId must be provided");
    }

    if (!props.stackNamePrefix) {
        throw new Error("stackNamePrefix must be provided");
    }

    if (
        !!props.sortDirection &&
        props.sortDirection !== "ASCENDING" &&
        props.sortDirection !== "DESCENDING"
    ) {
        throw new Error("sortDirection must be either ASCENDING or DESCENDING");
    }

    return true;
};
