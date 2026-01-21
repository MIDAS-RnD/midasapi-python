# Composite Section

A nested class within Section used to create composite sections.

## Composite PSC I-Section
---
#### Constructor
**<font color="green">`Section.Composite.PSCI(Name='', Symm=True, Joint=[0,0,0,0,0,0,0,0,0], Bc=0, tc=0, Hh=0, H1=0, HL1=0, HL2=0, HL21=0, HL22=0, HL3=0, HL4=0, HL41=0, HL42=0, HL5=0, BL1=0, BL2=0, BL21=0, BL22=0, BL4=0, BL41=0, BL42=0, HR1=0, HR2=0, HR21=0, HR22=0, HR3=0, HR4=0, HR41=0, HR42=0, HR5=0, BR1=0, BR2=0, BR21=0, BR22=0, BR4=0, BR41=0, BR42=0, EgdEsb=0, DgdDsb=0, Pgd=0, Psb=0, TgdTsb=0, MultiModulus=False, CreepEratio=0, ShrinkEratio=0, Offset:Offset=Offset.CC(), useShear=True, use7Dof=False, id=None)`</font>**

Creates composite PSC I-sections with concrete slab.

#### Parameters
* `Name`: Section name
* `Symm (default=True)`: Symmetric section flag
* `Joint`: List of joint connectivity values
* `Bc, tc, Hh`: Slab parameters (width, thickness, haunch height)
* `H1`: Web height
* `HL1-HL5, BL1-BL4`: Left flange parameters
* `HR1-HR5, BR1-BR4`: Right flange parameters
* `EgdEsb`: Modular ratio (Egirder/Eslab)
* `DgdDsb`: Density ratio (Dgirder/Dslab)
* `Pgd, Psb`: Poisson's ratios for girder and slab
* `TgdTsb`: Thermal coefficient ratio
* `MultiModulus (default=False)`: Enable multi-modulus analysis
* `CreepEratio, ShrinkEratio`: Creep and shrinkage ratios
* `Offset (default=Offset.CC())`: Section offset parameters
* `useShear (default=True)`: Enable shear deformation
* `use7Dof (default=False)`: Enable warping effect
* `id (default=None)`: Section ID


### Object Attributes

* `ID` (int): Section ID.
* `NAME` (str): Section name.
* `SHAPE` (str): Section shape, defaults to 'CI'.
* `TYPE` (str): Type of section, defaults to 'COMPOSITE'.
* `SYMM` (bool): Flag indicating if the section is symmetric.
* `BC` (float): Slab width.
* `TC` (float): Slab thickness.
* `HH` (float): Haunch height.
* `MATL_ELAST` (float): Modular ratio (Egirder/Eslab).
* `MATL_DENS` (float): Density ratio (Dgirder/Dslab).
* `MATL_POIS_S` (float): Poisson's ratio for girder.
* `MATL_POIS_C` (float): Poisson's ratio for slab.
* `MATL_THERMAL` (float): Thermal coefficient ratio.
* `USE_MULTI_ELAST` (bool): Flag for multi-modulus of elasticity.
* `LONGTERM_ESEC` (float): Creep E-ratio.
* `SHRINK_ESEC` (float): Shrinkage E-ratio.
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
```py
# Composite PSC I-Section Example
for i in range(2):
    Node(i * 10, 0, 0)
    Node.create()

Element.Beam(1, 2)
Element.create()

# Create composite PSC I-section 
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
    id=10
)
Section.create()

```

## Composite Steel I-Section
---
#### Constructor
**<font color="green">`Section.Composite.SteelI_Type1(Name='', Bc=0, tc=0, Hh=0, Hw=0, B1=0, tf1=0, tw=0, B2=0, tf2=0, EsEc=0, DsDc=0, Ps=0, Pc=0, TsTc=0, MultiModulus=False, CreepEratio=0, ShrinkEratio=0, Offset:Offset=Offset.CC(), useShear=True, use7Dof=False, id=None)`</font>**

Creates composite steel I-sections with concrete slab.

#### Parameters
* `Name`: Section name
* `Bc, tc, Hh`: Slab parameters (width, thickness, haunch height)
* `Hw`: Web height
* `B1, tf1`: Top flange width and thickness
* `tw`: Web thickness
* `B2, tf2`: Bottom flange width and thickness
* `EsEc`: Modular ratio (Esteel/Econcrete)
* `DsDc`: Density ratio (Dsteel/Dconcrete)
* `Ps, Pc`: Poisson's ratios for steel and concrete
* `TsTc`: Thermal coefficient ratio
* `MultiModulus (default=False)`: Enable multi-modulus analysis
* `CreepEratio, ShrinkEratio`: Creep and shrinkage ratios
* `Offset (default=Offset.CC())`: Section offset parameters
* `useShear (default=True)`: Enable shear deformation
* `use7Dof (default=False)`: Enable warping effect
* `id (default=None)`: Section ID


### Object Attributes

