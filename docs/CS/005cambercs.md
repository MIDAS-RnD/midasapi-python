# Camber for Construction Stage
The module provides functionality to create, manage, and synchronize camber data for construction stage analysis in the model. It handles the definition of pre-camber values and deformation parameters at specific nodes to account for anticipated deflections during staged construction.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicGciO252k81571d')
```

## Constructor
---
**<font color="green">`CS.Camber(node_id, camber, deform, id=None)`</font>**

Creates camber data for Construction Stage with specified parameters for node assignment, user-defined camber values, and deformation parameters.

### Parameters
* `node_id`: Node ID (required) - Integer specifying the target node
* `camber`: User camber value (required) - Float defining the pre-camber magnitude
* `deform`: Deformation value (required) - Float defining the anticipated deformation
* `id (default=None)`: Manual camber ID assignment (auto-assigned if None)

#### Class Attributes
*CS.Camber.cambers* -> List of all camber data defined.

## Methods
---
#### json
Returns a JSON representation of all Camber data defined in python.

```py
CS.Camber(23, 0, 0)
CS.Camber(25, 0.17, 0.1)

print(CS.Camber.json())

# Output will show detailed JSON structure for all camber data
```

#### create
Sends the current camber data list to Civil NX using a PUT request.

```py
CS.Camber(23, 0, 0)
CS.Camber(25, 0.17, 0.1)

CS.Camber.create()
```

#### get
Fetches camber data from Civil NX and returns the JSON representation.

```py
print(CS.Camber.get())
# Output will show all camber data from Civil NX database
```

#### sync
Retrieves Camber data from Civil NX and rebuilds the internal camber data list.

```py
CS.Camber.sync()
for camber in CS.Camber.cambers:
    print(f'Node ID: {camber.NODE_ID} | User Camber: {camber.USER}')
    print(f'  Deformation: {camber.DEFORM} | ID: {camber.ID}')
```

#### delete
Deletes all camber data from both Python and Civil NX.

```py
CS.Camber.delete()
```

## Examples
---

#### Basic Camber (No Pre-camber)
```py
# Create basic camber with zero pre-camber and deformation
CS.Camber(23, 0, 0)

CS.Camber.create()
```

#### Camber with Pre-camber Value
```py
# Create camber with user-defined pre-camber and deformation
CS.Camber(25, 0.17, 0.1)
CS.Camber(27, 0.28, 0)

CS.Camber.create()
```

#### Camber with Specific ID
```py
# Create camber with manual ID assignment
CS.Camber(27, 0.28, 0, id=3)

CS.Camber.create()
```
