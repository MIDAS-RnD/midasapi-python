# Specified Displacement

A nested class within Load used to create specified displacement loads for prescribed boundary conditions.

## Constructor
---
**<font color="green">`Load.SpDisp(node, load_case, load_group="", values=[0, 0, 0, 0, 0, 0], id="")`</font>**

Creates specified displacement loads and converts to JSON format for applying prescribed displacements at nodes.

### Parameters
* `node`: Node number where displacement is applied (Required)
* `load_case`: Load case name (Required)
* `load_group (default="")`: Load group name
* `values (default=[0, 0, 0, 0, 0, 0])`: Displacement values [Dx, Dy, Dz, Rx, Ry, Rz]
* `id (default="")`: Load ID (auto-generated if empty)

### Object Attributes
* `NODE` (int): The node number where the specified displacement is applied.
* `LCN` (str): The name of the load case.
* `LDGR` (str): The name of the load group.
* `VALUES` (list): List of displacement values [Dx, Dy, Dz, Rx, Ry, Rz].
* `ID` (int/str): The ID of the specified displacement entry.

## Methods
---
#### json
Returns JSON representation of all specified displacement loads.

```py
sp1 = Load.SpDisp(10, "Settlement", "Group1", [1.5, 1.5, 1.5, 1.5, 0.5, 0.5])
print(Load.SpDisp.json())
```

#### create
Sends specified displacement loads to Civil NX.

```py
Load.SpDisp.create()
```

#### get
Fetches specified displacement loads from Civil NX.

```py
print(Load.SpDisp.get())
```

#### sync
Synchronizes specified displacement loads from Civil NX.

```py
Load.SpDisp.sync()
```

#### delete
Deletes all specified displacement loads from both Python and Civil NX.

```py
Load.SpDisp.delete()
```

## Examples
---
```py
# Specified Displacement Example
# Create nodes first
for i in range(3):
    Node(i*10, 0, 0)
Node.create()

# Create load case
Load_Case("STL", "Settlement")
Load_Case.create()

# Create load group (optional)
Group.Load("Foundation Settlement")
Group.Load.create()

# Define Specified Displacement - Settlement case
Load.SpDisp(1, "Settlement", "Foundation Settlement", [0, 0, -0.05, 0, 0, 0]) 
Load.SpDisp.create()

# Define Specified Displacement - Thermal expansion
Load.SpDisp(2, "Settlement", "", [0.01, 0, 0, 0, 0, 0])  
Load.SpDisp.create()

# Define multiple displacement components
Load.SpDisp(3, "Settlement", "", [0.02, 0.01, -0.03, 0.0005, 0.0005, 0])
Load.SpDisp.create()
```