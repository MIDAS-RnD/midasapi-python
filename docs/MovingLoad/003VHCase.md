# Moving Load Case

A nested class within `MovingLoad` used to define and manage moving load cases for analysis, with support for country-specific standards like Indian, Eurocode, AASHTO, Korea, Australia, Russia, Taiwan, Canada, PENNDOT, and KSCE-LSD15.

## Constructor
---
The main `Case` class constructor is for internal use. Please use the country-specific subclasses to create load cases.

## Country-Specific Subclasses
---

### India
**<font color="green">`MovingLoad.Case.India(name, num_loaded_lanes, id=None, opt_auto_ll=False, opt_lc_for_permit=False, sub_load_items=None, scale_factor=None, permit_vehicle_id=None, ref_lane_id=None, eccentricity=None, permit_scale_factor=None)`</font>**

Creates a moving load case according to Indian standards (IRC). It supports three main types of load cases: General, Auto Live Load Combination, and Permit Vehicle.

#### Parameters
* `name` (str): The name for the load case.
* `num_loaded_lanes` (int): The number of lanes to be loaded.
* `id` (int, optional): A unique integer ID for the case. Auto-assigned if `None`.
* `opt_auto_ll` (bool, optional): Set to `True` for "Auto Live Load Combinations". Defaults to `False`.
* `opt_lc_for_permit` (bool, optional): Set to `True` for "Load Cases for Permit Vehicle". Defaults to `False`.
* `sub_load_items` (list): A list of lists defining the sub-loads. The format depends on the selected options:

    * **Case 1: General Load (`opt_auto_ll=False`, `opt_lc_for_permit=False`)**
        Each inner list must contain 5 items: `[Scale Factor, Min Lanes, Max Lanes, Vehicle Name, [Selected Lanes]]`
        * `Scale Factor` (float): Load combination factor.
        * `Min Lanes` (int): Minimum number of loaded lanes.
        * `Max Lanes` (int): Maximum number of loaded lanes.
        * `Vehicle Name` (str): e.g., `"Class A"`.
        * `[Selected Lanes]` (list[str]): e.g., `["Lane1", "Lane2"]`.

    * **Case 2: Auto Live Load (`opt_auto_ll=True`)**
        Each inner list must contain 5-6 items: `[Scale Factor, Vehicle Class I, Vehicle Class II, Footway Vehicle, [Carriageway Lanes], [Footway Lanes]]`
        * `Vehicle Class I/II` (str): Primary/secondary vehicle names. Use `""` for none.
        * `Footway Vehicle` (str): Footway vehicle name. Use `""` for none.
        * `[Footway Lanes]` (list[str], optional): Lanes for footway load.

    * **Case 3: Permit Vehicle (`opt_lc_for_permit=True`)**
        This parameter is not used. Use the `permit_vehicle_id`, `ref_lane_id`, etc., parameters instead.

* `scale_factor` (list, optional): A list of 4 numbers for the Multiple Presence Factor. Defaults to `[1, 0.9, 0.8, 0.8]`.
* `permit_vehicle_id` (int, optional): The ID of the permit vehicle. Required for permit cases.
* `ref_lane_id` (int, optional): The reference lane ID. Required for permit cases.
* `eccentricity` (float, optional): Eccentricity for the permit vehicle. Required for permit cases.
* `permit_scale_factor` (float, optional): Scale factor for the permit vehicle. Required for permit cases.

### Eurocode
**<font color="green">`MovingLoad.Case.Eurocode(name, load_model, use_optimization=False, id=None, sub_load_items=None, **kwargs)`</font>**

Creates a moving load case according to Eurocode standards. It supports General Load and Moving Load Optimization modes across various load models.

#### Parameters
* `name` (str): The name of the load case.
* `load_model` (int): The Eurocode Load Model type (1-5).
* `use_optimization` (bool, optional): Set to `True` for "Moving Load Optimization". Defaults to `False`.
* `id` (int, optional): A unique integer ID for the case. Auto-assigned if `None`.
* `sub_load_items` (list): A simplified list for defining the load case details. The format varies significantly based on `load_model` and `use_optimization`.
* `**kwargs`: Additional individual parameters can be passed

#### `sub_load_items` Format Details

* **General Load (`use_optimization=False`)**
    * **`load_model = 1`**: `[opt_leading, vhl_name1, vhl_name2, selected_lanes, remaining_area_lanes, footway_lanes]`
        * `opt_leading` (bool): `True` for leading vehicle.
        * `vhl_name1`/`vhl_name2` (str): Vehicle names.
        * `selected_lanes` (list[str]): Lanes for tandem system.
        * `remaining_area_lanes` (list[str]): Lanes for UDL.
        * `footway_lanes` (list[str]): Lanes for footway load.
    * **`load_model = 2`**: `[opt_leading, opt_comb, [(name, sf, min_L, max_L, [lanes]), ...]]`
        * `opt_comb` (int): Combination option.
        * The inner list defines sub-loads with: `name` (str), `sf` (float), `min_L`/`max_L` (int), and `lanes` (list[str]).
    * **`load_model = 3`**: `[opt_leading, vhl_name1, vhl_name2, selected_lanes, remaining_area_lanes]`
    * **`load_model = 4`**: `[opt_leading, vhl_name1, vhl_name2, selected_lanes, remaining_area_lanes, straddling_lanes]`
        * `straddling_lanes` (list[dict]): e.g., `[{'NAME1': 'Lane1', 'NAME2': 'Lane2'}]`.
    * **`load_model = 5` (Railway)**: `[opt_psi, opt_comb, [sf1,sf2,sf3], [mf1,mf2,mf3], [(name, sf, min_L, max_L, [lanes]), ...]]`
        * `opt_psi` (bool): `True` to use psi factors.
        * `[sf1,sf2,sf3]` (list[float]): Scale factors.
        * `[mf1,mf2,mf3]` (list[float]): Multi-presence factors.

