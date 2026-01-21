# Element
The module provides functionality to create, manage, and synchronize structural elements (Beam and Truss) in the model. 
!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicGciO252a81571d')
```


## Constructor
To create elements function corresponding to element type should be used. 

* **Truss** : Element.Truss( )   
* **Beam** : Element.Beam( )   
* **Plate** : Element.Plate( )   


### Retrieve Element by ID

`elemByID(id:int)` : Returns `ELEMENT` object with given ID.


#### Class Attributes

*Element.elements* -> List of all elements.

```py
Node(0,0,0,id=1)    # Create Node at 0,0,0 with ID = 1
Node(1,1,1,id=2)    # Create Node at 1,1,1 with ID = 2
Node(2,2,2,id=3)    # Create Node at 2,2,2 with ID = 3

beam_1 = Element.Beam(1,2)  # Create Beam connecting Node 1 and Node 2 (default ID = 1)
beam_2 = Element.Truss(2,3)  # Create Truss connecting Node 2 and Node 3 (default ID = 2)

for elem in Element.elements:
    print(f'ELEM ID = {elem.ID} | TYPE = {elem.TYPE} | NODE = {elem.NODE}')
# Output :
# ELEM ID = 1 | TYPE = BEAM | NODE = [1, 2]
# ELEM ID = 2 | TYPE = TRUSS | NODE = [2, 3]

```


## Methods

### <font style="font-size:0px">Element.</font>json
Returns a JSON representation of all Nodes defined in python.

```py
beam_1 = Element.Beam(1,2)   # Create Beam connecting Node 1 and Node 2

print(Element.json())

# Output :
# {'Assign': {1: {'TYPE': 'BEAM', 'MATL': 1, 'SECT': 1, 'NODE': [1, 2], 'ANGLE': 0}}}

```

### <font style="font-size:0px">Element.</font>create
Sends the current element list to the Civil NX using a PUT request.  
New elements are created and existing elements(same ID) in Civil NX will be updated.

```py
Node(0,0,0,id=1)    # Create Node at 0,0,0 with ID = 1
Node(1,1,1,id=2)    # Create Node at 1,1,1 with ID = 2
Node(2,2,2,id=3)    # Create Node at 2,2,2 with ID = 3

beam_1 = Element.Beam(1,2)  # Create Beam connecting Node 1 and Node 2 (default ID = 1)
beam_2 = Element.Beam(2,3)  # Create Beam connecting Node 2 and Node 3 (default ID = 2)

Node.create()
Element.create()

```

### <font style="font-size:0px">Element.</font>get
Fetches elements  from the Civil NX and return the JSON representation.  
*-Here, Civil model had 1 beam element* 
```py
print(Element.get())
# Output
# {'ELEM': {1: {'TYPE': 'BEAM', 'MATL': 1, 'SECT': 1, 'NODE': [1, 2], 'ANGLE': 0}}}
```

### <font style="font-size:0px">Element.</font>sync
Retrieves Element data from the Civil NX and rebuilds the internal element list.  
> Element object now includes LENGTH, AREA, CENTER, LOCAL axes, NORMAL data which requires geometry/nodal data.   
From v1.3.5 onwards Element.sync requires Node.sync to be executed beforehand.   


*-Here, Civil model had 1 beam element* 
```py
Node.sync()
Element.sync()
for elem in Element.elements:
    print(f'ELEM ID = {elem.ID} | TYPE = {elem.TYPE} | NODE = {elem.NODE}')
# Output
# ELEM ID = 1 | TYPE = BEAM | NODE = [1, 2]

```


### <font style="font-size:0px">Element.</font>delete
Deletes all element data from both Python and Civil NX.

```py
Element.delete()
```
