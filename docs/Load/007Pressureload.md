# Pressure Load

A nested class within Load used to assign pressure loads to plate faces.

## Constructor
---
**<font color="green">`Load.Pressure(element, load_case, load_group = "", D = 'LZ', P:list=0, VectorDir = [1,0,0], bProjection = False, id = None)`</font>**

Assigns pressure loads to specified plate elements.

### Parameters
* `element`: Element ID or list of Element IDs where the load is applied
* `load_case`: Name of the load case
* `load_group (default="")`: Load group name
* `D (default='LZ')`: Load direction. Options include `'LX'`, `'LY'`, `'LZ'`, `'GX'`, `'GY'`, `'GZ'`, or `'VECTOR'`
* `P (list=0)`: Pressure load value ( list of values for varying pressure)
* `VectorDir (default=[1,0,0])`: Direction vector components [x, y, z] when `D` is set to `'VECTOR'`
* `bProjection (default=False)`: Boolean to apply load projection (only valid when `D` is `'GX'`, `'GY'`, or `'GZ'`)
* `id (default=None)`: Manual ID assignment (auto-assigned if empty)

### Object Attributes
* `ELEM` (int | list): The element ID(s) where the load is applied.
* `LCN` (str): The name of the load case.
* `LDGR` (str): The name of the load group.
* `DIR` (str): The direction of the pressure load.
* `VECTOR` (list): The vector direction of the load.
* `PRES` (list): The applied pressure force value(s).
* `bPROJ` (bool): Flag indicating if load projection is applied.
* `ID` (int): The ID of the pressure load entry.

## Methods
---
#### json
Returns JSON representation of all pressure loads.

```py
pl1 = Load.Pressure(101, "Dead Load", P=[-50,-100,-50,-100])
print(Load.Pressure.json())
```

#### create
Sends pressure loads to Civil NX.

```py
Load.Pressure.create()
```

#### get
Fetches pressure loads from Civil NX.

```py
print(Load.Pressure.get())
```

#### sync
Synchronizes pressure loads from Civil NX.

```py
Load.Pressure.sync()
```

#### delete
Deletes all pressure loads from both Python and Civil NX.

```py
Load.Pressure.delete()
```

#### clear
Clears the pressure load data locally in Python.

```py
Load.Pressure.clear()
```




## Examples
---
```py
# Pressure Load Example

# Create Nodes
Node(0, 0, 0)
Node(5, 0, 0)
Node(5, 5, 0)
Node(0, 5, 0)
Node.create()

# Create Plate Element
Element.Plate( [1, 2, 3, 4])
Element.create()
    
# Define Load Case
Load_Case("D", "Dead Load")
Load_Case.create()

# Define and Create Pressure Load
Load.Pressure(element=[1], load_case="Dead Load", load_group="", D="LZ",P=[-10,-10,-10,-10])
Load.Pressure.create()
```