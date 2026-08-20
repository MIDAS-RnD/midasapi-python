# Pipe Cooling

A nested class within the `HoH` (Heat of Hydration) module used to define pipe cooling properties and assign them to specific nodes for reducing hydration temperatures in concrete structures.

## Constructor
---
**<font color="green">`HoH.PipeCooling(name, pipe_diameter, convection_coeff, specific_heat, weight_density, inlet_temp, flow_rate, start_stage, end_stage, start_time, end_time, node_list, id = 0)`</font>**

### Parameters
* `name` (str): Name of the pipe cooling group.
* `pipe_diameter` (float): Cooling pipe diameter.
* `convection_coeff` (float): Convection coefficient of the cooling pipe.
* `specific_heat` (float): Specific heat of the cooling water.
* `weight_density` (float): Density of the cooling water.
* `inlet_temp` (float): Inlet temperature of the cooling water.
* `flow_rate` (float): Flow rate of the cooling water.
* `start_stage` (str): Starting construction stage for the application.
* `end_stage` (str): Ending construction stage for disengagement.
* `start_time` (float): Time of application (hr) relative to the start stage.
* `end_time` (float): Time of disengagement (hr) relative to the end stage.
* `node_list` (list[int]): List of node numbers defining the path of the pipe.
* `id (default=0)`: Optional ID for the pipe cooling group (auto-assigned if 0).

### Object Attributes
* `NAME` (str): The name of the pipe cooling group.
* `PIPE_DIAMETER` (float): The diameter of the cooling pipe.
* `CONVECTION_COEFF` (float): The convection coefficient.
* `SPECIFIC_HEAT` (float): The specific heat capacity of the water.
* `WEIGHT_DENSITY` (float): The weight density of the cooling water.
* `INLET_TEMP` (float): The inlet temperature of the water.
* `FLOW_RATE` (float): The flow rate of the cooling water.
* `START_STAGE` (str): The construction stage where cooling begins.
* `END_STAGE` (str): The construction stage where cooling ends.
* `START_TIME` (float): The start time (hr) relative to the start stage.
* `END_TIME` (float): The end time (hr) relative to the end stage.
* `NODE_LIST` (list[int]): The list of nodes outlining the pipe path.
* `ID` (int): The ID of the pipe cooling entry.

## Methods
---
#### json
Generates the properly formatted JSON payload for MidasAPI.

```py
pc1 = HoH.PipeCooling("PC1", 3, 133.7, 4186, 0.001, 15, 20, "CS1", "CS1", 10, 100, [2809, 2810])
print(HoH.PipeCooling.json())
```

#### create
Sends the PUT request to create all stored PipeCooling objects in Civil NX.

```py
HoH.PipeCooling.create()
```

#### get
Retrieves the PipeCooling configuration from Civil NX.

```py
print(HoH.PipeCooling.get())
```

#### sync
Fetches data from Civil NX and reconstructs the local class instances.

```py
HoH.PipeCooling.sync()
```

#### delete
Deletes all pipe cooling objects from both Python and Civil NX.

```py
HoH.PipeCooling.delete()
```

#### clear
Clears all locally stored PipeCooling objects without affecting the Civil NX database.

```py
HoH.PipeCooling.clear()
```

## Examples
---
```py
# Define a basic pipe cooling group applied to specific nodes during Construction Stage 1 (CS1)
HoH.PipeCooling(
    name="PC1", 
    pipe_diameter=3, 
    convection_coeff=133.7, 
    specific_heat=4186, 
    weight_density=0.001, 
    inlet_temp=15, 
    flow_rate=20, 
    start_stage="CS1", 
    end_stage="CS1", 
    start_time=10, 
    end_time=100, 
    node_list=[2809, 2810, 2811]
)

# Send the Pipe Cooling definition to Civil NX
HoH.PipeCooling.create()
```