* **Moving Load Optimization (`use_optimization=True`)**
    * **`load_model = 1` or `3`**: `[opt_leading, vhl_name1, vhl_name2, min_dist, opt_lane, loaded_lanes, [selected_lanes]]`
        * `min_dist` (float): Minimum vehicle distance.
        * `opt_lane` (str): Name of the optimization lane.
        * `loaded_lanes` (int): Number of loaded lanes.
    * **`load_model = 2`**: `[opt_leading, opt_comb, min_dist, opt_lane, min_v, max_v, [(name, sf), ...]]`
        * `min_v`/`max_v` (int): Min/max number of vehicles.
        * The inner list defines vehicles with `name` (str) and `sf` (float).
    * **`load_model = 4`**: `[opt_leading, vhl_name1, vhl_name2, min_dist, opt_lane, loaded_lanes, [selected_lanes], [straddling_lanes]]`
    * **`load_model = 5` (Railway)**: `[opt_psi, opt_comb, [sf1,sf2,sf3], [mf1,mf2,mf3], min_dist, opt_lane, min_v, max_v, [(name, sf), ...]]`

---

### KSCE-LSD15
**<font color="green">`MovingLoad.Case.KSCELSD15(name, case_type, sub_loads=None, comb_option="COMB", optimize_lane_name=None, min_vehl_dist=None, min_num_vehicle=None, max_num_vehicle=None, optimize_items=None, scale_factors=None, desc="", id=None)`</font>**

Creates a moving load case according to the Korean KSCE-LSD15 standard.

#### Parameters
* `name` (str): The name of the load case.
* `case_type` (int): Load type selector:
    * `0` — General Load
    * `2` — Moving Load Optimization
* `id` (int, optional): A unique integer ID. Auto-assigned if `None`.
* `comb_option` (str, optional): Loading effect option. Accepted values: `"COMBINED"` (or shorthand `"COMB"`) and `"INDEPENDENT"` (or shorthand `"INDE"`). Defaults to `"COMBINED"`.
* `scale_factors` (list, optional): Multiple Presence Factors `[L1, L2, L3, L4, L5, More]`. Defaults to `[1, 0.9, 0.8, 0.7, 0.65, 0.65]`.
* `desc` (str, optional): Description of the load case.

* **General Load (`case_type=0`)**
    * `sub_loads` (list): List of sub-load definitions. Each item is a list:
        `[vehicle_type, vehicle_name, scale_factor, min_loaded_lane, max_loaded_lane, [lane_names]]`
        * `vehicle_type` (str): `"VL"` for Vehicle Load, `"VC"` for Vehicle Class.
        * `vehicle_name` (str): e.g., `"KL-510TRK"`.
        * `scale_factor` (float): Load scale factor.
        * `min_loaded_lane` (int): Minimum number of loaded lanes.
        * `max_loaded_lane` (int): Maximum number of loaded lanes.
        * `[lane_names]` (list[str]): Selected lane names.

* **Moving Load Optimization (`case_type=2`)**
    * `optimize_lane_name` (str): Target lane name for optimization.
    * `min_vehl_dist` (float): Minimum vehicle distance.
    * `min_num_vehicle` (int): Minimum number of vehicles.
    * `max_num_vehicle` (int): Maximum number of vehicles.
    * `optimize_items` (list): Each item is `[vehicle_type, vehicle_name, scale_factor]`.

#### Examples

```py
# Set KSCE-LSD15 standard
MovingLoad.Code("KSCE-LSD15")

# Example 1: General Load Case (Single Sub-load)
MovingLoad.Case.KSCELSD15(
    id=1,
    name="C1",
    case_type=0,
    comb_option="INDEPENDENT",
    sub_loads=[["VL", "KL-510FTG", 1.0, 0, 1, ["L1", "L2", "L3"]]]
)

# Example 2: General Load Case (Multiple Sub-loads, Combined)
MovingLoad.Case.KSCELSD15(
    id=2,
    name="C2",
    case_type=0,
    comb_option="COMBINED",
    sub_loads=[
        ["VL", "KL-510FTG", 1.0, 0, 1, ["L1"]],
        ["VL", "KL-510FTG", 1.0, 0, 3, ["L1", "L2", "L3"]]
    ]
)

# Example 3: General Load Case with Min/Max Lane range
MovingLoad.Case.KSCELSD15(
    id=3,
    name="C3",
    case_type=0,
    comb_option="INDEPENDENT",
    sub_loads=[["VL", "KL-510FTG", 1.0, 1, 2, ["L2", "L3"]]]
)

# Create all defined cases in Midas Civil
MovingLoad.Case.create()
```

