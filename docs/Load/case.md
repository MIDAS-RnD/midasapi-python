# Load Case

The module provides functionality to create, manage, and synchronize load cases in the model.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicGciO252a81571d')
```


## Constructor
---
To create load cases, use the Load_Case constructor.

**<font color="green">`Load_Case(type, *name)`</font>**

Creates load cases with specified type and names.

### Parameters
* `type`: Load case type
* `*name`: Variable number of load case names

### Class Attributes
*Load_Case.cases* -> List of all load cases.   

### Object Attributes

* `TYPE` (str): The type of load case (e.g., "USER", "D", "L").
* `NAME` (tuple): A tuple containing the names of the load cases.
* `ID` (list): A list of integer IDs assigned to the load cases.

```py
# Create load cases
lc1 = Load_Case("D", "Dead Load", "Additional Dead")
lc2 = Load_Case("L", "Live Load")

for lc in Load_Case.cases:
    print(f'Load Case IDs: {lc.ID} | Names: {lc.NAME} | Type: {lc.TYPE}')

# Output:
# Load Case IDs: [1, 2] | Names: ('Dead Load', 'Additional Dead') | Type: D
# Load Case IDs: [3] | Names: ('Live Load',) | Type: L
```

## Methods
---
#### json
Returns a JSON representation of all Load Cases defined in python.

```py
lc1 = Load_Case("D", "Dead Load", "Additional Dead")
lc2 = Load_Case("L", "Live Load")

print(Load_Case.json())

# Output:
# {'Assign': {1: {'NAME': 'Dead Load', 'TYPE': 'D'}, 2: {'NAME': 'Additional Dead', 'TYPE': 'D'}, 3: {'NAME': 'Live Load', 'TYPE': 'L'}}}
```

#### create
Sends the current load case list to Civil NX using a PUT request.

```py
lc1 = Load_Case("D", "Dead Load")
lc2 = Load_Case("L", "Live Load")

Load_Case.create()
```

#### get
Fetches load cases from Civil NX and returns the JSON representation.

```py
print(Load_Case.get())
# Output
# {'STLD': {'1': {'NAME': 'Dead Load', 'TYPE': 'D'}, '2': {'NAME': 'Live Load', 'TYPE': 'L'}}}
```

#### sync
Retrieves Load Case data from Civil NX and rebuilds the internal load case list.

```py
Load_Case.sync()
for lc in Load_Case.cases:
    print(f'Load Case: {lc.NAME} | Type: {lc.TYPE}')
```

#### delete
Deletes all load case data from both Python and Civil NX.

```py
Load_Case.delete()
```
