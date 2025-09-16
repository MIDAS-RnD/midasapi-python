# Main Control Data

A nested class within AnalysisControl used to create main control data for analysis settings.

## Constructor
---
**<font color="green">`AnalysisControl.MainControlData(ardc = True, anrc = True, iter = 20, tol = 0.001, csecf = False, trs = True, crbar = False, bmstress = False, clats = False)`</font>**

Creates main control data for analysis control settings.

### Parameters
* `ardc (default=True)`: Auto Rotational DOF Constraint for Truss/Plane Stress/Solid Elements
* `anrc (default=True)`: Auto Normal Rotation Constraint for Plate Elements  
* `iter (default=20)`: Number of Iterations/Load Case (required)
* `tol (default=0.001)`: Convergence Tolerance (required)
* `csecf (default=False)`: Consider Section Stiffness Scale Factor for Stress Calculation
* `trs (default=True)`: Transfer Reactions of Slave Node to the Master Node
* `crbar (default=False)`: Consider Reinforcement for Section Stiffness Calculation
* `bmstress (default=False)`: Calculate Equivalent Beam Stresses (Von-Mises and Max-Shear)
* `clats (default=False)`: Change Local Axis of Tapered Section for Force/Stress Calculation

### Object Attributes
* `ID` (int): The ID of the main control data entry (always 1).
* `ARDC` (bool): Auto Rotational DOF Constraint setting.
* `ANRC` (bool): Auto Normal Rotation Constraint setting.
* `ITER` (int): Number of iterations per load case.
* `TOL` (float): Convergence tolerance value.
* `CSECF` (bool): Section stiffness scale factor consideration.
* `TRS` (bool): Transfer reactions setting.
* `CRBAR` (bool): Reinforcement consideration setting.
* `BMSTRESS` (bool): Equivalent beam stresses calculation setting.
* `CLATS` (bool): Local axis change for tapered sections setting.

## Examples
---
```py
# Basic control data with default parameters
AnalysisControl.MainControlData(iter=20, tol=0.001)

# Control data with multiple options enabled
AnalysisControl.MainControlData(
    ardc=True,
    anrc=True, 
    iter=30,
    tol=0.0005,
    csecf=True,
    trs=True,
    crbar=True,
    bmstress=True,
    clats=False
)

# High precision analysis settings
AnalysisControl.MainControlData(
    iter=50,
    tol=0.00001,
    bmstress=True
)
```