---

### Korea
**<font color="green">`MovingLoad.Case.Korea(name, sub_loads=None, comb_option="COMB", lane_factor_type=1, korea_lane_factors=None, scale_factors=None, desc="", id=None)`</font>**

Creates a moving load case according to Korean standards. Supports General Load only.

#### Parameters
* `name` (str): The name of the load case.
* `id` (int, optional): A unique integer ID. Auto-assigned if `None`.
* `comb_option` (str, optional): Accepted values: `"COMBINED"` (or shorthand `"COMB"`) and `"INDEPENDENT"` (or shorthand `"INDE"`). Defaults to `"COMBINED"`.
* `lane_factor_type` (int, optional): Lane factor type:
    * `0` — Multi Lane Factor in KS Rail Load
    * `1` — Multiple Presence Factor (default)
* `korea_lane_factors` (dict, optional): Required when `lane_factor_type=0`. Keys follow the pattern:
    `{"_2_LANE_FACTOR_1": val, "_2_LANE_FACTOR_2": val, "_3_LANE_FACTOR_1": val, "_3_LANE_FACTOR_2": val, "_3_LANE_FACTOR_3": val, "_3_LANE_FACTOR_4": val}`
* `scale_factors` (list, optional): Multiple Presence Factors `[L1, L2, L3, More, More, More]`. Defaults to `[1, 1, 0.9, 0.75, 0.75, 0.75]`.
* `sub_loads` (list): List of sub-load definitions. Each item is a list:
    `[vehicle_type, vehicle_name, scale_factor, min_loaded_lane, max_loaded_lane, [lane_names]]`
    * `vehicle_type` (str): `"VL"` for Vehicle Load, `"VC"` for Vehicle Class.
    * `vehicle_name` (str): e.g., `"DB-24"`.

#### Examples

```py
# Set Korean standard
MovingLoad.Code("KOREA")

# Example 1: General Load Case (Independent)
MovingLoad.Case.Korea(
    id=1,
    name="Case 1",
    comb_option="INDEPENDENT",
    sub_loads=[["VL", "DB-24", 1.0, 0, 1, ["L1"]]]
)

# Example 2: General Load Case (Combined)
MovingLoad.Case.Korea(
    id=2,
    name="Case 2",
    comb_option="COMBINED",
    sub_loads=[["VL", "DB-24", 1.0, 0, 2, ["L1", "L2"]]]
)

# Example 3: General Load Case (Multiple Sub-loads, Independent)
MovingLoad.Case.Korea(
    id=3,
    name="Case 33",
    comb_option="INDEPENDENT",
    sub_loads=[
        ["VL", "DB-24", 1.0, 0, 2, ["L1", "L2", "L3"]],
        ["VL", "DB-24", 1.0, 0, 1, ["L1"]]
    ]
)

# Create all defined cases in Midas Civil
MovingLoad.Case.create()
```

---

### AASHTO Standard
**<font color="green">`MovingLoad.Case.AASHTOStandard(name, case_type, sub_loads=None, comb_option="COMB", optimize_lane_name=None, min_vehl_dist=None, min_num_vehicle=None, max_num_vehicle=None, optimize_items=None, scale_factors=None, desc="", id=None)`</font>**

Creates a moving load case according to AASHTO Standard specifications.

#### Parameters
* `name` (str): The name of the load case.
* `case_type` (int): Load type selector:
    * `0` — General Load
    * `2` — Moving Load Optimization
* `id` (int, optional): A unique integer ID. Auto-assigned if `None`.
* `comb_option` (str, optional): Accepted values: `"COMBINED"` (or shorthand `"COMB"`) and `"INDEPENDENT"` (or shorthand `"INDE"`). Defaults to `"COMBINED"`.
* `scale_factors` (list, optional): Multiple Presence Factors `[L1, L2, L3, L4, L5, More]`. Defaults to `[1, 1, 0.9, 0.75, 0.75, 0.75]`.
* `desc` (str, optional): Description of the load case.

* **General Load (`case_type=0`)**
    * `sub_loads` (list): Each item is `[vehicle_type, vehicle_name, scale_factor, min_loaded_lane, max_loaded_lane, [lane_names]]`.

* **Moving Load Optimization (`case_type=2`)**
    * `optimize_lane_name` (str): Target lane for optimization.
    * `min_vehl_dist` (float): Minimum vehicle distance.
    * `min_num_vehicle` (int): Minimum number of vehicles.
    * `max_num_vehicle` (int): Maximum number of vehicles.
    * `optimize_items` (list): Each item is `[vehicle_type, vehicle_name, scale_factor]`.

#### Examples

