# Beam Section Temperature

A nested class within Temperature used to create beam section temperature loads that apply temperature gradients and variations across beam cross-sections.

## Constructor
---
**<font color="green">`Temperature.BeamSection(element, lcname, section_type='General', type='Element', group="", id=None, dir='LZ', ref_pos='Centroid', val_b=0, val_h1=0, val_h2=0, val_t1=0, val_t2=0, elast=None, thermal=None, psc_ref=0, psc_opt_b=1, psc_opt_h1=3, psc_opt_h2=3)`</font>**

Creates beam section temperature loads that apply temperature variations across beam cross-sections.

### Parameters
* `element`: Element ID to apply the load (Required)
* `lcname`: Load case name (Required)
* `section_type (default='General')`: 'General' or 'PSC'
* `type (default='Element')`: 'Element' or 'Input'
* `group (default="")`: Load group name
* `id (default=None)`: Load ID (auto-generated if None)
* `dir (default='LZ')`: Direction, 'LY' or 'LZ'
* `ref_pos (default='Centroid')`: Reference Position, 'Centroid', 'Top', or 'Bot'
* `val_b (default=0)`: B Value
* `val_h1 (default=0)`: H1 Value
* `val_h2 (default=0)`: H2 Value
* `val_t1 (default=0)`: T1 Value
* `val_t2 (default=0)`: T2 Value
* `elast (default=None)`: Modulus of Elasticity (required for 'Input' type)
* `thermal (default=None)`: Thermal Coefficient (required for 'Input' type)
* `psc_ref (default=0)`: Reference for PSC, 0 for Top, 1 for Bottom
* `psc_opt_b (default=1)`: B-Type option for PSC (0 for Section type)
* `psc_opt_h1 (default=3)`: H1-Type option for PSC (0-Z1, 1-Z2, 2-Z2)
* `psc_opt_h2 (default=3)`: H2-Type option for PSC (0-Z1, 1-Z2, 2-Z2)

### Object Attributes
* `ELEMENT` (int): The element ID where temperature is applied.
* `ID` (int): The ID of the beam section temperature entry.
* `ITEMS` (list): List containing temperature load data for the element.

## Methods
---
#### json
Returns JSON representation of all beam section temperature loads.

```py
bst1 = Temperature.BeamSection(1, "Temp Gradient", "General", "Element", "LoadGroup1")
print(Temperature.BeamSection.json())
```

#### create
Sends beam section temperature loads to Civil NX.

```py
Temperature.BeamSection.create()
```

#### get
Fetches beam section temperature loads from Civil NX.

```py
print(Temperature.BeamSection.get())
```

#### sync
Synchronizes beam section temperature loads from Civil NX.

```py
Temperature.BeamSection.sync()
```

#### delete
Deletes all beam section temperature loads from both Python and Civil NX.

```py
Temperature.BeamSection.delete()
```

## Examples
---
```py
# Beam Section Temperature Example
# Create load cases first
Load_Case("T", "Temperature Case 1")
Load_Case("T", "Temperature Case 2")
Load_Case.create()

# Create load group 
Group.Load("Temperature Loads")
Group.Load.create()

# Define Beam Section Temperature - General Section with Element type
Temperature.BeamSection(
    element=1, 
    lcname="Temperature Case 1", 
    section_type='General',
    type='Element',
    group="Temperature Loads",
    dir='LZ',
    ref_pos='Centroid',
    val_b=10.0,
    val_h1=15.0,
    val_h2=20.0,
    val_t1=5.0,
    val_t2=8.0
)

# Define Beam Section Temperature - Input type with material properties
Temperature.BeamSection(
    element=2,
    lcname="Temperature Case 2",
    section_type='General',
    type='Input',
    group="Temperature Loads",
    val_b=12.0,
    val_h1=18.0,
    val_t1=6.0,
    elast=30000000,  # Required for Input type
    thermal=0.0011  # Required for Input type
)


# Create all beam section temperature loads
Temperature.BeamSection.create()

```