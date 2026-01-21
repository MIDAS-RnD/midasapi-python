# PSC Sections

A nested class within Section used to create Prestressed Concrete sections.

## PSC Box Section (1-Cell, 2-Cell)
---
#### Constructor
**<font color="green">`Section.PSC.CEL12(Name='', Shape='1CEL', Joint=[0,0,0,0,0,0,0,0], HO1=0, HO2=0, HO21=0, HO22=0, HO3=0, HO31=0, BO1=0, BO11=0, BO12=0, BO2=0, BO21=0, BO3=0, HI1=0, HI2=0, HI21=0, HI22=0, HI3=0, HI31=0, HI4=0, HI41=0, HI42=0, HI5=0, BI1=0, BI11=0, BI12=0, BI21=0, BI3=0, BI31=0, BI32=0, BI4=0, Offset:Offset=Offset.CC(), useShear=True, use7Dof=False, id=None)`</font>**

Creates PSC 1-cell or 2-cell box sections.

#### Parameters
* `Name`: Section name
* `Shape (default='1CEL')`: Section shape ('1CEL' or '2CEL')
* `Joint`: List of 8 joint connectivity values [JO1, JO2, JO3, JI1, JI2, JI3, JI4, JI5]
* `HO1, HO2, HO21, HO22, HO3, HO31`: Outer cell height parameters
* `BO1, BO11, BO12, BO2, BO21, BO3`: Outer cell width parameters
* `HI1-HI5, HI21, HI22, HI31, HI41, HI42`: Inner cell height parameters
* `BI1, BI11, BI12, BI21, BI3, BI31, BI32, BI4`: Inner cell width parameters
* `Offset (default=Offset.CC())`: Section offset parameters
* `useShear (default=True)`: Enable shear deformation
* `use7Dof (default=False)`: Enable warping effect
* `id (default=None)`: Section ID


### Object Attributes

* `ID` (int): Section ID.
* `NAME` (str): Section name.
* `SHAPE` (str): Section shape, '1CEL' or '2CEL'.
* `TYPE` (str): Type of section, defaults to 'PSC'.
* `JO1` to `JI5` (bool): Joint connectivity.
* `OFFSET` (Offset): An `Offset` object defining the section's offset.
* `USESHEAR` (bool): Flag to indicate if shear deformation is considered.
* `USE7DOF` (bool): Flag to indicate if warping effect (7th DOF) is considered.
* `HO1, HO2, HO21, HO22, HO3, HO31` (float): Outer dimensions of the section.
* `BO1, BO11, BO12, BO2, BO21, BO3` (float): Outer dimensions of the section.
* `HI1, HI2, HI21, HI22, HI3, HI31, HI4, HI41, HI42, HI5` (float): Inner dimensions of the section.
* `BI1, BI11, BI12, BI21, BI3, BI31, BI32, BI4` (float): Inner dimensions of the section.

#### Examples    

##### PSC Cell Sections (1-Cell, 2-Cell) Section
```py
# PSC Example
for i in range(2):
    Node(i * 10, 0, 0)
    Node.create()

Element.Beam(1, 2)
Element.create()

# Create PSC Box Section
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
    id=1
)
Section.create()

```

## PSC I-Section
---
#### Constructor
**<font color="green">`Section.PSC.I(Name='', Symm=True, Joint=[0,0,0,0,0,0,0,0,0], H1=0, HL1=0, HL2=0, HL21=0, HL22=0, HL3=0, HL4=0, HL41=0, HL42=0, HL5=0, BL1=0, BL2=0, BL21=0, BL22=0, BL4=0, BL41=0, BL42=0, HR1=0, HR2=0, HR21=0, HR22=0, HR3=0, HR4=0, HR41=0, HR42=0, HR5=0, BR1=0, BR2=0, BR21=0, BR22=0, BR4=0, BR41=0, BR42=0, Offset:Offset=Offset.CC(), useShear=True, use7Dof=False, id=None)`</font>**

Creates PSC I-sections with symmetric or asymmetric flanges.

#### Parameters
* `Name`: Section name
* `Symm (default=True)`: Symmetric section flag
* `Joint`: List of 9 joint connectivity values
* `H1`: Web height
* `HL1-HL5, HL21, HL22, HL41, HL42`: Left flange parameters
* `BL1-BL4, BL21, BL22, BL41, BL42`: Left flange width parameters
* `HR1-HR5, HR21, HR22, HR41, HR42`: Right flange parameters (used when Symm=False)
* `BR1-BR4, BR21, BR22, BR41, BR42`: Right flange width parameters (used when Symm=False)
* `Offset (default=Offset.CC())`: Section offset parameters
* `useShear (default=True)`: Enable shear deformation
* `use7Dof (default=False)`: Enable warping effect
* `id (default=None)`: Section ID

