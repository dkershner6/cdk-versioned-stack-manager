// A CDK construct for dealing with Versioned Stacks - multiple copies of the same stack that would forever grow over time without...this.
package cdkversionedstackmanager

import (
	"reflect"

	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
)

func init() {
	_jsii_.RegisterInterface(
		"cdk-versioned-stack-manager.IVersionedStackManagerProps",
		reflect.TypeOf((*IVersionedStackManagerProps)(nil)).Elem(),
		[]_jsii_.Member{
			_jsii_.MemberProperty{JsiiProperty: "dryRun", GoGetter: "DryRun"},
			_jsii_.MemberProperty{JsiiProperty: "numberOfStacksToKeep", GoGetter: "NumberOfStacksToKeep"},
			_jsii_.MemberProperty{JsiiProperty: "requestId", GoGetter: "RequestId"},
			_jsii_.MemberProperty{JsiiProperty: "sortDirection", GoGetter: "SortDirection"},
			_jsii_.MemberProperty{JsiiProperty: "stackNamePrefix", GoGetter: "StackNamePrefix"},
		},
		func() interface{} {
			return &jsiiProxy_IVersionedStackManagerProps{}
		},
	)
	_jsii_.RegisterClass(
		"cdk-versioned-stack-manager.VersionedStackManager",
		reflect.TypeOf((*VersionedStackManager)(nil)).Elem(),
		[]_jsii_.Member{
			_jsii_.MemberProperty{JsiiProperty: "node", GoGetter: "Node"},
			_jsii_.MemberMethod{JsiiMethod: "toString", GoMethod: "ToString"},
		},
		func() interface{} {
			j := jsiiProxy_VersionedStackManager{}
			_jsii_.InitJsiiProxy(&j.Type__constructsConstruct)
			return &j
		},
	)
}
