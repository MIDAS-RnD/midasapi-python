# Time History Case



## Damping Control

### Modal Damping

#### Constructor

**`TH.Damping.Modal(dampRatioAllMode=0.05, ModeDampingOverrides=None)`**

Constructs Damping control with Modal damping

#### Parameters
* `dampRatioAllMode`: Damping ratio applied to all modes. Default is `0.05` (5% damping).
* `ModeDampingOverrides`: Optional list of `(ModeNumber, DampingRatio)` tuples to override the damping ratio for specific modes, e.g. `[(1, 0.006), (2, 0.007)]`.

#### Example
```py
damp = TH.Damping.Modal(
    dampRatioAllMode=0.05,
    ModeDampingOverrides=[(1, 0.006), (2, 0.007)]
)
TH.Case.LinearModal(Name="TH_1", damping_control=damp)
```

---

### Mass and Stiffness Proportional Damping

#### Constructor

**`TH.Damping.MassStiffness(inpType=1, massProp=None, stiffProp=None, freq1=None, damp1=0, freq2=None, damp2=0, period1=None, period2=None)`**

Constructs Damping control with Mass & Stiffness (Rayleigh) Proportional damping

#### Parameters
* `inpType`: Damping input method/type.  
&emsp;&emsp;&emsp;&emsp;
1 : Constant (Direct Specification) <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
2 : Frequency-Proportional (Calc. from Frequency/Period)
* `massProp`: Mass proportional damping coefficient. Used when `inpType=1`.
* `stiffProp`: Stiffness proportional damping coefficient. Used when `inpType=1`.
* `freq1`: First reference frequency for damping calculation. Used when `inpType=2`.
* `damp1`: Damping ratio corresponding to `freq1` (or `period1`).
* `freq2`: Second reference frequency for damping calculation. Used when `inpType=2`.
* `damp2`: Damping ratio corresponding to `freq2` (or `period2`).
* `period1`: First reference period for damping calculation. Alternative to `freq1` — used when `inpType=2`.
* `period2`: Second reference period for damping calculation. Alternative to `freq2` — used when `inpType=2`.

> Provide either `freq1`/`freq2` **or** `period1`/`period2`, not both.

#### Example
```py
# Constant Mass & Stiffness Proportional damping
damp1 = TH.Damping.MassStiffness(inpType=1, massProp=0, stiffProp=0)

# Frequency-Proportional damping, by frequency
damp2 = TH.Damping.MassStiffness(
    inpType=2, freq1=1, damp1=0.05, freq2=5, damp2=0.05
)

TH.Case.LinearDirectInt(Name="TH_2", damping_control=damp1, time_integration_params="CONSTANT")
```

---

### Strain Energy Proportional Damping

#### Constructor

**`TH.Damping.StrainEnergy()`**

Constructs Damping control with Strain Energy Proportional damping

#### Example
```py
damp = TH.Damping.StrainEnergy()
TH.Case.LinearModal(Name="TH_3", damping_control=damp)
```

---

### Element Mass and Stiffness Proportional Damping

#### Constructor

**`TH.Damping.ElementMassStiffness()`**

Constructs Damping control with Element-Level Mass & Stiffness Proportional damping

#### Example
```py
damp = TH.Damping.ElementMassStiffness()
TH.Case.LinearModal(Name="TH_4", damping_control=damp)
```

---


## Load Control
---

### Initial Load (Global Control)

#### Constructor

**`TH.InitialLoad_Control(Use_Initial_Load=True, Cumulate_DVA_Results=False, Keep_Final_Step_Loads_Constant=False, Geometricnonlinearity_type=False)`**

Constructs a starting condition control that begins the case from the Initial Load (Global Control) condition

#### Parameters
* `Use_Initial_Load`: Whether to use the Initial Load (Global Control) option.
* `Cumulate_DVA_Results`: Cumulate the Displacement/Velocity/Acceleration results. Applied only when `Use_Initial_Load=True`.
* `Keep_Final_Step_Loads_Constant`: Keep the loads of the final step constant for the remainder of the analysis. Applied only when `Use_Initial_Load=True`.
* `Geometricnonlinearity_type`: Geometric nonlinearity control.  
&emsp;&emsp;&emsp;&emsp;
False : Standard <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
True : Large Displacement

#### Example
```py
ilc = TH.InitialLoad_Control(
    Use_Initial_Load=True,
    Cumulate_DVA_Results=True,
    Keep_Final_Step_Loads_Constant=False
)
TH.Case.NonLinearDirectInt(
    Name="TH_Seismic_2",
    endTime=30,
    timeIncrement=0.001,
    subsequent_control=ilc,
    damping_control=TH.Damping.MassStiffness(inpType=1, massProp=0, stiffProp=0),
    time_integration_params="CONSTANT"
)
```

