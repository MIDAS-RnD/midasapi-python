# Creep Coefficient for Construction Stage
The module provides functionality to create, manage, and synchronize creep coefficients for construction stage analysis in the model. It handles the definition of time-dependent material behavior with element assignments, coefficient values, and load group categorization for structural analysis.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicGciO252k81571d')
```

## Constructor
---
**<font color="green">`CS.CreepCoeff(element_id, creep, group="", id=None)`</font>**

Creates creep coefficients for Construction Stage with specified parameters for element assignment, coefficient values, and load grouping.

### Parameters
* `element_id`: Element ID (required) - Integer specifying the target element
* `creep`: Creep Coefficient value (required) - Float defining the creep behavior multiplier
* `group (default="")`: Load Group Name (optional) - String for load categorization
* `id (default=None)`: Manual creep coefficient ID assignment (auto-assigned if None)

#### Class Attributes
*CS.CreepCoeff.creepcoeffs* -> List of all creep coefficients defined.

## Methods
---
#### json
Returns a JSON representation of all Creep Coefficients defined in python.

```py
CS.CreepCoeff(25, 1.2, "Group")
CS.CreepCoeff(26, 1.5, "Group")

print(CS.CreepCoeff.json())

# Output will show detailed JSON structure for all creep coefficients
```

#### create
Sends the current creep coefficients list to Civil NX using a PUT request.

```py
CS.CreepCoeff(25, 1.2, "")
CS.CreepCoeff(26, 1.5, "")

CS.CreepCoeff.create()
```

#### get
Fetches creep coefficients from Civil NX and returns the JSON representation.

```py
print(CS.CreepCoeff.get())
# Output will show all creep coefficients from Civil NX database
```

#### sync
Retrieves Creep Coefficient data from Civil NX and rebuilds the internal creep coefficients list.

```py
CS.CreepCoeff.sync()
for creepcoeff in CS.CreepCoeff.creepcoeffs:
    print(f'Element ID: {creepcoeff.ELEMENT_ID} | Creep: {creepcoeff.CREEP}')
    print(f'  Group: {creepcoeff.GROUP_NAME} | ID: {creepcoeff.ID}')
```

#### delete
Deletes all creep coefficients data from both Python and Civil NX.

```py
CS.CreepCoeff.delete()
```

## Examples
---

#### Basic Creep Coefficient
```py
# Create basic creep coefficient without group name
CS.CreepCoeff(27, 1.0)

CS.CreepCoeff.create()
```

#### Creep Coefficient with Group
```py
# Create creep coefficients with load group specification
CS.CreepCoeff(25, 1.2, "DeadLoad")
CS.CreepCoeff(26, 1.5, "Selfweight")

CS.CreepCoeff.create()
```

#### Creep Coefficient with Specific ID
```py
# Create creep coefficient with manual ID assignment
CS.CreepCoeff(26, 1.5, "Selfweight", id=2)

CS.CreepCoeff.create()
```

#### Multiple Creep Coefficients for Different Elements
```py
# Create multiple creep coefficients for various elements and groups
CS.CreepCoeff(25, 1.2, "2ndDeadLoad")
CS.CreepCoeff(26, 1.5, "Selfweight")
CS.CreepCoeff(27, 1.0)
CS.CreepCoeff(28, 2.0, "Long-term Load")
CS.CreepCoeff(29, 1.8, "Construction Load")

CS.CreepCoeff.create()
```