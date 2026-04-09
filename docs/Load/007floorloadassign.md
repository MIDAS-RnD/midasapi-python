# Floor Load Assign

A nested class within Load used to assign defined floor load types to a polygonal area specified by a list of nodes.

## Constructor
---
**<font color="green">`Load.FloorLoadAssign(floor_load_name, distribution_type = 2, direction = "GZ", node_list = [], group = "", load_angle = 0, sub_beam_no = 0, sub_beam_angle = 0, unit_selfweight = 0, opt_projection = False, exclude_inner_elem_area = False, allow_polygon_type_unit_area = False, id = None)`</font>**

Assigns a floor load type to a node-defined area with distribution and projection options.

### Parameters
* `floor_load_name`: Name of the floor load type (must match a defined `Load.FloorLoadDefine` name)
* `distribution_type (default=2)`: Load distribution method — `1` = One Way, `2` = Two Way, `3` = Polygon-Centroid, `4` = Polygon-Length
* `direction (default="GZ")`: Load direction (`"LX"`, `"LY"`, `"LZ"`, `"GX"`, `"GY"`, `"GZ"`)
* `node_list`: List of node IDs defining the loading area polygon
* `group (default="")`: Load group name
* `load_angle (default=0)`: Load angle A1 — used only when `distribution_type = 1`
* `sub_beam_no (default=0)`: Number of sub-beams — used only when `distribution_type = 1` or `2`
* `sub_beam_angle (default=0)`: Sub-beam angle A2 — used only when `distribution_type = 1` or `2`
* `unit_selfweight (default=0)`: Unit self-weight — used only when `distribution_type = 1` or `2`
* `opt_projection (default=False)`: Enable projection of load
* `exclude_inner_elem_area (default=False)`: Exclude inner element area — used only when `distribution_type = 1` or `2`
* `allow_polygon_type_unit_area (default=False)`: Allow polygon-type unit area — used only when `distribution_type = 2`
* `id (default=None)`: Manual ID assignment (auto-assigned if empty)

### Object Attributes
* `FLOOR_LOAD_TYPE_NAME` (str): Name of the referenced floor load type.
* `FLOOR_DIST_TYPE` (int): Distribution type (1 = One Way, 2 = Two Way, 3 = Polygon-Centroid, 4 = Polygon-Length).
* `DIR` (str): Load direction.
* `NODES` (list): List of node IDs forming the loading polygon.
* `GROUP_NAME` (str): Load group name.
* `LOAD_ANGLE` (int): Load angle A1 (One Way only).
* `SUB_BEAM_NUM` (int): Number of sub-beams (One Way / Two Way only).
* `SUB_BEAM_ANGLE` (int): Sub-beam angle A2 (One Way / Two Way only).
* `UNIT_SELF_WEIGHT` (int): Unit self-weight value (One Way / Two Way only).
* `OPT_PROJECTION` (bool): Projection flag.
* `OPT_EXCLUDE_INNER_ELEM_AREA` (bool): Exclude inner element area flag (One Way / Two Way only).
* `OPT_ALLOW_POLYGON_TYPE_UNIT_AREA` (bool): Allow polygon type unit area flag (Two Way only).
* `ID` (int): The ID of the floor load assignment entry.

## Methods
---
#### json
Returns JSON representation of all floor load assignments.

```py
Load.FloorLoadAssign("Floor_Type_1", 2, "GZ", [508, 509, 511, 510])
print(Load.FloorLoadAssign.json())
```

#### create
Sends floor load assignments to Civil NX.

```py
Load.FloorLoadAssign.create()
```

#### get
Fetches floor load assignments from Civil NX.

```py
print(Load.FloorLoadAssign.get())
```

#### sync
Synchronizes floor load assignments from Civil NX.

```py
Load.FloorLoadAssign.sync()
```

#### delete
Deletes all floor load assignments from both Python and Civil NX.

```py
Load.FloorLoadAssign.delete()
```

## Examples
---
#### One Way Distribution
```py
# One Way Floor Load Assignment

Load.FloorLoadDefine("Floor_Type_1", [["Dead Load", 15]])
Load.FloorLoadDefine.create()

Load.FloorLoadAssign("Floor_Type_1", 1, "GZ", [508, 509, 511, 510],
                     load_angle=45)
Load.FloorLoadAssign.create()
```

#### Two Way Distribution
```py
# Two Way Floor Load Assignment with Sub-Beams

Load.FloorLoadDefine("Floor_Type_2", [["Dead Load", 10], ["Live Load", 20]])
Load.FloorLoadDefine.create()

Load.FloorLoadAssign("Floor_Type_2", 2, "GZ",
                     [512, 516, 513, 514, 517, 515],
                     group="LoadGroup1",
                     sub_beam_no=1,
                     sub_beam_angle=90,
                     unit_selfweight=-15,
                     exclude_inner_elem_area=True,
                     allow_polygon_type_unit_area=True)
Load.FloorLoadAssign.create()
```