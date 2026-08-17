# Convection Coefficient Function

A nested class within `HoH.Convection` used to define convection coefficient functions, which characterizes the heat transfer in Heat of Hydration analysis.

## Constant
---

Assigns a constant convection coefficient.

**`HoH.Convection.Coefficient_Function.Constant(name, coefficient, id = None)`**

#### Parameters
* `name`: Name of the convection coefficient function.
* `coefficient`: Constant convection coefficient value.
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Class Attributes
*HoH.Convection.Coefficient_Function.functions* -> List of all convection coefficient function instances (Constant and User types).

#### Object Attributes
* `ID` (int): The ID of the function entry.
* `NAME` (str): The name of the convection coefficient function.
* `TYPE` (str): The function type ("CONST").
* `COEF` (float): The constant convection coefficient value.

---

## User
---

Assigns a user-defined variation of convection coefficient over time.

**`HoH.Convection.Coefficient_Function.User(name, scale_factor, time_coeff_data, id = None)`**

#### Parameters
* `name`: Name of the convection coefficient function.
* `scale_factor`: Scale factor applied to the function data.
* `time_coeff_data`: Sequence of `(time, coefficient)` pairs defining the variation.
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Class Attributes
*HoH.Convection.Coefficient_Function.functions* -> List of all convection coefficient function instances (Constant and User types).

#### Object Attributes
* `ID` (int): The ID of the function entry.
* `NAME` (str): The name of the convection coefficient function.
* `TYPE` (str): The function type ("USER").
* `SCALE_FACTOR` (float): The scale factor applied to the function data.
* `ITEM` (list[tuple[float, float]]): The list of (Time, Coefficient) data points.

---

## Methods
---
#### json
Generates the properly formatted JSON payload for MidasAPI.

```py
HoH.Convection.Coefficient_Function.Constant("CC1", 12)
print(HoH.Convection.Coefficient_Function.json())
```

#### create
Sends the PUT request to create all stored Convection Coefficient Functions in Civil NX.

```py
HoH.Convection.Coefficient_Function.create()
```

#### get
Retrieves the Convection Coefficient Functions configuration from Civil NX.

```py
print(HoH.Convection.Coefficient_Function.get())
```

#### sync
Fetches data from Civil NX and reconstructs the local class instances.

```py
HoH.Convection.Coefficient_Function.sync()
```

#### delete
Deletes all Convection Coefficient Function objects from both Python and Civil NX.

```py
HoH.Convection.Coefficient_Function.delete()
```

#### clear
Clears all locally stored Convection Coefficient Function objects without affecting the Civil NX database.

```py
HoH.Convection.Coefficient_Function.clear()
```

## Examples
---
```py
HoH.Convection.Coefficient_Function.Constant(name="CC_Steel", coefficient=12)

HoH.Convection.Coefficient_Function.User(
    name="CC_User", 
    scale_factor=1.0, 
    time_coeff_data=[(0, 12), (3, 7), (7, 4.5)]
)

HoH.Convection.Coefficient_Function.create()
```