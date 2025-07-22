# Case

A nested class within Settlement used to create settlement load cases that reference settlement groups with various loading parameters.

## Constructor
---
**<font color="green">`Settlement.Case(name, settlement_groups=[], factor=1.0, min_groups=1, max_groups=1, desc="", id="")`</font>**

Creates settlement load cases with defined groups and loading parameters.

### Parameters
* `name`: Settlement load case name (string)
* `settlement_groups (default=[])`: List of settlement group names to include (array of strings)
* `factor (default=1.0)`: Settlement scale factor (number)
* `min_groups (default=1)`: Minimum number of settlement groups (integer)
* `max_groups (default=1)`: Maximum number of settlement groups (integer)
* `desc (default="")`: Description of the settlement case (string)
* `id (default="")`: Case ID (optional, auto-generated if not provided)

### Class Attributes
*Settlement.Case.data* -> List of all settlement case instances.

### Object Attributes
* `NAME` (str): The name of the settlement load case.
* `DESC` (str): Description of the settlement case.
* `FACTOR` (float): Settlement scale factor.
* `MIN` (int): Minimum number of settlement groups.
* `MAX` (int): Maximum number of settlement groups.
* `ST_GROUPS` (list): List of settlement group names included in the case.
* `ID` (int): The ID of the settlement case entry.

## Methods
---
#### json
Returns JSON representation of all settlement cases.

```py
case1 = Settlement.Case("SMLC1", ["SG1"], 1.2, 1, 1, "Foundation Settlement Case")
print(Settlement.Case.json())
```

#### create
Sends settlement case data to Civil NX.

```py
Settlement.Case.create()
```

#### get
Fetches settlement case data from Civil NX.

```py
print(Settlement.Case.get())
```

#### sync
Synchronizes settlement cases from Civil NX to Python.

```py
Settlement.Case.sync()
```

#### delete
Deletes all settlement cases from both Python and Civil NX.

```py
Settlement.Case.delete()
```

## Examples
---
```py
# First create settlement groups
Settlement.Group("SG1", 0.025, [1, 2, 3])
Settlement.Group("SG2", 0.015, [4, 5, 6])
Settlement.Group.create()

# Basic settlement load case with single group
Settlement.Case("SMLC1", ["SG1"], 1.2, 1, 1)

# Settlement case with multiple groups
Settlement.Case("SMLC2", ["SG1", "SG2"], 1.0, 1, 2, "Combined Settlement")

# Create all settlement cases
Settlement.Case.create()

# Sync existing cases from Civil NX
Settlement.Case.sync()
print(f"Total cases synced: {len(Settlement.Case.data)}")

# View JSON representation
print(Settlement.Case.json())
```