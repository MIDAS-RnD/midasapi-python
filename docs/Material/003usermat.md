# USER-DEFINED

A nested class within Material used to create generic user-defined materials.

## Constructor
**<font color="green">`Material.USER(name='', E=0, pois=0, den=0, mass=0, therm=0, id=0)`</font>**

Creates a generic user-defined material with custom properties.

### Parameters
* `name (default='')`: Material name
* `E (default=0)`: Elastic modulus
* `pois (default=0)`: Poisson's ratio
* `den (default=0)`: Density
* `mass (default=0)`: Mass density
* `therm (default=0)`: Thermal expansion coefficient
* `id (default=0)`: Manual ID assignment

### Object Attributes
* `ID` (int): The ID of the material.
* `DATA` (dict): A dictionary containing the material properties. Specific keys include:
* `TYPE` (str): "USER"
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
# Create generic user material
user_mat = Material.USER("Timber", E=12000, pois=0.4, den=6, mass=6, therm=5e-6, id=7)

Material.create()
```
