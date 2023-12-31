//go:build !no_runtime_type_checking

package cdkversionedstackmanager

import (
	"fmt"

	"github.com/aws/constructs-go/constructs/v10"
)

func validateVersionedStackManager_IsConstructParameters(x interface{}) error {
	if x == nil {
		return fmt.Errorf("parameter x is required, but nil was provided")
	}

	return nil
}

func validateNewVersionedStackManagerParameters(scope constructs.Construct, id *string, props IVersionedStackManagerProps) error {
	if scope == nil {
		return fmt.Errorf("parameter scope is required, but nil was provided")
	}

	if id == nil {
		return fmt.Errorf("parameter id is required, but nil was provided")
	}

	if props == nil {
		return fmt.Errorf("parameter props is required, but nil was provided")
	}

	return nil
}

