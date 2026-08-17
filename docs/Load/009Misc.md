# Misc

A nested class within Load that contains miscellaneous loading.

## PreCompositeSection

A subclass within `Load.Misc` used to define the load cases that are applied to the Pre-Composite section.

### Constructor
---
**<font color="green">`Load.Misc.PreCompositeSection(*loadCase)`</font>**

Adds specified load case names to the Pre-Composite Section load case list.

### Parameters
* `*loadCase`: One or more load case names (strings) to be designated as Pre-Composite loads.

### Object Attributes
* `loadCases` (set): A static set holding all the unique load case names assigned to the Pre-Composite Section.

## Methods

---

#### json
Returns the JSON representation of the Pre-Composite Section load cases formatted for the MIDAS API.

```py
Load.Misc.PreCompositeSection('Self Weight', 'Wet Concrete')
print(Load.Misc.PreCompositeSection.json())
```

---


#### create

Sends the currently defined Pre-Composite Section load case assignments to Civil NX.

```py
Load.Misc.PreCompositeSection(
    "Girder_SelfWeight",
    "Slab_WetConcrete"
)

Load.Misc.PreCompositeSection.create()
```

---

#### get

Fetches the current Pre-Composite Section load case assignments from Civil NX.

```py
print(Load.Misc.PreCompositeSection.get())
```

---

#### sync

Synchronizes the Pre-Composite Section load case assignments from Civil NX to Python.

```py
Load.Misc.PreCompositeSection.sync()
```

---

#### delete

Deletes the Pre-Composite Section load case assignments from both Python and Civil NX.

```py
Load.Misc.PreCompositeSection.delete()
```

---

#### clear

Clears the Pre-Composite Section load case assignments locally in Python without affecting Civil NX data.

```py
Load.Misc.PreCompositeSection.clear()
```

## Examples
---

### Define and Assign Pre-Composite Load Cases

```py
from midas_civil import *

# Define Load Cases
Load_Case("D", "Girder_SelfWeight")
Load_Case("D", "Slab_WetConcrete")
Load_Case("D", "Barrier_Superimposed")
Load_Case.create()

# Assign the pre-composite load cases
Load.Misc.PreCompositeSection(
    "Girder_SelfWeight",
    "Slab_WetConcrete"
)

# Send the assignment to Civil NX
Load.Misc.PreCompositeSection.create()
```