### Object Attributes

* `ID` (int): Section ID.
* `NAME` (str): Section name.
* `SHAPE` (str): Section shape, defaults to 'PSCI'.
* `TYPE` (str): Type of section, defaults to 'PSC'.
* `SYMM` (bool): Flag indicating if the section is symmetric.
* `J1, JL1, JL2, JL3, JL4` (bool): Joint connectivity flags for the left side (and right side if symmetric).
* `JR1, JR2, JR3, JR4` (bool): Joint connectivity flags for the right side (if not symmetric).
* `OFFSET` (Offset): An `Offset` object defining the section's offset.
* `USESHEAR` (bool): Flag to indicate if shear deformation is considered.
* `USE7DOF` (bool): Flag to indicate if warping effect (7th DOF) is considered.
* `H1` (float): Height parameter.
* `HL1, HL2, HL21, HL22, HL3, HL4, HL41, HL42, HL5` (float): Left flange dimensional parameters.
* `BL1, BL2, BL21, BL22, BL4, BL41, BL42` (float): Left flange dimensional parameters.
* `HR1, HR2, HR21, HR22, HR3, HR4, HR41, HR42, HR5` (float): Right flange dimensional parameters (values are mirrored from Left if `SYMM` is True, otherwise independently set).
* `BR1, BR2, BR21, BR22, BR4, BR41, BR42` (float): Right flange dimensional parameters (values are mirrored from Left if `SYMM` is True, otherwise independently set).

#### Examples

##### Symmetric PSC I-Section
```py
# Symmetric PSC I-Section Example
for i in range(2):
    Node(i*10, 0, 0)
    Node.create()

Element.Beam(1, 2)
Element.create()

# Create Symmetric PSC I-section
Section.PSC.I(
    Name="PSC_I_Symmetric",
    Symm=True,
    Joint=[0,0,0,0,0,0,0,0,0],
    HL1=0.3, HL2=0.5, HL3=1.5, HL4=0.3, HL5=0.3,
    BL1=0.3, BL2=2, BL4=2,
     Offset=Offset.CT(),  # "Center-Top" selected
    useShear=True,       # Shear deformation checkbox is selected
    use7Dof=False,       # Warping effect (7th DOF) not checked
    id=15
)
Section.create()

```



## PSC Value Section
---
#### Constructor
**`Section.PSC.I(Name: str,   OuterPolygon: list,   InnerPolygon: list = [],       Offset: Offset = Offset.CC(),     useShear: bool = True,     use7Dof: bool = False,   id: int = 0):`**

Creates PSC Value section based on section co-ordinates.

#### Parameters
* `Name`: Section name
* `OuterPolygon`: A list of (x, y) tuples defining the vertices of the outer boundary. The polygon does not need to be closed (the first and last points can be different).
* `InnerPolygon`: An optional list defining the inner boundary (void). It can be either a single list of (x, y) tuples for one void or a list of lists for multiple voids.
* `Offset (default=Offset.CC())`: Section offset parameters
* `useShear (default=True)`: Enable shear deformation
* `use7Dof (default=False)`: Enable warping effect
* `id (default=None)`: Section ID

### Object Attributes

* `ID` (int): Section ID.
* `NAME` (str): Section name.
* `SHAPE` (str): Section shape, defaults to 'VALUE'.
* `TYPE` (str): Type of section, defaults to 'PSC'.
* `OUTER_POLYGON` (list): A list of (x, y) tuples defining the vertices of the outer boundary.
* `N_INNER_POLYGON` (int): Number of Voids in the section
* `INNER_POLYGON` (list): It can be either a single list of (x, y) tuples for one void or a list of lists for multiple voids.

* `OFFSET` (Offset): An `Offset` object defining the section's offset.
* `USESHEAR` (bool): Flag to indicate if shear deformation is considered.
* `USE7DOF` (bool): Flag to indicate if warping effect (7th DOF) is considered.
#### Examples

##### PSC Value (PSC Box Example)
```py
# PSC Value section 
Element.Beam.SDL([0,0,0],[1,0,0],10,10)

# Outer polygon shape
n_points = [
    (0,1),(3,1),(3,0.8),(2,0.8),(1.5,0.7),(1,0),(0.9,-0.1),(0.56,-0.19),(0,-0.2),
    (-0.56,-0.19),(-0.9,-0.1),(-1,0),(-1.5,0.7),(-2,0.8),(-3,0.8),(-3,1)
]

# Inner Hole
holl_point = [
    (0,0.8),(1,0.8),(1,0.5),(0.7,0.1),(0.5,0),(0,0),
    (-0.5,0),(-0.7,0.1),(-1,0.5),(-1,0.8)
]

Section.PSC.Value('PSC BOX test',n_points,holl_point,Offset=Offset('CT'))

Model.create()

```