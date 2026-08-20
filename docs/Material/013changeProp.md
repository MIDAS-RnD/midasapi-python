# Change Property
 
![alt text](Change_prop.png)

## Constructor
---
**<font color="green">`ChangeProperty(elmID:int,notional_size:float=None,vol_srf_rat:float=None)`</font>**

Add Change Property parameter to elements.

### Parameters
* `elmID `: Element ID
* `notional_size (default='None')`: Notional Size of member
* `vol_srf_rat (default='')`: Volume Surface Ratio

### Object Attributes
* `ELEM_ID` (int): Element ID.    
* `TYPE` (str): "NSM" or "VSR".     
* `VALUE` (float): Value of notional size or Volume Surface Ratio.



## Methods
---
#### json
Returns a JSON representation of Change Element Dependent material property defined in python.

```py
ChangeProperty(1,notional_size=0.1)
ChangeProperty(2,vol_srf_rat=0.1)
print(ChangeProperty.json())
# Output:
# {'Assign': {1: {'TYPE': 'NSM', 'H_VS': 0.1}, 2: {'TYPE': 'VSR', 'H_VS': 0.1}}}
```

#### create
Sends Change property definition to Civil NX using a PUT request.

```py
ChangeProperty.create()
```

#### get
Fetches Change property definition from Civil NX and returns the JSON representation.

```py
print(ChangeProperty.get())
```


#### delete
Deletes all Change property definition from both Python and Civil NX.

```py
ChangeProperty.delete()
```
