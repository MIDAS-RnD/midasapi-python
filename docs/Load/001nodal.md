# Nodal Load

A nested class within Load used to create nodal loads.

## Constructor
---
**<font color="green">`Load.Nodal(node, load_case, load_group = "", FX = 0, FY = 0, FZ = 0, MX = 0, MY = 0, MZ = 0, id =None)`</font>**

Creates nodal loads (forces and moments) at specified nodes.

### Parameters
* `node`: Node ID where load is applied
* `load_case`: Name of the load case
* `load_group (default="")`: Load group name
* `FX, FY, FZ (default=0)`: Force components in X, Y, Z directions
* `MX, MY, MZ (default=0)`: Moment components about X, Y, Z axes
* `id (default=None)`: Manual ID assignment (auto-assigned if empty)

### Object Attributes
* `NODE` (int): The node number where the load is applied.
* `LCN` (str): The name of the load case.
* `LDGR` (str): The name of the load group.
* `FX` (float): Force in the global X direction.
* `FY` (float): Force in the global Y direction.
* `FZ` (float): Force in the global Z direction.
* `MX` (float): Moment about the global X axis.
* `MY` (float): Moment about the global Y axis.
* `MZ` (float): Moment about the global Z axis.
* `ID` (int): The ID of the nodal load entry.

## Methods
---
#### json
Returns JSON representation of all nodal loads.

```py
nl1 = Load.Nodal(101, "Live Load", FZ=-50)
print(Load.Nodal.json())
```

#### create
Sends nodal loads to Civil NX.

```py
Load.Nodal.create()
```

#### get
Fetches nodal loads from Civil NX.

```py
print(Load.Nodal.get())
```

#### sync
Synchronizes nodal loads from Civil NX.

```py
Load.Nodal.sync()
```

#### delete
Deletes all nodal loads from both Python and Civil NX.

```py
Load.Nodal.delete()
```





## Examples
---
```py
#Nodal Load Example
for i in range(2):
    Node(i*10,0,0)
    Node.create()

Element.Beam(1,2)
Element.create()
    
#Load Case
Load_Case("L","Nodal Load")
Load_Case.create()

#Define Nodal Load

Load.Nodal(1,"Nodal Load","",FX=100,FY=200,FZ=-50,id=1)
Load.Nodal(2,"Nodal Load","",MX=10,MY=20,MZ=-5,id=2)
Load.Nodal.create()
```



