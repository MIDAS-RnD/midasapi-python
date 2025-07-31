# Element Stiffness Scale Factor

A nested class within Element used to create and manage stiffness scale factors for elements.

## Constructor
---
**<font color="green">`Element.StiffnessScaleFactor(element_id, area_sf=1.0, asy_sf=1.0, asz_sf=1.0, ixx_sf=1.0, iyy_sf=1.0, izz_sf=1.0, wgt_sf=1.0, group="", id=None)`</font>**

Creates a stiffness scale factor for the specified element(s).

### Parameters
* `element_id`: Element ID(s) where scale factor is applied (can be int or list)
* `area_sf (default=1.0)`: Cross-sectional area scale factor
* `asy_sf (default=1.0)`: Effective Shear Area scale factor (y-axis)
* `asz_sf (default=1.0)`: Effective Shear Area scale factor (z-axis)
* `ixx_sf (default=1.0)`: Torsional Resistance scale factor (x-axis)
* `iyy_sf (default=1.0)`: Area Moment of Inertia scale factor (y-axis)
* `izz_sf (default=1.0)`: Area Moment of Inertia scale factor (z-axis)
* `wgt_sf (default=1.0)`: Weight scale factor
* `group (default="")`: Group name
* `id (default=None)`: Scale factor ID (optional, auto-assigned if None)

### Object Attributes
* `ELEMENT_IDS` (list): List of element IDs where the scale factor is applied.
* `AREA_SF` (float): Cross-sectional area scale factor.
* `ASY_SF` (float): Effective Shear Area scale factor (y-axis).
* `ASZ_SF` (float): Effective Shear Area scale factor (z-axis).
* `IXX_SF` (float): Torsional Resistance scale factor (x-axis).
* `IYY_SF` (float): Area Moment of Inertia scale factor (y-axis).
* `IZZ_SF` (float): Area Moment of Inertia scale factor (z-axis).
* `WGT_SF` (float): Weight scale factor.
* `GROUP_NAME` (str): The name of the group.
* `ID` (int): The ID of the stiffness scale factor entry.

## Methods
---
#### json
Returns JSON representation of all stiffness scale factors.

```py
ssf1 = Element.StiffnessScaleFactor(908, area_sf=0.5, asy_sf=0.6)
print(Element.StiffnessScaleFactor.json())
```

#### create
Sends stiffness scale factors to Civil NX.

```py
Element.StiffnessScaleFactor.create()
```

#### get
Fetches stiffness scale factors from Civil NX.

```py
print(Element.StiffnessScaleFactor.get())
```

#### sync
Synchronizes stiffness scale factors from Civil NX.

```py
Element.StiffnessScaleFactor.sync()
```

#### delete
Deletes all stiffness scale factors from both Python and Civil NX.

```py
Element.StiffnessScaleFactor.delete()
```

## Examples
---
```py
# Create nodes and elements
for i in range(3):
    Node(i*10, 0, 0)
Node.create()

Element.Beam(1, 2)
Element.Beam(2, 3)
Element.create()

# Single element stiffness scale factor
Element.StiffnessScaleFactor(1, area_sf=0.5, asy_sf=0.6, asz_sf=0.7, 
                            ixx_sf=0.8, iyy_sf=0.8, izz_sf=0.9, wgt_sf=0.95)

# Multiple elements with same scale factor
Element.StiffnessScaleFactor([2, 3], area_sf=0.8, iyy_sf=0.9, izz_sf=0.9)

# Create all scale factors
Element.StiffnessScaleFactor.create()
```