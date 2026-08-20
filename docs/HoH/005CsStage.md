# Construction Stage

A nested class within `HoH.CS` used to define construction stages for Heat of Hydration analysis.

## Constructor
---

Defines and adds a new construction stage for Heat of Hydration analysis.

**`HoH.CS.STAGE(name, initial_temp = None, add_step = None, act_elem = None, act_bngr = None, dact_bngr = None, act_load = None, act_day = None, dact_load = None, dact_day = None, id = None)`**

#### Parameters
* `name`: Name of the construction stage.
* `initial_temp`: Initial temperature for newly activated elements at this stage. If `None`, the initial temperature assigned in the Heat of Hydration Analysis Control will apply instead.
* `add_step`: List of time steps (hr), defining the analysis time increments within the stage.
* `act_elem`: Structure group name, or list of names, to activate at this stage.
* `act_bngr`: Boundary group name, or list of names, to activate at this stage.
* `dact_bngr`: Boundary group name, or list of names, to deactivate at this stage.
* `act_load`: Load group name, or list of names, to activate at this stage.
* `act_day`: Activation time, or list of times corresponding to `act_load`. 
* `dact_load`: Load group name, or list of names, to deactivate at this stage.
* `dact_day`: Deactivation time, or list of times corresponding to `dact_load`.
* `id`: Manually assign an ID (also used as the stage order number). If **None**, ID will be auto-assigned sequentially.

#### Class Attributes
*HoH.CS.STAGE.stages* -> List of all construction stage instances.

#### Object Attributes
* `ID` (int): The ID of the construction stage.
* `NO` (int): The sequential order number of the construction stage.
* `NAME` (str): The name of the construction stage.
* `bINITAL_TEMP` (bool): Whether an initial temperature has been explicitly assigned.
* `INITIAL_TEMP` (float): The initial temperature value. Only meaningful when `bINITAL_TEMP` is `True`.
* `ADD_STEP` (list[float]): The list of time steps (hr) defined for the stage.
* `act_structure_groups` (list[str]): The structure groups activated at this stage.
* `act_boundary_groups` (list[str]): The boundary groups activated at this stage.
* `deact_boundary_groups` (list[str]): The boundary groups deactivated at this stage.
* `act_load_groups` (list[dict]): The load groups activated at this stage, each entry as `{"LOAD_NAME": ..., "DAY": ...}`.
* `deact_load_groups` (list[dict]): The load groups deactivated at this stage, each entry as `{"LOAD_NAME": ..., "DAY": ...}`.

---

## Methods
---
#### json
Generates the properly formatted JSON payload for MidasAPI.

```py
cs1 = HoH.CS.STAGE("CS1", add_step=[6, 12, 24], act_elem="Pier1")
print(HoH.CS.STAGE.json())
```

#### create
Sends the PUT request to create all stored Construction Stage objects in Civil NX. If the stages were previously synced from Civil NX, the existing stages are deleted before being recreated.

```py
HoH.CS.STAGE.create()
```

#### get
Retrieves the Construction Stage configuration from Civil NX.

```py
print(HoH.CS.STAGE.get())
```

#### sync
Fetches data from Civil NX and reconstructs the local class instances.

```py
HoH.CS.STAGE.sync()
```

#### delete
Deletes all Construction Stage objects from both Python and Civil NX.

```py
HoH.CS.STAGE.delete()
```

#### clear
Clears all locally stored Construction Stage objects without affecting the Civil NX database.

```py
HoH.CS.STAGE.clear()
```

## Examples
---
```py

HoH.CS.STAGE(
    name="CS1",
    initial_temp=20,
    add_step=[6, 12, 24, 48],
    act_elem="Pier1",
    act_bngr="Pier1_Convection"
)

HoH.CS.STAGE(
    name="CS2",
    add_step=[6, 24, 72],
    act_elem="Pier2",
    dact_bngr="Pier1_Convection",
    act_load="SelfWeight",
    act_day="0.000000",
    dact_load="FormworkLoad",
    dact_day="10.000000"
)

HoH.CS.STAGE.create()
```