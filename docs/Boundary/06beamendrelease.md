# Beam End Release

A nested class within Boundary used to release specific force/moment components at the I-end and/or J-end of a beam element.

## Constructor
---
**<font color="green">`Boundary.BeamEndRelease(beamElemID, type = "Relative", Fx_I = None, Fy_I = None, Fz_I = None, Mx_I = None, My_I = None, Mz_I = None, Mb_I = None, Fx_J = None, Fy_J = None, Fz_J = None, Mx_J = None, My_J = None, Mz_J = None, Mb_J = None, group = "", id = None)`</font>**

Creates beam end releases on a beam element by releasing selected force/moment components at either end.

### Parameters
* `beamElemID`: Element ID of the beam on which the release is applied
* `type (default="Relative")`: Release value type - "Relative" (relative stiffness factor) or "Value" (fixed release value)
* `Fx_I (default=None)`: Axial force release at I-end (DOF is released if a value is provided)
* `Fy_I (default=None)`: Shear force release in Y at I-end
* `Fz_I (default=None)`: Shear force release in Z at I-end
* `Mx_I (default=None)`: Torsional moment release at I-end
* `My_I (default=None)`: Bending moment release about Y at I-end
* `Mz_I (default=None)`: Bending moment release about Z at I-end
* `Mb_I (default=None)`: Bimoment (warping) release at I-end
* `Fx_J (default=None)`: Axial force release at J-end
* `Fy_J (default=None)`: Shear force release in Y at J-end
* `Fz_J (default=None)`: Shear force release in Z at J-end
* `Mx_J (default=None)`: Torsional moment release at J-end
* `My_J (default=None)`: Bending moment release about Y at J-end
* `Mz_J (default=None)`: Bending moment release about Z at J-end
* `Mb_J (default=None)`: Bimoment (warping) release at J-end
* `group (default="")`: Boundary group name
* `id (default=None)`: Manual ID assignment (auto-assigned if None)

### Notes
* Each of the 7 components at an end (`Fx`, `Fy`, `Fz`, `Mx`, `My`, `Mz`, `Mb`) is only released if a numeric value is passed in. Leaving a parameter as `None` keeps that component fixed (not released).
* When `type = "Relative"`, the value supplied for a released component is treated as a relative stiffness factor.
* When `type = "Value"`, the value supplied for a released component is treated as a fixed release value.
* To fully release a component (0 stiffness / 0 value), pass `0` explicitly rather than leaving it as `None`.

### Class Attributes
*Boundary.BeamEndRelease.releases* -> List of all beam end release instances.

### Object Attributes
* `ELEM_ID` (int): The beam element ID on which the release is applied.
* `GROUP_NAME` (str): The name of the boundary group.
* `bVALUE` (bool): `True` if `type = "Value"`, `False` if `type = "Relative"`.
* `FLAG_I` (str): 7-character flag string for the I-end (`Fx, Fy, Fz, Mx, My, Mz, Mb`), '1' if released, '0' if fixed.
* `VALUE_I` (list): Release values at the I-end [Fx, Fy, Fz, Mx, My, Mz, Mb].
* `FLAG_J` (str): 7-character flag string for the J-end (`Fx, Fy, Fz, Mx, My, Mz, Mb`), '1' if released, '0' if fixed.
* `VALUE_J` (list): Release values at the J-end [Fx, Fy, Fz, Mx, My, Mz, Mb].
* `ID` (int): The ID of the beam end release.

## Methods
---
#### json
Returns JSON representation of all beam end releases.

```py
rel1 = Boundary.BeamEndRelease(1, "Relative", My_I=0, Mz_I=0)
print(Boundary.BeamEndRelease.json())
```

#### create
Sends beam end release data to Civil NX.

```py
Boundary.BeamEndRelease.create()
```

#### get
Fetches beam end release data from Civil NX.

```py
print(Boundary.BeamEndRelease.get())
```

#### sync
Synchronizes beam end releases from Civil NX to Python.

```py
Boundary.BeamEndRelease.sync()
```

#### delete
Deletes all beam end releases from both Python and Civil NX.

```py
Boundary.BeamEndRelease.delete()
```


## Examples
---
#### Pinned Connection at I-End (Moment Release)
```py
# Pinned Connection Example

# Create Nodes and Element
Node(0, 0, 0)
Node(5, 0, 0)
Node.create()
Element.Beam(1, 2)
Element.create()

# Release bending moments (My, Mz) at the I-end -> acts as a pin
Boundary.BeamEndRelease(1, "Relative", My_I=0, Mz_I=0)
Boundary.BeamEndRelease.create()
```

#### Release at Both Ends
```py
# Release at Both Ends Example

# Create Nodes and Element
Node(0, 0, 0)
Node(5, 0, 0)
Node.create()
Element.Beam(1, 2)
Element.create()

# Release torsional moment (Mx) at I-end and bending moment (My) at J-end
Boundary.BeamEndRelease(1, "Relative", Mx_I=0, My_J=0)
Boundary.BeamEndRelease.create()
```

#### Release with Fixed Value
```py
# Release with Fixed Value Example

# Create Nodes and Element
Node(0, 0, 0)
Node(5, 0, 0)
Node.create()
Element.Beam(1, 2)
Element.create()

# Release Mz at J-end with a specific release value instead of a relative factor
Boundary.BeamEndRelease(1, "Value", Mz_J=50)
Boundary.BeamEndRelease.create()
```

#### Release Multiple Components at an End
```py
# Release Multiple Components Example

# Create Nodes and Element
Node(0, 0, 0)
Node(5, 0, 0)
Node.create()
Element.Beam(1, 2)
Element.create()

# Release Fx, My and Mz at the I-end
Boundary.BeamEndRelease(1, "Relative", Fx_I=0, My_I=0, Mz_I=0, group="Group1")
Group.create()
Boundary.BeamEndRelease.create()
```
