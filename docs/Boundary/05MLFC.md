# Multi Linear Function

A nested class within Boundary used to create Multi Linear functions for multi-linear behavior in elastic links and point springs.

## Constructor
**<font color="green">`Boundary.MLFC(name, type = "FORCE", symm = True, data = [[0,0],[1,1]], id = None)`</font>**

Creates force-deformation functions that define non-linear relationships between force/moment and displacement/rotation.

### Parameters
* `name`: The name for the Function
* `type (default="FORCE")`: Type of function - "FORCE" or "MOMENT"
* `symm (default=True)`: Defines if the function is symmetric (True) or unsymmetric (False)
* `data (default=[[0,0],[1,1]])`: List of [X, Y] coordinate pairs defining the function curve
* `id (default=None)`: Manual ID assignment (auto-assigned if None)

### Function Types
* **"FORCE"**: Force vs. displacement relationship
  - X values represent displacement
  - Y values represent force
* **"MOMENT"**: Moment vs. rotation relationship
  - X values represent rotation in radians
  - Y values represent moment

### Class Attributes
* *Boundary.MLFC.func* -> List of all MLFC function instances

### Object Attributes
* `NAME` (str): The name of the force-deformation function.
* `TYPE` (str): The type of function ("FORCE" or "MOMENT").
* `SYMM` (bool): Whether the function is symmetric or unsymmetric.
* `DATA` (list): List of [X, Y] coordinate pairs defining the function curve.
* `X` (list): List of X coordinates (displacement or rotation).
* `Y` (list): List of Y coordinates (force or moment).
* `ID` (int): The unique ID of the function.

## Methods

#### json
Returns JSON representation of all MLFC functions.

```py
func1 = Boundary.MLFC("MyFunction", "FORCE", True, [[0,0], [0.1, 100], [0.2, 150]])
print(Boundary.MLFC.json())
```

#### create
Sends MLFC function data to Civil NX.

```py
Boundary.MLFC.create()
```

#### get
Fetches MLFC function data from Civil NX.

```py
print(Boundary.MLFC.get())
```

#### sync
Synchronizes MLFC functions from Civil NX to Python.

```py
Boundary.MLFC.sync()
```

#### delete
Deletes all MLFC functions from both Python and Civil NX.

```py
Boundary.MLFC.delete()
```

---

## Examples

#### Basic Force-Displacement Function
```py
# Basic Force-Displacement Function Example

# Create a symmetric force vs. displacement function
Boundary.MLFC(name="LinearSpring", 
              type="FORCE", 
              symm=True, 
              data=[[0, 0], [0.01, 100], [0.02, 200], [0.03, 300]])

Boundary.MLFC.create()
```

#### Moment-Rotation Function
```py
# Moment-Rotation Function Example

# Create a symmetric moment vs. rotation function
Boundary.MLFC(name="RotationalSpring", 
              type="MOMENT", 
              symm=True, 
              data=[[0, 0], [0.01, 500], [0.02, 900], [0.03, 1200]])

Boundary.MLFC.create()
```

#### Unsymmetric Function
```py
# Unsymmetric Function Example

# Create an unsymmetric function with different positive/negative behavior
Boundary.MLFC(name="UnsymmetricSpring", 
              type="FORCE", 
              symm=False, 
              data=[[0, 0], [0.005, 50], [0.01, 150], [0.02, 200]])

Boundary.MLFC.create()
```

#### Multiple Functions for Different Applications
```py
# Multiple Functions Example

# Create multiple functions for different spring behaviors
# Compression function
Boundary.MLFC(name="CompressionSpring", 
              type="FORCE", 
              symm=False, 
              data=[[0, 0], [0.01, 500], [0.02, 800], [0.03, 1000]])

# Tension function
Boundary.MLFC(name="TensionSpring", 
              type="FORCE", 
              symm=False, 
              data=[[0, 0], [0.01, 300], [0.02, 550], [0.03, 750]])

# Rotational function
Boundary.MLFC(name="RotationalHinge", 
              type="MOMENT", 
              symm=True, 
              data=[[0, 0], [0.005, 200], [0.01, 350], [0.02, 500]])

Boundary.MLFC.create()
```
