package cdkversionedstackmanager

import (
	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
)

type IVersionedStackManagerProps interface {
	// Will only log what it was going to do, rather than actually doing it.
	//
	// This might make you feel better about using this tool.
	DryRun() *bool
	// The number of stacks to keep.
	NumberOfStacksToKeep() *float64
	// Change this field whenever you would like the VersionedStackManager to run.
	//
	// The value can be anything, it is simply here as a trigger, and will do so on every change.
	RequestId() *string
	// In case you want to sort the stacks in a different way than the default.
	//
	// The FIRST stacks will be kept, and the rest will be deleted.
	// Default: DESCENDING.
	//
	SortDirection() *string
	// The beginning of the stack name must be consistent for the versioned stacks.
	//
	// In this way, we can only give minimal access to ONLY the stacks needed, so it is impossible to delete the wrong stacks.
	StackNamePrefix() *string
}

// The jsii proxy for IVersionedStackManagerProps
type jsiiProxy_IVersionedStackManagerProps struct {
	_ byte // padding
}

func (j *jsiiProxy_IVersionedStackManagerProps) DryRun() *bool {
	var returns *bool
	_jsii_.Get(
		j,
		"dryRun",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_IVersionedStackManagerProps) NumberOfStacksToKeep() *float64 {
	var returns *float64
	_jsii_.Get(
		j,
		"numberOfStacksToKeep",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_IVersionedStackManagerProps) RequestId() *string {
	var returns *string
	_jsii_.Get(
		j,
		"requestId",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_IVersionedStackManagerProps) SortDirection() *string {
	var returns *string
	_jsii_.Get(
		j,
		"sortDirection",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_IVersionedStackManagerProps) StackNamePrefix() *string {
	var returns *string
	_jsii_.Get(
		j,
		"stackNamePrefix",
		&returns,
	)
	return returns
}

