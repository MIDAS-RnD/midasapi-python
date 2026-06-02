# Tapered Section

A nested class within Section used to create tapered sections.



## DB-User

Some common user defined section's Shape notation is givn below:


| NAME	 |	SHAPE	|	DIMENSION VALUE                      |
|--------|-------|-------|
| Angle	|	"L"	|	[H, B, tw, tf]                               |
| Channel	|	"C"	|	[H, B1, tw, tf1, B2, tf2, r1, r2]        |
| H/I-Section	|	"H"	|	[H, B1, tw, tf1, B2, tf2, r1, r2]    |
| T-Section	|	"T"	|	[H, B, tw, tf]                           |
| Box	|	"B"	|	[H, B, tw, tf1, C, tf2]                      |
| Pipe	|	"P"	|	[D, tw]                                      |
| Double Angle	|	"2L"	|	[H, B, tw, tf, C]                |
| Double Channel	|	"2C"	|	[H, B, tw, tf, C]            |
| Solid Rectangle	|	"SB"	|	[H, B]                       |
| Solid Round	|	"SR"	|	[D]                              |



Details of all available sections can be found [here](https://support.midasuser.com/hc/en-us/articles/35809067039513-Section-Properties-DB-User).



#### Constructor
---
**<font color="green">`Section.Tapered.DBUSER(Name = '', Shape = '', params_I = [], params_J = [],
                   Offset = Offset(), useShear = True, use7Dof: bool = False, id: int = None)`</font>**

Creates user-defined sections with specified shape and parameters.

#### Parameters
* `Name`: Section name
* `Shape`: Section shape code ('SB', 'SR', etc.)   
* `params_I`: List of section parameters of I-End   
* `params_J`: List of section parameters of I-End    
* `Offset (default=Offset.CC())`: Section offset parameters   
* `useShear (default=True)`: Enable shear deformation   
* `use7Dof (default=False)`: Enable warping (7DOF)   
* `id (default=None)`: Section ID (auto-assigned if None)   


### Example
```py

# RECTANGULAR TAPERED SECTIONS -----------------------
Section.Tapered.DBUSER('Tapered Rect Section','SB',[0.5,0.5],[1,0.5],Offset('CT'),id=1)
Element.Beam.SE((0,0,0),(2,0,0),sect=1)

# T TAPERED SECTIONS -----------------------
Section.Tapered.DBUSER('Tapered T Section','T',[0.5,0.5,0.01,0.01],[1,0.5,0.01,0.01],Offset('CT'),id=2)
Element.Beam.SE((0,5,0),(2,5,0),sect=2)

Node.create()
Element.create()
Section.create()
```

----



## Composite PSC-I

#### Constructor
**`Section.Tapered.Composite_PSC_I(Name='', Symm=True, Joint=[0,0,0,0,0,0,0,0,0], Bc=0, tc=0, Hh=0,
                    H1_I=0,
                    HL1_I=0, HL2_I=0, HL21_I=0, HL22_I=0, HL3_I=0, HL4_I=0, HL41_I=0, HL42_I=0, HL5_I=0,
                    BL1_I=0, BL2_I=0, BL21_I=0, BL22_I=0, BL4_I=0, BL41_I=0, BL42_I=0,
                    HR1_I=0, HR2_I=0, HR21_I=0, HR22_I=0, HR3_I=0, HR4_I=0, HR41_I=0, HR42_I=0, HR5_I=0,
                    BR1_I=0, BR2_I=0, BR21_I=0, BR22_I=0, BR4_I=0, BR41_I=0, BR42_I=0,
                    H1_J=0,
                    HL1_J=0, HL2_J=0, HL21_J=0, HL22_J=0, HL3_J=0, HL4_J=0, HL41_J=0, HL42_J=0, HL5_J=0,
                    BL1_J=0, BL2_J=0, BL21_J=0, BL22_J=0, BL4_J=0, BL41_J=0, BL42_J=0,
                    HR1_J=0, HR2_J=0, HR21_J=0, HR22_J=0, HR3_J=0, HR4_J=0, HR41_J=0, HR42_J=0, HR5_J=0,
                    BR1_J=0, BR2_J=0, BR21_J=0, BR22_J=0, BR4_J=0, BR41_J=0, BR42_J=0,
 EgdEsb=0, DgdDsb=0, Pgd=0, Psb=0, TgdTsb=0, MultiModulus=False, CreepEratio=0, ShrinkEratio=0, Offset:Offset=Offset.CC(), useShear=True, use7Dof=False, id=None)`**

Creates Tapered Composite PSC I-section.   

#### Parameters
* `Name`: Section name
* `Symm (default=True)`: Symmetric section flag
* `Joint`: List of 9 joint connectivity values [J1, JL1, JL2, JL3, JL4, JR1, JR2, JR3, JR4]
* `Bc, tc, Hh`: Slab parameters (width, thickness, haunch height)
    
<font color="orange">_I</font> and <font color="orange">_J</font> suffix represents the section dimensions at respective ends for the parameters below.        

* `H1`: Web height
* `HL1-HL5, BL1-BL4`: Left flange parameters
* `HR1-HR5, BR1-BR4`: Right flange parameters
    &emsp;&emsp;&emsp;&emsp;             
    &emsp;&emsp;&emsp;&emsp;

* `EgdEsb`: Modular ratio (Egirder/Eslab)
* `DgdDsb`: Density ratio (Dgirder/Dslab)
* `Pgd, Psb`: Poisson's ratios for girder and slab
* `TgdTsb`: Thermal coefficient ratio
* `MultiModulus (default=False)`: Enable multi-modulus analysis
* `CreepEratio, ShrinkEratio`: Creep and shrinkage ratios
* `Offset (default=Offset.CC())`: Section offset parameters
* `useShear (default=True)`: Enable shear deformation
* `use7Dof (default=False)`: Enable warping effect
* `id (default=None)`: Section ID (auto-assigned if None)   

### Example
```py

#  -----------------------

Element.Beam.SE((0,0,0),(2,0,0),sect=1)

Section.Tapered.Composite_PSC_I(Name="Mid-Section", Symm=True, Bc=3, tc=0.225, Hh=0,
    HL1_I=0.15, HL2_I=0.1, HL3_I=1.43, HL4_I=0.12, HL5_I=0.3, BL1_I=0.14, BL2_I=0.425, BL4_I=0.375,
    HL1_J=0.15, HL2_J=0.024, HL3_J=1.506, HL4_J=0.12, HL5_J=0.3, BL1_J=0.3749, BL2_J=0.425, BL4_J=0.375,

    EgdEsb=1.06922, DgdDsb=1.0, Pgd=0.2, Psb=0.2, TgdTsb=1.0,
    MultiModulus=False, Offset=Offset.CT(), useShear=True, use7Dof=False, id=1)

Node.create()
Element.create()
Section.create()
```

----




## PSC Box


#### Constructor
**`Section.Tapered.PSC12CEL(Name='', Shape='1CEL', Joint=[0,0,0,0,0,0,0,0], HO1_I=0,HO2_I=0,HO21_I=0,HO22_I=0,HO3_I=0,HO31_I=0, BO1_I=0,BO11_I=0,BO12_I=0,BO2_I=0,BO21_I=0,BO3_I=0,  HI1_I=0,HI2_I=0,HI21_I=0,HI22_I=0,HI3_I=0,HI31_I=0,HI4_I=0,HI41_I=0,HI42_I=0,HI5_I=0,  BI1_I=0,BI11_I=0,BI12_I=0,BI21_I=0,BI3_I=0,BI31_I=0,BI32_I=0,BI4_I=0, HO1_J=0,HO2_J=0,HO21_J=0,HO22_J=0,HO3_J=0,HO31_J=0,   BO1_J=0,BO11_J=0,BO12_J=0,BO2_J=0,BO21_J=0,BO3_J=0,  HI1_J=0,HI2_J=0,HI21_J=0,HI22_J=0,HI3_J=0,HI31_J=0,HI4_J=0,HI41_J=0,HI42_J=0,HI5_J=0,  BI1_J=0,BI11_J=0,BI12_J=0,BI21_J=0,BI3_J=0,BI31_J=0,BI32_J=0,BI4_J=0, Offset=Offset.CC(), useShear=True, use7Dof=False, id=None)`**

Creates Tapered PSC 1-cell or 2-cell box sections.

#### Parameters
* `Name`: Section name
* `Shape (default='1CEL')`: Section shape ('1CEL' or '2CEL')
* `Joint`: List of 8 joint connectivity values [JO1, JO2, JO3, JI1, JI2, JI3, JI4, JI5]
    
<font color="orange">_I</font> and <font color="orange">_J</font> suffix represents the section dimensions at respective ends for the parameters below.          

* `HO1, HO2, HO21, HO22, HO3, HO31`: Outer cell height parameters
* `BO1, BO11, BO12, BO2, BO21, BO3`: Outer cell width parameters
* `HI1-HI5, HI21, HI22, HI31, HI41, HI42`: Inner cell height parameters
* `BI1, BI11, BI12, BI21, BI3, BI31, BI32, BI4`: Inner cell width parameters
    &emsp;&emsp;&emsp;&emsp;             
    &emsp;&emsp;&emsp;&emsp;

* `Offset (default=Offset.CC())`: Section offset parameters
* `useShear (default=True)`: Enable shear deformation
* `use7Dof (default=False)`: Enable warping effect
* `id (default=None)`: Section ID (auto-assigned if None)   


### Example
```py

Section.Tapered.PSC12CEL(
    Name="PSC Box Tap",
    Shape="1CEL",
    Joint=[1, 0, 0, 1, 0, 1, 0, 1],

    HO1_I=0.2,    HO2_I=0.3,    HO22_I=0.5,    HO3_I=1.5,
    BO1_I=1.5,    BO11_I=0.5,    BO2_I=0.5,    BO3_I=2.25,
    HI1_I=0.24,    HI2_I=0.26,    HI3_I=1.05,    HI31_I=0.71,    HI4_I=0.2,    HI5_I=0.25,
    BI1_I=2.2,    BI11_I=0.7,    BI21_I=2.2,    BI3_I=1.932,    BI31_I=0.7,

    HO1_J=0.2,    HO2_J=0.3,    HO22_J=0.5,    HO3_J=3.5,
    BO1_J=1.5,    BO11_J=0.5,    BO2_J=0.5,    BO3_J=2.25,
    HI1_J=0.24,    HI2_J=0.26,    HI3_J=3.05,    HI31_J=0.71,    HI4_J=0.2,    HI5_J=0.25,
    BI1_J=2.2,    BI11_J=0.7,    BI21_J=2.2,    BI3_J=1.932,    BI31_J=0.7,

    Offset=Offset.CT(),  # "Center-Top"
    useShear=True,       # Shear deformation checkbox is selected
    use7Dof=False,       # Warping effect (7th DOF) not checked
    id=1
)


Element.Beam.SE((0,0,0),(30,0,0),10,sect=1,group='Span_1A')
# - CREATING PARABOLIC TAPERING - 
Section.TaperedGroup('TG1',elemsInGroup('Span_1A'),'POLY')

Model.create()

```

----

## bySHAPE


#### Constructor
**`Section.PSC.CEL12(Name , Sect_I , Sect_J , Offset=Offset.CC(), useShear=True, use7Dof=False, id=None)`**

Creates a Tapered section by referencing defined section objects.     
The function references the previously defined section, automatically determines its type and parameters, and uses that information to create the new section.   
This is particularly useful when the I and J ends are already defined.    

#### Parameters
* `Name`: Section name
* `Sect_I`: Section object for I end.
* `Sect_J`: Section object for I end.
* `Offset (default=Offset.CC())`: Section offset parameters
* `useShear (default=True)`: Enable shear deformation
* `use7Dof (default=False)`: Enable warping effect
* `id (default=None)`: Section ID (auto-assigned if None)   


### Example
```py

# Define the mid section
mid_sect = Section.Composite.PSCI(
    Name="Mid-Section", Symm=True, 
    Bc=3, tc=0.225, Hh=0,
    HL1=0.15, HL2=0.1, HL3=1.43, HL4=0.12, HL5=0.3, 
    BL1=0.14, BL2=0.425, BL4=0.375,
    EgdEsb=1.06922, DgdDsb=1.0, Pgd=0.2, Psb=0.2, TgdTsb=1.0,
    MultiModulus=False, Offset=Offset.CT(), useShear=True, use7Dof=False, id=1
)

# Define the end section
end_sect = Section.Composite.PSCI(
    Name="End-Section", Symm=True, Bc=3, tc=0.225, Hh=0,
    HL1=0.15, HL2=0.024, HL3=1.506, HL4=0.12, HL5=0.3, BL1=0.3749, BL2=0.425, BL4=0.375,
    EgdEsb=1.18, DgdDsb=1.0, Pgd=0.2, Psb=0.2, TgdTsb=1.0,
    Offset=Offset.CT(), useShear=True, use7Dof=False, id=2
)

# To define tapered section we can either define each parameters again in Section.Tapered.Composite_PSC_I or use the Tapered.bySHAPE function to automatically create the section by referencing the previous sections.
# Example -
Section.Tapered.bySHAPE('End->Mid', end_sect, mid_sect, Offset.CT(), useShear=True, use7Dof=False, id=3)


Element.Beam.SE((0,0,0),(2,0,0),4,sect=3,group='TaperE2M')
# - CREATING TAPERED GROUP - 
Section.TaperedGroup('TG1',elemsInGroup('TaperE2M'))

Model.create()

```

----