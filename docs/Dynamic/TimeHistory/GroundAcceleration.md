# Ground Acceleration
A nested class within TimeHistory used to enter time forcing functions by means of ground acceleration.
## Constructor
---
**<font color="green">`TH.GroundAccel(TH_Case, Angle, FuncX=None, ScaleX=None, ATimeX=None, FuncY=None, ScaleY=None, ATimeY=None, FuncZ=None, ScaleZ=None, ATimeZ=None, id=None)`</font>**
Enters a time forcing function by means of ground acceleration. The applied functions must be defined as an "Acceleration" type in the Time History Functions.
### Parameters
* `TH_Case`: Time History Load Case Name (Required)
* `Angle`: Angle of Horizontal Ground Acc. Rotational angle about the GCS Z-axis signifying the direction of the horizontal component (Required)
* `FuncX`, `FuncY`, `FuncZ (default=None)`: Function Name for the ground acceleration in the GCS X, Y, or Z-direction.
* `ScaleX`, `ScaleY`, `ScaleZ (default=None)`: Scale factor for the respective ground acceleration direction.
* `ATimeX`, `ATimeY`, `ATimeZ (default=None)`: Arrival Time ("Delay" time) for the respective ground acceleration direction.
* `id (default=None)`: Ground Acceleration ID (auto-generated if None)
### Object Attributes
* `TH_Case` (str): The name of the Time History Load Case.
* `ANGLE` (float): Rotational angle about the GCS Z-axis.
* `FUNCTION_X`, `FUNCTION_Y`, `FUNCTION_Z` (str): The assigned acceleration function names for X, Y, and Z directions.
* `SCALE_X`, `SCALE_Y`, `SCALE_Z` (float): The scale factors applied to the respective directions.
* `ARRIVAL_TIME_X`, `ARRIVAL_TIME_Y`, `ARRIVAL_TIME_Z` (float): The arrival (delay) times for the respective directions.
* `ID` (int): The ID of the ground acceleration entry.
## Methods
---
#### json
Returns JSON representation of all ground acceleration loads.
```py
ga1 = TH.GroundAccel("EQ_Load", 45.0, FuncX="El_Centro", ScaleX=9.81, ATimeX=0.0)
print(TH.GroundAccel.json())
```
#### create
Sends ground acceleration data to Civil NX.
```py
TH.GroundAccel.create()
```
#### get
Fetches ground acceleration data from Civil NX.
```py
print(TH.GroundAccel.get())
```
#### sync
Synchronizes ground acceleration data from Civil NX.
```py
TH.GroundAccel.sync()
```
#### delete
Deletes all ground acceleration data from both Python and Civil NX.
```py
TH.GroundAccel.delete()
```
## Examples
---
```py
# Ground Acceleration Example
# Note: Ensure the Time History Load Case and Time History Functions (Acceleration type) are created first
# 1. Applying ground acceleration in the X and Y directions with a 45-degree angle
TH.GroundAccel(
    TH_Case="EQ_Load_Case", 
    Angle=45.0, 
    FuncX="El_Centro_X", 
    ScaleX=9.81, 
    ATimeX=0.0,
    FuncY="El_Centro_Y", 
    ScaleY=9.81, 
    ATimeY=0.0
)
# 2. Applying vertical ground acceleration (Z-direction only)
TH.GroundAccel(
    TH_Case="EQ_Load_Case_Z", 
    Angle=0.0, 
    FuncZ="El_Centro_Z", 
    ScaleZ=9.81, 
    ATimeZ=0.0
)
# Push the data to MIDAS Civil NX
TH.GroundAccel.create()
```