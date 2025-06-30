# Construction Stage
The module provides functionality to create, manage, and synchronize construction stages for staged construction analysis in the model. It handles activation and deactivation of structure groups, boundary groups, and load groups across different construction phases.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicGciO252k81571d')
```


## Constructor
---
**<font color="green">`CS.STAGE(name, duration=0, s_group=None, s_age=None, s_type=None, b_group=None, b_pos=None, b_type=None, l_group=None, l_day=None, l_type=None, id=None, sr_stage=True, ad_stage=False, load_in=False, nl=5, addstp=None)`</font>**

Creates a construction stage with specified parameters for structure, boundary, and load group management.

### Parameters
* `name`: Name of the construction stage
* `duration (default=0)`: Duration of construction stage in days
* `s_group (default=None)`: Structure group name or list of group names
* `s_age (default=None)`: Age of structure group in days (or redistribution % for deactivation)
* `s_type (default=None)`: Structure activation type - "A" to activate, "D" to deactivate
* `b_group (default=None)`: Boundary group name or list of group names
* `b_pos (default=None)`: Boundary position type - "ORIGINAL" or "DEFORMED"
* `b_type (default=None)`: Boundary activation type - "A" to activate, "D" to deactivate
* `l_group (default=None)`: Load group name or list of group names
* `l_day (default=None)`: Load activation day - "FIRST" or "LAST"
* `l_type (default=None)`: Load activation type - "A" to activate, "D" to deactivate
* `id (default=None)`: Manual construction stage ID assignment (auto-assigned if None)
* `sv_result (default=True)`: Save results of this stage
* `sv_step (default=False)`: Add additional step results
* `load_in (default=False)`: Load incremental steps for material nonlinear analysis
* `nl (default=5)`: Number of load incremental steps
* `addstp (default=None)`: List of additional steps

#### Class Attributes
*CS.STAGE.stages* -> List of all construction stages.














## Methods
---
#### json
Returns a JSON representation of all Construction Stages defined in python.

```py
cs1 = CS.STAGE("Stage 1", 7, "Main Girder", 7, "A")
cs2 = CS.STAGE("Stage 2", 14, "Side Girder", 14, "A")

print(CS.STAGE.json())

# Output will show detailed JSON structure for all stages
```

#### create
Sends the current construction stage list to Civil NX using a PUT request.

```py
cs1 = CS.STAGE("Stage 1", 7, "Main Girder", 7, "A")
cs2 = CS.STAGE("Stage 2", 14, "Side Girder", 14, "A")

CS.STAGE.create()
```

#### get
Fetches construction stages from Civil NX and returns the JSON representation.

```py
print(CS.STAGE.get())
# Output will show all construction stages from Civil NX database
```

#### sync
Retrieves Construction Stage data from Civil NX and rebuilds the internal stage list.

```py
CS.STAGE.sync()
for stage in CS.STAGE.stages:
    print(f'Stage: {stage.NAME} | Duration: {stage.DURATION} days')
    print(f'  Active Structure Groups: {len(stage.act_structure_groups)}')
    print(f'  Active Boundary Groups: {len(stage.act_boundary_groups)}')
    print(f'  Active Load Groups: {len(stage.act_load_groups)}')
```

#### delete
Deletes all construction stage data from both Python and Civil NX.

```py
CS.STAGE.delete()

```




## Examples
---

#### Single Group Activation
```py
#Create Node and Element
for j in range(6):
    for i in range(2):
        Node(i*10,j*2,0)
        Node.create()
j = 0
for k in range(6):   
    for i in range(1,2):
        Element.Beam(i +j,i+1 +j)
        Element.create()
    j = j + 2


# Create structural groups
Group.Structure("CS1", nlist=[1, 2], elist=[1])
Group.Structure("CS2", nlist=[3, 4, 5,6], elist=[2, 3])
Group.Structure("CS3", nlist=[7, 8, 9,10], elist=[4, 5,6])

# Create boundary and load groups
Group.Boundary("BG1")
Group.Boundary("BG2")
Group.Load("Load group 1")
Group.Load("Load group 2")

Group.create()

#Create Stage
CS.STAGE("Stage 1",7,"CS1",10,"A","BG1","DEFORMED","A","Load Group 1","FIRST","A")
CS.STAGE.create()
```

#### Multiple Group Activation
```py
#Create Node and Element
for j in range(6):
    for i in range(2):
        Node(i*10,j*2,0)
        Node.create()
j = 0
for k in range(6):   
    for i in range(1,2):
        Element.Beam(i +j,i+1 +j)
        Element.create()
    j = j + 2


# Create structural groups
Group.Structure("CS1", nlist=[1, 2], elist=[1])
Group.Structure("CS2", nlist=[3, 4, 5,6], elist=[2, 3])
Group.Structure("CS3", nlist=[7, 8, 9,10], elist=[4, 5,6])

# Create boundary and load groups
Group.Boundary("BG1")
Group.Boundary("BG2")
Group.Load("Load group 1")
Group.Load("Load group 2")

Group.create()

#Create Stage
CS.STAGE("Stage 1",17,["CS1","CS2"],[10,7],"A",["BG1","BG2"],["DEFORMED","ORIGINAL"],"A","Load Group 1","FIRST","A")
CS.STAGE.create()
```

#### Mixed Activation and Deactivation
```py
#Create Node and Element
for j in range(6):
    for i in range(2):
        Node(i*10,j*2,0)
        Node.create()
j = 0
for k in range(6):   
    for i in range(1,2):
        Element.Beam(i +j,i+1 +j)
        Element.create()
    j = j + 2


