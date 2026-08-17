# Multiple Support Excitation
A nested class within TimeHistory used to apply different time history functions (in terms of ground acceleration) to different supports.
## Constructor
---
**<font color="green">`TH.MultipleSupportExcitation(Node, TH_Case, Angle=0.0, FuncX=None, ScaleX=None, ATimeX=0.0, FuncY=None, ScaleY=None, ATimeY=0.0, FuncZ=None, ScaleZ=None, ATimeZ=0.0, id=None)`</font>**
Creates a multiple support excitation assignment, applying time-delayed ground accelerations to specific support nodes.
### Parameters
* `Node`: Node ID (integer) or a list/tuple of Node IDs representing the supports (Required)
* `TH_Case`: Time History Load Case Name (Required)
* `Angle (default=0.0)`: Angle of Horizontal Ground Acc. Rotational angle about the GCS Z-axis signifying the direction of the horizontal component.
* `FuncX`, `FuncY`, `FuncZ (default=None)`: Function Name for the ground acceleration in the GCS X, Y, or Z-direction.
* `ScaleX`, `ScaleY`, `ScaleZ (default=None)`: Scale factor for the respective ground acceleration direction.
* `ATimeX`, `ATimeY`, `ATimeZ (default=0.0)`: Arrival Time ("Delay" time) for the respective ground acceleration direction.
* `id (default=None)`: Multiple support excitation ID (auto-generated if None)
### Object Attributes
* `Node` (int or list): The node ID(s) where the excitation is applied.
* `TH_Case` (str): The name of the Time History Load Case.
* `ANGLE` (float): Rotational angle about the GCS Z-axis.
* `FUNCTION_X`, `FUNCTION_Y`, `FUNCTION_Z` (str): The assigned acceleration function names for X, Y, and Z directions.
* `SCALE_X`, `SCALE_Y`, `SCALE_Z` (float): The scale factors applied to the respective directions.
* `ARRIVAL_TIME_X`, `ARRIVAL_TIME_Y`, `ARRIVAL_TIME_Z` (float): The arrival (delay) times for the respective directions.
* `ID` (int): The ID of the multiple support excitation entry.
## Methods
---
#### json
Returns JSON representation of all multiple support excitation loads.
```py
TH.MultipleSupportExcitation(10, "Seismic_X", FuncX="Acc_X", ScaleX=9.81, ATimeX=0.5)
print(TH.MultipleSupportExcitation.json())
```
#### create
Sends multiple support excitation data to Civil NX.
```py
TH.MultipleSupportExcitation.create()
```
#### get
Fetches multiple support excitation data from Civil NX.
```py
print(TH.MultipleSupportExcitation.get())
```
#### sync
Synchronizes multiple support excitation data from Civil NX.
```py
TH.MultipleSupportExcitation.sync()
```
#### delete
Deletes all multiple support excitation data from both Python and Civil NX.
```py
TH.MultipleSupportExcitation.delete()
```
## Examples
---
```py
# Multiple Support Excitation Example
# Note: Ensure the Time History Load Case and Time History Functions (Acceleration type) are created first
# 1. Applying excitation to a single support node with a 0.5s delay in the X direction
TH.MultipleSupportExcitation(
    Node=1001, 
    TH_Case="EQ_Multi_Support", 
    Angle=0.0, 
    FuncX="El_Centro", 
    ScaleX=1.0, 
    ATimeX=0.5
)
# 2. Applying excitation to multiple support nodes simultaneously with no delay
TH.MultipleSupportExcitation(
    Node=[2001, 2002, 2003], 
    TH_Case="EQ_Multi_Support", 
    FuncX="El_Centro", 
    ScaleX=1.0, 
    ATimeX=0.0,
    FuncY="El_Centro", 
    ScaleY=0.3, 
    ATimeY=0.0
)
# Push the data to MIDAS Civil NX
TH.MultipleSupportExcitation.create()
```