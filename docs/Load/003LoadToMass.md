# Load to Mass

A nested class within Load used to create load to mass conversion for dynamic analysis.

## Constructor
---
**<font color="green">`Load.LoadToMass(dir, load_case, load_factor=None, nodal_load=True, beam_load=True, floor_load=True, pressure=True, gravity=9.806)`</font>**

Creates load to mass conversion and converts to JSON format for dynamic analysis calculations.

### Parameters
* `dir`: Mass Direction - "X", "Y", "Z", "XY", "YZ", "XZ", "XYZ" (defaults to "XYZ" if invalid)
* `load_case`: List of load case names or single load case name
* `load_factor (default=None)`: List of scale factors corresponding to load cases. If None or shorter than load_case, remaining factors default to 1.0
* `nodal_load (default=True)`: Include nodal loads in mass conversion
* `beam_load (default=True)`: Include beam loads in mass conversion
* `floor_load (default=True)`: Include floor loads in mass conversion
* `pressure (default=True)`: Include pressure loads in mass conversion
* `gravity (default=9.806)`: Gravity acceleration value

### Object Attributes
* `DIR` (str): The mass direction for conversion.
* `LOAD_CASE` (list): List of load case names to be converted to mass.
* `LOAD_FACTOR` (list): List of scale factors for each load case.
* `NODAL` (bool): Flag to include nodal loads.
* `BEAM` (bool): Flag to include beam loads.
* `FLOOR` (bool): Flag to include floor loads.
* `PRESSURE` (bool): Flag to include pressure loads.
* `GRAVITY` (float): Gravity acceleration value.

## Methods
---
#### json
Returns JSON representation of all load to mass conversions.

```py
ltm1 = Load.LoadToMass("Z", ["DL", "LL"], [1.0, 0.5])
print(Load.LoadToMass.json())
```

#### create
Sends load to mass conversion to Civil NX.

```py
Load.LoadToMass.create()
```

#### get
Fetches load to mass conversion from Civil NX.

```py
print(Load.LoadToMass.get())
```

#### sync
Synchronizes load to mass conversion from Civil NX.

```py
Load.LoadToMass.sync()
```

#### delete
Deletes all load to mass conversions from both Python and Civil NX.

```py
Load.LoadToMass.delete()
```

## Examples
---
```py
# Load to Mass Example
# Create load cases first
Load_Case("D", "Dead Load")
Load_Case("L", "Live Load")
Load_Case.create()

# Define Load to Mass conversion
Load.LoadToMass("Z", ["Dead Load", "Live Load"], [1.0, 0.5])
Load.LoadToMass.create()

# XYZ direction 
Load.LoadToMass("XYZ", ["Dead Load"], [1.0], nodal_load=True, beam_load=True)
Load.LoadToMass.create()

# With custom gravity
Load.LoadToMass("Y", ["Seismic"], [1.0], gravity=9.81)
Load.LoadToMass.create()
```