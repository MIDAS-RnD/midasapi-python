# Moving Load LineLane

A nested class within MovingLoad used to create and manage traffic lanes for moving load analysis with country-specific standards.

### Class Attributes
*MovingLoad.LineLane.lanes* -> List of all defined traffic lane instances.

---

## Methods

### json
Returns a JSON representation of all defined traffic lanes.

```py
MovingLoad.LineLane.India("Lane1", -1.8, 1.8, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], Span=30)
MovingLoad.LineLane.India("Lane2",  1.8, 1.8, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], Span=30)

lane_json = MovingLoad.LineLane.json()
print(lane_json)
```

### create
Sends all defined traffic lanes to Civil NX.

```py
MovingLoad.LineLane.create()
```

### get
Retrieves all lane data from Civil NX.

```py
lane_data = MovingLoad.LineLane.get()
print(lane_data)
```

### sync
Synchronizes lane data from Civil NX to Python objects.

```py
MovingLoad.LineLane.sync()
```

### delete
Deletes all traffic lanes from both Python and Civil NX.

```py
MovingLoad.LineLane.delete()
```

#### Load Distribution Types
- **LANE**: Standard lane-based load distribution (default)
- **CROSS**: Cross-beam load distribution (when `Group_Name` is provided)

#### Movement Directions
- **BOTH**: Both directional traffic (default)
- **FORWARD**: Forward direction only
- **BACKWARD**: Backward direction only

---

## Code-Specific Subclasses

### India
**<font color="green">`MovingLoad.LineLane.India(Lane_name, Ecc, Wheel_space, elem_list, IF=0, Span=0, id=None, lane_width=0, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to Indian Road Congress (IRC) standards.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity of the lane's centerline from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels (typically 1.8 m)
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `IF` (float, optional): Impact Factor as defined by IRC. Default: 0
* `Span` (float, optional): Span length for impact factor calculation. Default: 0
* `id` (int, optional): Unique integer ID for the lane (auto-assigned if None). Default: None
* `lane_width` (float, optional): Width of the traffic lane. Default: 0
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs defining the lane path
* `IF` (float): Impact factor
* `Span` (float): Span length
* `id` (int): Lane ID
* `lane_width` (float): Lane width
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
# Create two IRC lanes for a 30m span bridge
MovingLoad.LineLane.India(
    Lane_name="LeftLane",
    Ecc=-1.875,
    Wheel_space=1.8,
    elem_list=list(range(1, 21)),
    Span=30
)

MovingLoad.LineLane.India(
    Lane_name="RightLane",
    Ecc=1.875,
    Wheel_space=1.8,
    elem_list=list(range(1, 21)),
    Span=30
)

MovingLoad.LineLane.create()
```

---

### China
**<font color="green">`MovingLoad.LineLane.China(Lane_name, Ecc, Wheel_space, elem_list, IF=0, Span=0, id=None, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to Chinese bridge design standards.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `IF` (float, optional): Scale Factor as defined by the Chinese code. Default: 0
* `Span` (float, optional): Span length. Default: 0
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `IF` (float): Scale factor
* `Span` (float): Span length
* `id` (int): Lane ID
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
# Standard Chinese lane
MovingLoad.LineLane.China(
    Lane_name="China_Lane1",
    Ecc=0,
    Wheel_space=2.0,
    elem_list=list(range(1, 13)),
    IF=1.3
)

# Skewed bridge lane
MovingLoad.LineLane.China(
    Lane_name="Skewed_Lane",
    Ecc=0,
    Wheel_space=2.0,
    elem_list=list(range(1, 13)),
    Skew_start=15,
    Skew_end=20,
    IF=1.3
)

MovingLoad.LineLane.create()
```

---

### Korea
**<font color="green">`MovingLoad.LineLane.Korea(Lane_name, Ecc, Wheel_space, elem_list, IF=0, id=None, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to Korean standards. Lane width is fixed at **3 m**.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `IF` (float, optional): Impact Factor. Default: 0
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `IF` (float): Impact factor
* `id` (int): Lane ID
* `lane_width` (float): Fixed at 3 m
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
# Standard Korean lane
MovingLoad.LineLane.Korea(
    Lane_name="Korea_Lane1",
    Ecc=-1.5,
    Wheel_space=1.8,
    elem_list=list(range(5, 26)),
    IF=0.3
)

# One-way forward traffic lane
MovingLoad.LineLane.Korea(
    Lane_name="Oneway_Forward",
    Ecc=-1.5,
    Wheel_space=1.8,
    elem_list=list(range(5, 26)),
    Moving_Direction="FORWARD"
)

MovingLoad.LineLane.create()
```

---

