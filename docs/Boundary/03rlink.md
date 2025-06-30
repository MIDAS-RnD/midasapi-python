# Rigid Link

A nested class within Boundary used to create rigid connections between a master node and multiple slave nodes.

## Constructor
---
**<font color="green">`Boundary.RigidLink(master_node, slave_nodes, group = "", id = None, dof = 111111)`</font>**

Creates rigid links connecting a master node to one or more slave nodes with specified degrees of freedom.

### Parameters
* `master_node`: Master node ID (controls the motion)
* `slave_nodes`: List of slave node IDs (follow master node motion)
* `group (default="")`: Boundary group name
* `id (default=None)`: Manual ID assignment (auto-assigned if None)
* `dof (default=111111)`: Degrees of freedom constraint (6-digit integer)




### DOF Constraint Format
* **6-digit format**: DXDYDZ RXRYRZ (e.g., 111111 for all DOF, 111000 for translations only)
* **1**: Constrained (rigid connection)
* **0**: Free (no constraint)

### Class Attributes
*Boundary.RigidLink.links* -> List of all rigid link instances.

### Object Attributes
* `M_NODE` (int): The master node ID of the rigid link.
* `S_NODE` (list): A list of slave node IDs.
* `GROUP_NAME` (str): The name of the boundary group.
* `DOF` (int): A 6-digit integer representing the degrees of freedom constrained (Dx, Dy, Dz, Rx, Ry, Rz). '1' for constrained.
* `ID` (int): The ID of the rigid link.


## Methods
---

#### json
Returns JSON representation of all rigid links.

```py
rlink1 = Boundary.RigidLink(1, [2, 3], "Group1", 1, 111111)
print(Boundary.RigidLink.json())
```

#### create
Sends rigid link data to Civil NX.

```py
Boundary.RigidLink.create()
```

#### get
Fetches rigid link data from Civil NX.

```py
print(Boundary.RigidLink.get())
```

#### sync
Synchronizes rigid links from Civil NX to Python.

```py
Boundary.RigidLink.sync()
```

#### delete
Deletes all rigid links from both Python and Civil NX.

```py
Boundary.RigidLink.delete()
```


## Examples
---
#### Single Slave Node
```py
# Create nodes
for i in range(5):
    Node(i*5, 0, 0)
Node.create()

# Rigid link between master and single slave
rlink1 = Boundary.RigidLink(1, [2], "", 1, 111111)
Boundary.RigidLink.create()
```


#### Multiple Slave Nodes
```py
# Create nodes
for i in range(5):
    Node(i*5, 0, 0)
Node.create()

# Rigid link with multiple slave nodes
rlink2 = Boundary.RigidLink(3, [4, 5], "", 2, 111111)
Boundary.RigidLink.create()
```


#### Partial DOF Constraint
```py
# Create nodes
for i in range(5):
    Node(i*5, 0, 0)
Node.create()

# Rigid link with only translational constraints
rlink3 = Boundary.RigidLink(1, [2, 3], "", 3, 111000)
Boundary.RigidLink.create()
```

