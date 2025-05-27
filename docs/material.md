# Material
The module provides functionality to create, manage, and synchronize materials in the model.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midasapi import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicGciO252k81571d')
```

## Material

### Constructor
**<font color="green">`Material(data, id=0)`</font>**

Creates a material with specified data and optional ID.

#### Parameters
* `data`: Material data dictionary containing material properties
* `id (default=0)`: Manual ID assignment (auto-assigned if 0 or ID already exists)

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

### Methods

#### json
Returns a JSON representation of all Materials defined in python.

```py
print(Material.json())
# Output:
# {'Assign': {1: {'TYPE': 'CONC', 'NAME': 'C30', 'DAMP_RAT': 0.05, ...}}}
```

#### create
Sends the current material list to Civil NX using a PUT request.

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

#### delete
Deletes all material data from both Python and Civil NX.

```py
Material.delete()
```

---

## 1. CONCRETE MATERIAL

A nested class within Material used to create concrete materials.

### Database Material Constructor
**<font color="green">`Material.CONC(name='', standard='', db='', id=0)`</font>**

Creates a concrete material from database with specified standard and database code.

#### Parameters
* `name (default='')`: Material name
* `standard (default='')`: Standard code (e.g., "EN", "ACI", "IS")
* `db (default='')`: Database material code
* `id (default=0)`: Manual ID assignment

#### Examples
```py
# Create concrete material from database
Material.CONC("M30 Grade","IS(RC)","M30",1)
Material.CONC("Concrete ","EN04(RC)","C30/37",2)

Material.create()
```

### User-Defined Material Constructor
**<font color="green">`Material.CONC.User(name='', E=0, pois=0, den=0, mass=0, therm=0, id=0)`</font>**

Creates a user-defined concrete material with custom properties.

#### Parameters
* `name (default='')`: Material name
* `E (default=0)`: Elastic modulus
* `pois (default=0)`: Poisson's ratio
* `den (default=0)`: Density
* `mass (default=0)`: Mass density
* `therm (default=0)`: Thermal expansion coefficient
* `id (default=0)`: Manual ID assignment

#### Examples
```py
# Create user-defined concrete material
Material.CONC.User("Custom Concrete", E=300000, pois=0.2, den=25, mass=2.5, therm=1e-5, id=3)

Material.create()
```

---

## 2. STEEL MATERIAL

A nested class within Material used to create steel materials.

### Database Material Constructor
**<font color="green">`Material.STEEL(name='', standard='', db='', id=0)`</font>**

Creates a steel material from database with specified standard and database code.

#### Parameters
* `name (default='')`: Material name
* `standard (default='')`: Standard code (e.g., "EN", "AISC", "IS")
* `db (default='')`: Database material code
* `id (default=0)`: Manual ID assignment

#### Examples
```py
# Create steel material from database
Material.STEEL("S450 Steel", "EN05(S)", "S450", 4)
Material.STEEL("Fe540 Steel", "IS(S)", "Fe540", 5)

Material.create()
```

### User-Defined Material Constructor
**<font color="green">`Material.STEEL.User(name='', E=0, pois=0, den=0, mass=0, therm=0, id=0)`</font>**

Creates a user-defined steel material with custom properties.

#### Parameters
* `name (default='')`: Material name
* `E (default=0)`: Elastic modulus
* `pois (default=0)`: Poisson's ratio
* `den (default=0)`: Density
* `mass (default=0)`: Mass density
* `therm (default=0)`: Thermal expansion coefficient
* `id (default=0)`: Manual ID assignment

#### Examples
```py
# Create user-defined steel material
steel_user = Material.STEEL.User("Custom Steel", E=200000, pois=0.3, den=78.5, mass=7.85, therm=1.2e-5, id=6)

Material.create()
```

---

## 3. USER MATERIAL

A nested class within Material used to create generic user-defined materials.

### Constructor
**<font color="green">`Material.USER(name='', E=0, pois=0, den=0, mass=0, therm=0, id=0)`</font>**

Creates a generic user-defined material with custom properties.

#### Parameters
* `name (default='')`: Material name
* `E (default=0)`: Elastic modulus
* `pois (default=0)`: Poisson's ratio
* `den (default=0)`: Density
* `mass (default=0)`: Mass density
* `therm (default=0)`: Thermal expansion coefficient
* `id (default=0)`: Manual ID assignment

#### Examples
```py
# Create generic user material
user_mat = Material.USER("Timber", E=12000, pois=0.4, den=6, mass=6, therm=5e-6, id=7)

Material.create()
```

---

## Complete Example

```py
from midasapi import *

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