# Beam Load

A nested class within Load used to create beam loads with comprehensive options for distributed loads, concentrated loads, and eccentricity.

## Constructor
---
**<font color="green">`Load.Beam(element, load_case, load_group = "", value, direction = "GZ"", D = [0, 1, 0, 0], P = [0, 0, 0, 0], cmd = "BEAM", typ = "UNILOAD", use_ecc = False, use_proj = False, eccn_dir = "LZ", eccn_type = 1, ieccn = 0, jeccn = 0.0000195, adnl_h = False, adnl_h_i = 0, adnl_h_j = 0.0000195, id = None)`</font>**

Creates beam loads with various distribution patterns and advanced options.

### Parameters
* `element`: Element number where load is applied
* `load_case`: Load case name
* `load_group (default="")`: Load group name
* `value`: Load magnitude
* `direction (default="GZ")`: Load direction ("GX", "GY", "GZ", "LX", "LY", "LZ")
* `D (default=[0, 1, 0, 0])`: Relative distance array (4 values based on element length)
* `P (default=[0, 0, 0, 0])`: Load magnitude at corresponding D positions
* `cmd (default="BEAM")`: Load command ("BEAM", "LINE", "TYPICAL")
* `typ (default="UNILOAD")`: Load type ("CONLOAD", "CONMOMENT", "UNILOAD", "UNIMOMENT", "PRESSURE")
* `use_ecc (default=False)`: Enable eccentricity
* `use_proj (default=False)`: Enable projection
* `eccn_dir (default="LZ")`: Eccentricity direction
* `eccn_type (default=1)`: Eccentricity from offset (1) or centroid (0)
* `ieccn, jeccn (default=0, 0.0000195)`: Eccentricity values at i-end and j-end
* `adnl_h (default=False)`: Consider additional height for pressure loads
* `adnl_h_i, adnl_h_j (default=0, 0.0000195)`: Additional height values at ends
* `id (default=None)`: Manual ID assignment (auto-assigned if empty)

### Object Attributes
* `ELEMENT` (int): The element number to which the load is applied.
* `LCN` (str): The name of the load case.
* `LDGR` (str): The name of the load group.
* `VALUE` (float): The magnitude of the load.
* `DIRECTION` (str): The direction of the load (e.g., "GZ", "LX").
* `CMD` (str): The command type for the load (e.g., "BEAM", "LINE").
* `TYPE` (str): The type of load (e.g., "UNILOAD", "CONLOAD").
* `USE_PROJECTION` (bool): Flag to indicate if projection is used.
* `USE_ECCEN` (bool): Flag to indicate if eccentricity is used.
* `ECCEN_TYPE` (int): Eccentricity type (0 for centroid, 1 for offset).
* `ECCEN_DIR` (str): Direction of eccentricity.
* `IECC` (float): Eccentricity value at the i-end of the element.
* `JECC` (float): Eccentricity value at the j-end of the element.
* `USE_JECC` (bool): Flag to indicate if j-end eccentricity is used.
* `D` (list): List of four floats representing relative distances along the element for varying loads.
* `P` (list): List of four floats representing load magnitudes at the corresponding 'D' positions.
* `USE_H` (bool): Flag to indicate if additional H is considered for pressure loads.
* `I_H` (float): Additional H value at the i-end for pressure loads.
* `USE_JH` (bool): Flag to indicate if additional H at j-end is used.
* `J_H` (float): Additional H value at the j-end for pressure loads.
* `ID` (int): The ID of the beam load entry.


## Methods
---
#### json
Returns JSON representation of all beam loads.

```py
bl1 = Load.Beam(115, "Live Load","", -50.0)
print(Load.Beam.json())
```

#### create
Sends beam loads to Civil NX.

```py
Load.Beam.create()
```

#### get
Fetches beam loads from Civil NX.

```py
print(Load.Beam.get())
```

#### sync
Synchronizes beam loads from Civil NX.

```py
Load.Beam.sync()
```

#### delete
Deletes all beam loads from both Python and Civil NX.

```py
Load.Beam.delete()
```










## Examples
---
#### Uniform Distributed Load
```py
#UDL Load Example
for i in range(2):
    Node(i*10,0,0)
    Node.create()

Element.Beam(1,2)
Element.create()
    
#Define Load Case
Load_Case("L","UDL Load")
Load_Case.create()

#Apply UDL Load

Load.Beam(1,"UDL Load","",-50,"GZ")
Load.Beam.create()

```

#### Trapezoidal Load

```py
#Trapezoidal Load Example
for i in range(2):
    Node(i*10,0,0)
    Node.create()

Element.Beam(1,2)
Element.create()
    
#Define Load Case
Load_Case("L","Trapezoidal Load")
Load_Case.create()

#Apply Trapezoidal Load

Load.Beam(1,"Trapezoidal Load","",0,"GZ","",[0,0.3,0.7,1],[0,-20,-50,0])
Load.Beam.create()
```

#### Concentrated Load
```py
#Concentrated Load Example
for i in range(2):
    Node(i*10,0,0)
    Node.create()

Element.Beam(1,2)
Element.create()
    
#Load Case
Load_Case("L","Test Load")
Load_Case.create()

#Apply Concentrated Load

Load.Beam(1,"Test Load","",0,"GZ",1,[0.3,0.5,0.7],[-20,-30,-40],"BEAM","CONLOAD")
Load.Beam.create()
```

#### Load with Eccentricity
```py
#Eccentric Load Example
for i in range(2):
    Node(i*10,0,0)
    Node.create()

Element.Beam(1,2)
Element.create()
    
#Define Load Case
Load_Case("L","Test Load")
Load_Case.create()

# Apply Load with 2.5 m eccentricity at i-end

Load.Beam(1, "Test Load","", -100, use_ecc=True, ieccn=2.5)
Load.Beam.create()
```

#### Concentrated Moment/Torsion
```py
#Concentrated Moment/Torsion Example
for i in range(2):
    Node(i*10,0,0)
    Node.create()

Element.Beam(1,2)
Element.create()
    
#Define Load Case
Load_Case("L","Test Load")
Load_Case.create()

# Apply Concentrated Moment/Torsion

Load.Beam(1,"Test Load","",0,"GZ","",[0.3,0.7],[-20,-50],"BEAM","CONMOMENT")
Load.Beam.create()
```

#### Uniform & Trapezoidal Moment/Torsion
```py
#Uniform & Trapezoidal Moment/Torsion Example
for i in range(3):
    Node(i*10,0,0)
    Node.create()

Element.Beam(1,2)
Element.Beam(2,3)
Element.create()
    
#Define Load Case
Load_Case("L","Test Load 1","Test Load 2")
Load_Case.create()

#Uniform Moment/Torsion

Load.Beam(1,"Test Load 1","",0,"GZ","",[0,1],[-20,-20],"BEAM","UNIMOMENT")

#Trapezoidal Moment/Torsion

Load.Beam(2,"Test Load 2","",0,"GZ","",[0.3,0.7],[-30,-50],"BEAM","UNIMOMENT")
Load.Beam.create()
```
