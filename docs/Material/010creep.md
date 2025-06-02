# Creep and Shrinkage

The CreepShrinkage class manages time-dependent creep and shrinkage properties for concrete materials.


## Class Attributes
*CreepShrinkage.mats* -> List of all creep and shrinkage instances.   

## Methods

### json
Returns a JSON representation of all Creep and Shrinkage properties defined in python.

```py
print(CreepShrinkage.json())
# Output:
# {'Assign': {1: {'NAME': 'CS_M25', 'CODE': 'INDIA_IRC_112_2011', ...}}}
```

### create
Sends creep and shrinkage data to Civil NX using a PUT request.

```py
CreepShrinkage.create()
```

### get
Fetches creep and shrinkage data from Civil NX and returns the JSON representation.

```py
print(CreepShrinkage.get())
```

### sync
Retrieves Creep and Shrinkage data from Civil NX and rebuilds the internal list.

```py
CreepShrinkage.sync()
```

### delete
Deletes all creep and shrinkage data from both Python and Civil NX.

```py
CreepShrinkage.delete()
```

![TERS](../assets/separator.png)

# CODAL PROVISIONS


/// details | **IRC Code (18,112)**

### IRC
**<font color="green">`CreepShrinkage.IRC(name='', code="INDIA_IRC_112_2011", fck=0, notionalSize=1, relHumidity=70, ageShrinkage=3, typeCement='NR', id=0)`</font>**

Creates IRC standard creep and shrinkage properties.

#### Parameters
* `name (default='')`: Property name
* `code`: Indian Code available : <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> "INDIA_IRC_18_2000" <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> "INDIA_IRC_112_2011" <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font>
* `fck (default=0)`: Characteristic compressive strength
* `notionalSize (default=1)`: Notional size
* `relHumidity (default=70)`: Relative humidity (%)
* `ageShrinkage (default=3)`: Age at start of shrinkage (days)
* `typeCement (default='NR')`: Type of cement ('R' for Rapid, 'NR' for Normal)
* `id (default=0)`: Manual ID assignment

### Object Attributes
* `ID` (int): The ID of the creep/shrinkage definition.
* `DATA` (dict): A dictionary containing the creep/shrinkage properties. Specific keys include:
* `NAME` (str): Name of the creep/shrinkage definition.
* `CODE` (str): Code standard (e.g., "INDIA_IRC_112_2011").
* `STR` (float): Characteristic compressive cylinder strength fck .
* `HU` (float): Relative humidity (%).
* `AGE` (float): Age of concrete at beginning of shrinkage (days).
* `MSIZE` (float): Notional size of member.
* `CTYPE` (str): Type of cement (e.g., "NR").

#### Examples
```py
# Create IRC creep and shrinkage properties
cs1 = CreepShrinkage.IRC("CS_M25", "INDIA_IRC_112_2011", fck=25, notionalSize=150, relHumidity=75, ageShrinkage=7, typeCement='R', id=1)
cs2 = CreepShrinkage.IRC("CS_C30", "INDIA_IRC_112_2011", fck=30, notionalSize=200, relHumidity=70, ageShrinkage=3, typeCement='NR', id=2)

CreepShrinkage.create()
```

///


