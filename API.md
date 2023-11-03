# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### VersionedStackManager <a name="VersionedStackManager" id="cdk-versioned-stack-manager.VersionedStackManager"></a>

This construct will create a custom resource that will manage the versioned stacks, and if too many stacks are present, it will delete the oldest.

This prevents inadvertent AWS Limit errors, and keeps your account clean.

#### Initializers <a name="Initializers" id="cdk-versioned-stack-manager.VersionedStackManager.Initializer"></a>

```typescript
import { VersionedStackManager } from 'cdk-versioned-stack-manager'

new VersionedStackManager(scope: Construct, id: string, props: IVersionedStackManagerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-versioned-stack-manager.VersionedStackManager.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-versioned-stack-manager.VersionedStackManager.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-versioned-stack-manager.VersionedStackManager.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-versioned-stack-manager.IVersionedStackManagerProps">IVersionedStackManagerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-versioned-stack-manager.VersionedStackManager.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-versioned-stack-manager.VersionedStackManager.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-versioned-stack-manager.VersionedStackManager.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-versioned-stack-manager.IVersionedStackManagerProps">IVersionedStackManagerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-versioned-stack-manager.VersionedStackManager.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-versioned-stack-manager.VersionedStackManager.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-versioned-stack-manager.VersionedStackManager.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-versioned-stack-manager.VersionedStackManager.isConstruct"></a>

```typescript
import { VersionedStackManager } from 'cdk-versioned-stack-manager'

VersionedStackManager.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-versioned-stack-manager.VersionedStackManager.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-versioned-stack-manager.VersionedStackManager.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-versioned-stack-manager.VersionedStackManager.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IVersionedStackManagerProps <a name="IVersionedStackManagerProps" id="cdk-versioned-stack-manager.IVersionedStackManagerProps"></a>

- *Implemented By:* <a href="#cdk-versioned-stack-manager.IVersionedStackManagerProps">IVersionedStackManagerProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-versioned-stack-manager.IVersionedStackManagerProps.property.numberOfStacksToKeep">numberOfStacksToKeep</a></code> | <code>number</code> | The number of stacks to keep. |
| <code><a href="#cdk-versioned-stack-manager.IVersionedStackManagerProps.property.stackNamePrefix">stackNamePrefix</a></code> | <code>string</code> | The beginning of the stack name must be consistent for the versioned stacks. |
| <code><a href="#cdk-versioned-stack-manager.IVersionedStackManagerProps.property.dryRun">dryRun</a></code> | <code>boolean</code> | Will only log what it was going to do, rather than actually doing it. |
| <code><a href="#cdk-versioned-stack-manager.IVersionedStackManagerProps.property.sortDirection">sortDirection</a></code> | <code>string</code> | In case you want to sort the stacks in a different way than the default. |

---

##### `numberOfStacksToKeep`<sup>Required</sup> <a name="numberOfStacksToKeep" id="cdk-versioned-stack-manager.IVersionedStackManagerProps.property.numberOfStacksToKeep"></a>

```typescript
public readonly numberOfStacksToKeep: number;
```

- *Type:* number

The number of stacks to keep.

---

##### `stackNamePrefix`<sup>Required</sup> <a name="stackNamePrefix" id="cdk-versioned-stack-manager.IVersionedStackManagerProps.property.stackNamePrefix"></a>

```typescript
public readonly stackNamePrefix: string;
```

- *Type:* string

The beginning of the stack name must be consistent for the versioned stacks.

In this way, we can only give minimal access to ONLY the stacks needed, so it is impossible to delete the wrong stacks.

---

##### `dryRun`<sup>Optional</sup> <a name="dryRun" id="cdk-versioned-stack-manager.IVersionedStackManagerProps.property.dryRun"></a>

```typescript
public readonly dryRun: boolean;
```

- *Type:* boolean

Will only log what it was going to do, rather than actually doing it.

This might make you feel better about using this tool.

---

##### `sortDirection`<sup>Optional</sup> <a name="sortDirection" id="cdk-versioned-stack-manager.IVersionedStackManagerProps.property.sortDirection"></a>

```typescript
public readonly sortDirection: string;
```

- *Type:* string
- *Default:* DESCENDING

In case you want to sort the stacks in a different way than the default.

The FIRST stacks will be kept, and the rest will be deleted.

---

