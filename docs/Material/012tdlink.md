# Time-Dependent Material Link

The TDLink class links materials with their time-dependent properties (creep/shrinkage and compressive strength).

### Class Attributes
*TDLink.mats* -> Dictionary of all material links.

### Object Attributes
* `matID` (int): The ID of the base material to which time-dependent properties are linked.
* `CnSName` (str): The name of the CreepShrinkage definition to link.
* `CompName` (str): The name of the CompStrength definition to link.

## Methods
---
#### json
Returns a JSON representation of all Time-Dependent Material Links defined in python.

```py
print(TDLink.json())
# Output:
# {'Assign': {'1': {'TDMT_NAME': 'CS_M25', 'TDME_NAME': 'Comp_M25'}, ...}}
```

#### create
Sends material links to Civil NX using a PUT request.

```py
TDLink.create()
```

#### get
Fetches material links from Civil NX and returns the JSON representation.

```py
print(TDLink.get())
```

#### sync
Retrieves Time-Dependent Material Link data from Civil NX and rebuilds the internal dictionary.

```py
TDLink.sync()
```

#### delete
Deletes all material links from both Python and Civil NX.

```py
TDLink.delete()
```

## Examples
---
```py
# Link materials with their time-dependent properties
link1 = TDLink(1, "CS_M25", "Comp_M25")  # Link material ID 1 with M25 properties
link2 = TDLink(2, "CS_C30", "Comp_C30")  # Link material ID 2 with C30 properties
link3 = TDLink(3, "CS_M25", "")          # Link material ID 3 with only creep/shrinkage

TDLink.create()
```

---

## Complete Example
---
```py
from midas_civil import *

MAPI_KEY("eyJ1ciI6IklOMjQwN0ZZVDIiLCJwZyI6ImNpdmlsIiwi") #Paste your MAPI Key

# Create IRC compressive CreepShrinkage properties

cs1 = CreepShrinkage.IRC("CS_C30", code_year=2011, fck=30, notional_size=150, relative_humidity=75, age_shrinkage=7, type_cement='R', id=1)
cs2 = CreepShrinkage.IRC("CS_M25", code_year=2000, fck=25, notional_size=200, relative_humidity=70, age_shrinkage=3, type_cement='NR', id=2)

# Create IRC compressive strength properties
CompStrength.IRC("Comp_C30", code_year=2020, fck_delta=30000, cement_type=2)
CompStrength.IRC("Comp_M25", code_year=2000, fck_delta=25000)

# Link materials with time-dependent properties

link1 = TDLink(1, "CS_M25", "Comp_M25")  # Link material 1 with M25 properties
link2 = TDLink(2, "CS_C30", "Comp_C30")  # Link material 2 with C30 properties

# Create all time-dependent properties in Civil NX
CreepShrinkage.create()
CompStrength.create()
TDLink.create()

print("All time-dependent properties and links created successfully!")

# You can also create them all at once using Material.create() if materials exist
# Material.create()  # This creates materials, creep/shrinkage, compressive strength, and links
```