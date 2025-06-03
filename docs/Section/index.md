# Section
The module provides functionality to create, manage, and synchronize various types of cross-sections (User-defined, PSC, and Composite sections) in the model.

!!! info "Note."
    All the codes below assumes the initial import and MAPI Key definition.

```py
from midas_civil import *
MAPI_KEY('eyJ1ciI6InN1bWl0QG1pZGFzaXQuY29tIiwicGciO252k81571d')
```

## Section

The Section class provides a unified interface to create different types of cross-sections and includes nested classes for specific section types.

### Class Attributes
*Section.sect* -> List of all sections.   

### Methods

#### create
Creates all defined sections (User-defined, PSC, and Composite sections) in Civil NX.

```py
Section.create()
```

#### json
Returns a JSON representation of all Sections defined in python.

```py
s1 = Section.DBUSER("Rect1", "SB", [1.0, 0.5])
s2 = Section.PSC.I("PSC_I1", True, [0,0,0,0,0,0,0,0,0], 2.0)

print(Section.json())

# Output:
# {'Assign': {1: {'SECTTYPE': 'DBUSER', 'SECT_NAME': 'Rect1', ...}, 2: {'SECTTYPE': 'PSC', 'SECT_NAME': 'PSC_I1', ...}}}
```

#### get
Fetches sections from Civil NX and returns the JSON representation.

```py
print(Section.get())
# Output
# {'SECT': {'1': {'SECTTYPE': 'DBUSER', 'SECT_NAME': 'Rect1', ...}, '2': {'SECTTYPE': 'PSC', 'SECT_NAME': 'PSC_I1', ...}}}
```

#### sync
Retrieves Section data from Civil NX and rebuilds the internal section list.

```py
Section.sync()
for sect in Section.sect:
    print(f'Section: {sect.NAME} | Type: {sect.TYPE}')
```

#### delete
Deletes all section data from both Python and Civil NX.

```py
Section.delete()
```



## Offset

### Constructor
To create section offset parameters, use the Offset constructor.

**<font color="green">`Offset(OffsetPoint='CC', CenterLocation=0, HOffset=0, HOffOpt=0, VOffset=0, VOffOpt=0, UsrOffOpt=0)`</font>**

Creates offset parameters for sections with specified reference point and offset values.

#### Parameters
* `OffsetPoint (default='CC')`: Offset reference point ('CC', 'CT', etc.)
* `CenterLocation (default=0)`: Center location parameter
* `HOffset (default=0)`: Horizontal offset value
* `HOffOpt (default=0)`: Horizontal offset option
* `VOffset (default=0)`: Vertical offset value
* `VOffOpt (default=0)`: Vertical offset option
* `UsrOffOpt (default=0)`: User offset option

```py
# Create center-center offset
offset_cc = Offset.CC()

# Create center-top offset
offset_ct = Offset.CT()

# Create custom offset
custom_offset = Offset('CC', 0, 2.5, 0, 1.0, 0, 0)
```

---




#### Examples
```py
# Composite Steel I-Section Example
for i in range(2):
    Node(i*10, 0, 0)
    Node.create()

Element.Beam(1, 2)
Element.create()

# Create composite steel I-section
Section.Composite.SteelI_Type1(
    Name="Composite_Steel_I",
    Bc=3, tc=0.25,  # Slab parameters
    Hw=2, B1=2.5, tf1=0.2, # Steel I parameters
    tw=0.2, B2=2.5, tf2=0.2,  
    EsEc=6.39, DsDc=3.0792, Ps=0.3, Pc=0.2, TsTc=1.2,
    
    # Offset and effects
    Offset=Offset.CT(),
    useShear=True,
    use7Dof=False,
    id=13
)
Section.create()
```

## Complete Example

```py
from midas_civil import *

MAPI_KEY("eyJ1ciI6IklOMjQwN0ZZVDIiLCJwZyI6ImNpdmlsIiwi")  # Paste your MAPI Key

# Create nodes and elements
for i in range(6):
    Node(i*10, 0, 0)
    Node.create()

for i in range(5):
    Element.Beam(i+1, i+2)
    Element.create()

# Create various section types

# 1. User-defined rectangular section
Section.DBUSER("Rect_1x0.5", "SB", [1.0, 0.5])

# 2. PSC 1-cell section
Section.PSC.CEL12(
    Name="PSC Box",
    Shape="1CEL",
    Joint=[1, 0, 0, 1, 0, 1, 0, 1],

    HO1=0.2,
    HO2=0.3,
    HO22=0.5,
    HO3=2.5,

    BO1=1.5,
    BO11=0.5,
    BO2=0.5,
    BO3=2.25,

    HI1=0.24,
    HI2=0.26,
    HI3=2.05,
    HI31=0.71,
    HI4=0.2,
    HI5=0.25,

    BI1=2.2,
    BI11=0.7,
    BI21=2.2,
    BI3=1.932,
    BI31=0.7,

    Offset=Offset.CT(),  # "Center-Top" selected
    useShear=True,       # Shear deformation checkbox is selected
    use7Dof=False,       # Warping effect (7th DOF) not checked
    id=2
)

# 3. PSC I-section (symmetric)
Section.PSC.I(
    Name="PSC_I_Symmetric",
    Symm=True,
    Joint=[0,0,0,0,0,0,0,0,0],
    HL1=0.3, HL2=0.5, HL3=1.5, HL4=0.3, HL5=0.3,
    BL1=0.3, BL2=2, BL4=2,
     Offset=Offset.CT(),  # "Center-Top" selected
    useShear=True,       # Shear deformation checkbox is selected
    use7Dof=False,       # Warping effect (7th DOF) not checked
    id=3
)

# 4. Composite PSC I-section
Section.Composite.PSCI(
    Name="Composite_PSC_I",
    Symm=True,  # Symmetrical section
    Joint=[0, 0, 0, 0, 0, 0, 0, 0, 0],  # Joint 

    # slab parameters
    Bc=3,
    tc=0.225,
    Hh=0,


    # Girder parameters
    HL1=0.15,
    HL2=0.1,
    HL3=1.43,
    HL4=0.12,
    HL5=0.3,

    BL1=0.14,
    BL2=0.425,
    BL4=0.375,
  

    # Material properties
    EgdEsb=1.06922,     # Elastic modulus ratio (girder/slab)
    DgdDsb=1.0,     # Density ratio
    Pgd=0.2,        # Poisson's ratio (girder)
    Psb=0.2,        # Poisson's ratio (slab)
    TgdTsb=1.0,     # Thermal expansion coefficient ratio

    # Time-dependent properties
    MultiModulus=False,

    # Offset and effects
    Offset=Offset.CT(),
    useShear=True,
    use7Dof=False,
    id=4
)
Section.create()

# 5. Composite steel I-section
Section.Composite.SteelI_Type1(
    Name="Composite_Steel_I",
    Bc=3, tc=0.25,  # Slab parameters
    Hw=2, B1=2.5, tf1=0.2, # Steel I parameters
    tw=0.2, B2=2.5, tf2=0.2,  
    EsEc=6.39, DsDc=3.0792, Ps=0.3, Pc=0.2, TsTc=1.2,
    
    # Offset and effects
    Offset=Offset.CT(),
    useShear=True,
    use7Dof=False,
    id=5
)

# Create all sections in Civil NX
Section.create()

print("Sections created successfully!")
```