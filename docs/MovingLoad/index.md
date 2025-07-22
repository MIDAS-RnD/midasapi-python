# Moving Load

The MovingLoad class provides a unified interface to create and manage components for a moving load analysis, including the design Code, Vehicles, Line Lanes, and load cases in Civil NX.

!!! info "Note."
    All the codes below assume the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicmciO252k81571d')

```


## Nested Classes

The MovingLoad class acts as a container for the following nested classes, each responsible for a specific part of the moving load definition:

---
- **Code**: Manages moving load design codes for different countries
- **Vehicle**: Creates standard vehicle loads based on country-specific design codes.
- **LineLane**: Creates and manages traffic lanes with country-specific standards
- **Case**: Creates Moving Load Cases

## Methods
---
### create
Creates all defined moving load components (codes, Vehicle ,lanes, and cases) in Civil NX.

```py
MovignLoad.Code("INDIA")
MovingLoad.create()

```

### get

Retrieves the data from Civil NX.

```py
current_code = MovingLoad.Code.get()
vehicle_data = MovingLoad.Vehicle.get()
lane_data = MovingLoad.LineLane.get()
Case = MovingLoad.Case.get()
```
### json

Returns a JSON data

```py
vehicle_json = MovingLoad.Vehicle.json()
lane_json = MovingLoad.LineLane.json()
case_json = MovingLoad.Case.json()
```
### sync

Sync the Data with Civil NX Model

```py

MovingLoad.sync()

```
### delete

To delete all moving load components

```py
# Deletes all Moving Load Data
MovingLoad.delete()

```

## Complete Example
---
```py
from midas_civil import *

MAPI_KEY("eyJ1ciI6IklOMjQwN0ZZVDIiLCJwZyI6ImNpdmlsIiwi") # Paste your MAPI Key

# Create a simple bridge structure
for i in range(11):
    Node(i * 3, 0, 0)
Node.create()

for i in range(10):
    Element.Beam(i + 1, i + 2)
Element.create()

# Set the moving load code to Indian standards
MovingLoad.Code("INDIA")

# Define an IRC vehicle
MovingLoad.Vehicle.India(
    name="IRC_Class_A",
    standard_code="IRC",
    vehicle_type="Class A"
)

# Define two traffic lanes on the bridge elements
MovingLoad.LineLane.India(
    Lane_name="Lane_1", 
    Ecc=-1.8, 
    Wheel_space=1.8, 
    Elment_start=1, 
    Elemnt_end=10,

    Span=30

)

MovingLoad.LineLane.India(
    Lane_name="Lane_2", 
    Ecc=1.8, 
    Wheel_space=1.8, 
    Elment_start=1, 
    Elemnt_end=10,
    Span=30
)

# Define a general moving load case
MovingLoad.Case.India(
    name="General_IRC_Loading",
    num_loaded_lanes=2,
    id =1 ,
    sub_load_items=[
        [1.0, 1, 2, "IRC_Class_A", ["Lane_1", "Lane_2"]]
    ]
)
# Create the load case in Midas Civil
MovingLoad.create()

print("Moving load setup completed successfully!")
```


