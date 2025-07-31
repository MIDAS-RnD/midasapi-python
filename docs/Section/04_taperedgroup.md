# Tapered Group

The Tapered Group class is used to manage and synchronize tapered group data with MIDAS Civil NX. It is a nested class within the Section class.

## Constructor
---
**<font color="green">`Section.TaperedGroup(name, elem_list, z_var, y_var, z_exp=None, z_from=None, z_dist=None, y_exp=None, y_from=None, y_dist=None, id="")`</font>**

Creates a tapered group with specified parameters for section shape variation.

### Parameters
* **name** (str): Tapered Group Name (Required).
* **elem_list** (list): List of element numbers (Required).
* **z_var** (str): Section shape variation for Z-axis: "LINEAR" or "POLY" (Required).
* **y_var** (str): Section shape variation for Y-axis: "LINEAR" or "POLY" (Required).
* **z_exp** (float, optional): Z-axis exponent. Required if z_var is "POLY".
* **z_from** (str, optional): Z-axis symmetric plane ("i" or "j"). Defaults to "i" for "POLY".
* **z_dist** (float, optional): Z-axis symmetric plane distance. Defaults to 0 for "POLY".
* **y_exp** (float, optional): Y-axis exponent. Required if y_var is "POLY".
* **y_from** (str, optional): Y-axis symmetric plane ("i" or "j"). Defaults to "i" for "POLY".
* **y_dist** (float, optional): Y-axis symmetric plane distance. Defaults to 0 for "POLY".
* **id** (str, optional): ID for the tapered group. Auto-generated if not provided.

### Class Attributes
*Section.TaperedGroup.data* -> List of all tapered groups defined.

### Object Attributes
* `ID` (str): Tapered Group ID.
* `NAME` (str): Tapered Group name.
* `ELEM_LIST` (list): List of element numbers.
* `Z_VAR` (str): Z-axis variation type ("LINEAR" or "POLY").
* `Y_VAR` (str): Y-axis variation type ("LINEAR" or "POLY").
* `Z_EXP` (float): Z-axis exponent (only for POLY variation).
* `Z_FROM` (str): Z-axis symmetric plane (only for POLY variation).
* `Z_DIST` (float): Z-axis symmetric plane distance (only for POLY variation).
* `Y_EXP` (float): Y-axis exponent (only for POLY variation).
* `Y_FROM` (str): Y-axis symmetric plane (only for POLY variation).
* `Y_DIST` (float): Y-axis symmetric plane distance (only for POLY variation).

## Methods
---
#### create
Create all tapered groups in Civil NX.
```py
Section.TaperedGroup.create()
```

#### json
Returns a JSON representation of all TaperedGroups defined in python.

```py
print(Section.TaperedGroup.json())

```

#### get
Fetches tapered groups from Civil NX and returns the JSON representation.

```py
print(Section.TaperedGroup.get())
```

#### sync
Retrieves TaperedGroup data from Civil NX and rebuilds the internal tapered group list.

```py
Section.TaperedGroup.sync()
for tapered in Section.TaperedGroup.data:
    print(f'ID: {tapered.ID} | Name: {tapered.NAME} | Elements: {tapered.ELEM_LIST}')
```

#### delete
Deletes all TaperedGroup data from both Python and Civil NX.

```py
Section.TaperedGroup.delete()
```

## Examples
---
```py
# Linear Tapered Group Example
Section.TaperedGroup("LinearTaper", [1, 2, 3, 4], "LINEAR", "LINEAR")

# Polynomial Z-axis Tapered Group Example
Section.TaperedGroup("ZPolyTaper", [5, 6, 7], "POLY", "LINEAR", z_exp=2.5)

# Full Polynomial Tapered Group Example
Section.TaperedGroup("FullPolyTaper", [8, 9, 10], "POLY", "POLY", 
                   z_exp=2.0, z_from="j", z_dist=0.5,
                   y_exp=1.5, y_from="i", y_dist=0.0)

# Create all tapered groups in Civil NX
Section.TaperedGroup.create()

```