# Prescribed Temperature

A nested class within `HoH` (Heat of Hydration) used to define the prescribed temperature limit, corresponding to a surface having no temperature change, such as a ground surface.

## Constructor
---

Creates a prescribed temperature condition at specified nodes.

**`HoH.PrescribedTemperature(node_id, temperature, group_name = "", serial_id = 1)`**

#### Parameters
* `node_id`: Node number, or a list/tuple/set of node numbers, to which the prescribed temperature is applied.
* `temperature`: The prescribed temperature value.
* `group_name`: Boundary Group Name which contains the entered boundary condition. Default `""` (no group).
* `serial_id`: Serial number for the item within the node. Default `1`.

#### Class Attributes
*HoH.PrescribedTemperature.data* -> List of all prescribed temperature instances.

#### Object Attributes
* `NODE_ID` (int): The node number where the prescribed temperature is applied.
* `TEMPER` (float): The prescribed temperature value.
* `GROUP_NAME` (str): The name of the boundary group.
* `SERIAL_ID` (int): The serial number of the item within the node.

---

## Methods
---
#### json
Generates the properly formatted JSON payload for MidasAPI.

```py
HoH.PrescribedTemperature(1, 25.0)
print(HoH.PrescribedTemperature.json())
```

#### create
Sends the PUT request to create all stored PrescribedTemperature objects in Civil NX.

```py
HoH.PrescribedTemperature.create()
```

#### get
Retrieves the PrescribedTemperature configuration from Civil NX.

```py
print(HoH.PrescribedTemperature.get())
```

#### sync
Fetches data from Civil NX and reconstructs the local class instances.

```py
HoH.PrescribedTemperature.sync()
```

#### delete
Deletes all prescribed temperature objects from both Python and Civil NX.

```py
HoH.PrescribedTemperature.delete()
```

#### clear
Clears all locally stored PrescribedTemperature objects without affecting the Civil NX database.

```py
HoH.PrescribedTemperature.clear()
```

## Examples
---
```py
HoH.PrescribedTemperature(node_id=1, temperature=25.0)

HoH.PrescribedTemperature(node_id=[2, 3, 4], temperature=20.0, group_name="Ground_Boundary")

HoH.PrescribedTemperature.create()
```