---

### Subsequent Control

#### Constructor

**`TH.Subsequent_Control(load_case=None, Initial_element_forces_table=False, Initial_forces_geometric_stiffness=False, Geometricnonlinearity_type=False)`**

Constructs Subsequent Control data.

#### Parameters
* `load_case`: List `[LoadCaseType, LoadCaseName]` identifying the preceding load case to continue from, e.g. `["ST", "SIDL"]`. If `LoadCaseType` is `"TH"`, two optional input can be add in list: `[LoadCaseType, LoadCaseName, Cumulate_DVA_Results, Keep_Final_Step_Loads_Constant]`.
* `Initial_element_forces_table`: Continue from the Initial Element Forces (Table). Only valid when `Geometricnonlinearity_type=False`.
* `Initial_forces_geometric_stiffness`: Continue using Initial Forces for Geometric Stiffness. Only valid when `Geometricnonlinearity_type=True`.
* `Geometricnonlinearity_type`: Geometric nonlinearity control.  
&emsp;&emsp;&emsp;&emsp;
False : Standard <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
True : Large Displacement


#### Example
```py
# 1.With the Static Load Case
sc1 = TH.Subsequent_Control(load_case=["ST", "Case Name"])
TH.Case.LinearModal(Name="TH_A", THtype="Periodic", subsequent_control=sc1)

# 2. With the Initial Element Forces (Table)
sc2 = TH.Subsequent_Control(Initial_element_forces_table=True)
TH.Case.LinearModal(Name="TH_B", THtype="Periodic", subsequent_control=sc2)
```

---


## Nonlinear Iteration Control
---

#### Constructor

**`TH.NonlinearIteration_Control(Maximum_Iteration=10, Minimum_Step_Size=1e-05, Max_num_of_sub_steps=10, Displacement_norm=None, Force_norm=None, Energy_norm=None, Startline_search_Iteration=None, Runge_kutta_method="FEHLBERG", Tolerance=1e-08, Check_Convergence=True)`**

Constructs the nonlinear iteration/convergence settings used by nonlinear Time History cases

#### Parameters
* `Maximum_Iteration`: Maximum number of iterations per step.
* `Minimum_Step_Size`: Minimum allowable sub-step size. Not applied for `NonLinearStatic` cases.
* `Max_num_of_sub_steps`: Maximum number of sub-steps.
* `Displacement_norm`: Convergence tolerance for the displacement norm. If **None**, the displacement norm check is disabled.
* `Force_norm`: Convergence tolerance for the force norm. If **None**, the force norm check is disabled.
* `Energy_norm`: Convergence tolerance for the energy norm. If **None**, the energy norm check is disabled.
* `Startline_search_Iteration`: Iteration number at which line search begins. If **None**, line search is disabled.
* `Runge_kutta_method`: Runge-Kutta integration method.  
&emsp;&emsp;&emsp;&emsp;
'FEHLBERG' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'CASHKARP'
* `Tolerance`: Convergence tolerance.
* `Check_Convergence`: Enables convergence checking.

#### Example
```py
nl_iter = TH.NonlinearIteration_Control(
    Maximum_Iteration=10,
    Minimum_Step_Size=1e-05,
    Displacement_norm=0.001,
    Force_norm=0.001,
    Runge_kutta_method="FEHLBERG",
    Tolerance=1e-08,
    Check_Convergence=False
)
TH.Case.NonLinearModal(
    Name="TH_NL_1",
    endTime=22,
    timeIncrement=0.0001,
    damping_control=TH.Damping.Modal(dampRatioAllMode=0.0106079),
    NonlinearIteration_Control=nl_iter
)
```

---


## Case

### Linear Modal

#### Constructor

**`TH.Case.LinearModal(Name, THtype='Transient', endTime=1, timeIncrement=0.01, stepIncOutput=1, subsequent_control=None, damping_control=None, id=None)`**

Constructs a Linear Time History Load Case

#### Parameters
* `Name`: Name of the time history load case.
* `THtype`: Time history analysis type.  
&emsp;&emsp;&emsp;&emsp;
'Transient' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'Periodic'
* `endTime`: Analysis end time.
* `timeIncrement`: Time step increment.
* `stepIncOutput`: Output every N-th step.
* `subsequent_control`: Starting condition control object — `TH.InitialLoad_Control` or `TH.Subsequent_Control`.
* `damping_control`: Damping control object — `TH.Damping.Modal`, `.MassStiffness`, `.StrainEnergy`, or `.ElementMassStiffness`.
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Example
```py
TH.Case.LinearModal(
    Name="TH_Modal_1",
    THtype="Transient",
    endTime=42,
    timeIncrement=0.0001,
    stepIncOutput=1,
    subsequent_control=None,
    damping_control=TH.Damping.Modal(dampRatioAllMode=0.0106079)
)
TH.Case.create()
```

