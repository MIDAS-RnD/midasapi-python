# Time Varying Static Loads
A nested class within TimeHistory used to apply static load cases as time-varying loads by associating them with time forcing functions.
## Constructor
---
**<font color="green">`TH.TimeVaryingStaticLoad(TH_Case, StaticLoadCase, FunctionName, Scale, ArrivalTime, id=None)`</font>**
Creates a time-varying static load assignment, linking a previously defined static load case to a time history forcing function.
### Parameters
* `TH_Case`: Time History Load Case Name (Required)
* `StaticLoadCase`: Name of the Static Load Case to be assigned (Required)
* `FunctionName`: Name of the Time Forcing Function (Required)
* `Scale`: Scale factor for the time-varying static load (Required)
* `ArrivalTime`: "Delay" time before the time forcing function is applied (Required)
* `id (default=None)`: Load assignment ID (auto-generated if None)
### Object Attributes
* `TH_Case` (str): The name of the Time History Load Case.
* `STATIC_LOAD_CASE` (str): The name of the applied static load case.
* `THIS_FUNCNAME` (str): The name of the time forcing function dictating the load's variation over time.
* `SCALE` (float): The scale factor applied to the static load.
* `ATIME` (float): The arrival (delay) time.
* `ID` (int): The ID of the time-varying static load entry.
## Methods
---
#### json
Returns JSON representation of all time-varying static loads.
```py
TH.TimeVaryingStaticLoad("TH_Seismic", "DeadLoad", "Ramp_Function", 1.0, 0.0)
print(TH.TimeVaryingStaticLoad.json())
```
#### create
Sends time-varying static loads to Civil NX.
```py
TH.TimeVaryingStaticLoad.create()
```
#### get
Fetches time-varying static loads from Civil NX.
```py
print(TH.TimeVaryingStaticLoad.get())
```
#### sync
Synchronizes time-varying static loads from Civil NX.
```py
TH.TimeVaryingStaticLoad.sync()
```
#### delete
Deletes all time-varying static loads from both Python and Civil NX.
```py
TH.TimeVaryingStaticLoad.delete()
```
## Examples
---
```py
# Time Varying Static Load Example
# Note: Ensure the Time History Load Case, Static Load Case, and Time History Function are created first
# 1. Applying a static Dead Load case as a time-varying load with a 1.0 scale factor and 0 delay
TH.TimeVaryingStaticLoad(
    TH_Case="TH_Linear_Analysis", 
    StaticLoadCase="DeadLoad", 
    FunctionName="Function_01", 
    Scale=1.0, 
    ArrivalTime=0.0
)
# 2. Applying a Live Load case with a delay of 2.5 seconds and a scale factor of 1.5
TH.TimeVaryingStaticLoad(
    TH_Case="TH_Linear_Analysis", 
    StaticLoadCase="LiveLoad", 
    FunctionName="Function_02", 
    Scale=1.5, 
    ArrivalTime=2.5
)
# Push the data to MIDAS Civil NX
TH.TimeVaryingStaticLoad.create()
```