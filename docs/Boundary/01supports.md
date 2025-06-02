# SUPPORT

A nested class within Boundary used to create nodal supports with various constraint conditions.

## Constructor
**<font color="green">`Boundary.Support(node, constraint, group = "")`</font>**

Creates support conditions at specified nodes with defined constraints.

### Parameters
* `node`: Node ID where support is applied
* `constraint`: Constraint definition (string of 1s and 0s, or predefined keywords)
* `group (default="")`: Boundary group name

#### Constraint Options

* **String format**: "1110000" (7 characters for DOF: DX, DY, DZ, RX, RY, RZ, WARP)
* **Predefined keywords**:
  - `"pin"`: Pinned support (translational constraints only)
  - `"fix"`: Fixed support (all DOF constrained)
  - `"roller"`: Roller support (vertical constraint only)

### Class Attributes
*Boundary.Support.sups* -> List of all support instances.

### Object Attributes
* `NODE` (int): The node number where the support is applied.
* `CONST` (str): A 7-character string representing the constraint conditions (Dx, Dy, Dz, Rx, Ry, Rz, Rw). '1' for fixed, '0' for free.
* `GROUP` (str): The name of the boundary group.
* `ID` (int): The ID of the support entry.

## Methods

#### json
Returns JSON representation of all supports.

```py
sup1 = Boundary.Support(101, "fix")
print(Boundary.Support.json())
```

#### create
Sends support data to Civil NX.

```py
Boundary.Support.create()
```

#### get
Fetches support data from Civil NX.

```py
print(Boundary.Support.get())
```

#### sync
Synchronizes supports from Civil NX to Python.

```py
Boundary.Support.sync()
```

#### delete
Deletes all supports from both Python and Civil NX.

```py
Boundary.Support.delete()
```

---


## Examples
```py

#Create Beam
for i in range(3):
    Node(i*10,0,0)
    Node.create()

Element.Beam(1,2)
Element.Beam(2,3)
Element.create()
    
#Apply Support

Boundary.Support(1,"1111111","") 
Boundary.Support(3,"pin","") 

#create Support 
Boundary.Support.create()

#Note: "" represents the absence of a boundary group. By default, it is set to "". 
# Therefore, the following two commands are equivalent:Boundary.Support(3, "pin") and Boundary.Support(3, "pin", "").
```
