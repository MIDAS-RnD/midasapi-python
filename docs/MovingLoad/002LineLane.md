# Moving Load LineLane

A nested class within MovingLoad used to create and manage traffic lanes for moving load analysis with country-specific standards.

## Constructor
---
**<font color="green">`MovingLoad.LineLane(code, Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, IF=0, Span=0, id=None, width=0, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane with specified parameters.

### Parameters
* `code` (str): Country code for traffic lane standards
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity of the lane's centerline from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels (typically 1.8m or 6ft)
* `Elment_start` (int): First element ID in the continuous path defining the lane
* `Elemnt_end` (int): Last element ID in the continuous path defining the lane
* `IF` (float, optional): Impact Factor or Scale Factor as defined by design code. Default: 0
* `Span` (float, optional): Span length for impact factor calculation. Default: 0
* `id` (int, optional): Unique integer ID for the lane (auto-assigned if None). Default: None
* `width` (float, optional): Width of the traffic lane. Default: 0
* `opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0


#### Load Distribution Types
---
- **LANE**: Standard lane-based load distribution (default)
- **CROSS**: Cross-beam load distribution (when Group_Name is provided)

#### Movement Directions
---
- **BOTH**:  Both directional traffic (default)
- **FORWARD**: Forward direction only
- **BACKWARD**: Backward direction only



