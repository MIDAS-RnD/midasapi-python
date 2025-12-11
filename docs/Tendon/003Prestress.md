# Tendon Prestress

Defines a prestress load to be applied to a tendon profile.


## Constructor
---
**`Tendon.Prestress(profile_name, load_case, load_group = "", prestress_type = "STRESS", jack_step = "BEGIN", jack_begin = 0, jack_end=0, grouting_stage = 0, id = None):`**


Creates a tendon prestress loading

### Parameters
- `profile_name` (str) : The name of the target tendon profile to which the load will be applied.	-
- `load_case`(str) : The name of the load case for this prestress load.   
&emsp;&emsp;&emsp;&emsp;If a Load_Case with this name doesn't exist, a new one of type "PS" (Prestress) will be created automatically.
- `load_group`	(str, optional) : The name of the load group.   
&emsp;&emsp;&emsp;&emsp;If a non-empty string is provided and the group doesn't exist, it will be created automatically.
- `prestress_type`	(str , default = 'STRESS') : The type of the jacking value. Accepted values are:   
&emsp;&emsp;&emsp;&emsp;
1 : 'STRESS' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
2 : 'FORCE'   
- `jack_step` (str, default = 'BEGIN') : Defines the location of the jacking application. Accepted values are:   
&emsp;&emsp;&emsp;&emsp;
1 : 'BEGIN' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
2 : 'END'  <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
2 : 'BOTH'    
- `jack_begin` (float) : The stress or force value applied at the beginning of the tendon.
- `jack_end` (float) :	The stress or force value applied at the end of the tendon.
- `grouting_stage` (int) : The construction stage number after which grouting is applied. A value of 0 signifies that grouting is applied in same stage.
- `id` (int, default=None): ID of tendon prestress load. If None, an ID is automatically generated.



### Object Attributes
- `ID` (int): The unique ID of this specific prestress load.
- `TDN_ID` (int): The ID of the tendon.
- `TDN_NAME` (str): The name of the tendon profile.
- `LCNAME` (str): The name of the load case.
- `LDGR` (str): The name of the load group.
- `TYPE` (str): The prestress type ('STRESS' or 'FORCE').
- `ORDER` (str): The jacking order ('BEGIN', 'END', or 'BOTH').
- `JACK_BEGIN` (float): The jacking value at the beginning.
- `JACK_END` (float): The jacking value at the end.
- `GROUTING` (int): The grouting stage.


#### Class Attributes
*Tendon.Prestress.loads* -> List of all tendon prestress load defined.

```py
Tendon.Prestress('TendonProfile_2','TEST',jack_begin=150)
Tendon.Prestress('TendonProfile_2','PresLoadCase','PrestressGroup','STRESS','BOTH',1200,1400,1)
Tendon.Prestress('TendonProfile_3','PresLoadCase','PrestressGroup','STRESS','BOTH',1200,1400,1)

for load in Tendon.Prestress.loads:
    print(f' TENDON NAME => {load.TDN_NAME}   |   LOADING TYPE =>  {load.TYPE}   | ')

# OUTPUT :
#  TENDON NAME => TendonProfile_2   |   LOADING TYPE =>  STRESS   |
#  TENDON NAME => TendonProfile_2   |   LOADING TYPE =>  STRESS   |
#  TENDON NAME => TendonProfile_3   |   LOADING TYPE =>  STRESS   |

```


## Methods
---
#### json
Returns a JSON representation of all Tendon Prestress loads defined in python.

```py
Tendon.Prestress('TendonProfile_2','PresLoadCase','PrestressGroup','STRESS','BOTH',1200,1400,1)
print(Tendon.Profile.json())

```

#### create
Sends the current tendon prestress load defined to the Civil NX using a PUT request.   

```py
Tendon.Prestress('TendonProfile_2','PresLoadCase','PrestressGroup','STRESS','BOTH',1200,1400,1)
Tendon.Prestress.create()
```

#### get
Fetches tendon prestress load data from the Civil NX and return the JSON representation.

```py
print(Tendon.Prestress.get())
```

#### sync
Retrieves Tendon prestress load data from the Civil NX and rebuilds the internal tendon prestress loads list.

```py
Tendon.Prestress.sync()
```

#### delete
Deletes all tendon prestress loading from both Python and Civil NX.

```py
Tendon.Prestress.delete()
```






![alt text](../assets/separator.png)
## Examples
---
```py
from midas_civil import *
import math

Material.STEEL('Tendon_Material','IS(S)','Fe490',50)
tdn_relax = Tendon.Relaxation.Null(1880,1580)
Tendon.Property('TD1',2,50,120,150,tdn_relax)

Element.Beam.SDL([0,0,0],[1,0,0],10000,20)

for i in range(6):
    prof_xyz = []
    for j in range(21):
        q = i+j
        prof_xyz.append([10000*j/20,500*math.sin(q),500*math.cos(q)])
    Tendon.Profile(f'TendonProfile_{i+1}',1,0,list(range(1,21)),'3D','SPLINE',prof_xyz=prof_xyz)


Tendon.Prestress('TendonProfile_2','TEST',jack_begin=150)
Tendon.Prestress('TendonProfile_2','PresLoadCase','PrestressGroup','STRESS','BOTH',1200,1400,1)
Tendon.Prestress('TendonProfile_3','PresLoadCase','PrestressGroup','STRESS','BOTH',1200,1400,1)

Model.create()

```





