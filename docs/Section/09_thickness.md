# Thickness

The Thickness class is used to manage and synchronize thickness data with MIDAS Civil NX.

## Constructor
---
**<font color="green">`Thickness(thick=0.0,thick_out=-1,offset=0,off_type='rat',name="",id =None)`</font>**

Creates thickness with specified parameters.

### Parameters
* thick (float): Thickness value
* thick_out (float): Optional Out-of plane thickness value. If set to -1, it will default to the input thickness.
* offset (float): Offset value.
* off_type (str): Type of offset. 'rat' for ratio, 'val' for value.
* name (str): Optional name of the Thickness.
* id (int): Thickness ID


### Class Attributes
*Thickness.thick* -> List of all thickness defined.   

### Object Attributes
* `ID` (int): Thickness ID.
* `NAME` (str): Thickness name.
* `TYPE` (str): Default: "VALUE".
* `T_IN` (float): In Plane thickness.
* `T_OUT` (float): Out-of Plane thickness.
* `bINOUT` (bool): True if T_IN and T_OUT differ; False if same.
* `OFFSET`(float): Offset amount.
* `OFF_TYPE` (int): Offset type code (0: none, 1: ratio, 2: absolute).






## Methods
---
#### create
Create all thickness section in Civil NX .
```py
Thickness.create()
```

#### json
Returns a JSON representation of all Thickness defined in python.

```py
print(Thickness.json())

# Output:
```

#### get
Fetches thickness from Civil NX and returns the JSON representation.

```py
print(Thickness.get())
# Output
```

#### sync
Retrieves Thickness data from Civil NX and rebuilds the internal thickness list.

```py
Thickness.sync()
for thick in Thickness.thick:
    print(f'ID: {thick.ID} | Thickness: {thick.T_IN}')
```

#### delete
Deletes all Thickness data from both Python and Civil NX.

```py
Thickness.delete()
```




### Examples
```py
# Rectangular Section Example
for i in range(5):
    Thickness(i+0.1)

Thickness.create()
```
