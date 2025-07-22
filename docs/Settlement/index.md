# Settlement
The module provides functionality to create, manage, and synchronize settlement conditions including settlement groups and settlement load cases in the model.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicmciO252k81571d')
```

## Methods
---
#### <font style="font-size:0px">Settlement.</font>create
Creates all defined settlement conditions (Settlement Groups and Settlement Load Cases) in Civil NX.

```py
Settlement.create()
```

#### <font style="font-size:0px">Settlement.</font>delete
Deletes all settlement conditions (Settlement Groups and Settlement Load Cases) from both Python and Civil NX.

```py
Settlement.delete()
```

#### <font style="font-size:0px">Settlement.</font>sync
Synchronizes all settlement conditions (Settlement Groups and Settlement Load Cases) from Civil NX to Python.

```py
Settlement.sync()
```

---

## Complete Example
---
```py
from midas_civil import *

MAPI_KEY("eyJ1ciI6IklOMjQwN0ZZVDIiLCJwZyI6ImNpdmlsIiwi") # Paste your MAPI Key

# Create nodes for settlement analysis
for i in range(10):
    Node(i*5, 0, 0)
Node.create()

for i in range(9):
    Element.Beam(i+1, i+2)
Element.create()

# Create Settlement Groups
Settlement.Group("Foundation_A", 0.025, [1, 2, 3])
Settlement.Group("Foundation_B", 0.015, [4, 5, 6])
Settlement.Group("Pier_Settlement", 0.030, [7, 8, 9, 10])

# Create Settlement Load Cases
Settlement.Case("Uniform_Settlement", ["Foundation_A"], 1.0, 1, 1, "Uniform foundation settlement")
Settlement.Case("Maximum_Settlement", ["Foundation_A", "Foundation_B", "Pier_Settlement"], 1.5, 1, 3, "Maximum expected settlement scenario")

# Create all settlement conditions
Settlement.create()

print("All settlement conditions created successfully!")
```