# Steel Material
A nested class within Material used to create steel materials.

## Standard
---
**<font color="green">`Material.STEEL(name='', standard='', db='', id =None)`</font>**

Creates a steel material from database with specified standard and database code.

### Parameters
* `name (default='')`: Material name
* `standard (default='')`: Standard code (e.g., "EN(S)", "AISC(S)", "IS(S)")
* `db (default='')`: Database material code
* `id (default=0)`: Manual ID assignment

### Object Attributes
* `ID` (int): The ID of the material.
* `DATA` (dict): A dictionary containing the material properties. Specific keys include:
* `TYPE` (str): "STEEL"
* `NAME` (str): Name of the material.
* `PARAM` (list): List containing a dictionary with:
* `P_TYPE` (int): 1 (for DB material).
* `STANDARD` (str): Name of the standard (e.g., "EN05(S)").
* `DB` (str): Name of the material in the database (e.g., "S450").

### Examples
```py
# Create steel material from database
Material.STEEL("S450 Steel", "EN05(S)", "S450", 4)
Material.STEEL("Fe540 Steel", "IS(S)", "Fe540", 5)

Material.create()
```

## User-Defined
---
**<font color="green">`Material.STEEL.User(name='', E=0, pois=0, den=0, mass=0, therm=0, id =None)`</font>**

Creates a user-defined steel material with custom properties.

### Parameters
* `name (default='')`: Material name
* `E (default=0)`: Elastic modulus
* `pois (default=0)`: Poisson's ratio
* `den (default=0)`: Density
* `mass (default=0)`: Mass density
* `therm (default=0)`: Thermal expansion coefficient
* `id (default=None)`: Manual ID assignment

### Object Attributes
* `ID` (int): The ID of the material.
* `DATA` (dict): A dictionary containing the material properties. Specific keys include:
* `TYPE` (str): "STEEL"
* `NAME` (str): Name of the material.
* `PARAM` (list): List containing a dictionary with:
* `P_TYPE` (int): 2 (for user-defined).
* `ELAST` (float): Modulus of elasticity.
* `POISN` (float): Poisson's ratio.
* `THERMAL` (float): Thermal coefficient.
* `DEN` (float): Density.
* `MASS` (float): Mass (if density is not provided).

### Examples
```py
# Create user-defined steel material
steel_user = Material.STEEL.User("Custom Steel", E=200000, pois=0.3, den=78.5, mass=7.85, therm=1.2e-5, id=6)

Material.create()
```
