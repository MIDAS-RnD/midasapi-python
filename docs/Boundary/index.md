# Boundary
The module provides functionality to create, manage, and synchronize boundary conditions including supports, elastic links, and rigid links in the model.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicmciO252k81571d')
```

## Methods
---
#### <font style="font-size:0px">Boundary.</font>create
Creates all defined boundary conditions (Supports, Elastic Links, Rigid Links, Points springs and Multi-Linear functions) in Civil NX.

```py
Boundary.create()
```

#### <font style="font-size:0px">Boundary.</font>delete
Deletes all boundary conditions (Supports, Elastic Links, Rigid Links, Points springs and Multi-Linear functions) from both Python and Civil NX.

```py
Boundary.delete()
```

#### <font style="font-size:0px">Boundary.</font>sync
Synchronizes all boundary conditions (Supports, Elastic Links, Rigid Links, Points springs and Multi-Linear functions) from Civil NX to Python.

```py
Boundary.sync()
```

---

## Complete Example
---
```py
from midas_civil import *

MAPI_KEY("eyJ1ciI6IklOMjQwN0ZZVDIiLCJwZyI6ImNpdmlsIiwi") # Paste your MAPI Key

#Create Beam and Node
for j in range(6):
    for i in range(2):
        Node(i*10,j*2,0)
        Node.create()

for j in range(6):
    for i in range(2):
        Node(i*10,j*2,-3)
        Node.create()

j = 0
for k in range(6):   
    for i in range(1,2):
        Element.Beam(i +j,i+1 +j)
        Element.create()
    j = j + 2

#Support

Boundary.Support(13,"fix")
Boundary.Support(14,"1111111")

Boundary.Support(15,"fix")
Boundary.Support(16,"1111000")

Boundary.Support(17,"pin")
Boundary.Support(18,"roller")

Boundary.Support(19,"1110000")
Boundary.Support(20,"1111000")

Boundary.Support(21,"free")
Boundary.Support(22,"roller")

Boundary.Support(23,"1110101")
Boundary.Support(24,"0101011")

Boundary.Support.create()

#Elastic Link

#Create General Elastic Link    
Boundary.ElasticLink(1, 13, "", 1, "GEN", 1000, 1000, 1000, 100, 100, 100)
Boundary.ElasticLink(2, 14, "", 2, "GEN", 1000, 1000, 1000, 100, 100, 100)

#Rigid Link
 
Boundary.ElasticLink(3, 15, "", 3, "RIGID")

#Create Saddle type Link    

Boundary.ElasticLink(4, 16, "", 4, "SADDLE")

#Tension-Onl & Compression-Only Link    
Boundary.ElasticLink(5, 17, "", 5, "TENS",500)
Boundary.ElasticLink(6, 18, "", 6, "COMP",600)



# Rail track interaction link
Boundary.ElasticLink(7, 19, "", 7, "RAIL INTERACT", dir="Dy", func_id=1)

#Multi-linear link
Boundary.ElasticLink(8, 20, "", 8, "MULTI LINEAR", dir="Dy", func_id=1)
# Note: Before running this code, the Rail Interaction & Force-Deformation function must be created in Civil NX to avoid any errors.

#Create all the Elastic link
Boundary.ElasticLink.create()


#Rigid Link

Boundary.RigidLink(9,[21],"",1,111111)
Boundary.RigidLink(10,[22,24],"",2,111111)

Boundary.RigidLink.create()


print("All boundary conditions created successfully!")
```