* `ID` (int): Section ID.
* `NAME` (str): Section name.
* `SHAPE` (str): Section shape, defaults to 'I'.
* `TYPE` (str): Type of section, defaults to 'COMPOSITE'.
* `BC` (float): Slab width.
* `TC` (float): Slab thickness.
* `HH` (float): Haunch height.
* `HW` (float): Steel web height.
* `B1` (float): Steel top flange width.
* `TF1` (float): Steel top flange thickness.
* `TW` (float): Steel web thickness.
* `B2` (float): Steel bottom flange width.
* `TF2` (float): Steel bottom flange thickness.
* `MATL_ELAST` (float): Modular ratio (E<sub>steel</sub>/E<sub>concrete</sub>).
* `MATL_DENS` (float): Density ratio (D<sub>steel</sub>/D<sub>concrete</sub>).
* `MATL_POIS_S` (float): Poisson's ratio for steel.
* `MATL_POIS_C` (float): Poisson's ratio for concrete.
* `MATL_THERMAL` (float): Thermal coefficient ratio.
* `USE_MULTI_ELAST` (bool): Flag for multi-modulus of elasticity.
* `LONGTERM_ESEC` (float): Creep E-ratio.
* `SHRINK_ESEC` (float): Shrinkage E-ratio.
* `OFFSET` (Offset): An `Offset` object defining the section's offset.
* `USESHEAR` (bool): Flag to indicate if shear deformation is considered.
* `USE7DOF` (bool): Flag to indicate if warping effect (7th DOF) is considered.

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

## Composite PSC Value Section
---
#### Constructor
**`Section.Composite.PSC_Value(Name: str, Bc=0, tc=0, Hh=0,  OuterPolygon: list,   InnerPolygon: list = [],  EgEs=0, DgDs=0, Pg=0, Ps=0, TgTs=0, MultiModulus=False, CreepEratio=0, ShrinkEratio=0,     Offset: Offset = Offset.CC(),     useShear: bool = True,     use7Dof: bool = False,   id: int = None):`**

Creates CompositePSC Value section based on section co-ordinates.

#### Parameters
* `Name`: Section name
* `Bc, tc, Hh`: Slab parameters (width, thickness, haunch height)
* `OuterPolygon`: A list of (x, y) tuples defining the vertices of the outer boundary. The polygon does not need to be closed (the first and last points can be different).
* `InnerPolygon`: An optional list defining the inner boundary (void). It can be either a single list of (x, y) tuples for one void or a list of lists for multiple voids.
* `EgEs`: Modular ratio (Egirder/Eslab)
* `DgDs`: Density ratio (Dgirder/Dslab)
* `Pg, Ps`: Poisson's ratios for girder and slab
* `TgTs`: Thermal coefficient ratio
* `MultiModulus (default=False)`: Enable multi-modulus analysis
* `CreepEratio, ShrinkEratio`: Creep and shrinkage ratios
* `Offset (default=Offset.CC())`: Section offset parameters
* `useShear (default=True)`: Enable shear deformation
* `use7Dof (default=False)`: Enable warping effect
* `id (default=None)`: Section ID

### Object Attributes

* `ID` (int): Section ID.
* `NAME` (str): Section name.
* `SHAPE` (str): Section shape, defaults to 'VALUE'.
* `TYPE` (str): Type of section, defaults to 'PSC'.
* `BC` (float): Slab width.
* `TC` (float): Slab thickness.
* `HH` (float): Haunch height.
* `OUTER_POLYGON` (list): A list of (x, y) tuples defining the vertices of the outer boundary.
* `N_INNER_POLYGON` (int): Number of Voids in the section
* `INNER_POLYGON` (list): It can be either a single list of (x, y) tuples for one void or a list of lists for multiple voids.
* `MATL_ELAST` (float): Modular ratio (E<sub>girder</sub>/E<sub>slab</sub>).
* `MATL_DENS` (float): Density ratio (D<sub>girder</sub>/D<sub>slab</sub>).
* `MATL_POIS_G` (float): Poisson's ratio for girder.
* `MATL_POIS_S` (float): Poisson's ratio for slab.
* `MATL_THERMAL` (float): Thermal coefficient ratio.
* `USE_MULTI_ELAST` (bool): Flag for multi-modulus of elasticity.
* `LONGTERM_ESEC` (float): Creep E-ratio.
* `SHRINK_ESEC` (float): Shrinkage E-ratio.
* `OFFSET` (Offset): An `Offset` object defining the section's offset.
* `USESHEAR` (bool): Flag to indicate if shear deformation is considered.
* `USE7DOF` (bool): Flag to indicate if warping effect (7th DOF) is considered.
#### Examples

##### Composite PSC Value (Super T Example)
```py
# Composite PSC Value section 
Element.Beam.SDL([0,0,0],[1,0,0],10,10)

# Outer polygon shape
psc_points = [
    (-1.05,0.81318),(-1.05,0.72318),(-0.6135,0.72318),(-0.506426,0.648514),
    (-0.3785,-0.70182),(0.3785,-0.70182),(0.506426,0.648514),(0.6135,0.72318),
    (1.05,0.72318),(1.05,0.81318),(0.4465,0.81318),(0.4465,0.78818),(0.419141,0.78818),
    (0.309,-0.37882),(0,-0.43682),(-0.309,-0.37882),(-0.41914,0.78818),(-0.4465,0.78818),(-0.4465,0.81318)
]


Section.Composite.PSC_Value('PSC COMPSITE VALUE',3,0.2,0,psc_points)

Model.create()

```