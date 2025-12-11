# Tendon Profile

The Profile class define and manage tendon profiles in CIVIL NX.   
It handles the geometric definition of 2D and 3D tendon profiles and their assignment to structural elements.


## Constructor
---
**`Tendon.Profile(name,tdn_prop,tdn_group=0,elem=[],inp_type='3D',curve_type = 'SPLINE',st_len_begin = 0 , st_len_end = 0,n_typical_tendon=0,                 trans_len_opt='USER', trans_len_begin = 0 , trans_len_end = 0, debon_len_begin=0 , debon_len_end=0,                 ref_axis = 'ELEMENT',                 prof_xyz = [], prof_xy =[],prof_xz=[],                 prof_ins_point_end = 'END-I', prof_ins_point_elem = 0, x_axis_dir_element = 'I-J', x_axis_rot_ang = 0 , projection = True, offset_y = 0 , offset_z = 0,                 prof_ins_point =[0,0,0], x_axis_dir_straight = 'X' , x_axis_dir_vec = [0,0], grad_rot_axis = 'X', grad_rot_ang=0,                 radius_cen = [0,0], offset = 0, dir = 'CW',                 id=None):`**


Creates a tendon profile

### Parameters
- `name` (str): The name of the tendon profile.
- `tdn_prop` (int): The property ID or object associated with the tendon.
- `tdn_group` (int, default=0): The group ID for the tendon.
- `elem` (list): A list of element IDs to which the tendon is assigned.
- `inp_type` (str, default='3D'): Input type for the profile. Accepts `'2D'` or `'3D'`.
- `curve_type` (str, default='SPLINE'): The curve type for the profile. Accepts `'SPLINE'` or `'ROUND'`.
- `st_len_begin` (float, default=0): Straight length at the beginning of the tendon.
- `st_len_end` (float, default=0): Straight length at the end of the tendon.
- `n_typical_tendon` (int, default=0): Number of typical tendons. 
- `trans_len_opt` (str, default='USER'): Transfer length option. Accepts `'USER'` or `'AUTO'`.
- `trans_len_begin` (float, default=0): Transfer length at the beginning.
- `trans_len_end` (float, default=0): Transfer length at the end.
- `debon_len_begin` (float, default=0): Debonding length at the beginning.
- `debon_len_end` (float, default=0): Debonding length at the end.
- `ref_axis` (str, default='ELEMENT'): Reference axis for the profile shape. Accepts `'ELEMENT'`, `'STRAIGHT'`, or `'CURVE'`.

##### Tendon Co-ordinates Input (when `inp_type = '3D' or '2D'`)
> - `prof_xyz` (list): List of coordinate points `[[x1, y1, z1],[x2, y2, z2]...]` for a 3D profile.
- `prof_xy` (list): List of coordinate points `[[x1, y1],[x2, y2]...]` for a 2D profile in the XY-plane.
- `prof_xz` (list): List of coordinate points `[[x1, z1],[x2, z2]...]` for a 2D profile in the XZ-plane.
---
##### Element Shape Parameters (when `ref_axis = 'ELEMENT'`)
> - `prof_ins_point_end` (str, default='END-I'): Insertion point end reference. Accepts `'END-I'` or `'END-J'`.
- `prof_ins_point_elem` (int): Insertion element ID. Defaults to the first element in the `elem` list.
- `x_axis_dir_element` (str, default='I-J'): Element's local x-axis direction. Accepts `'I-J'` or `'J-I'`.
- `offset_y` (float, default=0): Offset in the local y-direction.
- `offset_z` (float, default=0): Offset in the local z-direction.
---
##### Straight Shape Parameters (when `ref_axis = 'STRAIGHT'`)
> - `prof_ins_point` (list, default=[]): Insertion point coordinates `[x, y, z]`.
- `x_axis_dir_straight` (str, default='X'): Direction of the x-axis. Accepts `'X'`, `'Y'`, or `'VECTOR'`.
- `x_axis_dir_vec` (list, default=[]): Vector components if `x_axis_dir_straight` is `'VECTOR'`.
- `grad_rot_axis` (str, default='X'): Gradient rotation axis. Accepts `'X'` or `'Y'`.
- `grad_rot_ang` (float, default=0): Gradient rotation angle.
---
##### Curve Shape Parameters (when `ref_axis = 'CURVE'`)
> - `prof_ins_point` (list, default=[]): Insertion point coordinates `[x, y, z]`.
- `radius_cen` (list, default=[]): Center coordinates for the curve radius `[x, y]`.
- `offset` (float, default=0): Offset from the reference curve.
- `dir` (str, default='CW'): Direction of the curve. Accepts `'CW'` (Clockwise) or `'CCW'` (Counter-Clockwise).  
---
- `x_axis_rot_ang` (float, default=0): Rotation angle of the x-axis.
- `projection` (bool, default=True): Whether to project or rotate the tendon profile.
- `id` (int, default=None): ID of tendon profile. If None, an ID is automatically generated.



