# Group

A nested class within Settlement used to create settlement groups with displacement values for specified nodes.

## Constructor
---
**<font color="green">`Settlement.Group(name, displacement, node_list, id="")`</font>**

Creates settlement groups with defined displacement values at specified nodes.

### Parameters
* `name`: Settlement group name (string)
* `displacement`: Settlement displacement value.
* `node_list`: List of node IDs to include in the group (array of integers)
* `id (default="")`: Group ID (optional, auto-generated if not provided)

### Class Attributes
*Settlement.Group.data* -> List of all settlement group instances.

### Object Attributes
* `NAME` (str): The name of the settlement group.
* `SETTLE` (float): The settlement displacement value.
* `ITEMS` (list): List of node IDs included in the settlement group.
* `ID` (int): The ID of the settlement group entry.

## Methods
---
#### json
Returns JSON representation of all settlement groups.

```py
group1 = Settlement.Group("SG1", 25, [1, 2, 3])
print(Settlement.Group.json())
```

#### create
Sends settlement group data to Civil NX.

```py
Settlement.Group.create()
```

#### get
Fetches settlement group data from Civil NX.

```py
print(Settlement.Group.get())
```

#### sync
Synchronizes settlement groups from Civil NX to Python.

```py
Settlement.Group.sync()
```

#### delete
Deletes all settlement groups from both Python and Civil NX.

```py
Settlement.Group.delete()
```

## Examples
---
```py
# Create nodes
for i in range(10):
    Node(i*5, 0, 0)
Node.create()

# Create basic settlement group with 25mm displacement
Settlement.Group("SG1", 0.025, [1, 2, 3])

# Create settlement group for bridge pier with 15mm displacement
Settlement.Group("SG2", 0.015, [4, 5, 6])

# Create all settlement groups
Settlement.Group.create()

# Sync existing groups from Civil NX
Settlement.Group.sync()
print(f"Total groups synced: {len(Settlement.Group.data)}")

# View JSON representation
print(Settlement.Group.json())
```