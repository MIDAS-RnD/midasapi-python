# Compressive Strength

The CompStrength class manages time-dependent compressive strength properties for concrete materials.

## Class Attributes
*CompStrength.mats* -> List of all compressive strength instances.   


## Methods

### json
Returns a JSON representation of all Compressive Strength properties defined in python.

```py
print(CompStrength.json())
# Output:
# {'Assign': {1: {'NAME': 'Comp_M25', 'TYPE': 'CODE', ...}}}
```

### create
Sends compressive strength data to Civil NX using a PUT request.

```py
CompStrength.create()
```

### get
Fetches compressive strength data from Civil NX and returns the JSON representation.

```py
print(CompStrength.get())
```

### sync
Retrieves Compressive Strength data from Civil NX and rebuilds the internal list.

```py
CompStrength.sync()
```

### delete
Deletes all compressive strength data from both Python and Civil NX.

```py
CompStrength.delete()
```



![TERS](../assets/separator.png)

# CODAL PROVISIONS


/// details | **IRC Code (112)**

### IRC
**<font color="green">`CompStrength.IRC(name, code="INDIA(IRC:112-2020)", fckDelta=0, typeCement=1, typeAggregate=0, id=0)`</font>**

Creates IRC standard compressive strength properties.

#### Parameters
* `name`: Property name (required)
* `code (default="INDIA(IRC:112-2020)")`: IRC code standard
* `fckDelta (default=0)`: Compressive strength difference (MPa)
* `typeCement (default=1)`: Type of cement (1=Normal, 2=Rapid)
* `typeAggregate (default=0)`: Type of aggregate (0=Normal, 1=Lightweight)
* `id (default=0)`: Manual ID assignment

### Object Attributes

* `ID` (int): The ID of the compressive strength definition.
* `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
* `NAME` (str): Name of the compressive strength definition.
* `TYPE` (str): "CODE"
* `CODENAME` (str): Code standard (e.g., "INDIA(IRC:112-2020)").
* `STRENGTH` (float): Concrete characteristic compressive strength fck (delta fck).
* `iCTYPE` (int): Type of cement.
* `nAGGRE` (int): Type of aggregate.
#### Examples
```py
# Create IRC compressive strength properties
comp1 = CompStrength.IRC("Comp_M25", "INDIA(IRC:112-2020)", fckDelta=5, typeCement=1, typeAggregate=0, id=1)
comp2 = CompStrength.IRC("Comp_C30", "INDIA(IRC:112-2020)", fckDelta=5, typeCement=2, typeAggregate=1, id=2)

CompStrength.create()
```

///