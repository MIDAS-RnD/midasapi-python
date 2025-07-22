# Temperature

The Temperature class provides a unified interface to create different types of temperature loads and includes nested classes for specific temperature load types.

## Nested Classes
---
* **Temperature.System**: Creates system temperature Loads
* **Temperature.Element**: Creates element-specific temperature loads
* **Temperature.Gradient**: Creates temperature gradient loads for beam and plate elements
* **Temperature.Nodal**: Creates temperature loads applied to specific nodes
* **Temperature.BeamSection**: Creates temperature loads with cross-sectional variations for beam elements

## Methods
---
### create
Creates all defined temperature loads (System, Element, Gradient, Nodal, and BeamSection temperatures) in Civil NX.

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
Load_Case("T","Temperature Rise")
Load_Case("T","Temperature Fall")
Load_Case("TPG","Temperature Gradient")
Load_Case("T","Nodal Temperature")
Load_Case("T","Beam Section Temperature")
Load_Case.create()

# Load Groups
Group.Load("Temperature Loads")
Group.Load.create()

# System Temperature (Uniform temperature change)
Temperature.System(25.0, "Temperature Rise", "Temperature Loads", 1)
Temperature.System(-15.0, "Temperature Fall", "Temperature Loads", 2)

# Element Temperature (Element-specific temperature)
Temperature.Element(1, 35.0, "Temperature Rise", "Temperature Loads", 1)
Temperature.Element(2, 30.0, "Temperature Rise", "Temperature Loads", 2)
Temperature.Element(3, -20.0, "Temperature Fall", "Temperature Loads", 3)

# Temperature Gradient for Beam elements
Temperature.Gradient(1, 'Beam', "Temperature Gradient", tz=15, ty=-10, hz=1.2, hy=0.8)
Temperature.Gradient(2, 'Beam', "Temperature Gradient", tz=20, ty=-15)  # Using section defaults


# Nodal Temperature (Node-specific temperature)
Temperature.Nodal(1, 10.0, "Nodal Temperature", "Temperature Loads", 1)
Temperature.Nodal(2, 15.0, "Nodal Temperature", "Temperature Loads", 2)
Temperature.Nodal(3, -12.0, "Nodal Temperature", "Temperature Loads", 3)

# Beam Section Temperature (Cross-sectional temperature variations)
Temperature.BeamSection(
    element=1,
    lcname="Beam Section Temperature",
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

# Create All temperature loads in Civil NX
Temperature.create()

```

