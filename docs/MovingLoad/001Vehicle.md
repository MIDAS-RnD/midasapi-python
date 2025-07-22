# Moving Load Vehicle

A nested class within `MovingLoad` used to create and manage standard vehicle loads for moving load analysis according to country-specific design codes.

## Constructor
---
The main `Vehicle` class is not intended for direct use. Instead, use one of the country-specific subclasses.

## Country-Specific Subclasses
---

### India
**<font color="green">`MovingLoad.Vehicle.India(name, standard_code, vehicle_type, vehicle_name=None, id=None)`</font>**

Creates a vehicle load according to Indian Road Congress (IRC) or Indian Railway Standards (IRS).

#### Parameters
* `name` (str): A unique name for the vehicle load.
* `standard_code` (str): The standard code to use. Available options are `"IRC"`& `"IRS"`
* `vehicle_type` (str): The specific type of vehicle.
    * For `"IRC"`: `"Class A"`, `"Class B"`, `"Class 70R"`, `"Class 40R"`, `"Class AA"`,`"Footway"`.
    * For `"IRS"`: `"BG-1676"`, `"MG-1000"`, `"NG-762"`, `"HML"`, `"FTB"`.
* `vehicle_name` (int, optional): A 1-based index required for the `"IRS"` standard to select a specific vehicle from a list. For example, for `vehicle_type="BG-1676"`, `vehicle_name=1` selects `"Modified B.G. Loading 1987-1"`.
* `id` (int, optional): A unique integer ID for the vehicle. If `None`, it is auto-assigned.

### Eurocode
**<font color="green">`MovingLoad.Vehicle.Eurocode(name, standard_code, vehicle_type, vehicle_name=None, id=None)`</font>**

Creates a vehicle load according to Eurocode standards.

#### Parameters
* `name` (str): A unique name for the vehicle load.
* `standard_code` (str): The Eurocode category. Available options are `"RoadBridge"`, `"FTB"` (Footbridge), `"RoadBridgeFatigue"`, and `"RailTraffic"`.
* `vehicle_type` (str): The specific load model or type (e.g., `"Load Model 1"`, `"Load Model 3"`).
* `vehicle_name` (int, optional): A 1-based index required for vehicle types with a selectable list, such as `"Load Model 3"` or `"HSLM A1 ~ HSLM A10"`.
* `id` (int, optional): A unique integer ID for the vehicle. If `None`, it is auto-assigned.

## Class Methods
---

#### json
Returns a JSON representation of all defined vehicle objects.

```py
# Define a vehicle
MovingLoad.Vehicle.India(
    name="IRC_Class_A", 
    standard_code="IRC", 
    vehicle_type="Class A"
)
# Get JSON representation
vehicle_json = MovingLoad.Vehicle.json()
print(vehicle_json)
```

#### create
Retrieves all lane data from Civil NX.

```py
# Define vehicles first
MovingLoad.Vehicle.India(name="IRC_Class_A", standard_code="IRC", vehicle_type="Class A")

# Create the vehicles in the Midas model
MovingLoad.Vehicle.create()

```

#### get
Retrieves all lane data from Civil NX.

```py
vehicle_data = MovingLoad.Vehicle.get()
print(vehicle_data)

```

#### sync
Synchronizes Vehicle data from Civil NX to Python objects.

```py
# Syncs vehicles from the model into the script's memory
MovingLoad.Vehicle.sync()

# Display the names of synced vehicles
for vehicle in MovingLoad.Vehicle.vehicles:
    print(f"Synced Vehicle: {vehicle.name}")
```

#### delete
Deletes all vehicle from both Python and Civil NX.

```py

# Delete all vehicles in the model
MovingLoad.Vehicle.delete()
```

## Examples
---

#### Creating As per Indian Standard 
```py
# Set the moving load code to India
MovingLoad.Code("INDIA")

# Define an IRC Class 70R vehicle
MovingLoad.Vehicle.India(
    name="IRC_70R_Wheeled",
    standard_code="IRC",
    vehicle_type="Class 70R"
)

# Create the vehicle in Midas Civil
MovingLoad.Vehicle.create()

```

#### Creating As Per Eurocode
```py
# Set the moving load code to Eurocode
MovingLoad.Code("EUROCODE")

# Define a Eurocode Load Model 1
MovingLoad.Vehicle.Eurocode(
    name="EC_Load_Model_1",
    standard_code="RoadBridge",
    vehicle_type="Load Model 1"
)

# Create the vehicle in Midas Civil
MovingLoad.Vehicle.create()
```