### Taiwan
**<font color="green">`MovingLoad.LineLane.Taiwan(Lane_name, Ecc, Wheel_space, elem_list, IF=0, id=None, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to Taiwanese standards. Lane width is fixed at **3 m**.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `IF` (float, optional): Impact Factor. Default: 0
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `IF` (float): Impact factor
* `id` (int): Lane ID
* `lane_width` (float): Fixed at 3 m
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
MovingLoad.LineLane.Taiwan(
    Lane_name="Taiwan_Lane1",
    Ecc=-1.5,
    Wheel_space=1.8,
    elem_list=list(range(1, 21)),
    IF=0.25
)

MovingLoad.LineLane.create()
```

---

### AASHTOStandard
**<font color="green">`MovingLoad.LineLane.AASHTOStandard(Lane_name, Ecc, Wheel_space, elem_list, IF=0, id=None, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to AASHTO Standard. Lane width is fixed at **3 m**.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels (typically 1.83 m / 6 ft)
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `IF` (float, optional): Impact Factor. Default: 0
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `IF` (float): Impact factor
* `id` (int): Lane ID
* `lane_width` (float): Fixed at 3 m
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
MovingLoad.LineLane.AASHTOStandard(
    Lane_name="AASHTO_Std_Lane1",
    Ecc=-1.8,
    Wheel_space=1.83,
    elem_list=list(range(1, 21)),
    IF=0.3
)

MovingLoad.LineLane.create()
```

---

### AASHTOLRFD
**<font color="green">`MovingLoad.LineLane.AASHTOLRFD(Lane_name, Ecc, Wheel_space, elem_list, centrifugal_force=0, id=None, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to AASHTO LRFD. Lane width is fixed at **3 m**. The `centrifugal_force` parameter replaces the generic `IF` field for this code.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels (typically 1.83 m / 6 ft)
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `centrifugal_force` (float, optional): Centrifugal force factor as per AASHTO LRFD. Default: 0
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `IF` (float): Centrifugal force factor
* `id` (int): Lane ID
* `lane_width` (float): Fixed at 3 m
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
# Lane with centrifugal force consideration
MovingLoad.LineLane.AASHTOLRFD(
    Lane_name="Highway_Lane_1",
    Ecc=-1.8,
    Wheel_space=1.83,
    elem_list=list(range(5, 26)),
    centrifugal_force=0.15
)

MovingLoad.LineLane.create()
```

---

### PENNDOT
**<font color="green">`MovingLoad.LineLane.PENNDOT(Lane_name, Ecc, Wheel_space, elem_list, id=None, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to AASHTO LRFD (PENNDOT). Lane width is fixed at **3 m**. No impact/scale factor input is required.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels (typically 1.83 m / 6 ft)
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `id` (int): Lane ID
* `lane_width` (float): Fixed at 3 m
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
MovingLoad.LineLane.PENNDOT(
    Lane_name="PENNDOT_Lane1",
    Ecc=-1.8,
    Wheel_space=1.83,
    elem_list=list(range(1, 21))
)

MovingLoad.LineLane.create()
```

---

### Canada
**<font color="green">`MovingLoad.LineLane.Canada(Lane_name, Ecc, Wheel_space, elem_list, id=None, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to Canadian standards. Lane width is fixed at **3 m**. No impact/scale factor input is required.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `id` (int): Lane ID
* `lane_width` (float): Fixed at 3 m
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
MovingLoad.LineLane.Canada(
    Lane_name="Canada_Lane1",
    Ecc=-1.5,
    Wheel_space=1.8,
    elem_list=list(range(1, 21))
)

MovingLoad.LineLane.create()
```

---

### BS
**<font color="green">`MovingLoad.LineLane.BS(Lane_name, Ecc, Wheel_space, elem_list, id=None, lane_width=0, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to British Standards (BS). No impact/scale factor input is required.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_width` (float, optional): Width of the traffic lane. Default: 0
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `id` (int): Lane ID
* `lane_width` (float): Lane width
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
MovingLoad.LineLane.BS(
    Lane_name="BS_Lane1",
    Ecc=-1.8,
    Wheel_space=1.8,
    elem_list=list(range(1, 21)),
    lane_width=3.65
)

