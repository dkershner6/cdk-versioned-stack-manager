package cdkversionedstackmanager

import (
	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
	_init_ "github.com/dkershner6/cdk-versioned-stack-manager/cdkversionedstackmanager/jsii"

	"github.com/aws/constructs-go/constructs/v10"
	"github.com/dkershner6/cdk-versioned-stack-manager/cdkversionedstackmanager/internal"
)

// This construct will create a custom resource that will manage the versioned stacks, and if too many stacks are present, it will delete the oldest.
//
// This prevents inadvertent AWS Limit errors, and keeps your account clean.
type VersionedStackManager interface {
	constructs.Construct
	// The tree node.
	Node() constructs.Node
	// Returns a string representation of this construct.
	ToString() *string
}

// The jsii proxy struct for VersionedStackManager
type jsiiProxy_VersionedStackManager struct {
	internal.Type__constructsConstruct
}

func (j *jsiiProxy_VersionedStackManager) Node() constructs.Node {
	var returns constructs.Node
	_jsii_.Get(
		j,
		"node",
		&returns,
	)
	return returns
}


func NewVersionedStackManager(scope constructs.Construct, id *string, props IVersionedStackManagerProps) VersionedStackManager {
	_init_.Initialize()

	if err := validateNewVersionedStackManagerParameters(scope, id, props); err != nil {
		panic(err)
	}
	j := jsiiProxy_VersionedStackManager{}

	_jsii_.Create(
		"cdk-versioned-stack-manager.VersionedStackManager",
		[]interface{}{scope, id, props},
		&j,
	)

	return &j
}

func NewVersionedStackManager_Override(v VersionedStackManager, scope constructs.Construct, id *string, props IVersionedStackManagerProps) {
	_init_.Initialize()

	_jsii_.Create(
		"cdk-versioned-stack-manager.VersionedStackManager",
		[]interface{}{scope, id, props},
		v,
	)
}

// Checks if `x` is a construct.
//
// Returns: true if `x` is an object created from a class which extends `Construct`.
// Deprecated: use `x instanceof Construct` instead.
func VersionedStackManager_IsConstruct(x interface{}) *bool {
	_init_.Initialize()

	if err := validateVersionedStackManager_IsConstructParameters(x); err != nil {
		panic(err)
	}
	var returns *bool

	_jsii_.StaticInvoke(
		"cdk-versioned-stack-manager.VersionedStackManager",
		"isConstruct",
		[]interface{}{x},
		&returns,
	)

	return returns
}

func (v *jsiiProxy_VersionedStackManager) ToString() *string {
	var returns *string

	_jsii_.Invoke(
		v,
		"toString",
		nil, // no parameters
		&returns,
	)

	return returns
}

