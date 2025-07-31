# Time Loads for Construction Stage
The module provides functionality to create, manage, and synchronize time loads for construction stage analysis in the model. It handles the definition of time-dependent loads with element assignments, load groups, and timing parameters for staged construction analysis.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicGciO252k81571d')
```

## Constructor
---
**<font color="green">`CS.TimeLoads(element_id, day, group="", id=None)`</font>**

Creates time loads for Construction Stage with specified parameters for element assignment, timing, and load grouping.

### Parameters
* `element_id`: Element ID (required) - Integer specifying the target element
* `day`: Time Loads in days (required) - Integer defining the load duration
* `group (default="")`: Load Group Name (optional) - String for load categorization
* `id (default=None)`: Manual time loads ID assignment (auto-assigned if None)

#### Class Attributes
*CS.TimeLoads.timeloads* -> List of all time loads defined.

## Methods
---
#### json
Returns a JSON representation of all Time Loads defined in python.

```py
CS.TimeLoads(10, 35, "DL")
CS.TimeLoads(11, 25, "DL")

print(CS.TimeLoads.json())

# Output will show detailed JSON structure for all time loads
```

#### create
Sends the current time loads list to Civil NX using a PUT request.

```py
CS.TimeLoads(10, 35, "DL")
CS.TimeLoads(11, 25, "DL")

CS.TimeLoads.create()
```

#### get
Fetches time loads from Civil NX and returns the JSON representation.

```py
print(CS.TimeLoads.get())
# Output will show all time loads from Civil NX database
```

#### sync
Retrieves Time Loads data from Civil NX and rebuilds the internal time loads list.

```py
CS.TimeLoads.sync()
for timeload in CS.TimeLoads.timeloads:
    print(f'Element ID: {timeload.ELEMENT_ID} | Days: {timeload.DAY}')
    print(f'  Group: {timeload.GROUP_NAME} | ID: {timeload.ID}')
```

#### delete
Deletes all time loads data from both Python and Civil NX.

```py
CS.TimeLoads.delete()
```

## Examples
---

#### Basic Time Loads
```py
# Create basic time loads without group name
CS.TimeLoads(12, 30)

CS.TimeLoads.create()
```

#### Time Loads with Group
```py
# Create time loads with load group specification
CS.TimeLoads(10, 35, "DL")
CS.TimeLoads(11, 25, "DL")

CS.TimeLoads.create()
```

#### Time Loads with Specific ID
```py
# Create time loads with manual ID assignment
CS.TimeLoads(11, 25, "DL", id=2)

CS.TimeLoads.create()
```
