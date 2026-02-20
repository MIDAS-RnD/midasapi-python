# Material
The module provides functionality to create, manage, and synchronize materials in the model.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicGciO252k81571d')
```

---
#### Class Attributes
*Material.mats* -> List of all material instances.   
*Material.ids* -> List of all material IDs.

```py
# Example material data

mat1 = Material.CONC("M30 Grade","IS(RC)","M30",1)
mat2 = Material.STEEL("S450 Steel", "EN05(S)", "S450", 2)
mat3 = Material.USER("Timber", E=12000, pois=0.4, den=6, mass=6, therm=5e-6, id=3)

Material.create()
```

## Methods
---
#### json
Returns a JSON representation of all Materials defined in python.

```py
print(Material.json())
# Output:
# {'Assign': {1: {'TYPE': 'CONC', 'NAME': 'C30', 'DAMP_RAT': 0.05, ...}}}
```

#### create
Sends the current materials, creep shrinkage, compressive strength and time-dependent material links to Civil NX using a PUT request.

```py
Material.create()
```

#### get
Fetches materials from Civil NX and returns the JSON representation.

```py
print(Material.get())
```

#### sync
Retrieves Material data from Civil NX and rebuilds the internal material list.

```py
Material.sync()
```
v1.5.0   
Added sync(`bMaterialParam` = False)    

*  Material.sync() has new inputs : `bMaterialParam`   
    - `bMaterialParam` - adds property in Material object    
        Added properties 

        | Property	 |	Name	|
        |--------|-------|
        | Elastic Modulus	|	`mat.E` |
        | Poisson's Ratio	|	`mat.V`    |
        | Coeff. Thermal Exp	|	`mat.ALPHA`    |
        | Weight Density	|	`mat.W` 	|
        | Damping	|	`mat.D`  |



#### delete
Deletes all material data from both Python and Civil NX.

```py
Material.delete()
```


## Complete Example
---
```py
from midas_civil import *

MAPI_KEY("eyJ1ciI6IklOMjQwN0ZZVDIiLCJwZyI6ImNpdmlsIiwi") #Paste your MAPI Key

# Create concrete materials from database
conc1 = Material.CONC("M30 Grade","IS(RC)","M30",1)
conc2 = Material.CONC("Concrete ","EN04(RC)","C30/37",2)

# Create user-defined concrete material
conc_user = Material.CONC.User("Custom Concrete", E=300000, pois=0.2, den=25, mass=2.5, therm=1e-5, id=3)

# Create steel materials from database
steel1 = Material.STEEL("S450 Steel", "EN05(S)", "S450", 4)
steel2 = Material.STEEL("Fe540 Steel", "IS(S)", "Fe540", 5)

# Create user-defined steel material
steel_user = Material.STEEL.User("Custom Steel", E=200000, pois=0.3, den=78.5, mass=7.85, therm=1.2e-5, id=6)

# Create generic user material
user_mat = Material.USER("Timber", E=12000, pois=0.4, den=6, mass=6, therm=5e-6, id=7)

# Create all materials in Civil NX
Material.create()

print("All materials created successfully!")
```