### Object Attributes
* `code` (str): The country code for the lane
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `Elment_start` (int): Starting element ID
* `Elemnt_end` (int): Ending element ID
* `IF` (float): Impact/scale factor
* `Span` (float): Span length
* `id` (int): Lane ID
* `width` (float): Lane width
* `opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

## Country-Specific Subclasses
---

### India
**<font color="green">`MovingLoad.LineLane.India(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, IF=0, Span=0, id=None, width=0, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to Indian Road Congress (IRC) standards.

### China
**<font color="green">`MovingLoad.LineLane.China(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, IF=0, Span=0, id=None, width=0, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to Chinese bridge design standards.

### Korea
**<font color="green">`MovingLoad.LineLane.Korea(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, IF=0, id=None, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to Korean standards (fixed width = 3m).

### Taiwan
**<font color="green">`MovingLoad.LineLane.Taiwan(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, IF=0, id=None, width=0, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to Taiwanese standards.

### AASHTO Standard
**<font color="green">`MovingLoad.LineLane.AASHTOStandard(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, IF=0, id=None, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to AASHTO Standard (fixed width = 3m).

### AASHTO LRFD
**<font color="green">`MovingLoad.LineLane.AASHTOLRFD(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, IF=0, id=None, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to AASHTO LRFD (fixed width = 3m, IF represents centrifugal force).

### PENNDOT
**<font color="green">`MovingLoad.LineLane.PENNDOT(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, id=None, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to AASHTO LRFD (PENNDOT) (fixed width = 3m).

### Canada
**<font color="green">`MovingLoad.LineLane.Canada(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, id=None, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to Canadian standards (fixed width = 3m).

### BS
**<font color="green">`MovingLoad.LineLane.BS(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, id=None, width=0, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to British Standards (BS).

### Eurocode
**<font color="green">`MovingLoad.LineLane.Eurocode(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, IF=0, id=None, width=0, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to European standards (IF represents vertical load eccentricity).

### Australia
**<font color="green">`MovingLoad.LineLane.Australia(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, id=None, width=0, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to Australian standards.

### Poland
**<font color="green">`MovingLoad.LineLane.Poland(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, id=None, width=0, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to Polish standards.

### Russia
**<font color="green">`MovingLoad.LineLane.Russia(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, id=None, width=0, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to Russian standards.

### South Africa
**<font color="green">`MovingLoad.LineLane.SouthAfrica(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, id=None, width=0, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to South African standards.

### KSCE-LSD15
**<font color="green">`MovingLoad.LineLane.KSCELSD15(Lane_name, Ecc, Wheel_space, Elment_start, Elemnt_end, id=None, opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**  
Creates a traffic lane according to KSCE-LSD15 (fixed width = 3m).


## Class Methods
---

#### json
Returns JSON representation of all defined traffic lanes.

```py
# Create some lanes
MovingLoad.LineLane.India("Lane1", -1.8, 1.8, 1, 10, Span=30)
MovingLoad.LineLane.India("Lane2", 1.8, 1.8, 1, 10, Span=30)

# Get JSON representation
lane_json = MovingLoad.LineLane.json()
print(lane_json)
```

#### create
Sends all defined traffic lanes to Civil NX.

```py
MovingLoad.LineLane.create()
```

#### get
Retrieves all lane data from Civil NX.

```py
lane_data = MovingLoad.LineLane.get()
print(lane_data)
```

#### sync
Synchronizes lane data from Civil NX to Python objects.

```py
MovingLoad.LineLane.sync()
```

#### delete
Deletes all traffic lanes from both Python and Civil NX.

```py
MovingLoad.LineLane.delete()
```

## Examples
---

#### Creating Indian Standard Lanes
```py
# Set Indian standards
MovingLoad.Code("INDIA")

# Create two lanes for a bridge
MovingLoad.LineLane.India(
    Lane_name="LeftLane",
    Ecc=-1.875,  # 1.875m left of centerline
    Wheel_space=1.8,  # Standard wheel spacing
    Elment_start=1,
    Elemnt_end=20,
    Span=30  # 30m span
)

MovingLoad.LineLane.India(
    Lane_name="RightLane",
    Ecc=1.875,   # 1.875m right of centerline
    Wheel_space=1.8,
    Elment_start=1,
    Elemnt_end=20,
    Span=30
    
)

# Create lanes in Civil NX
MovingLoad.LineLane.create()
```

#### Creating AASHTO LRFD Lanes
```py
# Set AASHTO LRFD standards
MovingLoad.Code("AASHTO LRFD")

# Create lane with centrifugal force consideration
MovingLoad.LineLane.AASHTOLRFD(
    Lane_name="Highway_Lane_1",
    Ecc=-1.8,
    Wheel_space=1.83,  # 6 feet
    Elment_start=5,
    Elemnt_end=25,
    IF=0.15  # Centrifugal force factor
)

MovingLoad.LineLane.create()
```

#### Creating Eurocode Lanes
```py
# Set European standards
MovingLoad.Code("EUROCODE")

# Create lane with load eccentricity
MovingLoad.LineLane.Eurocode(
    Lane_name="Euro_Lane",
    Ecc=0,
    Wheel_space=2.0,
    Elment_start=10,
    Elemnt_end=30,
    IF=0.6,  # Vertical load eccentricity
    width=3.0
)

MovingLoad.LineLane.create()
```

#### Creating Lanes with Cross-Beam Distribution
```py
# Create lanes with cross-beam load distribution
MovingLoad.LineLane.India(
    Lane_name="CrossBeam_Lane1",
    Ecc=-2.0,
    Wheel_space=1.8,
    Elment_start=1,
    Elemnt_end=15,
    Group_Name="CrossBeamGroup1",  # Enables cross-beam distribution
    width=3.5
)

MovingLoad.LineLane.India(
    Lane_name="CrossBeam_Lane2",
    Ecc=2.0,
    Wheel_space=1.8,
    Elment_start=1,
    Elemnt_end=15,
    Group_Name="CrossBeamGroup1",  # Same group for distribution
    width=3.5
)

MovingLoad.LineLane.create()
```

#### Creating Skewed Bridge Lanes
```py
# Create lanes for a skewed bridge
MovingLoad.LineLane.China(
    Lane_name="Skewed_Lane",
    Ecc=0,
    Wheel_space=2.0,
    Elment_start=1,
    Elemnt_end=12,
    Skew_start=15,    # 15 degrees skew at start
    Skew_end=20,      # 20 degrees skew at end
    IF=1.3            # Scale factor
)

MovingLoad.LineLane.create()
```

#### One-Way Traffic Lane
```py
# Create a one-way traffic lane
MovingLoad.LineLane.Korea(
    Lane_name="Oneway_Forward",
    Ecc=-1.5,
    Wheel_space=1.8,
    Elment_start=5,
    Elemnt_end=25,
    Moving_Direction="FORWARD"  # Only forward traffic
)

MovingLoad.LineLane.create()
```

#### Synchronizing Existing Lanes
```py
# Sync lanes from Civil NX model
MovingLoad.LineLane.sync()

# Display synced lanes
for lane in MovingLoad.LineLane.lanes:
    print(f"Lane: {lane.Lane_name}, Code: {lane.code}, Elements: {lane.Elment_start}-{lane.Elemnt_end}")
```

