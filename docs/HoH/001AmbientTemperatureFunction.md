# Ambient Temperature Function

A nested class within `HoH` (Heat of Hydration) used to define ambient temperature functions for the Heat of Hydration analysis.

## Constant
---

Assigns a constant ambient temperature.

**`HoH.Ambient_Temperature_Function.Constant(name, temperature, id = None)`**

#### Parameters
* `name`: Name of the ambient temperature function.
* `temperature`: Constant temperature value.
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Class Attributes
*HoH.Ambient_Temperature_Function.functions* -> List of all ambient temperature function instances (Constant, Sine, and User types).

#### Object Attributes
* `ID` (int): The ID of the function entry.
* `NAME` (str): The name of the ambient temperature function.
* `TYPE` (str): The function type ("CONST").
* `TEMP` (float): The constant temperature value.

---

## Sine
---

Assigns an ambient temperature that fluctuates according to a Sine function.

**`HoH.Ambient_Temperature_Function.Sine(name, max_temp, mean_temp, delay_time, id = None)`**

#### Parameters
* `name`: Name of the ambient temperature function.
* `max_temp`: Amplitude of the Sine function (T).
* `mean_temp`: Initial temperature immediately after concrete casting (To).
* `delay_time`: Time immediately after concrete casting, in days (to).
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Class Attributes
*HoH.Ambient_Temperature_Function.functions* -> List of all ambient temperature function instances (Constant, Sine, and User types).

#### Object Attributes
* `ID` (int): The ID of the function entry.
* `NAME` (str): The name of the ambient temperature function.
* `TYPE` (str): The function type ("SINE").
* `MAX_TEMP` (float): The amplitude of the Sine function.
* `MEAN_TEMP` (float): The initial temperature immediately after concrete casting.
* `DELAY_TIME` (float): The time immediately after concrete casting, in days.

---

## User
---

Assigns a user-defined variation of ambient temperature over time.

**`HoH.Ambient_Temperature_Function.User(name, scale_factor, time_temp_data, id = None)`**

#### Parameters
* `name`: Name of the ambient temperature function.
* `scale_factor`: Scale factor applied to the function data.
* `time_temp_data`: Sequence of `(time, temperature)` pairs defining the variation.
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Class Attributes
*HoH.Ambient_Temperature_Function.functions* -> List of all ambient temperature function instances (Constant, Sine, and User types).

#### Object Attributes
* `ID` (int): The ID of the function entry.
* `NAME` (str): The name of the ambient temperature function.
* `TYPE` (str): The function type ("USER").
* `SCALE_FACTOR` (float): The scale factor applied to the function data.
* `ITEM` (list[tuple[float, float]]): The list of (Time, Temperature) data points.

---

## Methods
---
#### json
Generates the properly formatted JSON payload for MidasAPI.

```py
HoH.Ambient_Temperature_Function.Constant("AT1", 20)
print(HoH.Ambient_Temperature_Function.json())
```

#### create
Sends the PUT request to create all stored Ambient Temperature Functions in Civil NX.

```py
HoH.Ambient_Temperature_Function.create()
```

#### get
Retrieves the Ambient Temperature Functions configuration from Civil NX.

```py
print(HoH.Ambient_Temperature_Function.get())
```

#### sync
Fetches data from Civil NX and reconstructs the local class instances.

```py
HoH.Ambient_Temperature_Function.sync()
```

#### delete
Deletes all Ambient Temperature Function objects from both Python and Civil NX.

```py
HoH.Ambient_Temperature_Function.delete()
```

#### clear
Clears all locally stored Ambient Temperature Function objects without affecting the Civil NX database.

```py
HoH.Ambient_Temperature_Function.clear()
```

## Examples
---
```py
HoH.Ambient_Temperature_Function.Constant(name="AT_Const", temperature=20)

HoH.Ambient_Temperature_Function.Sine(name="AT_Sine", max_temp=15, mean_temp=25, delay_time=2)

HoH.Ambient_Temperature_Function.User(
    name="AT_User", 
    scale_factor=1.0, 
    time_temp_data=[(0, 20), (7, 25), (28, 22)]
)

HoH.Ambient_Temperature_Function.create()
```