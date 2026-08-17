# Line Load

A nested class within Load used to apply a continuous (line) load across a chain of elements, automatically splitting the load into the correct `Load.Beam` entries on each underlying element.

## Constructor
---
**<font color="green">`Load.Line(element_ids, load_case, load_group = "", D = [0, 1], P = [0, 0], direction = "GZ", type = "UNILOAD", distType = "Abs", use_ecc = False, use_proj = False, eccn_dir = "LY", eccn_type = 1, ieccn = 0, jeccn = 0, adnl_h = False, adnl_h_i = 0, adnl_h_j = 0, id = None)`</font>**

Distributes a load over a list of elements (treated as one continuous chain, in the order given) and internally creates the equivalent `Load.Beam` entries on each affected element.

### Parameters
* `element_ids`: List of element numbers, in sequential order, that make up the continuous member the load is applied to
* `load_case`: Load case name
* `load_group (default="")`: Load group name
* `D (default=[0, 1])`: List of distances along the full chain of elements where the load values in `P` are defined. Interpreted as absolute or relative distances depending on `distType`
* `P (default=[0, 0])`: List of load magnitudes corresponding to each position in `D`
* `direction (default="GZ")`: Load direction ("GX", "GY", "GZ", "LX", "LY", "LZ")
* `type (default="UNILOAD")`: Load type ("UNILOAD" for a uniform/trapezoidal distributed load, "CONLOAD" for concentrated loads at each position in `D`)
* `distType (default="Abs")`: How `D` is interpreted ("Abs" = absolute distance along the chain, "Rel" = relative distance, 0 to 1, along the total chain length)
* `use_ecc (default=False)`: Enable eccentricity
* `use_proj (default=False)`: Enable projection
* `eccn_dir (default="LY")`: Eccentricity direction
* `eccn_type (default=1)`: Eccentricity from offset (1) or centroid (0)
* `ieccn, jeccn (default=0, 0)`: Eccentricity values at i-end and j-end
* `adnl_h (default=False)`: Consider additional height for pressure loads
* `adnl_h_i, adnl_h_j (default=0, 0)`: Additional height values at ends
* `id (default=None)`: Manual ID assignment passed through to the generated `Load.Beam` entries (auto-assigned if empty)

> **Note:** `Load.Line` does not store or track its own data. Each call internally computes the relative position and value on every element the load spans, and creates the corresponding entries via `Load.Beam(...)`. Because of this, `Load.Line` has no `json`, `create`, `get`, `sync`, or `delete` methods, and no dedicated object attributes of its own — use the `Load.Beam` class methods (below) to send, fetch, or manage the resulting loads.

## Methods
---
`Load.Line` has no methods of its own. The loads it generates are added to `Load.Beam`, so use the `Load.Beam` methods to work with them:

#### create
Sends the generated beam loads to Civil NX.

```py
Load.Beam.create()
```

#### get
Fetches beam loads from Civil NX.

```py
print(Load.Beam.get())
```

#### sync
Synchronizes beam loads from Civil NX.

```py
Load.Beam.sync()
```

#### delete
Deletes all beam loads from both Python and Civil NX.

```py
Load.Beam.delete()
```

## Examples
---
#### Uniform Line Load Across Multiple Elements
```py
#Line Load Example - girder split into 3 elements
for i in range(4):
    Node(i*10,0,0)
Node.create()

Element.Beam(1,2)
Element.Beam(2,3)
Element.Beam(3,4)
Element.create()

#Define Load Case
Load_Case("L","Line Load")
Load_Case.create()

#Apply a uniform line load of -30 across the full 30m chain of elements

Load.Line([1,2,3],"Line Load","",[0,30],[-30,-30],"GZ")
Load.Beam.create()
```

#### Trapezoidal Line Load Using Relative Distances
```py
for i in range(4):
    Node(i*10,0,0)
Node.create()

Element.Beam(1,2)
Element.Beam(2,3)
Element.Beam(3,4)
Element.create()

#Define Load Case
Load_Case("L","Trapezoidal Line Load")
Load_Case.create()

#Apply a trapezoidal load using relative positions (0 to 1) along the full chain

Load.Line([1,2,3],"Trapezoidal Line Load","",[0,0.3,0.7,1],[0,-20,-50,0],"GZ","UNILOAD","Rel")
Load.Beam.create()
```

#### Concentrated Loads at Fixed Distances
```py
for i in range(4):
    Node(i*10,0,0)
Node.create()

Element.Beam(1,2)
Element.Beam(2,3)
Element.Beam(3,4)
Element.create()

#Define Load Case
Load_Case("L","Concentrated Line Load")
Load_Case.create()

#Apply concentrated loads at 5m, 15m, and 25m along the chain (absolute distances)

Load.Line([1,2,3],"Concentrated Line Load","",[5,15,25],[-20,-30,-40],"GZ","CONLOAD","Abs")
Load.Beam.create()
```