---

### Nonlinear Modal

#### Constructor

**`TH.Case.NonLinearModal(Name, endTime=1, timeIncrement=0.01, stepIncOutput=1, subsequent_control=None, damping_control=None, NonlinearIteration_Control=None, id=None)`**

Constructs a Nonlinear Time History Load Case (Transient only)

#### Parameters
* `Name`: Name of the time history load case.
* `endTime`: Analysis end time.
* `timeIncrement`: Time step increment.
* `stepIncOutput`: Output every N-th step.
* `subsequent_control`: Starting condition control object — `TH.InitialLoad_Control` or `TH.Subsequent_Control`.
* `damping_control`: Damping control object.
* `NonlinearIteration_Control`: Nonlinear iteration control object — `TH.NonlinearIteration_Control`.
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Example
```py
TH.Case.NonLinearModal(
    Name="TH_NLModal_1",
    endTime=32,
    timeIncrement=0.0001,
    stepIncOutput=1,
    subsequent_control=None,
    damping_control=TH.Damping.Modal(dampRatioAllMode=0.0106079),
    NonlinearIteration_Control=TH.NonlinearIteration_Control(
        Maximum_Iteration=10,
        Displacement_norm=0.001,
        Check_Convergence=False
    )
)
TH.Case.create()
```

---

### Linear Direct Integration

#### Constructor

**`TH.Case.LinearDirectInt(Name, endTime=1, timeIncrement=0.01, stepIncOutput=1, subsequent_control=None, damping_control=None, time_integration_params="LINEAR", id=None)`**

Constructs a Linear, Direct-Integration Time History Load Case

#### Parameters
* `Name`: Name of the time history load case.
* `endTime`: Analysis end time.
* `timeIncrement`: Time step increment.
* `stepIncOutput`: Output every N-th step.
* `subsequent_control`: Starting condition control object — `TH.InitialLoad_Control` or `TH.Subsequent_Control`.
* `damping_control`: Damping control object.
* `time_integration_params`: Newmark integration parameters.  
&emsp;&emsp;&emsp;&emsp;
'CONSTANT' : Average (Constant) Acceleration <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'LINEAR' : Linear Acceleration <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
`(GAMMA, BETA)` : User Input
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Example
```py
TH.Case.LinearDirectInt(
    Name="TH_Direct_1",
    endTime=34,
    timeIncrement=0.0001,
    stepIncOutput=1,
    subsequent_control=None,
    damping_control=TH.Damping.MassStiffness(inpType=1, massProp=0, stiffProp=0),
    time_integration_params="CONSTANT"
)
TH.Case.create()
```

---

### Nonlinear Direct Integration

#### Constructor

**`TH.Case.NonLinearDirectInt(Name, endTime=1, timeIncrement=0.01, stepIncOutput=1, subsequent_control=None, damping_control=None, time_integration_params="LINEAR", NonlinearIteration_Control=None, damping_matrix_update="NO", id=None)`**

Constructs a Nonlinear, Direct-Integration Time History Load Case

#### Parameters
* `Name`: Name of the time history load case.
* `endTime`: Analysis end time.
* `timeIncrement`: Time step increment.
* `stepIncOutput`: Output every N-th step.
* `subsequent_control`: Starting condition control object — `TH.InitialLoad_Control` or `TH.Subsequent_Control`.
* `damping_control`: Damping control object.
* `time_integration_params`: Newmark integration parameters.  
&emsp;&emsp;&emsp;&emsp;
'CONSTANT' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'LINEAR' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
`(GAMMA, BETA)`
* `NonlinearIteration_Control`: Nonlinear iteration control object.
* `damping_matrix_update`: Update the damping matrix at each step.  
&emsp;&emsp;&emsp;&emsp;
'YES' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'NO'
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.

#### Example
```py
TH.Case.NonLinearDirectInt(
    Name="TH_NLDirect_1",
    endTime=30,
    timeIncrement=0.0001,
    stepIncOutput=1,
    subsequent_control=TH.InitialLoad_Control(Use_Initial_Load=True),
    damping_control=TH.Damping.MassStiffness(inpType=1, massProp=0, stiffProp=0),
    time_integration_params="CONSTANT",
    NonlinearIteration_Control=TH.NonlinearIteration_Control(Maximum_Iteration=10),
    damping_matrix_update="NO"
)
TH.Case.create()
```