```py
# Set AASHTO Standard
MovingLoad.Code("AASHTO STANDARD")

# Example 1: General Load Case (Independent, 2 Lanes)
MovingLoad.Case.AASHTOStandard(
    id=1,
    name="C1",
    case_type=0,
    comb_option="INDEPENDENT",
    sub_loads=[["VL", "HS20-44", 1.0, 0, 2, ["L1", "L2"]]]
)

# Example 2: General Load Case (Combined, 3 Lanes)
MovingLoad.Case.AASHTOStandard(
    id=2,
    name="C2",
    case_type=0,
    comb_option="COMBINED",
    sub_loads=[["VL", "HS20-44", 1.0, 0, 3, ["L1", "L2", "L3"]]]
)

# Example 3: General Load Case (Multiple Sub-loads)
MovingLoad.Case.AASHTOStandard(
    id=3,
    name="C3",
    case_type=0,
    comb_option="COMBINED",
    sub_loads=[
        ["VL", "HS20-44", 1.0, 0, 1, ["L2"]],
        ["VL", "HS20-44", 1.0, 0, 2, ["L1", "L3"]]
    ]
)

# Create all defined cases in Midas Civil
MovingLoad.Case.create()
```

---

### AASHTO LRFD
**<font color="green">`MovingLoad.Case.AASHTOLRFD(name, case_type, sub_loads=None, comb_option="COMB", permit_vehicle_name=None, ref_lane=None, permit_scale_factor=1.0, optimize_lane_name=None, min_vehl_dist=None, min_num_vehicle=None, max_num_vehicle=None, optimize_items=None, scale_factors=None, desc="", id=None)`</font>**

Creates a moving load case according to AASHTO LRFD specifications. Supports General Load, Permit Vehicle, and Moving Load Optimization.

#### Parameters
* `name` (str): The name of the load case.
* `case_type` (int): Load type selector:
    * `0` — General Load
    * `1` — Load Case for Permit Vehicle
    * `2` — Moving Load Optimization
* `id` (int, optional): A unique integer ID. Auto-assigned if `None`.
* `comb_option` (str, optional): Accepted values: `"COMBINED"` (or shorthand `"COMB"`) and `"INDEPENDENT"` (or shorthand `"INDE"`). Defaults to `"COMBINED"`.
* `scale_factors` (list, optional): Multiple Presence Factors `[L1, L2, L3, L4, L5, More]`. Defaults to `[1.2, 1, 0.85, 0.65, 0.65, 0.65]`.
* `desc` (str, optional): Description of the load case.

* **General Load (`case_type=0`)**
    * `sub_loads` (list): Each item is `[vehicle_type, vehicle_name, scale_factor, min_loaded_lane, max_loaded_lane, [lane_names]]`.

* **Permit Vehicle (`case_type=1`)**
    * `permit_vehicle_name` (str): Name of the permit vehicle load.
    * `ref_lane` (str): Reference lane name.
    * `permit_scale_factor` (float): Scale factor for the permit vehicle. Defaults to `1.0`.

* **Moving Load Optimization (`case_type=2`)**
    * `optimize_lane_name` (str): Target lane for optimization.
    * `min_vehl_dist` (float): Minimum vehicle distance.
    * `min_num_vehicle` (int): Minimum number of vehicles.
    * `max_num_vehicle` (int): Maximum number of vehicles.
    * `optimize_items` (list): Each item is `[vehicle_type, vehicle_name, scale_factor]`.

#### Examples

```py
# Set AASHTO LRFD standard
MovingLoad.Code("AASHTO LRFD")

# Example 1: General Load Case (Independent, Single Lane)
MovingLoad.Case.AASHTOLRFD(
    id=1,
    name="Case 1",
    case_type=0,
    comb_option="INDEPENDENT",
    sub_loads=[["VL", "HL-93TRK", 1.0, 1, 1, ["L1"]]]
)

# Example 2: General Load Case (Combined, 2 Lanes)
MovingLoad.Case.AASHTOLRFD(
    id=2,
    name="Case 2",
    case_type=0,
    comb_option="COMBINED",
    sub_loads=[["VL", "HL-93TRK", 1.0, 1, 2, ["L1", "L3"]]]
)

# Example 3: General Load Case (Multiple Sub-loads, Independent)
MovingLoad.Case.AASHTOLRFD(
    id=3,
    name="Case 3",
    case_type=0,
    comb_option="INDEPENDENT",
    sub_loads=[
        ["VL", "HL-93TRK", 1.0, 0, 1, ["L1"]],
        ["VL", "HL-93TRK", 1.0, 0, 1, ["L2"]]
    ]
)

# Create all defined cases in Midas Civil
MovingLoad.Case.create()
```

---

### PENNDOT
**<font color="green">`MovingLoad.Case.PENNDOT(name, case_type, sub_loads=None, comb_option="COMB", optimize_lane_name=None, min_vehl_dist=None, min_num_vehicle=None, max_num_vehicle=None, optimize_items=None, scale_factors=None, desc="", id=None)`</font>**

Creates a moving load case according to AASHTO LRFD (PENNDOT) specifications. Supports General Load and Moving Load Optimization.

#### Parameters
* `name` (str): The name of the load case.
* `case_type` (int): Load type selector:
    * `0` — General Load
    * `2` — Moving Load Optimization
