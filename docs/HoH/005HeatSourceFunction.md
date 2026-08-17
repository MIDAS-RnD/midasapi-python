# Heat Source Function

A nested class within `HoH.HeatSource` used to define the heat source of concrete, modeling the amount of heat generated during hydration in Heat of Hydration analysis.

## Constant
---

Assigns a constant heat source.

**`HoH.HeatSource.Function.Constant(name, heat_source, id = None)`**

#### Parameters
* `name`: Name of the heat source function.
* `heat_source`: Constant heat source value.
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Class Attributes
*HoH.HeatSource.Function.functions* -> List of all heat source function instances (Constant, Code, and User types).

#### Object Attributes
* `ID` (int): The ID of the function entry.
* `NAME` (str): The name of the heat source function.
* `TYPE` (str): The function type ("CONST").
* `TEMP_CONST` (float): The constant heat source value.

---

## Code
---

Assigns a heat source based on Code-defined adiabatic temperature rise, either calculated from concrete properties or manually specified constants.

**`HoH.HeatSource.Function.Code(name, use_concrete_data = False, k = None, alpha = None, cement_type = None, temperature = None, cement_content = None, id = None)`**

#### Parameters
* `name`: Name of the heat source function.
* `use_concrete_data`: `True` to calculate the maximum adiabatic temperature rise and reactive velocity coefficient from the concrete information (`cement_type`, `temperature`, `cement_content`). `False` to manually input `k` and `alpha`.
* `k`: Maximum adiabatic temperature rise (K). Required only if `use_concrete_data = False`.
* `alpha`: Reactive velocity coefficient (a). Required only if `use_concrete_data = False`.
* `cement_type`: Cement type. Required only if `use_concrete_data = True`. Expected values:  
&emsp;&emsp;&emsp;&emsp;
'Normal' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'Moderate Heat'  <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'High-early-strength'  <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'Blast-furnace Slag'  <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'Fly Ash'  
* `temperature`: Concrete pour temperature, in °C. Required only if `use_concrete_data = True`. Expected values:  
&emsp;&emsp;&emsp;&emsp;
`10` <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
`20` <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
`30`  
* `cement_content`: Cement content per unit volume. Required only if `use_concrete_data = True`.
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Class Attributes
*HoH.HeatSource.Function.functions* -> List of all heat source function instances (Constant, Code, and User types).

#### Object Attributes
* `ID` (int): The ID of the function entry.
* `NAME` (str): The name of the heat source function.
* `TYPE` (str): The function type ("FUNC").
* `OPT_USE_CONC_DATA` (bool): Whether the concrete-data based calculation is used.
* `K` (float): The maximum adiabatic temperature rise. Only set when `OPT_USE_CONC_DATA` is `False`.
* `ALPHA` (float): The reactive velocity coefficient. Only set when `OPT_USE_CONC_DATA` is `False`.
* `CEMENT_TYPE` (int): The internally mapped cement type index. Only set when `OPT_USE_CONC_DATA` is `True`.
* `TEMP_FUNC` (int): The internally mapped concrete pour temperature index. Only set when `OPT_USE_CONC_DATA` is `True`.
* `CEMENT_CONT` (float): The cement content per unit volume. Only set when `OPT_USE_CONC_DATA` is `True`.

---

## User
---

Assigns a user-defined heat source function, inputted in a table format as either Heat Source or Temperature data.

**`HoH.HeatSource.Function.User(name, scale_factor, time_value_data, is_adiabatic_temp = True, id = None)`**

#### Parameters
* `name`: Name of the heat source function.
* `scale_factor`: Scale factor applied to the function data.
* `time_value_data`: Sequence of `(time, value)` pairs defining the variation.
* `is_adiabatic_temp`: `True` if `time_value_data` represents Temperature. `False` if it represents Heat Source.
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Class Attributes
*HoH.HeatSource.Function.functions* -> List of all heat source function instances (Constant, Code, and User types).

#### Object Attributes
* `ID` (int): The ID of the function entry.
* `NAME` (str): The name of the heat source function.
* `TYPE` (str): The function type ("USER").
* `IS_ADIABATIC_TEMP` (bool): `True` if the data represents Temperature, `False` if it represents Heat Source.
* `SCALE_FACTOR` (float): The scale factor applied to the function data.
* `ITEM` (list[tuple[float, float]]): The list of (Time, Value) data points.

---

## Methods
---
#### json
Generates the properly formatted JSON payload for MidasAPI.

```py
HoH.HeatSource.Function.Constant("HS1", 150)
print(HoH.HeatSource.Function.json())
```

#### create
Sends the PUT request to create all stored Heat Source Functions in Civil NX.

```py
HoH.HeatSource.Function.create()
```

#### get
Retrieves the Heat Source Functions configuration from Civil NX.

```py
print(HoH.HeatSource.Function.get())
```

#### sync
Fetches data from Civil NX and reconstructs the local class instances.

```py
HoH.HeatSource.Function.sync()
```

#### delete
Deletes all Heat Source Function objects from both Python and Civil NX.

```py
HoH.HeatSource.Function.delete()
```

#### clear
Clears all locally stored Heat Source Function objects without affecting the Civil NX database.

```py
HoH.HeatSource.Function.clear()
```

## Examples
---
```py
HoH.HeatSource.Function.Constant(name="HS_Const", heat_source=150)

HoH.HeatSource.Function.Code(name="HS_Code_Manual", use_concrete_data=False, k=45, alpha=0.7)

HoH.HeatSource.Function.Code(
    name="HS_Code_Concrete", 
    use_concrete_data=True, 
    cement_type="Normal", 
    temperature=20, 
    cement_content=350
)

HoH.HeatSource.Function.User(
    name="HS_User_Temp", 
    scale_factor=1.0, 
    time_value_data=[(0, 20), (12, 45), (48, 55)], 
    is_adiabatic_temp=True
)

HoH.HeatSource.Function.create()
```