# HY Result Graph

A nested class within `HoH` (Heat of Hydration) used to define time-history result graphs for individual nodes from Heat of Hydration stage analysis.

## Constructor
---

Defines a result graph for a specified node and stress component.

**`HoH.HY_Result_Graph(node_id, Stress_component, id = None)`**

#### Parameters
* `node_id`: Node number, or a list/tuple/set of node numbers, to be displayed in the graph.
* `Stress_component`: Stress component to be plotted. Expected values:  
&emsp;&emsp;&emsp;&emsp;
'Sig_xx' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'Sig_yy'  <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'Sig_zz'  <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'Max'  <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'Sig_P1'  <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'Sig_P2'  <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'Sig_P3'  
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

!!! info "Note."
    This constructor defines graphs by Node only. `ELEM_KEY` is always set to `0` and `TYPE` is always set to `0` (Node), as Element-based result graphs are not supported by this constructor.

#### Class Attributes
*HoH.HY_Result_Graph.data* -> List of all HY Result Graph instances.

#### Object Attributes
* `ID` (int): The ID of the result graph entry.
* `NAME` (str): The name of the graph, auto-generated as `"N{node_id} - <component>"` based on the node and stress component (e.g. `"N1476 - X"`, `"N1476 - Max"`).
* `TYPE` (int): The node/element type. Always `0` (Node).
* `NODE_ID` (int): The node number displayed in the graph.
* `ELEM_KEY` (int): The element number. Always `0`, since this constructor only supports node-based graphs.
* `COMP` (int): The internally mapped stress component index (`Sig_xx`=0, `Sig_yy`=1, `Sig_zz`=2, `Max`=3, `Sig_P1`=4, `Sig_P2`=5, `Sig_P3`=6).

---

## Methods
---
#### json
Generates the properly formatted JSON payload for MidasAPI.

```py
g1 = HoH.HY_Result_Graph(1476, "Sig_xx")
print(HoH.HY_Result_Graph.json())
```

#### create
Sends the PUT request to create all stored HY Result Graph objects in Civil NX.

```py
HoH.HY_Result_Graph.create()
```

#### get
Retrieves the HY Result Graph configuration from Civil NX.

```py
print(HoH.HY_Result_Graph.get())
```

#### sync
Fetches data from Civil NX and reconstructs the local class instances.

```py
HoH.HY_Result_Graph.sync()
```

#### delete
Deletes all HY Result Graph objects from both Python and Civil NX.

```py
HoH.HY_Result_Graph.delete()
```

#### clear
Clears all locally stored HY Result Graph objects without affecting the Civil NX database.

```py
HoH.HY_Result_Graph.clear()
```

## Examples
---
```py
HoH.HY_Result_Graph(node_id=1476, Stress_component="Sig_xx")

HoH.HY_Result_Graph(node_id=[1988, 2308, 2818], Stress_component="Max")

HoH.HY_Result_Graph.create()
```