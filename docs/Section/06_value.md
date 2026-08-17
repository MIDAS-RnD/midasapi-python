# Value Section

A method within the `Section` class used to create a value section.

### Constructor
---
**<font color="green">`Section.VALUE(Name='', Shape='', parameters:list=[], Area=None, Ixx=None, Iyy=None, Izz=None, Offset=Offset(), useShear=True, use7Dof=False, id=None)`</font>**

Creates a section where the user explicitly defines the structural properties. This is highly useful when modeling custom shapes or applying modified properties to standard shapes.

### Parameters
* `Name`: Section name
* `Shape`: Section shape code (e.g., 'SB', 'H', 'B', etc., used for display purposes)
* `parameters`: List of dimensional parameters for the specified shape
* `Area`: Cross-sectional area
* `Ixx`: Torsional constant
* `Iyy`: Area moment of inertia about the local y-axis
* `Izz`: Area moment of inertia about the local z-axis
* `Offset (default=Offset.CC())`: Section offset parameters
* `useShear (default=True)`: Enable shear deformation
* `use7Dof (default=False)`: Enable warping (7DOF)
* `id (default=None)`: Section ID (auto-assigned if `None`)

### Object Attributes
* `ID` (int): Section ID.
* `NAME` (str): Section name.
* `TYPE` (str): Type of section (Value).
* `SHAPE` (str): Shape code for the section representation.
* `PARAMS` (list): List of dimensional parameters defining the section's visual geometry.
* `AREA` (float): User-defined cross-sectional area.
* `IXX` (float): User-defined torsional constant.
* `IYY` (float): User-defined moment of inertia about the y-axis.
* `IZZ` (float): User-defined moment of inertia about the z-axis.
* `OFFSET` (Offset): An `Offset` object defining the section's insertion point/offset.
* `USESHEAR` (bool): Flag to indicate if shear deformation is considered (True/False).
* `USE7DOF` (bool): Flag to indicate if warping effect (7th Degree of Freedom) is considered (True/False).

### Examples
---
```py
from midas_civil import *

# Create baseline nodes and a beam element
Node(0, 0, 0, id=1)
Node(10, 0, 0, id=2)
Node.create()

Element.Beam(1, 2)
Element.create()

# Create a Value section 
Section.VALUE(
    Name="Custom_Value_Sect", 
    Shape="SB", 
    parameters=[1.0, 1.0], 
    Area=1.0, 
    Ixx=0.141, 
    Iyy=0.0833, 
    Izz=0.0833,
    Offset=Offset.CC()
)

# Push the section definition to Civil NX
Section.create()
```