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