* `id` (int, optional): A unique integer ID. Auto-assigned if `None`.
* `comb_option` (str, optional): Accepted values: `"COMBINED"` (or shorthand `"COMB"`) and `"INDEPENDENT"` (or shorthand `"INDE"`). Defaults to `"COMBINED"`.
* `scale_factors` (list, optional): Multiple Presence Factors `[L1, L2, L3, L4, L5, More]`. Defaults to `[1.2, 1, 0.85, 0.65, 0.65, 0.65]`.
* `desc` (str, optional): Description of the load case.

* **General Load (`case_type=0`)**
    * `sub_loads` (list): Each item is `[vehicle_type, vehicle_name, scale_factor, min_loaded_lane, max_loaded_lane, [lane_names]]`.

* **Moving Load Optimization (`case_type=2`)**
    * `optimize_lane_name` (str): Target lane for optimization.
    * `min_vehl_dist` (float): Minimum vehicle distance.
    * `min_num_vehicle` (int): Minimum number of vehicles.
    * `max_num_vehicle` (int): Maximum number of vehicles.
    * `optimize_items` (list): Each item is `[vehicle_type, vehicle_name, scale_factor]`.

#### Examples

```py
# Set PENNDOT standard
MovingLoad.Code("AASHTO LRFD(PENDOT)")

# Example 1: General Load Case (Independent, Single Lane)
MovingLoad.Case.PENNDOT(
    id=1,
    name="C1",
    case_type=0,
    comb_option="INDEPENDENT",
    sub_loads=[["VL", "PHL-93TRK", 1.0, 0, 1, ["L1"]]]
)

# Example 2: General Load Case (Combined, Single Lane)
MovingLoad.Case.PENNDOT(
    id=2,
    name="C2",
    case_type=0,
    comb_option="COMBINED",
    sub_loads=[["VL", "PHS20-FTG", 1.0, 0, 1, ["L2"]]]
)

# Example 3: General Load Case (Multiple Sub-loads, Independent)
MovingLoad.Case.PENNDOT(
    id=3,
    name="C3",
    case_type=0,
    comb_option="INDEPENDENT",
    sub_loads=[
        ["VL", "PHL-93TRK", 1.0, 0, 3, ["L1", "L2", "L3"]],
        ["VL", "PHL-93TRK", 1.0, 0, 1, ["L2"]]
    ]
)

# Create all defined cases in Midas Civil
MovingLoad.Case.create()
```

---

### Taiwan
**<font color="green">`MovingLoad.Case.Taiwan(name, sub_loads=None, comb_option="COMB", scale_factors=None, desc="", id=None)`</font>**

Creates a moving load case according to Taiwan standards. Supports General Load only.

#### Parameters
* `name` (str): The name of the load case.
* `id` (int, optional): A unique integer ID. Auto-assigned if `None`.
* `comb_option` (str, optional): Accepted values: `"COMBINED"` (or shorthand `"COMB"`) and `"INDEPENDENT"` (or shorthand `"INDE"`). Defaults to `"COMBINED"`.
* `scale_factors` (list, optional): Multiple Presence Factors `[L1, L2, L3, L4, L5, More]`. Defaults to `[1, 1, 0.9, 0.75, 0.75, 0.75]`.
* `desc` (str, optional): Description of the load case.
* `sub_loads` (list): Each item is `[vehicle_type, vehicle_name, scale_factor, min_loaded_lane, max_loaded_lane, [lane_names]]`.
    * `vehicle_type` (str): `"VL"` for Vehicle Load, `"VC"` for Vehicle Class.

#### Examples

```py
# Set Taiwan standard
MovingLoad.Code("TAIWAN")

# Example 1: General Load Case (Independent, Single Lane)
MovingLoad.Case.Taiwan(
    id=1,
    name="C1",
    comb_option="INDEPENDENT",
    sub_loads=[["VL", "HS20-44(MS18)", 1.0, 0, 1, ["L2"]]]
)

# Example 2: General Load Case (Multiple Sub-loads, Independent)
MovingLoad.Case.Taiwan(
    id=2,
    name="C2",
    comb_option="INDEPENDENT",
    sub_loads=[
        ["VL", "HS20-44(MS18)", 1.0, 0, 2, ["L1", "L2"]],
        ["VL", "HS20-44(MS18)", 1.0, 0, 3, ["L1", "L2", "L3"]]
    ]
)

# Example 3: General Load Case (Combined)
MovingLoad.Case.Taiwan(
    id=3,
    name="C3",
    comb_option="COMBINED",
    sub_loads=[["VL", "HS20-44(MS18)", 1.0, 0, 1, ["L2"]]]
)

# Create all defined cases in Midas Civil
MovingLoad.Case.create()
```

---

### Canada
**<font color="green">`MovingLoad.Case.Canada(name, case_type, sub_loads=None, comb_option="COMB", permit_vehicle_name=None, ref_lane=None, permit_scale_factor=1.0, optimize_lane_name=None, min_vehl_dist=None, min_num_vehicle=None, max_num_vehicle=None, optimize_items=None, scale_factors=None, desc="", id=None)`</font>**

Creates a moving load case according to Canadian standards. Supports General Load, Permit Vehicle, and Moving Load Optimization.

