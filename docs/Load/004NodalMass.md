# Nodal Mass

A nested class within Load used to create nodal mass properties for dynamic analysis.

## Constructor
---
**<font color="green">`Load.NodalMass(mX, mY=0, mZ=0, rmX=0, rmY=0, rmZ=0)`</font>**

Creates nodal mass and converts to JSON format for lumped mass modeling in dynamic analysis.

### Parameters
* `mX`: Translational Lumped Mass in GCS X-direction (Required)
* `mY (default=0)`: Translational Lumped Mass in GCS Y-direction
* `mZ (default=0)`: Translational Lumped Mass in GCS Z-direction
* `rmX (default=0)`: Rotational Mass Moment of Inertia about GCS X-axis
* `rmY (default=0)`: Rotational Mass Moment of Inertia about GCS Y-axis
* `rmZ (default=0)`: Rotational Mass Moment of Inertia about GCS Z-axis

### Object Attributes
* `MX` (float): Translational lumped mass in the global X direction.
* `MY` (float): Translational lumped mass in the global Y direction.
* `MZ` (float): Translational lumped mass in the global Z direction.
* `RMX` (float): Rotational mass moment of inertia about the global X axis.
* `RMY` (float): Rotational mass moment of inertia about the global Y axis.
* `RMZ` (float): Rotational mass moment of inertia about the global Z axis.

## Methods
---
#### json
Returns JSON representation of nodal mass properties.

```py
nm1 = Load.NodalMass(1.5, 2.0, 3.0, 0.1, 0.2, 0.3)
print(Load.NodalMass.json())
```

#### create
Sends nodal mass properties to Civil NX.

```py
Load.NodalMass.create()
```

#### get
Fetches nodal mass properties from Civil NX.

```py
print(Load.NodalMass.get())
```

#### sync
Synchronizes nodal mass properties from Civil NX.

```py
Load.NodalMass.sync()
```

#### delete
Deletes all nodal mass properties from both Python and Civil NX.

```py
Load.NodalMass.delete()
```

## Examples
---
```py
# Nodal Mass Example
# Create nodes first
for i in range(2):
    Node(i*10, 0, 0)
Node.create()

# Define Nodal Mass - Translational only
Load.NodalMass(1.5)  # Only X-direction mass
Load.NodalMass.create()

# Define Nodal Mass - All translational components
Load.NodalMass(1.5, 2.0, 3.0)
Load.NodalMass.create()

# Define Nodal Mass - With rotational inertia
Load.NodalMass(1.5, 2.0, 3.0, 0.1, 0.2, 0.3)
Load.NodalMass.create()

```