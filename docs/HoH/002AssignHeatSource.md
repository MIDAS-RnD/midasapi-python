# Assign Heat Source

A nested class within `HoH.HeatSource` used to assign a predefined heat source function to the relevant mass concrete elements on which Heat of Hydration analysis is performed.

## Constructor
---

Assigns a heat source function to specified elements.

**`HoH.HeatSource.AssignHeatSource(element_id, func_name)`**

#### Parameters
* `element_id`: Element ID, or a list/tuple/set of element IDs, to which the heat source is assigned.
* `func_name`: Name of the predefined heat source function to assign.

#### Class Attributes
*HoH.HeatSource.AssignHeatSource.data* -> List of all assign heat source instances.

#### Object Attributes
* `ELEMENT_ID` (int): The element ID to which the heat source is assigned.
* `FUNCTION_NAME` (str): The name of the assigned heat source function.

!!! info "Note."
    If an element_id already has a heat source function assigned, defining it again overwrites the existing assignment.

---

## Methods
---
#### json
Generates the properly formatted JSON payload for MidasAPI.

```py
HoH.HeatSource.AssignHeatSource(1, "HS1")
print(HoH.HeatSource.AssignHeatSource.json())
```

#### create
Sends the PUT request to create all stored AssignHeatSource objects in Civil NX.

```py
HoH.HeatSource.AssignHeatSource.create()
```

#### get
Retrieves the AssignHeatSource configuration from Civil NX.

```py
print(HoH.HeatSource.AssignHeatSource.get())
```

#### sync
Fetches data from Civil NX and reconstructs the local class instances.

```py
HoH.HeatSource.AssignHeatSource.sync()
```

#### delete
Deletes all AssignHeatSource objects from both Python and Civil NX.

```py
HoH.HeatSource.AssignHeatSource.delete()
```

#### clear
Clears all locally stored AssignHeatSource objects without affecting the Civil NX database.

```py
HoH.HeatSource.AssignHeatSource.clear()
```

## Examples

---

```py
HoH.HeatSource.Function.Constant(name="HS1", heat_source=150)

HoH.HeatSource.AssignHeatSource(element_id=1, func_name="HS1")

HoH.HeatSource.AssignHeatSource(element_id=[2, 3, 4], func_name="HS1")

HoH.HeatSource.Function.create()

HoH.HeatSource.AssignHeatSource.create()
```