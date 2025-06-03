# Group
The module provides functionality to create, manage, and synchronize different types of groups (Structure, Boundary, Load, and Tendon groups) in the model.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicGciO252k81571d')
```

## Group Class

The Group class provides a unified interface to create different types of groups and includes nested classes for specific group types.

### Methods

#### <font style="font-size:0px">Group.</font>create
Creates all defined groups (Structure, Boundary, Load, and Tendon groups) in Civil NX.

```py
Group.create()
```

#### <font style="font-size:0px">Group.</font>sync
Synchronizes all group types from Civil NX and rebuilds internal group lists.

```py
Group.sync()
```

#### <font style="font-size:0px">Group.</font>delete
Deletes all group data from both Python and Civil NX.

```py
Group.delete()
```

---


## Complete Example

```py
from midas_civil import *

MAPI_KEY("eyJ1ciI6IklOMjQwN0ZZVDIiLCJwZyI6ImNpdmlsIiwi")  # Paste your Mapi Key

# Create nodes and elements
for i in range(6):
    Node(i*5, 0, 0)
Node.create()

for i in range(5):
    Element.Beam(i+1, i+2)
Element.create()

# Create Structure Groups
Group.Structure("Main Span", nlist=[1, 2, 3, 4], elist=[1, 2, 3])
Group.Structure("Side Span", nlist=[4, 5, 6], elist=[4, 5])

# Update structure group
Group.Structure.update("Main Span", "a", nlist=[5], elist=[])

# Create other group types
Group.Boundary("Support Boundary")
Group.Boundary("Expansion Joint")

Group.Load("Dead Load Group")
Group.Load("Live Load Group")

Group.Tendon("PT Cable Group 1")
Group.Tendon("PT Cable Group 2")

# Create all groups in Civil NX
Group.create()

# Display group information
print("Structure Groups:")
for sg in Group.Structure.Groups:
    print(f'  {sg.NAME}: Nodes={sg.NLIST}, Elements={sg.ELIST}')

print("\nBoundary Groups:")
for bg in Group.Boundary.Groups:
    print(f'  {bg.NAME}')

print("\nLoad Groups:")
for lg in Group.Load.Groups:
    print(f'  {lg.NAME}')

print("\nTendon Groups:")
for tg in Group.Tendon.Groups:
    print(f'  {tg.NAME}')
```