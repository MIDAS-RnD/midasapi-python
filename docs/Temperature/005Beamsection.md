# Beam Section Temperature

A nested class within Temperature used to create beam section temperature loads that apply temperature gradients and variations across beam cross-sections.

## Constructor
---
**<font color="green">`Temperature.BeamSection(element, lcname, section_type='General', type='Element', group="", dir='LZ', ref_pos='Centroid', b_value=0, value=None, elast=None, thermal=None, id=None)`</font>**

Creates beam section temperature loads that apply temperature variations across beam cross-sections.

### Parameters
* `element`: Single Element ID or list of Element IDs to apply the load (Required)
* `lcname`: Load case name (Required)
* `section_type (default='General')`: `'General'` or `'PSC'`
* `type (default='Element')`: `'Element'` or `'Input'`
* `group (default="")`: Load group name
* `dir (default='LZ')`: Direction, `'LY'` or `'LZ'`
* `ref_pos (default='Centroid')`: Reference Position, `'Centroid'`, `'Top'`, or `'Bot'`
* `b_value (default=0)`: Default B value, used for every row that does not give its own B.
* `value (default=None)`: List of temperature profile rows. Defaults to `[[0, 0, 0, 0]]` if not provided. Each row can be:
    * `[val_h1, val_h2, val_t1]` — 3 values, uses `b_value`, auto-padded with `val_t2=0`
    * `[val_h1, val_h2, val_t1, val_t2]` — 4 values, uses `b_value`
    * `[val_b, val_h1, val_h2, val_t1, val_t2]` — 5 values, *B value set per row* (overrides `b_value`)
    * 3-, 4- and 5-value rows can be mixed in the same list.

* `elast (default=None)`: Modulus of Elasticity (required for `'Input'` type)
* `thermal (default=None)`: Thermal Coefficient (required for `'Input'` type)
* `id (default=None)`: Load ID (auto-generated if None)

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
# Each row: [val_h1, val_h2, val_t1, val_t2]  → B taken from b_value
Temperature.BeamSection(
    element=1,
    lcname="Temperature Case 1",
    section_type='General',
    type='Element',
    group="Temperature Loads",
    dir='LZ',
    ref_pos='Centroid',
    b_value=0.2,
    value=[
        [10.0, 15.0, 5.0, 8.0],
    ]
)

# Define Beam Section Temperature - Input type with material properties
Temperature.BeamSection(
    element=2,
    lcname="Temperature Case 2",
    section_type='General',
    type='Input',
    group="Temperature Loads",
    b_value=0.2,
    value=[
        [12.0, 18.0, 6.0, 0],
    ],
    elast=30000000,   # Required for Input type
    thermal=0.0011    # Required for Input type
)

# Create all beam section temperature loads
Temperature.BeamSection.create()
```

```py
# PSC Gradient Example
# Each row: [val_h1, val_h2, val_t1, val_t2]
# b_value not given → 0 


# Positive Temp. Gradient — applied to elements 7, 8, 9
Temperature.BeamSection(
    element=[7, 8, 9],          # list of IDs
    lcname="Positive Temp. Grad",
    section_type='PSC',
    type='Element',
    ref_pos='Top',
    value=[
        [0,    0.15, 17.8, 4  ],
        [0.15, 0.4,  4,    0  ],
        [2.85, 3,    0,    2.1],
    ],
)

# Negative Temp. Gradient — same elements
Temperature.BeamSection(
    element=[7, 8, 9],          # list of IDs
    lcname="Negative Temp. Grad",
    section_type='PSC',
    type='Element',
    ref_pos='Top',
    value=[
        [0,    0.25, -10.3, -0.7],
        [0.25, 0.5,  -0.7,   0  ],
        [2.5,  2.75,  0,    -0.8],
    ],
)

# Create all beam section temperature loads
Temperature.BeamSection.create()
```

```py
# PSC Gradient with a different B value per row
# Each row: [val_b, val_h1, val_h2, val_t1, val_t2]

Temperature.BeamSection(
    element=[7, 8, 9],
    lcname="Negative Temp. Grad",
    section_type='PSC',
    type='Element',
    ref_pos='Top',
    value=[
        [1.2,       0,    0.25, -10.3, -0.7],   # B = 1.2
        [0.4,       0.25, 0.5,  -0.7,   0  ],   # B = 0.4
        ['Section', 2.5,  2.75,  0,    -0.8],   # B = section width
    ],
)

Temperature.BeamSection.create()
```

```py
# Mixing rows: 4-value rows use b_value, 5-value rows use their own B

Temperature.BeamSection(
    element=51,
    lcname="Temp(+)",
    section_type='General',
    b_value=0.2,                      # default B
    value=[
        [0.1, 0.2, 3.0, 12.4],        # B = 0.2 (from b_value)
        [0.5, 0.2, 0.4, 1.0, 0],      # B = 0.5 (own value)
    ],
)

Temperature.BeamSection.create()
```

```py
# PSC with Z-string depths Example
# Use 'Z1', 'Z2', 'Z3' for val_h1/val_h2 to reference section-defined depth zones

Temperature.BeamSection(
    element=[7, 8, 9],
    lcname="PSC Z-String Grad",
    section_type='PSC',
    type='Element',
    dir='LZ',
    ref_pos='Top',
    b_value=0,
    value=[
        ["Z1", "Z2", 17.8, 4],          # val_h1="Z1", val_h2="Z2" → section-defined depths
        [0.15,  0.4,  4,   0],          # numeric depths
        [0.3, "Z2", "Z3", 4, 0],        # per-row B = 0.3 with Z-string depths
    ],
)

Temperature.BeamSection.create()
```
