# System Temperature

A nested class within Temperature used to create system-wide uniform temperature changes.

## Constructor
---
**<font color="green">`Temperature.System(temperature, lcname, group="", id=None)`</font>**

Creates system temperature loads that apply uniform temperature changes to the entire structure.

### Parameters
* `temperature`: Temperature value (Required)
* `lcname`: Load case name (Required)
* `group (default="")`: Load group name
* `id (default=None)`: System ID (auto-generated if None)

### Object Attributes
* `TEMPER` (float): The temperature value to be applied.
* `LCNAME` (str): The name of the load case.
* `GROUP_NAME` (str): The name of the load group.
* `ID` (int): The ID of the system temperature entry.

## Methods
---
#### json
Returns JSON representation of all system temperature loads.

```py
st1 = Temperature.System(12.5, "Temp(+)", "LoadGroup1", 1)
print(Temperature.System.json())
```

#### create
Sends system temperature loads to Civil NX.

```py
Temperature.System.create()
```

#### get
Fetches system temperature loads from Civil NX.

```py
print(Temperature.System.get())
```

#### sync
Synchronizes system temperature loads from Civil NX.

```py
Temperature.System.sync()
```

#### delete
Deletes all system temperature loads from both Python and Civil NX.

```py
Temperature.System.delete()
```

## Examples
---
```py
# System Temperature Example
# Create load cases first
Load_Case("T", "Temperature Rise")
Load_Case("T", "Temperature fall")
Load_Case.create()

# Create load group 
Group.Load("Temperature Loads")
Group.Load.create()

# Define System Temperature - Heating
Temperature.System(25.0, "Temperature Rise", "Temperature Loads", 1)
Temperature.System.create()

# Define System Temperature - fall
Temperature.System(-15.0, "Temperature fall", "Temperature Loads", 2)
Temperature.System.create()

# Multiple temperature conditions
Temperature.System(30.0, "Temperature Rise", "Temperature Loads")
Temperature.System(-10.0, "Temperature fall", "Temperature Loads")
Temperature.System.create()
```