#### Parameters
* `name` (str): The name of the load case.
* `case_type` (int): Load type selector:
    * `0` — General Load
    * `1` — Load Case for Permit Vehicle
    * `2` — Moving Load Optimization
* `id` (int, optional): A unique integer ID. Auto-assigned if `None`.
* `comb_option` (str, optional): Accepted values: `"COMBINED"` (or shorthand `"COMB"`) and `"INDEPENDENT"` (or shorthand `"INDE"`). Defaults to `"COMBINED"`.
* `scale_factors` (list, optional): Multiple Presence Factors `[L1, L2, L3, L4, L5, More]`. Defaults to `[1, 0.9, 0.8, 0.7, 0.6, 0.55]`.
* `desc` (str, optional): Description of the load case.

* **General Load (`case_type=0`)**
    * `sub_loads` (list): Each item is `[vehicle_type, vehicle_name, scale_factor, min_loaded_lane, max_loaded_lane, [lane_names]]`.

* **Permit Vehicle (`case_type=1`)**
    * `permit_vehicle_name` (str): Name of the permit vehicle load.
    * `ref_lane` (str): Reference lane name.
    * `permit_scale_factor` (float): Scale factor for the permit vehicle. Defaults to `1.0`.

* **Moving Load Optimization (`case_type=2`)**
    * `optimize_lane_name` (str): Target lane for optimization.
    * `min_vehl_dist` (float): Minimum vehicle distance.
    * `min_num_vehicle` (int): Minimum number of vehicles.
    * `max_num_vehicle` (int): Maximum number of vehicles.
    * `optimize_items` (list): Each item is `[vehicle_type, vehicle_name, scale_factor]`.

#### Examples

```py
# Set Canada standard
MovingLoad.Code("CANADA")

# Example 1: General Load Case (Independent, Single Lane)
MovingLoad.Case.Canada(
    id=1,
    name="C1",
    case_type=0,
    comb_option="INDEPENDENT",
    sub_loads=[["VL", "CL-625 Truck", 1.0, 0, 1, ["L1"]]]
)

# Example 2: General Load Case (Combined, Multiple Sub-loads)
MovingLoad.Case.Canada(
    id=2,
    name="C2",
    case_type=0,
    comb_option="COMBINED",
    sub_loads=[
        ["VL", "CL-625 Truck", 1.0, 0, 1, ["L1"]],
        ["VL", "CL-625 Truck", 1.0, 0, 2, ["L2", "L3"]]
    ]
)

# Example 3: General Load Case (Independent, 3 Lanes)
MovingLoad.Case.Canada(
    id=3,
    name="C3",
    case_type=0,
    comb_option="INDEPENDENT",
    sub_loads=[["VL", "CL-625 Truck", 1.0, 0, 3, ["L1", "L2", "L3"]]]
)

# Create all defined cases in Midas Civil
MovingLoad.Case.create()
```

---

### Australia
**<font color="green">`MovingLoad.Case.Australia(name, case_type, sub_loads=None, comb_option="COMB", load_comb_type=1, load_model=0, fatigue=False, permit_vehicle_name=None, ref_lane=None, permit_scale_factor=1.0, optimize_lane_name=None, min_vehl_dist=None, min_num_vehicle=None, max_num_vehicle=None, optimize_items=None, asl_data=None, scale_factors=None, desc="", id=None)`</font>**

Creates a moving load case according to Australian standards. Supports General Load, Permit Vehicle, and Moving Load Optimization across multiple load models.

#### Parameters
* `name` (str): The name of the load case.
* `case_type` (int): Load type selector:
    * `0` — General Load
    * `1` — Load Case for Permit Vehicle
    * `2` — Moving Load Optimization
* `id` (int, optional): A unique integer ID. Auto-assigned if `None`.
* `comb_option` (str, optional): Accepted values: `"COMBINED"` (or shorthand `"COMB"`) and `"INDEPENDENT"` (or shorthand `"INDE"`). Defaults to `"COMBINED"`.
* `scale_factors` (list, optional): Multiple Presence Factors `[L1, L2, L3, L4, L5, More]`. Defaults to `[1, 0.8, 0.4, 0.4, 0.4, 0.4]`.
* `load_comb_type` (int, optional): Type of Load Factor for Design Combination:
    * `0` — Ultimate Limit State
    * `1` — Serviceability Limit State (default)
* `load_model` (int, optional): Select Load Model:
    * `0` — General (default)
    * `1` — Fatigue
    * `2` — Heavy Load Platform
    * `3` — Rail Traffic Load
* `fatigue` (bool, optional): Enable Fatigue Option. Defaults to `False`.
* `desc` (str, optional): Description of the load case.