MovingLoad.LineLane.create()
```

---

### Eurocode
**<font color="green">`MovingLoad.LineLane.Eurocode(Lane_name, Ecc, Wheel_space, elem_list, ecc_vertical_load=0, id=None, lane_width=0, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to European (Eurocode) standards. The `ecc_vertical_load` parameter replaces the generic `IF` field and represents vertical load eccentricity.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels (typically 2.0 m)
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `ecc_vertical_load` (float, optional): Vertical load eccentricity as per Eurocode. Default: 0
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_width` (float, optional): Width of the traffic lane. Default: 0
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `IF` (float): Vertical load eccentricity
* `id` (int): Lane ID
* `lane_width` (float): Lane width
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
MovingLoad.LineLane.Eurocode(
    Lane_name="Euro_Lane1",
    Ecc=0,
    Wheel_space=2.0,
    elem_list=list(range(10, 31)),
    ecc_vertical_load=0.6,
    lane_width=3.0
)

MovingLoad.LineLane.create()
```

---

### Australia
**<font color="green">`MovingLoad.LineLane.Australia(Lane_name, Ecc, Wheel_space, elem_list, id=None, lane_width=0, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to Australian standards. No impact/scale factor input is required.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_width` (float, optional): Width of the traffic lane. Default: 0
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `id` (int): Lane ID
* `lane_width` (float): Lane width
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
MovingLoad.LineLane.Australia(
    Lane_name="Aus_Lane1",
    Ecc=-1.8,
    Wheel_space=1.8,
    elem_list=list(range(1, 21)),
    lane_width=3.5
)

MovingLoad.LineLane.create()
```

---

### Poland
**<font color="green">`MovingLoad.LineLane.Poland(Lane_name, Ecc, Wheel_space, elem_list, id=None, lane_width=0, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to Polish standards. No impact/scale factor input is required.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_width` (float, optional): Width of the traffic lane. Default: 0
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `id` (int): Lane ID
* `lane_width` (float): Lane width
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
MovingLoad.LineLane.Poland(
    Lane_name="Poland_Lane1",
    Ecc=0,
    Wheel_space=2.0,
    elem_list=list(range(1, 21)),
    lane_width=3.5
)

MovingLoad.LineLane.create()
```

---

### Russia
**<font color="green">`MovingLoad.LineLane.Russia(Lane_name, Ecc, Wheel_space, elem_list, id=None, lane_width=0, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to Russian standards. No impact/scale factor input is required.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_width` (float, optional): Width of the traffic lane. Default: 0
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `id` (int): Lane ID
* `lane_width` (float): Lane width
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
MovingLoad.LineLane.Russia(
    Lane_name="Russia_Lane1",
    Ecc=0,
    Wheel_space=1.8,
    elem_list=list(range(1, 21)),
    lane_width=3.75
)

MovingLoad.LineLane.create()
```

---

### SouthAfrica
**<font color="green">`MovingLoad.LineLane.SouthAfrica(Lane_name, Ecc, Wheel_space, elem_list, id=None, lane_width=0, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to South African standards. No impact/scale factor input is required.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_width` (float, optional): Width of the traffic lane. Default: 0
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `id` (int): Lane ID
* `lane_width` (float): Lane width
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
MovingLoad.LineLane.SouthAfrica(
    Lane_name="SA_Lane1",
    Ecc=0,
    Wheel_space=1.8,
    elem_list=list(range(1, 21)),
    lane_width=3.7
)

MovingLoad.LineLane.create()
```

---

### KSCELSD15
**<font color="green">`MovingLoad.LineLane.KSCELSD15(Lane_name, Ecc, Wheel_space, elem_list, id=None, lane_opt_width=0, Group_Name="", Moving_Direction="BOTH", Skew_start=0, Skew_end=0)`</font>**

Creates a traffic lane according to KSCE-LSD15 standards. Lane width is fixed at **3 m**. No impact/scale factor input is required.

#### Parameters
* `Lane_name` (str): A unique name for the lane
* `Ecc` (float): Lateral eccentricity from the reference element path (positive = +Y direction)
* `Wheel_space` (float): Center-to-center distance between vehicle wheels
* `elem_list` (list[int]): List of element IDs defining the continuous path of the lane
* `id` (int, optional): Unique integer ID (auto-assigned if None). Default: None
* `lane_opt_width` (float, optional): Allowable width for auto-positioning. Default: 0
* `Group_Name` (str, optional): Group name for cross-beam load distribution. Default: ""
* `Moving_Direction` (str, optional): Vehicle movement direction ("FORWARD", "BACKWARD", "BOTH"). Default: "BOTH"
* `Skew_start` (float, optional): Bridge skew angle at lane start (degrees). Default: 0
* `Skew_end` (float, optional): Bridge skew angle at lane end (degrees). Default: 0

#### Object Attributes
* `Lane_name` (str): The unique name of the lane
* `Ecc` (float): Lateral eccentricity value
* `Wheel_space` (float): Wheel spacing distance
* `elem_list` (list[int]): List of element IDs
* `id` (int): Lane ID
* `lane_width` (float): Fixed at 3 m
* `lane_opt_width` (float): Allowable width
* `Group_Name` (str): Group name for load distribution
* `Moving_Direction` (str): Movement direction
* `Skew_start` (float): Start skew angle
* `Skew_end` (float): End skew angle

#### Examples
```py
MovingLoad.LineLane.KSCELSD15(
    Lane_name="KSCE_Lane1",
    Ecc=-1.5,
    Wheel_space=1.8,
    elem_list=list(range(1, 21))
)

MovingLoad.LineLane.create()
```