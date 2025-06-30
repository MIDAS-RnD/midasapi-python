# Temperature

The Temperature class provides a unified interface to create different types of temperature loads and includes nested classes for specific temperature load types.

## Methods
---
### create
Creates all defined temperature loads (System, Element, and Gradient temperatures) in Civil NX.

```py
Temperature.create()
```

### delete
Deletes all temperature loads from both Civil NX and Python.

```py
Temperature.delete()
```

### sync
Synchronizes all temperature loads from Civil NX to Python.

```py
Temperature.sync()
```

## Complete Example
---
```py
from midas_civil import*

MAPI_KEY("eyJ1ciI6IklOMjQwN0ZZVDIiLCJwZyI6ImNpdmlsIiwi") #Paste your Mapi Key

# Create nodes and elements
for j in range(6):
    for i in range(2):
        Node(i*10,j*2,0)
        Node.create()

j = 0
for k in range(6):   
    for i in range(1,2):
        Element.Beam(i +j,i+1 +j)
        Element.create()
    j = j + 2

# Load Cases
Load_Case("T1","Temperature Rise")
Load_Case("T2","Temperature Fall")
Load_Case("TG","Temperature Gradient")
Load_Case.create()

# System Temperature (Uniform temperature change)
Temperature.System(25.0, "Temperature Rise", "", 1)
Temperature.System(-15.0, "Temperature Fall", "", 2)

# Element Temperature (Element-specific temperature)
Temperature.Element(1, 35.0, "Temperature Rise", "", 1)
Temperature.Element(2, 30.0, "Temperature Rise", "", 2)
Temperature.Element(3, -20.0, "Temperature Fall", "", 3)

# Temperature Gradient for Beam elements
Temperature.Gradient(1, 'Beam', "Temperature Gradient", tz=15, ty=-10, hz=1.2, hy=0.8)
Temperature.Gradient(2, 'Beam', "Temperature Gradient", tz=20, ty=-15)  # Using section defaults

# Temperature Gradient for Plate elements
Temperature.Gradient(5, 'Plate', "Temperature Gradient", tz=12, hz=0.25)
Temperature.Gradient(6, 'Plate', "Temperature Gradient", tz=18)  # Using section default

# Create All temperature loads in Civil NX
Temperature.create()
```