* **General Load (`case_type=0`)**
    * `sub_loads` (list): Each item is `[vehicle_type, vehicle_name, scale_factor, min_loaded_lane, max_loaded_lane, [lane_names]]`.
    * `asl_data` (list, optional): Required when `load_model=2` (Heavy Load Platform). Simplified format:
        `[multiple_factor, vehicle_name, vehicle_name2, min_lane, max_lane, [na_lane_names], [[strad1_lanes], [strad2_lanes]]]`
        * `multiple_factor` (float): Unobstructed Lane Scale Factor (e.g. `0.5`).
        * `vehicle_name` (str): Heavy Load vehicle name (key `"VEHICLE_LOAD_NAME"`).
        * `vehicle_name2` (str): M1600/S1600 vehicle name (key `"VEHICLE_LOAD_NAME2"`). Use `"NONE"` if not applicable.
        * `min_lane` (int): Minimum number of loaded lanes.
        * `max_lane` (int): Maximum number of loaded lanes.
        * `[na_lane_names]` (list[str]): Selected lane names.
        * `[[strad1_lanes], [strad2_lanes]]` (list[list[str]]): Heavy Load Lane Start and End lane pairs.

* **Permit Vehicle (`case_type=1`)**
    * `permit_vehicle_name` (str): Name of the permit vehicle load.
    * `ref_lane` (str): Reference lane name.
    * `permit_scale_factor` (float): Scale factor. Defaults to `1.0`.

* **Moving Load Optimization (`case_type=2`)**
    * `optimize_lane_name` (str): Target lane for optimization.
    * `min_vehl_dist` (float): Minimum vehicle distance.
    * `min_num_vehicle` (int): Minimum number of vehicles.
    * `max_num_vehicle` (int): Maximum number of vehicles.
    * `optimize_items` (list): Each item is `[vehicle_type, vehicle_name, scale_factor]`.

#### Examples

```py
# Set Australia standard
MovingLoad.Code("AUSTRALIA")

# Example 1: General Load with Heavy Load Platform (load_model=2), 1 Lane
MovingLoad.Case.Australia(
    id=1,
    name="C2",
    case_type=0,
    load_model=2,
    load_comb_type=1,
    comb_option="COMBINED",
    fatigue=False,
    scale_factors=[1, 0.8, 0.4, 0.4, 0.4, 0.4],
    asl_data=[
        0.5,                        # MULTIPLE_FACTOR
        "HLP320",                   # VEHICLE_LOAD_NAME
        "NONE",                     # VEHICLE_LOAD_NAME2
        0,                          # MIN_LOADED_LANE
        1,                          # MAX_LOADED_LANE
        ["L1", "L2"],               # NA_LLAN_NAMES
        [
            ["L1", "L1"],           # STRAD_LLAN1_NAMES
            ["L2", "L2"]            # STRAD_LLAN2_NAMES
        ]
    ]
)

# Example 2: General Load with Heavy Load Platform (load_model=2), 2 Lanes
MovingLoad.Case.Australia(
    id=2,
    name="C6",
    case_type=0,
    load_model=2,
    load_comb_type=0,
    comb_option="COMBINED",
    fatigue=False,
    scale_factors=[1, 0.8, 0.4, 0.4, 0.4, 0.4],
    asl_data=[
        0.5,                        # MULTIPLE_FACTOR
        "HLP320",                   # VEHICLE_LOAD_NAME
        "NONE",                     # VEHICLE_LOAD_NAME2
        0,                          # MIN_LOADED_LANE
        2,                          # MAX_LOADED_LANE
        ["L1", "L2", "L3"],         # NA_LLAN_NAMES
        [
            ["L1", "L2"],           # STRAD_LLAN1_NAMES
            ["L3", "L3"]            # STRAD_LLAN2_NAMES
        ]
    ]
)

# Create all defined cases in Midas Civil
MovingLoad.Case.create()
```

---

### Russia
**<font color="green">`MovingLoad.Case.Russia(name, case_type, sub_loads=None, comb_option="COMB", load_comb_type=0, optimize_lane_name=None, min_vehl_dist=None, min_num_vehicle=None, max_num_vehicle=None, optimize_items=None, desc="", id=None)`</font>**

Creates a moving load case according to Russian standards. Supports General Load and Moving Load Optimization.

#### Parameters
* `name` (str): The name of the load case.
* `case_type` (int): Load type selector:
    * `0` — General Load
    * `2` — Moving Load Optimization
* `id` (int, optional): A unique integer ID. Auto-assigned if `None`.
* `comb_option` (str, optional): Accepted values: `"COMBINED"` (or shorthand `"COMB"`) and `"INDEPENDENT"` (or shorthand `"INDE"`). Defaults to `"COMBINED"`.
* `load_comb_type` (int, optional): Load Combination Type (Limit State Group):
    * `0` — Limit State Group I (default)
    * `1` — Limit State Group I – Fatigue
    * `2` — Limit State Group II
* `desc` (str, optional): Description of the load case.

* **General Load (`case_type=0`)**
    * `sub_loads` (list): Each item is `[vehicle_type, vehicle_name, scale_factor, min_loaded_lane, max_loaded_lane, [lane_names]]`.
        * `vehicle_type` (str): `"VL"` for Vehicle Load, `"VC"` for Vehicle Class.

* **Moving Load Optimization (`case_type=2`)**
    * `optimize_lane_name` (str): Target lane for optimization.
    * `min_vehl_dist` (float): Minimum vehicle distance.
    * `min_num_vehicle` (int): Minimum number of vehicles.
    * `max_num_vehicle` (int): Maximum number of vehicles.
    * `optimize_items` (list): Each item is `[vehicle_type, vehicle_name, scale_factor]`.

#### Examples

