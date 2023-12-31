//go:build no_runtime_type_checking

package cdkversionedstackmanager

// Building without runtime type checking enabled, so all the below just return nil

func validateVersionedStackManager_IsConstructParameters(x interface{}) error {
	return nil
}

func validateNewVersionedStackManagerParameters(scope constructs.Construct, id *string, props IVersionedStackManagerProps) error {
	return nil
}

