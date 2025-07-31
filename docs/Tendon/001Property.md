# Tendon Property

Manages tendon properties and integrates relaxation models.

![NODE GRID](tendon_property.png)

> Property highlighted in the box is defined through Relaxation defintion.

## Constructor
---
**<font color="green">`Tendon.Property(load_case, dir = "Z", value = -1, load_group = "")`</font>**

Creates a tendon property

### Parameters
* `name` (str): Name for the tendon property.
* `type` (int): 1=Internal (Pre-tension) |  2=Internal (Post-tension) |  3=External.
* `matID` (int): Material ID.
* `tdn_area` (float): Area of tendon.
* `duct_dia` (float): Duct diameter.
* `relaxation`: Relaxation definition.
* `ext_mom_mag` (float, default=0): External moment magnitude.
* `anch_slip_begin` (float, default=0): Anchorage slip at begin.
* `anch_slip_end` (float, default=0): Anchorage slip at end.
* `bond_type` (bool, default=True): Whether the tendon is bonded.
* `id` (int, default=0): Optional ID for tendon property.

### Object Attributes
* `ID`: Unique identifier (auto-generated)
* `NAME`: Tendon name
* `TYPE`: Tendon type (INTERNAL or EXTERNAL)
* `TENS`: Tension type (PRE or POST)
* `MAT`: Material ID
* `TDN_AREA`: Tendon area
* `DUCT_DIA`: Duct diameter
* `RELAX`: Relaxation object
* `EXT_MOM_MAG`: External moment magnitude
* `ANC_SLIP_B`: Anchor slip at beginning
* `ANC_SLIP_E`: Anchor slip at end
* `BOND_TYP`E: Bonded (True) or unbonded (False)


## Methods
---
#### json
Returns JSON representation of all self-weight loads.

```py
sw1 = Tendon.Property("Dead Load", "Z", -1)
print(Tendon.Property.json())
```

#### create
Sends self-weight loads to Civil NX.

```py
Tendon.Property.create()
```

#### get
Fetches self-weight loads from Civil NX.

```py
print(Tendon.Property.get())
```

#### sync
Synchronizes self-weight loads from Civil NX.

```py
Tendon.Property.sync()
```

#### delete
Deletes all self-weight loads from both Python and Civil NX.

```py
Tendon.Property.delete()
```





![alt text](../assets/separator.png)


## Relaxation

The Relaxation class acts as container for multiple relaxation models, each implemented as an inner class. 
These correspond to different design codes.




### IRC
**<font color="green">`CreepShrinkage.IRC(name='', code_year=2011, fck=0, notional_size=1, relative_humidity=70, age_shrinkage=3, type_cement='NR', id=0)`</font>**

Creates IRC standard creep and shrinkage properties.

#### Parameters
* `name (str)`: Property name
* `code_year (int, optional)`: The year of the IRC code. Can be 2000 or 2011. Defaults to 2011.
* `fck (float)`: 28-day characteristic compressive strength
* `notional_size (float, optional)`: The notional size of the member. Defaults to 1.
* `relative_humidity (float, optional)`: Relative humidity (40-99%). Defaults to 70.
* `age_shrinkage (int, optional)`: Age at start of shrinkage (days). Defaults to 3.
* `type_cement (str, optional)`: Type of cement ('SL'= Slow Setting cement, 'NR'= Normal cement, 'RS'=Rapid hardening cement). Only for IRC:112-2011. Defaults to 'NR'.
* `id (int, optional)`: Manual ID assignment. Defaults to 0.

#### Object Attributes
* `ID` (int): The ID of the creep/shrinkage definition.
* `DATA` (dict): A dictionary containing the creep/shrinkage properties. Specific keys include:
    * `NAME` (str): Name of the creep/shrinkage definition.
    * `CODE` (str): Code standard (e.g., "INDIA_IRC_112_2011").
    * `STR` (float): Characteristic compressive cylinder strength fck.
    * `HU` (float): Relative humidity (%).
    * `AGE` (float): Age of concrete at beginning of shrinkage (days).
    * `MSIZE` (float): Notional size of member.
    * `CTYPE` (str): Type of cement (e.g., "NR").

#### Examples
```py
# Create IRC:112-2011 creep and shrinkage properties
cs1 = CreepShrinkage.IRC("IRC_M30_2011", code_year=2011, fck=30, notional_size=150, relative_humidity=75, age_shrinkage=7, type_cement='R', id=1)

# Create IRC:18-2000 creep and shrinkage properties
cs2 = CreepShrinkage.IRC("IRC_M25_2000", code_year=2000, fck=25, notional_size=200, relative_humidity=70, age_shrinkage=3, type_cement='NR', id=2)

CreepShrinkage.create()
```



















![alt text](../assets/separator.png)

## Examples
---
```py
# Simple self-weight in Z direction
for i in range(2):
    Node(i*10,0,0)
    Node.create()

Element.Beam(1,2)
Element.create()
    
#Load Case
Load_Case("D","SW Load")
Load_Case.create()

Tendon.Property("SW Load","Z",-1)
Tendon.Property.create()

```