```py
# Set Russia standard
MovingLoad.Code("RUSSIA")

# Example 1: General Load Case (Independent, Limit State I-Fatigue)
MovingLoad.Case.Russia(
    id=1,
    name="C1",
    case_type=0,
    comb_option="INDEPENDENT",
    load_comb_type=1,
    sub_loads=[["VL", "AK", 1.0, 0, 1, ["L1"]]]
)

# Example 2: General Load Case (Combined, Limit State Group I)
MovingLoad.Case.Russia(
    id=2,
    name="C2",
    case_type=0,
    comb_option="COMBINED",
    load_comb_type=0,
    sub_loads=[["VL", "AK", 1.0, 0, 3, ["L1", "L2", "L3"]]]
)

# Example 3: General Load Case (Combined, Limit State Group II)
MovingLoad.Case.Russia(
    id=3,
    name="C3",
    case_type=0,
    comb_option="COMBINED",
    load_comb_type=2,
    sub_loads=[["VL", "Uniform Load", 1.0, 0, 1, ["L1"]]]
)

# Create all defined cases in Midas Civil
MovingLoad.Case.create()
```

---

## Class Methods
---

#### create
Creates all defined moving load cases in the Midas Civil model.
```py
# Define cases first
MovingLoad.Case.India(...)
MovingLoad.Case.Eurocode(...)
# Then create them in the model
MovingLoad.Case.create()
```

#### json
Returns a JSON representation of all defined load cases.
```py
case_json = MovingLoad.Case.json()
print(case_json)
```

#### get
Retrieves all moving load case data from the current Midas Civil model.
```py
case_data = MovingLoad.Case.get()
print(case_data)
```

#### sync
Synchronizes load cases from Midas Civil back to the Python script, overwriting any local definitions.
```py
MovingLoad.Case.sync()
# See the synced cases
for case in MovingLoad.Case.cases:
    print(f"Synced Case: {case.params['LCNAME']}")
```

#### delete
Deletes all moving load cases from the Midas Civil model.
```py
MovingLoad.Case.delete()
```

## Examples
---

#### Creating Indian Standard Cases
```py
# Set Indian standards
MovingLoad.Code("INDIA")

# Example 1: General Load Case
MovingLoad.Case.India(
    id=1,
    name="General_IRC_Loading",
    num_loaded_lanes=2,
    opt_auto_ll=False,
    sub_load_items=[
        [1.0, 1, 2, "Class A", ["Lane1", "Lane2"]],
        [0.8, 1, 1, "Class 70R", ["Lane1"]]
    ]
)

# Example 2: Auto Live Load Combination
MovingLoad.Case.India(
    id=2,
    name="Auto_Combination",
    num_loaded_lanes=2,
    opt_auto_ll=True,
    sub_load_items=[
        [1.0, "Class A", "Class B", "Footway", ["Lane1", "Lane2"], ["Footpath1"]]
    ]
)

# Example 3: Permit Vehicle Load
MovingLoad.Case.India(
    id=3,
    name="Permit_Vehicle_Case",
    num_loaded_lanes=1,
    opt_lc_for_permit=True,
    permit_vehicle_id=5,      # Assuming a permit vehicle with ID 5 exists
    ref_lane_id=1,            # Reference lane is Lane1
    eccentricity=0.5,
    permit_scale_factor=1.1
)

# Create all defined Indian cases in Midas Civil
MovingLoad.Case.create()
```

#### Creating Eurocode Standard Cases
```py
# Set European standards
MovingLoad.Code("EUROCODE")

# Example 1: General Load, Load Model 1
MovingLoad.Case.Eurocode(
    id=1,
    name="EC_General_LM1",
    load_model=1,
    use_optimization=False,
    sub_load_items=[
        False,                      # opt_leading
        "LM1_Vehicle",              # vhl_name1
        "",                         # vhl_name2
        ["Lane1"],                  # selected_lanes
        ["Lane2", "Lane3"],         # remaining_area_lanes
        ["Footpath1"]               # footway_lanes
    ]
)

# Example 2: General Load, Load Model 5 (Railway)
MovingLoad.Case.Eurocode(
    id=2,
    name="EC_Railway_LM5",
    load_model=5,
    use_optimization=False,
    sub_load_items=[
        False,                                  # opt_psi_factor
        0,                                      # opt_comb
        [0.8, 0.7, 0.6],                        # scale_factors
        [1.0, 1.0, 0.75],                       # multi_presence_factors
        [("LM71", 1.0, 1, 1, ["Track1"])]       # sub_load_data_list
    ]
)

# Example 3: Moving Load Optimization, Load Model 3
MovingLoad.Case.Eurocode(
    id=3,
    name="EC_Optimized_LM3",
    load_model=3,
    use_optimization=True,
    sub_load_items=[
        True,                       # opt_leading
        "SV196",                    # vhl_name1
        "",                         # vhl_name2
        15.0,                       # min_dist
        "Lane2",                    # opt_lane
        2,                          # loaded_lanes
        ["Lane1", "Lane2", "Lane3"] # selected_lanes
    ]
)

# Create all defined Eurocode cases in Midas Civil
MovingLoad.Case.create()
```