# Boundary Change Assignment

A class for managing Boundary Change Assignment.

## Constructor
---
**<font color="green">`BoundaryChangeAssignment(bSPT = False, bSPR = False, bGSPR = False, bCGLINK = False, bSSSF = False, bPSSF = False, bRLS = False, bWSSF = False, bESSF = False, bCDOF = False, vBOUNDARY = None, ST_load_assignments = None, MV = None, SM = None, THRSEV = None, PO = None, THNS = None, ULAT = None)`</font>**

Creates a boundary change assignment for managing boundary conditions and load analysis settings. Command: `/db/bcct`

### Parameters

#### Support Options
* `bSPT (default=False)`: Support
* `bSPR (default=False)`: Point Spring Support  
* `bGSPR (default=False)`: General Spring Support
* `bCGLINK (default=False)`: Change General Link Property
* `bSSSF (default=False)`: Section Stiffness Scale Factor
* `bPSSF (default=False)`: Plate Stiffness Scale Factor
* `bRLS (default=False)`: Beam End Release
* `bWSSF (default=False)`: Wall Stiffness Scale Factor
* `bESSF (default=False)`: Element Stiffness Scale Factor
* `bCDOF (default=False)`: Constrain DOF associated with specified displacements/Settlements by boundary group combinations

#### Boundary Settings
* `vBOUNDARY (default=None)`: List of boundary assignments in format `[["L1", "BG2"], ["L2", "BG1"]]`

#### Load Analysis Settings
* `ST_load_assignments (default=None)`: List of ST type load cases with BGCNAME assignments in format `[["Self-weight", "L1"], ["SIDL", "UNCHANGED"]]`

#### Load Analysis Settings for Other Types
* `MV (default=None)`: Boundary group name for Moving Load analysis
* `SM (default=None)`: Boundary group name for Settlement analysis  
* `THRSEV (default=None)`: Boundary group name for Time History Response Spectrum Envelope analysis
* `PO (default=None)`: Boundary group name for Pushover analysis
* `THNS (default=None)`: Boundary group name for Time History Nonlinear Static analysis
* `ULAT (default=None)`: Boundary group name for User Defined Load analysis

### Object Attributes
* `ID` (int): The ID of the boundary change assignment (always 1).
* `bSPT` (bool): Support setting.
* `bSPR` (bool): Point Spring Support setting.
* `bGSPR` (bool): General Spring Support setting.
* `bCGLINK` (bool): Change General Link Property setting.
* `bSSSF` (bool): Section Stiffness Scale Factor setting.
* `bPSSF` (bool): Plate Stiffness Scale Factor setting.
* `bRLS` (bool): Beam End Release setting.
* `bWSSF` (bool): Wall Stiffness Scale Factor setting.
* `bESSF` (bool): Element Stiffness Scale Factor setting.
* `bCDOF` (bool): Constrain DOF setting.
* `vBOUNDARY` (list): Processed boundary data in JSON structure format.
* `vLOADANAL` (list): Processed load analysis data combining user input with system load cases.

### Class Attributes
* `data` (list): Static list containing all BoundaryChangeAssignment instances.

## Examples
---
```py
# Basic boundary change assignment
BoundaryChangeAssignment(
    bSPT=True,
    bCDOF=True,
    vBOUNDARY=[["L1", "BG2"], ["L2", "BG1"]],
    ST_load_assignments=[["Self-weight", "L1"]],
    MV="L1"
)

# Complex assignment with multiple load types
BoundaryChangeAssignment(
    bSPT=True,
    bSPR=False,
    bGSPR=False,
    vBOUNDARY=[["L1", "BG2"], ["L2", "BG1"]],
    ST_load_assignments=[["Self-weight", "L1"], ["SIDL", "L2"]],
    MV="L1",
    SM="L2",
    THRSEV="L1"
)

# Assignment with multiple support options
BoundaryChangeAssignment(
    bSPT=True,
    bSPR=True,
    bGSPR=True,
    bCDOF=True,
    vBOUNDARY=[["Construction1", "BoundaryGroup1"], ["Construction2", "BoundaryGroup2"]],
    ST_load_assignments=[["Dead Load", "Construction1"], ["Live Load", "Construction2"]],
    MV="Construction1",
    SM="UNCHANGED",
    PO="Construction2"
)

```