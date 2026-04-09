# Floor Load Define

A nested class within Load used to define floor load types with associated load case items.

## Constructor
---
**<font color="green">`Load.FloorLoadDefine(name, items, desc = "", id = None)`</font>**

Defines a floor load type by associating load cases with floor load values.

### Parameters
* `name`: Floor Load Type name
* `items`: List of floor load items. Each item must be one of:
  * `[load_case, value]` — Sub Beam Weight defaults to `False`
  * `[load_case, value, sub_beam_weight]`
* `desc (default="")`: Description of the floor load type
* `id (default=None)`: Manual ID assignment (auto-assigned if empty)

### Object Attributes
* `NAME` (str): The name of the floor load type.
* `DESC` (str): Description of the floor load type.
* `ITEMS` (list): Parsed list of floor load item dictionaries, each containing:
  * `LCNAME` (str): Load case name.
  * `FLOOR_LOAD` (float): Floor load magnitude.
  * `OPT_SUB_BEAM_WEIGHT` (bool): Whether sub-beam self-weight is included.
* `ID` (int): The ID of the floor load definition entry.

## Methods
---
#### json
Returns JSON representation of all floor load definitions.

```py
fl1 = Load.FloorLoadDefine("Floor_Type_1", [["DC", 10], ["DW", 20]])
print(Load.FloorLoadDefine.json())
```

#### create
Sends floor load definitions to Civil NX.

```py
Load.FloorLoadDefine.create()
```

#### get
Fetches floor load definitions from Civil NX.

```py
print(Load.FloorLoadDefine.get())
```

#### sync
Synchronizes floor load definitions from Civil NX.

```py
Load.FloorLoadDefine.sync()
```

#### delete
Deletes all floor load definitions from both Python and Civil NX.

```py
Load.FloorLoadDefine.delete()
```

## Examples
---
```py
# Floor Load Define Example

# Define Load Cases
Load_Case("D", "Dead Load")
Load_Case("L", "Superimposed Dead")
Load_Case.create()

# Define Floor Load Type with two load case items
Load.FloorLoadDefine("Floor_Type_1", [
    ["Dead Load", 10, True],
    ["Superimposed Dead", 20]
])
Load.FloorLoadDefine.create()
```