---

### Nonlinear Static

#### Constructor

**`TH.Case.NonLinearStatic(Name, endTime=1, incrementSteps=1, subsequent_control=None, load_control_scale_factor=1, global_control_maximum_translation_displacement=0, master_node_control=None, load_output_option=False, NonlinearIteration_Control=True, id=None)`**

Constructs a Nonlinear Static Time History Load Case

#### Parameters
* `Name`: Name of the time history load case.
* `endTime`: Analysis end time.
* `incrementSteps`: Number of increment steps.
* `subsequent_control`: Starting condition control object — `TH.InitialLoad_Control` or `TH.Subsequent_Control`.
* `load_control_scale_factor`: Scale factor used when Load Control governs the increment.
* `global_control_maximum_translation_displacement`: Maximum translational displacement for Global (Displacement) Control. Non-zero enables Global Control.
* `master_node_control`: Tuple `(MasterNode, Direction, TargetIncrement)` enabling Master-Node Displacement Control.
* `load_output_option`: Output cumulative load results.
* `NonlinearIteration_Control`: Nonlinear iteration control object. If a plain truthy value is passed instead of a control object, a built-in default iteration setting is used.
* `id`: Manually assign an ID. If **None**, ID will be auto-assigned.


#### Example
```py
TH.Case.NonLinearStatic(
    Name="TH_NLStatic_1",
    endTime=1,
    incrementSteps=1,
    subsequent_control=TH.InitialLoad_Control(Use_Initial_Load=True),
    load_control_scale_factor=1,
    load_output_option=False,
    NonlinearIteration_Control=TH.NonlinearIteration_Control(Maximum_Iteration=10)
)
TH.Case.create()
```

---

### Methods
*(Shared across all five case types above — `LinearModal`, `NonLinearModal`, `LinearDirectInt`, `NonLinearDirectInt`, `NonLinearStatic`)*

#### json
Returns JSON representation of all Time History Load Cases.
```py
print(TH.Case.json())
```
#### create
Sends all Time History Load Cases to Civil NX.
```py
TH.Case.create()
```
#### get
Fetches Time History Load Case data from Civil NX.
```py
print(TH.Case.get())
```
#### sync
Synchronizes Time History Load Cases from Civil NX, rebuilding the correct case type along with its `Damping`, `InitialLoad_Control`/`Subsequent_Control`, and `NonlinearIteration_Control` sub-objects.
```py
TH.Case.sync()
```
#### delete
Deletes all Time History Load Cases from both Python and Civil NX.
```py
TH.Case.delete()
```

---

### Examples
```py

# 1. Linear Modal, Transient, Modal damping
TH.Case.LinearModal(
    Name="TH_Modal_1",
    THtype="Transient",
    endTime=42,
    timeIncrement=0.0001,
    damping_control=TH.Damping.Modal(0.0106079)
)

# 2. Linear Direct Integration, Mass & Stiffness (constant) damping
TH.Case.LinearDirectInt(
    Name="TH_Direct_1",
    endTime=34,
    timeIncrement=0.0001,
    damping_control=TH.Damping.MassStiffness(inpType=1, massProp=0, stiffProp=0),
    time_integration_params="CONSTANT"
)

# 3. Nonlinear Modal, Modal damping, with nonlinear iteration control
TH.Case.NonLinearModal(
    Name="TH_NLModal_1",
    endTime=32,
    timeIncrement=0.0001,
    damping_control=TH.Damping.Modal(0.0106079),
    NonlinearIteration_Control=TH.NonlinearIteration_Control(
        Maximum_Iteration=10,
        Displacement_norm=0.001,
        Check_Convergence=False
    )
)

# 4. Nonlinear Direct Integration, subsequent to Initial Load
TH.Case.NonLinearDirectInt(
    Name="TH_NLDirect_1",
    endTime=30,
    timeIncrement=0.0001,
    subsequent_control=TH.InitialLoad_Control(Use_Initial_Load=True),
    damping_control=TH.Damping.MassStiffness(inpType=1, massProp=0, stiffProp=0),
    time_integration_params="CONSTANT",
    NonlinearIteration_Control=TH.NonlinearIteration_Control(Maximum_Iteration=10),
    damping_matrix_update="NO"
)

# 5. Nonlinear Static, Load Control, subsequent to Initial Load
TH.Case.NonLinearStatic(
    Name="TH_NLStatic_1",
    subsequent_control=TH.InitialLoad_Control(Use_Initial_Load=True),
    load_control_scale_factor=1,
    NonlinearIteration_Control=TH.NonlinearIteration_Control(Maximum_Iteration=10)
)

TH.Case.create()

```