# Create structural groups
Group.Structure("CS1", nlist=[1, 2], elist=[1])
Group.Structure("CS2", nlist=[3, 4, 5,6], elist=[2, 3])
Group.Structure("CS3", nlist=[7, 8, 9,10], elist=[4, 5,6])

# Create boundary and load groups
Group.Boundary("BG1")
Group.Boundary("BG2")
Group.Load("Load group 1")
Group.Load("Load group 2")

Group.create()

#Create Stage
CS.STAGE("Stage 1",17,["CS1","CS2"],[10,7],"A",["BG1","BG2"],["DEFORMED","ORIGINAL"],"A","Load Group 1","FIRST","A")
CS.STAGE("Stage 2",10,["CS2","CS3"],[7,7],["D","A"],["BG2"],["ORIGINAL"],"D")
CS.STAGE.create()
```

#### Advanced Options
```py
#Create Node and Element
for j in range(6):
    for i in range(2):
        Node(i*10,j*2,0)
        Node.create()
j = 0
for k in range(6):   
    for i in range(1,2):
        Element.Beam(i +j,i+1 +j)
        Element.create()
    j = j + 2


# Create structural groups
Group.Structure("CS1", nlist=[1, 2], elist=[1])
Group.Structure("CS2", nlist=[3, 4, 5,6], elist=[2, 3])
Group.Structure("CS3", nlist=[7, 8, 9,10], elist=[4, 5,6])

# Create boundary and load groups
Group.Boundary("BG1")
Group.Boundary("BG2")
Group.Load("Load group 1")
Group.Load("Load group 2")

Group.create()

#Create Stage
CS.STAGE("Stage 1",7,"CS1",10,"A","BG1","DEFORMED","A","Load Group 1","FIRST","A")
CS.STAGE("Stage 2",20,"CS2",10,"A","BG2","DEFORMED","A",sr_stage=True, ad_stage=True, load_in=True, nl=6, addstp=[1, 2, 3])
CS.STAGE.create
CS.STAGE.create()
```






## Complete Example

```py
from midas_civil import *

MAPI_KEY("eyJ1ciI6IklOMjQwN0ZZVDIiLCJwZyI6ImNpdmlsIiwi")  # Paste your Mapi Key

# =============================================================================
# CREATE STRUCTURE ONCE - Base Model
# =============================================================================

print("Creating Base Structure...")

# Create nodes
for j in range(6):
    for i in range(2):
        Node(i*10, j*2, 0)
        Node.create()

# Create elements
j = 0
for k in range(6):   
    for i in range(1, 2):
        Element.Beam(i + j, i + 1 + j)
        Element.create()
    j = j + 2

print("Nodes and Elements Created")

# =============================================================================
# CREATE GROUPS ONCE - Define All Components
# =============================================================================

print("Creating Groups...")

# Create structural groups
Group.Structure("CS1", nlist=[1, 2], elist=[1])
Group.Structure("CS2", nlist=[3, 4, 5, 6], elist=[2, 3])
Group.Structure("CS3", nlist=[7, 8, 9, 10], elist=[4, 5, 6])

# Create boundary groups
Group.Boundary("BG1")
Group.Boundary("BG2")
Group.Boundary("BG3")

# Create load groups
Group.Load("Load Group 1")
Group.Load("Load Group 2")
Group.Load("Construction Load")

Group.create()
print("All Groups Created")

# =============================================================================
# CONSTRUCTION STAGING SEQUENCE - All Cases Implemented
# =============================================================================

print("\nCreating Construction Stages...")

# CASE 1: Single Group Activation
# Stage 1: Activate only CS1 
CS.STAGE("Stage 1 - Single Group", 
   duration=7, 
   s_group="CS1", 
   s_age=10, 
   s_type="A", 
   b_group="BG1", 
   b_pos="DEFORMED", 
   b_type="A", 
   l_group="Load Group 1", 
   l_day="FIRST", 
   l_type="A")

print("Stage 1: Single Group Activation - CS1")

# CASE 2: Multiple Group Activation  
# Stage 2: Activate multiple groups BG2 and BG3 simultaneously
CS.STAGE("Stage 2 - Multiple Groups", 
   duration=17, 
   s_group="CS2", 
   s_age=10, 
   s_type="A", 
   b_group=["BG2", "BG3"], 
   b_pos=["DEFORMED", "ORIGINAL"], 
   b_type="A", 
   l_group="Load Group 2", 
   l_day="FIRST", 
   l_type="A")

print("Stage 2: Multiple Group Activation - BG2 & BG3")

# CASE 3: Mixed Activation and Deactivation
# Stage 3: Deactivate CS2, Activate CS3 (mixed operations)
CS.STAGE("Stage 3 - Mixed Operations", 
   duration=10, 
   s_group=["CS2", "CS3"], 
   s_age=[7, 7], 
   s_type=["D", "A"], 
   b_group=["BG2"], 
   b_pos=["ORIGINAL"], 
   b_type="D")

print("Stage 3: Mixed Operations - Deactivate CS2, Activate CS3")

# CASE 4: Advanced Options with Special Parameters
# Stage 4: Advanced staging with additional control parameters
CS.STAGE("Stage 4 - Advanced Options", 
   duration=20,  
   l_group=["Construction Load"], 
   l_day=["FIRST"], 
   l_type=["A"],
   ad_stage=True,      # Additional stage options
   load_in=True,       # Incremental load application
   nl=6,               # Number of load steps
   addstp=[1, 2, 3])   # Additional step control

print("Stage 4: Advanced Options - Full parameter control")

# Create all construction stages
CS.STAGE.create()
```