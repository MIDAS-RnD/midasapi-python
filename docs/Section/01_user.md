# Standard Section

A nested class within Section used to create user-defined standard sections.

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





### Constructor
**<font color="green">`Section.DBUSER(Name='', Shape='', parameters:list=[], Offset:Offset=Offset.CC(), useShear=True, use7Dof=False, id:int=0)`</font>**

Creates user-defined sections with specified shape and parameters.

### Parameters
* `Name`: Section name
* `Shape`: Section shape code ('SB', 'SR', etc.)
* `parameters`: List of section parameters
* `Offset (default=Offset.CC())`: Section offset parameters
* `useShear (default=True)`: Enable shear deformation
* `use7Dof (default=False)`: Enable warping (7DOF)
* `id (default=0)`: Section ID (auto-assigned if 0)

### Object Attributes
* `ID` (int): Section ID.
* `NAME` (str): Section name.
* `TYPE` (str): Type of section, defaults to 'DBUSER'.
* `SHAPE` (str): Shape code for the section (e.g., 'SB', 'SR').
* `PARAMS` (list): List of dimensional parameters defining the section's geometry.
* `OFFSET` (Offset): An `Offset` object defining the section's offset.
* `USESHEAR` (bool): Flag to indicate if shear deformation is considered (True/False).
* `USE7DOF` (bool): Flag to indicate if warping effect (7th Degree of Freedom) is considered (True/False).
* `DATATYPE` (int): Data type for the section, defaults to 2 for standard user-defined sections.

### Examples
```py
# Rectangular Section Example
for i in range(2):
    Node(i*10, 0, 0)
    Node.create()

Element.Beam(1, 2)
Element.create()

# Create rectangular section
Section.DBUSER("Rect_1x0.5", "SB", [1.0, 0.5])
Section.create()
```

```py
# Circular Section with Custom Offset Example
for i in range(2):
    Node(i*10, 0, 0)
    Node.create()

Element.Beam(1, 2)
Element.create()

# Create circular section with center-top offset
Section.DBUSER("Circle_D1", "SR", [1.0], Offset.CT(), True, False, 5)
Section.create()
```
