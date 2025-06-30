# Element Temperature

A nested class within Temperature used to create element-specific temperature loads.

## Constructor
---
**<font color="green">`Temperature.Element(element, temperature, lcname, group="", id=None)`</font>**

Creates element temperature loads that apply temperature changes to specific elements.

### Parameters
* `element`: Element ID (Required)
* `temperature`: Temperature value (Required)
* `lcname`: Load case name (Required)
* `group (default="")`: Load group name
* `id (default=None)`: Temperature ID (auto-generated if None)

### Object Attributes
* `ELEMENT` (int): The element ID where temperature is applied.
* `TEMP` (float): The temperature value to be applied.
* `LCNAME` (str): The name of the load case.
* `GROUP_NAME` (str): The name of the load group.
* `ID` (int): The ID of the element temperature entry.
* `ITEMS` (list): List of temperature items for the element.

## Methods
---
#### json
Returns JSON representation of all element temperature loads.

```py
et1 = Temperature.Element(1, 35, "Temp(+)", "", 1)
print(Temperature.Element.json())
```

#### create
Sends element temperature loads to Civil NX.

```py
Temperature.Element.create()
```

#### get
Fetches element temperature loads from Civil NX.

```py
print(Temperature.Element.get())
```

#### sync
Synchronizes element temperature loads from Civil NX.

```py
Temperature.Element.sync()
```

#### delete
Deletes all element temperature loads from both Python and Civil NX.

```py
Temperature.Element.delete()
```

## Examples
---
```py
# Element Temperature Example
# Create elements first
for i in range(1, 6):
    Element.Beam(i, i+1)
Element.create()

# Create load cases
Load_Case("T", "Temperature High")
Load_Case("T", "Temperature Low")
Load_Case.create()

# Create load group 
Group.Load("Temp")
Group.Load.create()

# Define Element Temperature 
Temperature.Element(1, 35.0, "Temperature High", "Temp", 1)
Temperature.Element(2, 42.0, "Temperature High", "Temp", 2)
Temperature.Element(3, -18.0, "Temperature Low", "Temp", 3)
Temperature.Element.create()

```