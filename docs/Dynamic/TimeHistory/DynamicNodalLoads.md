# Dynamic Nodal Loads
A nested class within TimeHistory used to apply time-dependent external loads to specific structural nodes by assigning predefined time forcing functions. This is frequently used to simulate transient forces or to consider the effects of moving loads.
## Constructor
---
**<font color="green">`TH.DynamicNodalLoad(Node, TH_Case, FunctionName, Direction, ArrivalTime, ScaleFactor, id=None)`</font>**
Constructs a Dynamic Nodal Load assignment object, linking a predefined time forcing function to one or more specific nodes in the structure.
### Parameters
* `Node`: Node ID (integer) or a list/tuple of Node IDs to which the load is applied (Required)
* `TH_Case`: Target Time History Load Case (Required)
* `FunctionName`: Name of the Time Forcing Function (must be a "Force" or "Moment" type) (Required)
* `Direction`: Loading direction (e.g., `'X'`, `'Y'`, or `'Z'` for GCS directions) (Required)
* `ArrivalTime`: Delay time before the time forcing function is applied (Required)
* `ScaleFactor`: Scale factor for the time forcing function (Required)
* `id (default=None)`: Load assignment ID (auto-generated if None)
### Object Attributes
* `NODE` (int or list): The node ID(s) where the dynamic load is applied.
* `TH_Case` (str): The name of the Time History Load Case.
* `FUNCTION_NAME` (str): The name of the assigned time forcing function.
* `DIRECTION` (str): The direction of the applied load.
* `ARRIVAL_TIME` (float): The arrival (delay) time.
* `SCALE_FACTOR` (float): The scale factor applied to the load.
* `ID` (int): The ID of the dynamic nodal load entry.
## Methods
---
#### json
Returns JSON representation of all dynamic nodal loads.
```py
dnl1 = TH.DynamicNodalLoad(101, "TH_1", "FUNC_FORCE", "X", 0.0, 1.0)
print(TH.DynamicNodalLoad.json())
```
#### create
Sends dynamic nodal loads to Civil NX.
```py
TH.DynamicNodalLoad.create()
```
#### get
Fetches dynamic nodal loads from Civil NX.
```py
print(TH.DynamicNodalLoad.get())
```
#### sync
Synchronizes dynamic nodal loads from Civil NX.
```py
TH.DynamicNodalLoad.sync()
```
#### delete
Deletes all dynamic nodal loads from both Python and Civil NX.
```py
TH.DynamicNodalLoad.delete()
```
## Examples
---
```py
# Dynamic Nodal Load Example
# Note: Ensure the Time History Load Case and Time History Functions are created first
# 1. Applying a time forcing function to a single node in the GCS X-direction
TH.DynamicNodalLoad(
    Node=101, 
    TH_Case="TH_1", 
    FunctionName="FUNC_FORCE", 
    Direction="X", 
    ArrivalTime=0.0, 
    ScaleFactor=1.0
)
# 2. Applying a load to multiple nodes simultaneously using a list
TH.DynamicNodalLoad(
    Node=[102, 103, 104], 
    TH_Case="TH_1", 
    FunctionName="FUNC_FORCE", 
    Direction="Z", 
    ArrivalTime=0.5, 
    ScaleFactor=1.5
)
# Push the data to MIDAS Civil NX
TH.DynamicNodalLoad.create()
```