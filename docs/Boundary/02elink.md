# Elastic Link

A nested class within Boundary used to create elastic connections between nodes with various spring properties and link types.

## Constructor
---
**<font color="green">`Boundary.ElasticLink(i_node, j_node, group = "", id = None, link_type = "GEN", sdx = 0, sdy = 0, sdz = 0, srx = 0, sry = 0, srz = 0, shear = False, dr_y = 0.5, dr_z = 0.5, beta_angle = 0, dir = "Dy", func_id = 1, distance_ratio = 0)`</font>**

Creates elastic links between two nodes with specified spring properties and behavior.


### Parameters
* `i_node`: First node ID
* `j_node`: Second node ID
* `group (default="")`: Boundary group name
* `id (default=None)`: Manual ID assignment (auto-assigned if None)
* `link_type (default="GEN")`: Type of elastic link
* `sdx, sdy, sdz (default=0)`: Translational spring stiffness in X, Y, Z directions
* `srx, sry, srz (default=0)`: Rotational spring stiffness about X, Y, Z axes
* `shear (default=False)`: Consider shear effects
* `dr_y, dr_z (default=0.5)`: Distance ratios for Y and Z directions
* `beta_angle (default=0)`: Rotation angle in degrees
* `dir (default="Dy")`: Direction for specialized link types
* `func_id (default=1)`: Function ID for specialized link types
* `distance_ratio (default=0)`: Distance ratio for specialized link types

### Link Types
* **"GEN"**: General elastic link with full stiffness matrix
* **"RIGID"**: Rigid connection (infinite stiffness)
* **"TENS"**: Tension-only link (works only in tension)
* **"COMP"**: Compression-only link (works only in compression)
* **"MULTI LINEAR"**: Multi-linear behavior with function definition
* **"SADDLE"**: Saddle-type connection
* **"RAIL INTERACT"**: Rail track interaction link

### Class Attributes
*Boundary.ElasticLink.links* -> List of all elastic link instances.


### Object Attributes
* `I_NODE` (int): The first node ID of the link.
* `J_NODE` (int): The second node ID of the link.
* `GROUP_NAME` (str): The name of the boundary group.
* `LINK_TYPE` (str): The type of elastic link (e.g., "GEN", "RIGID", "TENS").
* `ANGLE` (float): The beta angle (rotation) in degrees.
* `SDx` (float): Spring stiffness in the X direction.
* `SDy` (float): Spring stiffness in the Y direction.
* `SDz` (float): Spring stiffness in the Z direction.
* `SRx` (float): Rotational stiffness about the X axis.
* `SRy` (float): Rotational stiffness about the Y axis.
* `SRz` (float): Rotational stiffness about the Z axis.
* `bSHEAR` (bool): Flag to consider shear effects.
* `DR_Y` (float): Distance ratio for shear effects in the Y direction.
* `DR_Z` (float): Distance ratio for shear effects in the Z direction.
* `Direction` (str): Direction for "MULTI LINEAR" or "RAIL INTERACT" links (e.g., "Dy").
* `Function_ID` (int): Function ID for "MULTI LINEAR" or "RAIL INTERACT" links.
* `Distance_ratio` (float): Distance ratio for "MULTI LINEAR" or "RAIL INTERACT" links.
* `ID` (int): The ID of the elastic link.


## Methods
---
#### json
Returns JSON representation of all elastic links.

```py
link1 = Boundary.ElasticLink(1, 2, "Group1", 1, "GEN", 1000, 1000, 1000)
print(Boundary.ElasticLink.json())
```

#### create
Sends elastic link data to Civil NX.

```py
Boundary.ElasticLink.create()
```

#### get
Fetches elastic link data from Civil NX.

```py
print(Boundary.ElasticLink.get())
```

#### sync
Synchronizes elastic links from Civil NX to Python.

```py
Boundary.ElasticLink.sync()
```

#### delete
Deletes all elastic links from both Python and Civil NX.

```py
Boundary.ElasticLink.delete()
```










## Examples
---
#### General Elastic Link
```py
#General Elastic Link Example

#Create Beam and Node
for j in range(2):
    for i in range(2):
        Node(i*10,0,-1*j)
        Node.create()
Element.Beam(1,2)
Element.create()

#Create General Elastic Link    
Boundary.ElasticLink(1, 3, "", 1, "GEN", 1000, 1000, 1000, 100, 100, 100)
Boundary.ElasticLink.create()
```

#### Rigid Link
```py
#Rigid Link Example

#Create Beam and Node
for j in range(2):
    for i in range(2):
        Node(i*10,0,-1*j)
        Node.create()
Element.Beam(1,2)
Element.create()

#Create Rigid Link    
Boundary.ElasticLink(2, 4, "", 1, "RIGID")
Boundary.ElasticLink.create()

```

#### Tension-Only & Compression-Only Link
```py
#Tension-Only & Compression-Only Link Example

#Create Beam and Node
for j in range(2):
    for i in range(2):
        Node(i*10,0,-1*j)
        Node.create()
Element.Beam(1,2)
Element.create()

#Tension-Onl & Compression-Only Link    
Boundary.ElasticLink(1, 3, "", 1, "TENS",500)
Boundary.ElasticLink(2, 4, "", 2, "COMP",600)
Boundary.ElasticLink.create()
```

#### Saddle type Link
```py
#Saddle type Link Example

#Create Beam and Node
for j in range(2):
    for i in range(2):
        Node(i*10,0,-1*j)
        Node.create()
Element.Beam(1,2)
Element.create()


#Create Saddle type Link    
Boundary.ElasticLink(1, 3, "", 1, "SADDLE")
Boundary.ElasticLink.create()

```

#### Multi-Linear Link
```py
#Multi-linear link Example

#Create Beam and Node
for j in range(2):
    for i in range(2):
        Node(i*10,0,-1*j)
        Node.create()
Element.Beam(1,2)
Element.create()


# Multi-linear link
Boundary.ElasticLink(1, 3, "", 1, "MULTI LINEAR", dir="Dy", func_id=1)
Boundary.ElasticLink.create()

#Note: Before running this code, the Force-Deformation function must be created in Civil NX to avoid any errors.

```

#### Rail Interaction Link
```py
# Rail track interaction link Example

#Create Beam and Node
for j in range(2):
    for i in range(2):
        Node(i*10,0,-1*j)
        Node.create()
Element.Beam(1,2)
Element.create()


# Rail track interaction link
Boundary.ElasticLink(2, 4, "", 1, "RAIL INTERACT", dir="Dy", func_id=1)
Boundary.ElasticLink.create()

#Note: Before running this code, the Rail Interaction function must be created in Civil NX to avoid any errors.
```
