# Point Spring

A nested class within Boundary used to create point springs at nodes with various spring properties and behaviors.

## Constructor
---
**<font color="green">`Boundary.PointSpring(node, spring_type = "LINEAR", group = "", stiffness = None, fixed_option = None, damping = None, direction = "Dx+", normal_vector = None, function_id = 1, id = None)`</font>**

Creates point springs at specified nodes with defined spring properties and behavior types.

### Parameters
* `node`: Node ID where spring is applied
* `spring_type (default="LINEAR")`: Type of spring behavior
* `group (default="")`: Boundary group name
* `stiffness (default=None)`: Spring stiffness values or single value
* `fixed_option (default=None)`: Fixed option array for LINEAR type
* `damping (default=None)`: Damping values (enables damping if provided)
* `direction (default="Dx+")`: Direction string for spring action
* `normal_vector (default=None)`: Normal vector [x, y, z] when direction is "Vector"
* `function_id (default=1)`: Function ID for MULTI type springs
* `id (default=None)`: Manual ID assignment (auto-assigned if None)

#### Spring Types
* **"LINEAR"**: Linear spring with full 6-DOF stiffness matrix
* **"COMP"**: Compression-only spring 
* **"TENS"**: Tension-only spring 
* **"MULTI"**: Multi-linear behavior with function definition

#### Direction Options
* **"Dx+", "Dx-"**: Positive/Negative X direction
* **"Dy+", "Dy-"**: Positive/Negative Y direction
* **"Dz+", "Dz-"**: Positive/Negative Z direction
* **"Vector"**: Custom vector direction (requires normal_vector)

### Class Attributes
*Boundary.PointSpring.springs* -> List of all point spring instances.

### Object Attributes
* `NODE` (int): The node ID where the spring is applied.
* `TYPE` (str): The type of spring (e.g., "LINEAR", "COMP", "TENS", "MULTI").
* `GROUP_NAME` (str): The name of the boundary group.
* `DIR` (int): Direction integer (converted from direction string).
* `ID` (int): The ID of the point spring.

**For LINEAR type:** 

* `SDR` (list): Spring stiffness values [SDx, SDy, SDz, SRx, SRy, SRz].    
* `F_S` (list): Fixed option array [Boolean, 6].   
* `DAMPING` (bool): Flag indicating if damping is enabled.    
* `Cr` (list): Damping values [Cx, Cy, Cz, CRx, CRy, CRz].

**For COMP/TENS types:**  

* `STIFF` (float): Spring stiffness value.   
* `DV` (list): Normal vector [x, y, z].

**For MULTI type:** 

* `DV` (list): Normal vector [x, y, z].   
* `FUNCTION` (int): Function ID for multi-linear behavior.

## Methods
---
#### json
Returns JSON representation of all point springs.

```py
spring1 = Boundary.PointSpring(1, "LINEAR", "", stiffness=[1000, 1000, 1000, 100, 100, 100])
print(Boundary.PointSpring.json())
```

#### create
Sends point spring data to Civil NX.

```py
Boundary.PointSpring.create()
```

#### get
Fetches point spring data from Civil NX.

```py
print(Boundary.PointSpring.get())
```

#### sync
Synchronizes point springs from Civil NX to Python.

```py
Boundary.PointSpring.sync()
```

#### delete
Deletes all point springs from both Python and Civil NX.

```py
Boundary.PointSpring.delete()
```


## Examples
---
#### Linear Spring
```py
# Linear Spring Example

# Create Node
Node(0, 0, 0)
Node.create()

# Create Linear Point Spring with full stiffness matrix
Boundary.PointSpring(1, "LINEAR", "", stiffness=[1000, 1000, 1000, 100, 100, 100])
Boundary.PointSpring.create()
```

#### Linear Spring with Damping
```py
# Linear Spring with Damping Example

# Create Node
Node(0, 0, 0)
Node.create()

# Create Linear Point Spring with damping
Boundary.PointSpring(1, "LINEAR", "", 
                    stiffness=[1000, 1000, 1000, 100, 100, 100],
                    damping=[10, 10, 10, 1, 1, 1])
Boundary.PointSpring.create()
```

#### Compression-Only Spring
```py
# Compression-Only Spring Example

# Create Node
Node(0, 0, 0)
Node.create()

# Create Compression-Only Spring in Z+ direction
Boundary.PointSpring(1, "COMP", "Group2", stiffness=5000, direction="Dz+")
Group.create()
Boundary.PointSpring.create()
```

#### Tension-Only Spring
```py
# Tension-Only Spring Example

# Create Node
Node(0, 0, 0)
Node.create()

# Create Tension-Only Spring in Y- direction
Boundary.PointSpring(1, "TENS", "", stiffness=3000, direction="Dy-")
Boundary.PointSpring.create()
```

#### Spring with Vector Direction
```py
# Spring with Vector Direction Example

# Create Node
Node(0, 0, 0)
Node.create()

# Create Tension-Only Spring with custom vector direction
Boundary.PointSpring(1, "TENS", "", 
                    stiffness=3000, 
                    direction="Vector", 
                    normal_vector=[0, -1, -1])
Boundary.PointSpring.create()
```

#### Multi-Linear Spring
```py
# Multi-Linear Spring Example

# Create Node
Node(0, 0, 0)
Node.create()

# Create Multi-Linear Spring (requires function definition)
Boundary.PointSpring(1, "MULTI", "", 
                    direction="Dz+", 
                    function_id=1)
Boundary.PointSpring.create()

# Note: Before running this code, the Force-Deformation function must be created in Civil NX to avoid any errors.
```