### Object Attributes
- `ID` : Unique identifier for the profile.
- `NAME` : Name of the tendon profile.
- `PROP` : Tendon property ID.
- `GROUP` : Tendon group ID.
- `ELEM` : List of assigned element IDs.
- `INPUT` : Profile input type (`'2D'` or `'3D'`).
- `CURVE` : Profile curve type (`'SPLINE'` or `'ROUND'`).
- `BELENG` : Straight length at the beginning.
- `ELENG` : Straight length at the end.
- `bTP` : True if the profile is a typical tendon, otherwise False.
- `CNT` : Number of typical tendons.
- `LENG_OPT` : Transition length option (`'USER'` or `'AUTO'`).
- `BLEN` : Transition length at the beginning.
- `ELEN` : Transition length at the end.
- `DeBondBLEN` : Debonding length at the beginning.
- `DeBondELEN` : Debonding length at the end.
- `SHAPE` : Reference axis shape (`'ELEMENT'`, `'STRAIGHT'`, `'CURVE'`).
- `P_XYZ` (list): For 3D profiles, a list of `POINT` objects representing coordinates.   
&emsp;&emsp;&emsp;&emsp;
**point.X** = X-coordinate <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
**point.Y** = Y-coordinate <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
**point.Z** = Z-coordinate 
- `P_XY` (list): For 2D profiles, a list of `POINT` objects for the XY-plane projection.  
&emsp;&emsp;&emsp;&emsp;
**point.X** = X-coordinate <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
**point.Y** = Y-coordinate 
- `P_XZ` (list): For 2D profiles, a list of `POINT` objects for the XZ-plane projection.  
&emsp;&emsp;&emsp;&emsp;
**point.X** = X-coordinate <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
**point.Z** = Z-coordinate 





#### Class Attributes
*Tendon.Profile.profiles* -> List of all tendon profiles defined.

```py
prof_xyz = [[0,0,0],[1000,0,-250],[5000,0,0]]

Tendon.Profile('TDN_Profile1',1,0,elemsInGroup('Span1'),'3D','SPLINE',ref_axis='CURVE',prof_xyz=prof_xyz,radius_cen=[0,-50000])
Tendon.Profile('TDN_Profile2',1,0,elemsInGroup('Span1'),'3D','SPLINE',ref_axis='ELEMENT',prof_xyz=prof_xyz)
Tendon.Profile('TDN_Profile3',1,0,elemsInGroup('Span1'),'3D','SPLINE',ref_axis='STRAIGHT',prof_xyz=prof_xyz)

for profile in Tendon.Profile.profiles:
    print(f' NAME => {profile.NAME}   |   TYPE =>  {profile.CURVE}   |   REF => {profile.INPUT}  |    REF => {profile.SHAPE}  |')


```


## Methods
---
#### json
Returns a JSON representation of all Tendon Profiles defined in python.

```py
prof_xyz = [[0,0,0],[1000,0,-250],[5000,0,0]]
Tendon.Profile('Tendon_Profile',1,0,elemsInGroup('Span'),'3D','SPLINE',ref_axis='ELEMENT',prof_xyz=prof_xyz)
print(Tendon.Profile.json())

```

#### create
Sends the current tendon profiles defined to the Civil NX using a PUT request.   
New profiles are created and existing profiles(same ID) in Civil NX will be updated.

```py
prof_xyz = [[0,0,0],[1000,0,-250],[5000,0,0]]
Tendon.Profile('Tendon_Profile',1,0,elemsInGroup('Span'),'3D','SPLINE',ref_axis='ELEMENT',prof_xyz=prof_xyz)
Tendon.Profile.create()
```

#### get
Fetches tendon profiles from the Civil NX and return the JSON representation.

```py
print(Tendon.Profile.get())
```

#### sync
Retrieves Tendon profile data from the Civil NX and rebuilds the internal tendon profile list.

```py
Tendon.Profile.sync()
```

#### delete
Deletes all tendon profiles from both Python and Civil NX.

```py
Tendon.Profile.delete()
```






![alt text](../assets/separator.png)
## Examples
---
```py
from midas_civil import *

Material.STEEL('Tendon_Material','IS(S)','Fe490')
Element.Beam.SDL([0,0,0],[1,0,0],5000,10,group='Span1')


Tendon.Property('TD1',2,1,1200,150,Tendon.Relaxation.Null(1880,1580))


prof_xy=[[0,0],[1000,100],[5000,0]]
prof_xz=[[0,0],[2000,-500],[5000,0]]

prof_xyz = [[0,0,0],[1000,0,-250],[5000,0,0]]

Tendon.Profile('TDN_Profile1',1,0,elemsInGroup('Span1'),'3D','SPLINE',ref_axis='CURVE',prof_xyz=prof_xyz,radius_cen=[0,-50000])
Tendon.Profile('TDN_Profile2',1,0,elemsInGroup('Span1'),'3D','SPLINE',ref_axis='ELEMENT',prof_xyz=prof_xyz)
Tendon.Profile('TDN_Profile3',1,0,elemsInGroup('Span1'),'3D','SPLINE',ref_axis='STRAIGHT',prof_xyz=prof_xyz)

Tendon.Profile('TDN_Profile4',1,0,elemsInGroup('Span1'),'2D','SPLINE',ref_axis='ELEMENT',prof_xy=prof_xy,prof_xz=prof_xz)


Model.create()

```





