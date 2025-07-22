# Nodal Temperature

A nested class within Temperature used to create nodal temperature loads that apply temperature changes to specific nodes.

## Constructor
---
**<font color="green">`Temperature.Nodal(node, temperature, lcname, group="", id=None)`</font>**

Creates nodal temperature loads that apply temperature changes to specific nodes in the structure.

### Parameters
* `node`: Node ID (Required)
* `temperature`: Temperature value (Required)
* `lcname`: Load case name (Required)
* `group (default="")`: Load group name
* `id (default=None)`: Temperature ID (auto-generated if None)

### Object Attributes
* `NODE` (int): The node ID where temperature is applied.
* `TEMPER` (float): The temperature value to be applied.
* `LCNAME` (str): The name of the load case.
* `GROUP_NAME` (str): The name of the load group.
* `ID` (int): The ID of the nodal temperature entry.
* `ITEMS` (list): List containing temperature load data for the node.

## Methods
---
#### json
Returns JSON representation of all nodal temperature loads.

```py
nt1 = Temperature.Nodal(6, 10, "Temp(+)", "LoadGroup1", 1)
print(Temperature.Nodal.json())
```

#### create
Sends nodal temperature loads to Civil NX.

```py
Temperature.Nodal.create()
```

#### get
Fetches nodal temperature loads from Civil NX.

```py
print(Temperature.Nodal.get())
```

#### sync
Synchronizes nodal temperature loads from Civil NX.

```py
Temperature.Nodal.sync()
```

#### delete
Deletes all nodal temperature loads from both Python and Civil NX.

```py
Temperature.Nodal.delete()
```

## Examples
---
```py
# Nodal Temperature Example
# Create load cases first
Load_Case("T", "Temperature Rise")
Load_Case("T", "Temperature Fall")
Load_Case.create()

# Create load group 
Group.Load("Temperature Loads")
Group.Load.create()

# Define Nodal Temperature - Single node
Temperature.Nodal(6, 10.0, "Temperature Rise", "Temperature Loads", 1)
Temperature.Nodal.create()

# Define Nodal Temperature - Multiple nodes
Temperature.Nodal(1, 25.0, "Temperature Rise", "Temperature Loads")
Temperature.Nodal(2, -15.0, "Temperature Fall", "Temperature Loads")
Temperature.Nodal(3, 30.0, "Temperature Rise", "Temperature Loads")
Temperature.Nodal.create()

# Multiple temperature conditions for same node
Temperature.Nodal(5, 20.0, "Temperature Rise", "Temperature Loads")
Temperature.Nodal(5, -10.0, "Temperature Fall", "Temperature Loads")
Temperature.Nodal.create()
```