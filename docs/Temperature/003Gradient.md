# Temperature Gradient

A nested class within Temperature used to create temperature gradient loads for Beam and Plate elements.

## Constructor
---
**<font color="green">`Temperature.Gradient(element, type, lcname, tz, group="", id=None, hz=None, ty=0, hy=None)`</font>**

Creates temperature gradient loads that apply temperature differences across element cross-sections.

### Parameters
* `element`: Element ID to apply the gradient (Required)
* `type`: Element type, either 'Beam' or 'Plate' (Required)
* `lcname`: Load Case Name (Required)
* `tz`: Temperature difference in the local z-direction (T2z - T1z) (Required)
* `group (default="")`: Load group name
* `id (default=None)`: Gradient ID (auto-generated if None)
* `hz (default=None)`: Gradient value for local z-dir (uses section default if None)
* `ty (default=0)`: Temperature difference in local y-dir (T2y - T1y) - **Required for 'Beam' type**
* `hy (default=None)`: Gradient value for local y-dir (uses section default if None)

### Object Attributes
* `ELEMENT` (int): The element ID where gradient is applied.
* `ID` (int): The ID of the temperature gradient entry.
* `ITEMS` (list): List of gradient items containing temperature parameters.

## Methods
---
#### json
Returns JSON representation of all temperature gradient loads.

```py
tg1 = Temperature.Gradient(2, 'Beam', 'Temp(-)', tz=10, ty=-10, hz=1.2, hy=0.5)
print(Temperature.Gradient.json())
```

#### create
Sends temperature gradient loads to Civil NX.

```py
Temperature.Gradient.create()
```

#### get
Fetches temperature gradient loads from Civil NX.

```py
print(Temperature.Gradient.get())
```

#### sync
Synchronizes temperature gradient loads from Civil NX.

```py
Temperature.Gradient.sync()
```

#### delete
Deletes all temperature gradient loads from both Python and Civil NX.

```py
Temperature.Gradient.delete()
```

## Examples
---
```py
# Temperature Gradient Example

# Create load cases
Load_Case("TPG", "Temperature Gradient")
Load_Case("TPG", "Temperature Gradient Negative")
Load_Case.create()

# Create load group (optional)
Group.Load("Gradient Loads")
Group.Load.create()

# Define Temperature Gradient for Beam - With custom gradient values
Temperature.Gradient(element=1, type='Beam', lcname='Temperature Gradient', 
                    tz=15, ty=-10, hz=1.2, hy=0.8, group="Gradient Loads")
Temperature.Gradient.create()

# Define Temperature Gradient for Beam - Using section defaults
Temperature.Gradient(element=2, type='Beam', lcname='Temperature Gradient', 
                    tz=20, ty=-15, group="Gradient Loads")
Temperature.Gradient.create()

# Define Temperature Gradient for Plate - With custom gradient value
Temperature.Gradient(element=10, type='Plate', lcname='Temperature Gradient', 
                    tz=12, hz=0.25, group="Gradient Loads")
Temperature.Gradient.create()

# Define Temperature Gradient for Plate - Using section default
Temperature.Gradient(element=11, type='Plate', lcname='Temperature Gradient', 
                    tz=18, group="Gradient Loads")
Temperature.Gradient.create()

# Multiple gradients on same element
Temperature.Gradient(element=3, type='Beam', lcname='Temperature Gradient', 
                    tz=10, ty=-8)
Temperature.Gradient(element=3, type='Beam', lcname='Temperature Gradient Negative', 
                    tz=-12, ty=6)
Temperature.Gradient.create()
```