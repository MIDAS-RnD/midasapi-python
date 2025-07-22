# Moving Load Case

A nested class within `MovingLoad` used to define and manage moving load cases for analysis, with support for country-specific standards like Indian and Eurocode.

## Constructor
---
The main `Case` class constructor is for internal use. Please use the country-specific subclasses `MovingLoad.Case.India` or `MovingLoad.Case.Eurocode` to create load cases.

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