# Composite Section for Construction Stage
The module provides functionality to create, manage, and synchronize composite sections for composite construction analysis in the model. It handles the definition of composite sections with multiple parts, material assignments, and construction stage properties.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicGciO252k81571d')
```

## Constructor
---
**<font color="green">`CS.CompSec(activation_stage, section_id, comp_type="GENERAL", tapered_type=False, partinfo=None, id=None)`</font>**

Creates a composite section for Construction Stage with specified parameters for material composition, staging, and geometric properties.

### Parameters
* `activation_stage`: Active Stage name (required)
* `section_id`: Section ID (required)
* `comp_type (default="GENERAL")`: Composite Type - "GENERAL" or "USER"
* `tapered_type (default=False)`: Tapered Type - True or False
* `partinfo`: List of part information lists (required)
* `id (default=None)`: Manual composite section ID assignment (auto-assigned if None)

### Part Info Format
Each part should be a list with elements in order:
`[part_number, material_type, material_id, composite_stage, age, height, volume_surface_ratio, module_exposed_surface, area, asy, asz, ixx, iyy, izz, warea, iw]`

#### Required Parameters:
* `part_number`: Integer - Part identification number
* `material_type`: String - "ELEM" for element material or "MATL" for material property
* `composite_stage`: String (default="") - Construction stage for this part, blank uses active stage

#### Optional Parameters (with defaults):
* `material_id`: String (default="") - Material ID reference, blank for ELEM type
* `age`: Number (default=0) - Age of material in days
* `height`: Number (default="AUTO") - Part height dimension
* `volume_surface_ratio`: Number (default=0) - Volume to surface area ratio
* `module_exposed_surface`: Number (default=0) - Modulus of exposed surface
* `area`: Number (default=1) - Cross-sectional area
* `asy`: Number (default=1) - Shear area in Y direction
* `asz`: Number (default=1) - Shear area in Z direction
* `ixx`: Number (default=1) - Torsional moment of inertia
* `iyy`: Number (default=1) - Moment of inertia about Y axis
* `izz`: Number (default=1) - Moment of inertia about Z axis
* `warea`: Number (default=1) - Warping area
* `iw`: Number (default=1) - Warping constant

#### Class Attributes
*CS.CompSec.compsecs* -> List of all composite sections.

## Methods
---
#### json
Returns a JSON representation of all Composite Sections defined in python.

```py
cs1 = CS.CompSec("CS1", 1, "GENERAL", False, [
    [1, "ELEM", "", "", 2, 1.5, 1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, "MATL", "3", "CS2", 5, 0.245, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
])

print(CS.CompSec.json())

# Output will show detailed JSON structure for all composite sections
```

#### create
Sends the current composite section list to Civil NX using a PUT request.

```py
cs1 = CS.CompSec("CS1", 1, "GENERAL", False, [
    [1, "ELEM"],
    [2, "MATL", "2", "CS2"]
])

CS.CompSec.create()
```

#### get
Fetches composite sections from Civil NX and returns the JSON representation.

```py
print(CS.CompSec.get())
# Output will show all composite sections from Civil NX database
```

#### sync
Retrieves Composite Section data from Civil NX and rebuilds the internal composite section list.

```py
CS.CompSec.sync()
for compsec in CS.CompSec.compsecs:
    print(f'Section ID: {compsec.SEC} | Stage: {compsec.ASTAGE}')
    print(f'  Type: {compsec.TYPE} | Tapered: {compsec.bTAP}')
    print(f'  Number of Parts: {len(compsec.vPARTINFO)}')
```

#### delete
Deletes all composite section data from both Python and Civil NX.

```py
CS.CompSec.delete()
```

## Examples
---

#### Basic Composite Section
```py
# Create a basic composite section with minimal part information
CS.CompSec("CS1", 1, "GENERAL", False, [
    [1, "ELEM"],
    [2, "MATL", "2", "CS2"]
])

CS.CompSec.create()
```

#### Detailed Composite Section
```py
# Create a detailed composite section with full parameters
CS.CompSec("CS1", 2, "GENERAL", False, [
    [1, "ELEM", "", "", 2, 1.5, 1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, "MATL", "3", "CS2", 5, 0.245, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
])

CS.CompSec.create()
```

#### User Type with Tapered Section
```py
# Create a user-defined tapered composite section
CS.CompSec("CS1", 3, "USER", True, [
    [1, "ELEM", "", "", 2, 1.5],
    [2, "MATL", "4", "CS3", 10, 2.0]
])

CS.CompSec.create()
```

#### Multiple Composite Sections
```py
# Create multiple composite sections for different stages
CS.CompSec("Stage1", 10, "GENERAL", False, [
    [1, "ELEM"],
    [2, "MATL", "2", "Stage1"]
])

CS.CompSec("Stage2", 11, "GENERAL", False, [
    [1, "ELEM"],
    [2, "MATL", "2", "Stage2", 0, 0.5]
])

CS.CompSec("Stage3", 12, "USER", True, [
    [1, "ELEM", "", "", 7, 1.2, 0.8, 0.5],
    [2, "MATL", "2", "Stage3", 14, 0.8, 0.6, 0.3]
])

CS.CompSec.create()
```
