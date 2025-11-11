# Result Table

The `Result.TABLE` class provides specialized methods to fetch various types of result tables from MIDAS CIVIL NX, including reactions, displacements, forces, and stresses for different element types.

---

## Reaction

Fetches Reaction result tables (Global, Local, or Surface Spring).

**`Result.TABLE.Reaction(keys=[], loadcase=[], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None, type="Global")`**

### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Node IDs or a Structure Group Name. Default: All nodes.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)", "LL(ST)"]`. Default: All load cases.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`activationCSstep`** (`bool`): Activate construction stage steps. Default: `False`.

- **`stage_step`** (`list[str]`): List of stage steps. Example: `["CS1:001(first)", "CS2:003"]`. Default: `[]`.

- **`number_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`digit`** (`int`): Number of decimal places (0-15). Default: `5`.

- **`output_path_json`** (`str`): Optional. File path to save the raw JSON response.

- **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file.

- **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`.

- **`type`** (`str`): Reaction type. Options: `Global`, `Local`, `SurfaceSpring`. Default: `Global`.

#### Returns
- **Polars DataFrame**: A DataFrame containing the reaction result table.

### Example Usage

```python
# Get global reactions for specific nodes
reaction_df = Result.TABLE.Reaction(
    keys=[1, 2, 3, 10],
    loadcase=["Dead Load(ST)", "Live Load(ST)"],
    type="Global"
)
print(reaction_df)

# Export reaction table to Excel
Result.TABLE.Reaction(
    loadcase=["DL(ST)", "LL(ST)"],
    output_path_excel="reactions.xlsx"
)
```

---

## Displacement

Fetches Displacement result tables (Global or Local).

**`Result.TABLE.Displacement(keys=[], loadcase=[], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], displacement_type="Accumulative", number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None, type="Global")`**

### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Node IDs or a Structure Group Name. Default: All nodes.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Self(ST)", "Wind(ST)"]`. Default: All load cases.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`activationCSstep`** (`bool`): Activate construction stage steps. Default: `False`.

- **`stage_step`** (`list[str]`): List of stage steps. Example: `["CS1:001(first)"]`. Default: `[]`.

- **`displacement_type`** (`str`): Displacement option. Options: `Accumulative`, `Current`, `Real`. Default: `Accumulative`.

- **`number_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`digit`** (`int`): Number of decimal places (0-15). Default: `5`.

- **`output_path_json`** (`str`): Optional. File path to save the raw JSON response.

- **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file.

- **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`.

- **`type`** (`str`): Displacement type. Options: `Global`, `Local`. Default: `Global`.

#### Returns
- **Polars DataFrame**: A DataFrame containing the displacement result table.

### Example Usage

```python
# Get global displacements with accumulative type
disp_df = Result.TABLE.Displacement(
    keys=[5, 6, 7],
    loadcase=["Self(ST)", "Wind(ST)"],
    displacement_type="Accumulative",
    type="Global"
)
print(disp_df)

# Export displacements for construction stages
Result.TABLE.Displacement(
    activationCSstep=True,
    stage_step=["CS1:001(first)", "CS2:003"],
    output_path_excel="displacements_cs.xlsx"
)
```

---

## TrussForce

Fetches Truss Force result tables.

**`Result.TABLE.TrussForce(keys=[], loadcase=[], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)", "LL(ST)"]`. Default: All load cases.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`activationCSstep`** (`bool`): Activate construction stage steps. Default: `False`.

- **`stage_step`** (`list[str]`): List of stage steps. Example: `["CS1:001(first)"]`. Default: `[]`.

- **`number_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`digit`** (`int`): Number of decimal places (0-15). Default: `5`.

- **`output_path_json`** (`str`): Optional. File path to save the raw JSON response.

- **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file.

- **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`.

#### Returns
- **Polars DataFrame**: A DataFrame containing the truss force result table.

### Example Usage

```python
# Get truss forces for specific elements
truss_df = Result.TABLE.TrussForce(
    keys=[101, 102, 103, 104],
    loadcase=["Dead Load(ST)", "Live Load(ST)"]
)
print(truss_df)

# Save to Excel with custom formatting
Result.TABLE.TrussForce(
    keys="TrussGroup1",
    number_format="Scientific",
    digit=3,
    output_path_excel="truss_forces.xlsx"
)
```

---

## TrussStress

Fetches Truss Stress result tables.

**`Result.TABLE.TrussStress(keys=[], loadcase=[], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)", "LL(ST)"]`. Default: All load cases.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`activationCSstep`** (`bool`): Activate construction stage steps. Default: `False`.

- **`stage_step`** (`list[str]`): List of stage steps. Example: `["CS1:001(first)"]`. Default: `[]`.

- **`number_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`digit`** (`int`): Number of decimal places (0-15). Default: `5`.

- **`output_path_json`** (`str`): Optional. File path to save the raw JSON response.

- **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file.

- **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`.

#### Returns
- **Polars DataFrame**: A DataFrame containing the truss stress result table.

### Example Usage

```python
# Get truss stresses for all elements
stress_df = Result.TABLE.TrussStress(
    loadcase=["DL(ST)", "Wind(ST)", "LCB1(CB:max)"]
)
print(stress_df)

# Export with construction stages
Result.TABLE.TrussStress(
    keys=[101, 102, 103],
    activationCSstep=True,
    stage_step=["CS3:001(first)"],
    output_path_excel="truss_stress_cs.xlsx"
)
```

---

## BeamForce

Fetches standard Beam Force result tables.

**`Result.TABLE.BeamForce(keys=[], loadcase=[], parts=["PartI", "PartJ"], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Selfweight(ST)", "WindX(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`. Default: `["PartI", "PartJ"]`.

- **`section_position`** (`list[str]`): Section positions. Options: `Pos-1` through `Pos-10`, `Max`, `Min`, `All`. Default: `['All']`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`activationCSstep`** (`bool`): Activate construction stage steps. Default: `False`.

- **`stage_step`** (`list[str]`): List of stage steps. Example: `["CS3:001(first)"]`. Default: `[]`.

- **`number_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`digit`** (`int`): Number of decimal places (0-15). Default: `5`.

- **`output_path_json`** (`str`): Optional. File path to save the raw JSON response.

- **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file.

- **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`.

#### Returns
- **Polars DataFrame**: A DataFrame containing the PSC beam stress result table.

### Example Usage

```python
# Get PSC stress at all section positions
psc_stress = Result.TABLE.BeamStress_PSC(
    keys=[501, 502, 503],
    loadcase=["Selfweight(ST)", "Prestress(ST)"],
    section_position=['All']
)
print(psc_stress)

# Get max/min stresses with construction stages
Result.TABLE.BeamStress_PSC(
    keys="PSC_Group",
    section_position=["Max", "Min"],
    activationCSstep=True,
    stage_step=["CS3:001(first)", "CS4:002"],
    output_path_excel="psc_stress.xlsx"
)
```

---

## BeamStress_7DOF_PSC

Fetches Beam Stress (7th DOF PSC) result tables for prestressed concrete elements with 7DOF consideration.

**`Result.TABLE.BeamStress_7DOF_PSC(keys=[], loadcase=[], parts=["PartI", "PartJ"], section_position=['All'], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["EccentricLoads(ST)", "Prestress(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`. Default: `["PartI", "PartJ"]`.

- **`section_position`** (`list[str]`): Section positions. Options: `Pos-1` through `Pos-10`, `Max`, `Min`, `All`. Default: `['All']`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`activationCSstep`** (`bool`): Activate construction stage steps. Default: `False`.

- **`stage_step`** (`list[str]`): List of stage steps. Example: `["CS3:001(first)"]`. Default: `[]`.

- **`number_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`digit`** (`int`): Number of decimal places (0-15). Default: `5`.

- **`output_path_json`** (`str`): Optional. File path to save the raw JSON response.

- **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file.

- **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`.

#### Returns
- **Polars DataFrame**: A DataFrame containing the 7DOF PSC beam stress result table.

### Example Usage

```python
# Get 7DOF PSC stress at specific positions
stress_7dof_psc = Result.TABLE.BeamStress_7DOF_PSC(
    keys=[601, 602, 603],
    loadcase=["EccentricLoads(ST)", "Prestress(ST)"],
    section_position=["Pos-1", "Pos-5", "Pos-10"]
)
print(stress_7dof_psc)

# Export all positions with construction stages
Result.TABLE.BeamStress_7DOF_PSC(
    keys="PSC_7DOF_Group",
    section_position=['All'],
    activationCSstep=True,
    stage_step=["CS3:001(first)"],
    output_path_excel="7dof_psc_stress.xlsx"
)
```

## BeamForce_VBM

Fetches Beam Force (View by Max Value) result tables.

**`Result.TABLE.BeamForce_VBM(keys=[], loadcase=[], items=['all'], parts=["PartI", "PartJ"], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["STLENV_STR(CB:max)"]`. Default: All load cases.

- **`items`** (`list[str]`): Items to display. Options: `Axial`, `Shear-y`, `Shear-z`, `Torsion`, `Moment-y`, `Moment-z`. Default: `['all']`.

- **`parts`** (`list[str]`): Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`, `Max`, `Min`. Default: `["PartI", "PartJ"]`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`activationCSstep`** (`bool`): Activate construction stage steps. Default: `False`.

- **`stage_step`** (`list[str]`): List of stage steps. Example: `["CS1:001(first)"]`. Default: `[]`.

- **`number_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`digit`** (`int`): Number of decimal places (0-15). Default: `5`.

- **`output_path_json`** (`str`): Optional. File path to save the raw JSON response.

- **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file.

- **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam force (VBM) result table.

### Example Usage

```python
# View maximum moment and shear values
vbm_df = Result.TABLE.BeamForce_VBM(
    keys=[201, 202, 203],
    loadcase=["STLENV_STR(CB:max)"],
    items=["Moment-z", "Shear-y"]
)
print(vbm_df)

# Get envelope results for all items
Result.TABLE.BeamForce_VBM(
    loadcase=["ENV_MAX(CB:max)", "ENV_MIN(CB:min)"],
    items=['all'],
    parts=["Max", "Min"],
    output_path_excel="beam_envelope.xlsx"
)
```

---

## BeamForce_StaticPrestress

Fetches Beam Force (Static Prestress) result tables.

**Note:** Construction Stage options are not applicable to this table type.

**`Result.TABLE.BeamForce_StaticPrestress(keys=[], loadcase=[], parts=["PartI", "PartJ"], components=['all'], force_unit='KN', len_unit='M', number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Prestress(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`. Default: `["PartI", "PartJ"]`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`number_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`digit`** (`int`): Number of decimal places (0-15). Default: `5`.

- **`output_path_json`** (`str`): Optional. File path to save the raw JSON response.

- **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file.

- **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`.

#### Returns
- **Polars DataFrame**: A DataFrame containing the static prestress force result table.

### Example Usage

```python
# Get prestress forces
prestress_df = Result.TABLE.BeamForce_StaticPrestress(
    keys=[301, 302, 303],
    loadcase=["Prestress(ST)"],
    parts=["PartI", "Part1/2", "PartJ"]
)
print(prestress_df)

# Export all prestress results
Result.TABLE.BeamForce_StaticPrestress(
    loadcase=["Prestress(ST)", "PostTension(ST)"],
    output_path_excel="prestress_forces.xlsx"
)
```

---

## Beam Stress

Fetches standard Beam Stress result tables.

**`Result.TABLE.BeamStress(keys=[], loadcase=[], parts=["PartI", "PartJ"], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Selfweight(ST)", "Wind(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`, `Max`, `Min`. Default: `["PartI", "PartJ"]`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`activationCSstep`** (`bool`): Activate construction stage steps. Default: `False`.

- **`stage_step`** (`list[str]`): List of stage steps. Example: `["CS3:001(first)"]`. Default: `[]`.

- **`number_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`digit`** (`int`): Number of decimal places (0-15). Default: `5`.

- **`output_path_json`** (`str`): Optional. File path to save the raw JSON response.

- **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file.

- **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam stress result table.

### Example Usage

```python
# Get beam stresses at I and J ends
stress_df = Result.TABLE.BeamStress(
    keys=[201, 202, 203],
    loadcase=["Selfweight(ST)", "Live(ST)"],
    parts=["PartI", "PartJ"]
)
print(stress_df)

# Export with construction stages
Result.TABLE.BeamStress(
    keys="BeamGroup1",
    activationCSstep=True,
    stage_step=["CS3:001(first)", "CS4:002"],
    output_path_excel="beam_stress_cs.xlsx"
)
```

---

## BeamStress_VBM

Fetches Beam Stress (View by Max Value) result tables.

**`Result.TABLE.BeamStress_VBM(keys=[], loadcase=[], items=['all'], parts=["PartI", "PartJ"], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["STLENV_SER(CB:max)"]`. Default: All load cases.

- **`items`** (`list[str]`): Items to display. Options: `Axial`, `Shear-y`, `Shear-z`, `Torsion`, `Bend(+y)`, `Bend(-y)`, `Bend(+z)`, `Bend(-z)`, `Combined`. Default: `['all']`.

- **`parts`** (`list[str]`): Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`, `Max`, `Min`. Default: `["PartI", "PartJ"]`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`activationCSstep`** (`bool`): Activate construction stage steps. Default: `False`.

- **`stage_step`** (`list[str]`): List of stage steps. Default: `[]`.

- **`number_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`digit`** (`int`): Number of decimal places (0-15). Default: `5`.

- **`output_path_json`** (`str`): Optional. File path to save the raw JSON response.

- **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file.

- **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam stress (VBM) result table.

### Example Usage

```python
# View maximum bending and combined stresses
vbm_stress = Result.TABLE.BeamStress_VBM(
    keys=[201, 202, 203],
    loadcase=["STLENV_SER(CB:max)"],
    items=["Bend(+z)", "Bend(-z)", "Combined"]
)
print(vbm_stress)

# Get envelope stress results
Result.TABLE.BeamStress_VBM(
    loadcase=["ENV(CB:max)", "ENV(CB:min)"],
    items=['all'],
    output_path_excel="stress_envelope.xlsx"
)
```

---

## BeamStress_7DOF

Fetches Beam Stress (7th DOF) result tables.

**`Result.TABLE.BeamStress_7DOF(keys=[], loadcase=[], parts=["PartI", "PartJ"], section_position=['Max'], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["EccentricLoads(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`. Default: `["PartI", "PartJ"]`.

- **`section_position`** (`list[str]`): Section positions. Options: `Pos-1`, `Pos-2`, `Pos-3`, `Pos-4`, `Max`, `Min`. Default: `['Max']`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`activationCSstep`** (`bool`): Activate construction stage steps. Default: `False`.

- **`stage_step`** (`list[str]`): List of stage steps. Example: `["CS3:001(first)"]`. Default: `[]`.

- **`number_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`digit`** (`int`): Number of decimal places (0-15). Default: `5`.

- **`output_path_json`** (`str`): Optional. File path to save the raw JSON response.

- **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file.

- **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`.

#### Returns
- **Polars DataFrame**: A DataFrame containing the 7DOF beam stress result table.

### Example Usage

```python
# Get 7DOF stress at specific section positions
stress_7dof = Result.TABLE.BeamStress_7DOF(
    keys=[401, 402, 403],
    loadcase=["EccentricLoads(ST)"],
    section_position=["Pos-1", "Pos-4", "Max"]
)
print(stress_7dof)

# Export max/min values with construction stages
Result.TABLE.BeamStress_7DOF(
    section_position=["Max", "Min"],
    activationCSstep=True,
    stage_step=["CS3:001(first)"],
    output_path_excel="7dof_stress.xlsx"
)
```

---

## Plate Force

Fetches Plate Force (Local or Global) result tables.

**`Result.TABLE.PlateForce(keys=[], loadcase=[], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], avg_nodal_result=False, number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None, type="Local")`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS2:001(first)"]`. Default: `[]`.
* **`avg_nodal_result`** (`bool`): Optional. Option to average nodal results. Default: `False`.
* **`number_format`** (`str`): Optional. Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `5`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`. Default: `None`.
* **`type`** (`str`): Optional. Plate Force type. Options: `Local`, `Global`. Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the plate force result table.

### Example Usage

```python
# Get local plate forces for specific elements
plate_force_loc_df = Result.TABLE.PlateForce(
    keys=[101, 102, 103],
    loadcase=["Dead Load(ST)", "Live Load(ST)"],
    type="Local"
)
print(plate_force_loc_df)

# Get global plate forces and export to Excel
Result.TABLE.PlateForce(
    keys="Plate_Group",
    loadcase=["DL(ST)"],
    type="Global",
    avg_nodal_result=True,
    output_path_excel="plate_forces_global.xlsx"
)
```

---

## Beam Stress Equivalent

Fetches Beam Stress (Equivalent) result tables.

**`Result.TABLE.BeamStress_Equivalent(keys=[], loadcase=[], parts=["PartI", "PartJ"], section_position=['Maximum'], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Selfweight(ST)"]`. Default: `[]`.
* **`parts`** (`list[str]`): Optional. Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`. Default: `["PartI", "PartJ"]`.
* **`section_position`** (`list[str]`): Optional. Section positions. Options: `Maximum`, `1`, `12`, etc. Default: `['Maximum']`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS3:001(first)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `5`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`. Default: `None`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the equivalent beam stress result table.

### Example Usage

```python
# Get equivalent beam stress for specific elements
eq_stress_df = Result.TABLE.BeamStress_Equivalent(
    keys=[201, 202],
    loadcase=["DL(ST)", "LL(ST)"],
    parts=["PartI", "PartJ"],
    section_position=["Maximum", "1"]
)
print(eq_stress_df)

# Get equivalent stress for a group during a construction stage
Result.TABLE.BeamStress_Equivalent(
    keys="Girder_Group",
    loadcase=["Selfweight(CS)"],
    activationCSstep=True,
    stage_step=["CS2:003"],
    output_path_excel="eq_stress_cs2.xlsx"
)
```

---

## PlateForce_UnitLength

Fetches Plate Force (Unit Length) for Local or UCS coordinates.

**`Result.TABLE.PlateForce_UnitLength(keys=[], loadcase=[], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], avg_nodal_result=False, node_flag_center=False, node_flag_nodes=True, number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None, type="Local")`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS2:001(first)"]`. Default: `[]`.
* **`avg_nodal_result`** (`bool`): Optional. Option to average nodal results. Default: `False`.
* **`node_flag_center`** (`bool`): Optional. Retrieve results at the center of the plate. Default: `False`.
* **`node_flag_nodes`** (`bool`): Optional. Retrieve results at the nodes of the plate. Default: `True`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `5`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`. Default: `None`.
* **`type`** (`str`): Optional. Plate Force type. Options: `Local`, `UCS` (or `Global`). Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the plate force (unit length) result table.

### Example Usage

```python
# Get local plate forces per unit length at element centers
plate_force_ul_df = Result.TABLE.PlateForce_UnitLength(
    keys=[301, 302],
    loadcase=["DL(ST)"],
    type="Local",
    node_flag_center=True,
    node_flag_nodes=False
)
print(plate_force_ul_df)

# Get UCS plate forces per unit length at nodes and export
Result.TABLE.PlateForce_UnitLength(
    keys="Slab_Group",
    loadcase=["LL(ST)"],
    type="UCS",
    node_flag_nodes=True,
    output_path_excel="plate_force_ul_ucs.xlsx"
)
```

---

## PlateForce_UnitLength_VBM

Fetches Plate Force (Unit Length, View by Max Value) for Local or UCS coordinates.

**`Result.TABLE.PlateForce_UnitLength_VBM(keys=[], loadcase=[], items=['all'], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], avg_nodal_result=False, node_flag_center=False, node_flag_nodes=True, number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None, type="Local")`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["STLENV_STR(CB:max)"]`. Default: `[]`.
* **`items`** (`list[str]`): Optional. Items to display. Options: `Fxx`, `Fyy`, `Mxx`, etc. Default: `['all']`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Default: `[]`.
* **`avg_nodal_result`** (`bool`): Optional. Option to average nodal results. Default: `False`.
* **`node_flag_center`** (`bool`): Optional. Retrieve results at the center of the plate. Default: `False`.
* **`node_flag_nodes`** (`bool`): Optional. Retrieve results at the nodes of the plate. Default: `True`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `5`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`. Default: `None`.
* **`type`** (`str`): Optional. Plate Force type. Options: `Local`, `UCS` (or `Global`). Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the plate force (unit length, VBM) result table.

### Example Usage

```python
# Get VBM local plate forces (unit length) for specific items
plate_vbm_df = Result.TABLE.PlateForce_UnitLength_VBM(
    keys=[301, 302],
    loadcase=["ENV_Slab(CB:max)"],
    items=["Mxx", "Myy"],
    type="Local"
)
print(plate_vbm_df)

# Get VBM UCS plate forces at center and export
Result.TABLE.PlateForce_UnitLength_VBM(
    keys="Slab_Group",
    loadcase=["ENV_Slab(CB:max)", "ENV_Slab(CB:min)"],
    type="UCS",
    node_flag_center=True,
    node_flag_nodes=False,
    output_path_excel="plate_vbm_ucs_center.xlsx"
)
```


## Plate Stress

Fetches Plate Stress (Local or Global) result tables.

**`Result.TABLE.PlateStress(keys=[], loadcase=[], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], avg_nodal_result=False, node_flag_center=False, node_flag_nodes=True, number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None, type="Local")`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS2:001(first)"]`. Default: `[]`.
* **`avg_nodal_result`** (`bool`): Optional. Option to average nodal results. Default: `False`.
* **`node_flag_center`** (`bool`): Optional. Retrieve results at the center of the plate. Default: `False`.
* **`node_flag_nodes`** (`bool`): Optional. Retrieve results at the nodes of the plate. Default: `True`.
* **`number_format`** (`str`): Optional. Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `5`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file: `[excel_path, sheet_name, start_cell]`. Default: `None`.
* **`type`** (`str`): Optional. Plate Stress type. Options: `Local`, `Global`. Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the plate stress result table.

### Example Usage

```python
# Get local plate stresses for specific elements at the center
plate_stress_df = Result.TABLE.PlateStress(
    keys=[101, 102],
    loadcase=["Dead Load(ST)"],
    type="Local",
    node_flag_center=True,
    node_flag_nodes=False
)
print(plate_stress_df)

# Get global plate stresses for a group and export to Excel
Result.TABLE.PlateStress(
    keys="Slab_Group",
    loadcase=["DL(ST)", "LL(ST)"],
    type="Global",
    avg_nodal_result=True,
    output_path_excel="plate_stresses_global.xlsx"
)
```

---

## Plate Strain

Fetches Plate Strain (Local or Global, Total or Plastic) result tables.

**`Result.TABLE.PlateStrain(keys=[], loadcase=[], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], node_flag_center=False, node_flag_nodes=True, number_format="Scientific", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None, type="Local", strain_type="Total")`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Comp(ST)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS1:001(first-10)"]`. Default: `[]`.
* **`node_flag_center`** (`bool`): Optional. Retrieve results at the center of the plate. Default: `False`.
* **`node_flag_nodes`** (`bool`): Optional. Retrieve results at the nodes of the plate. Default: `True`.
* **`number_format`** (`str`): Optional. Number format. Default: `Scientific`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.
* **`type`** (`str`): Optional. Plate Strain type. Options: `Local`, `Global`. Default: `Local`.
* **`strain_type`** (`str`): Optional. Strain type. Options: `Total`, `Plastic`. Default: `Total`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the plate strain result table.

### Example Usage

```python
# Get total local plate strain
plate_strain_df = Result.TABLE.PlateStrain(
    keys=[101, 102],
    loadcase=["Nonlinear_Load(ST)"],
    type="Local",
    strain_type="Total"
)
print(plate_strain_df)

# Get plastic global plate strain and export to Excel
Result.TABLE.PlateStrain(
    keys="Slab_Group",
    loadcase=["Pushover(ST)"],
    type="Global",
    strain_type="Plastic",
    output_path_excel="plate_strain_plastic.xlsx"
)
```

---

## Elastic Link

Fetches Elastic Link Forces result tables.

**`Result.TABLE.ElasticLink(keys=[], loadcase=[], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["SWofGirders(ST)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS1:001(first)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `5`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the elastic link force result table.

### Example Usage

```python
# Get elastic link forces for specific elements
elink_df = Result.TABLE.ElasticLink(
    keys=[801, 802],
    loadcase=["Dead Load(ST)"]
)
print(elink_df)

# Get elastic link forces for a group and export
Result.TABLE.ElasticLink(
    keys="Bearings_Group",
    loadcase=["DL(ST)", "LL(ST)"],
    output_path_excel="elastic_link_forces.xlsx"
)
```
## ElasticLink_VBM

Fetches Elastic Link Forces (View by Max Value) result tables.

**`Result.TABLE.ElasticLink_VBM(keys=[], loadcase=[], items=['all'], components=['all'], force_unit='KN', len_unit='M', number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["STLENV_STR(CB:max)"]`. Default: `[]`.
* **`items`** (`list[str]`): Optional. Items to display. Options: `Axial`, `Shear-y`, `Moment-z`, etc. Default: `['all']`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `5`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the elastic link force (VBM) result table.

### Example Usage

```python
# Get VBM elastic link forces for specific items
elink_vbm_df = Result.TABLE.ElasticLink_VBM(
    keys=[801, 802],
    loadcase=["ENV_Bearings(CB:max)"],
    items=["Shear-y", "Shear-z"]
)
print(elink_vbm_df)

# Get all VBM elastic link forces and export
Result.TABLE.ElasticLink_VBM(
    keys="Bearings_Group",
    loadcase=["ENV_Bearings(CB:max)", "ENV_Bearings(CB:min)"],
    output_path_excel="elastic_link_vbm.xlsx"
)
```

---

## General Link

Fetches General Link (Force or Deformation) result tables.

**`Result.TABLE.GeneralLink(keys=[], loadcase=[], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None, type="Force")`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["SWofGirders(ST)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `5`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.
* **`type`** (`str`): Optional. Result type. Options: `Force`, `Deformation`. Default: `Force`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the general link result table.

### Example Usage

```python
# Get general link forces
glink_force_df = Result.TABLE.GeneralLink(
    keys=[901, 902],
    loadcase=["Dead Load(ST)"],
    type="Force"
)
print(glink_force_df)

# Get general link deformations and export
Result.TABLE.GeneralLink(
    keys="Dampers_Group",
    loadcase=["Pushover(ST)"],
    type="Deformation",
    output_path_excel="general_link_deform.xlsx"
)
```

---

## GeneralLink_Force_VBM

Fetches General Link Force (View by Max Value) result tables.

**`Result.TABLE.GeneralLink_Force_VBM(keys=[], loadcase=[], items=['all'], components=['all'], force_unit='KN', len_unit='M', number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["STLENV_STR(CB:max)"]`. Default: `[]`.
* **`items`** (`list[str]`): Optional. Items to display. Options: `Axial`, `Shear-y`, `Moment-z`, etc. Default: `['all']`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `5`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the general link force (VBM) result table.

### Example Usage

```python
# Get VBM general link forces for specific items
glink_vbm_df = Result.TABLE.GeneralLink_Force_VBM(
    keys=[901, 902],
    loadcase=["ENV_Dampers(CB:max)"],
    items=["Axial", "Shear-y"]
)
print(glink_vbm_df)

# Get all VBM general link forces and export
Result.TABLE.GeneralLink_Force_VBM(
    keys="Dampers_Group",
    loadcase=["ENV_Dampers(CB:max)", "ENV_Dampers(CB:min)"],
    output_path_excel="general_link_vbm.xlsx"
)
```

---

## Resultant Forces

Fetches Resultant Forces (Virtual Beam) result tables.

**`Result.TABLE.ResultantForces(keys=[], loadcase=[], parts=["PartI", "PartJ"], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=5, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["SWofGirders(ST)"]`. Default: `[]`.
* **`parts`** (`list[str]`): Optional. Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`. Default: `["PartI", "PartJ"]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `5`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the resultant forces result table.

### Example Usage

```python
# Get resultant forces
res_force_df = Result.TABLE.ResultantForces(
    keys=[1001],
    loadcase=["Dead Load(ST)"],
    parts=["PartI", "Part1/2", "PartJ"]
)
print(res_force_df)

# Get resultant forces for a group and export
Result.TABLE.ResultantForces(
    keys="Virtual_Beams",
    loadcase=["DL(ST)", "LL(ST)"],
    output_path_excel="resultant_forces.xlsx"
)
```
## Composite Beam Force

Fetches Composite Section for Construction Stage (Force) result tables.

**`Result.TABLE.CompositeBeamForce(keys=[], loadcase=[], parts=["PartI", "PartJ"], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(CBSC)", "Summation(CS)"]`. Default: `[]`.
* **`parts`** (`list[str]`): Optional. Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`. Default: `["PartI", "PartJ"]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS4:001(first)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the composite beam force result table.

### Example Usage

```python
# Get composite beam forces for a construction stage
comp_force_df = Result.TABLE.CompositeBeamForce(
    keys=[101, 102],
    loadcase=["Summation(CS)"],
    activationCSstep=True,
    stage_step=["CS5:001(last)"]
)
print(comp_force_df)

# Get composite beam forces and export to Excel
Result.TABLE.CompositeBeamForce(
    keys="Composite_Girders",
    loadcase=["DL(CBSC)"],
    parts=["PartI", "Part1/2", "PartJ"],
    output_path_excel="composite_beam_force.xlsx"
)
```

---

## Composite Beam Stress

Fetches Composite Section for Construction Stage (Stress) result tables.

**`Result.TABLE.CompositeBeamStress(keys=[], loadcase=[], parts=["PartI", "PartJ"], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Summation(CS)"]`. Default: `[]`.
* **`parts`** (`list[str]`): Optional. Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`. Default: `["PartI", "PartJ"]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS4:001(first)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the composite beam stress result table.

### Example Usage

```python
# Get composite beam stresses for a construction stage
comp_stress_df = Result.TABLE.CompositeBeamStress(
    keys=[101, 102],
    loadcase=["Summation(CS)"],
    activationCSstep=True,
    stage_step=["CS5:001(last)"],
    force_unit="N",
    len_unit="mm"
)
print(comp_stress_df)

# Get composite beam stresses and export to Excel
Result.TABLE.CompositeBeamStress(
    keys="Composite_Girders",
    loadcase=["DL(CBSC)"],
    parts=["PartI", "PartJ"],
    output_path_excel="composite_beam_stress.xlsx"
)
```

---

## Self Constraint Beam Force

Fetches Composite Section for Construction Stage (Self-Constraint Force) result tables.

**`Result.TABLE.SelfConstraintBeamForce(keys=[], loadcase=[], parts=["PartI", "PartJ"], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(CBSC)", "Summation(CS)"]`. Default: `[]`.
* **`parts`** (`list[str]`): Optional. Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`. Default: `["PartI", "PartJ"]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS4:001(first)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the self-constraint beam force result table.

### Example Usage

```python
# Get self-constraint forces
self_con_force_df = Result.TABLE.SelfConstraintBeamForce(
    keys=[101, 102],
    loadcase=["TG(+)(ST)"]
)
print(self_con_force_df)

# Get self-constraint forces for a construction stage and export
Result.TABLE.SelfConstraintBeamForce(
    keys="Composite_Girders",
    loadcase=["Summation(CS)"],
    activationCSstep=True,
    stage_step=["CS5:001(last)"],
    output_path_excel="self_constraint_force.xlsx"
)
```

---

## Self Constraint Beam Stress

Fetches Composite Section for Construction Stage (Self-Constraint Stress) result tables.

**`Result.TABLE.SelfConstraintBeamStress(keys=[], loadcase=[], parts=["PartI", "PartJ"], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(CBSC)", "Summation(CS)"]`. Default: `[]`.
* **`parts`** (`list[str]`): Optional. Element parts to display. Options: `PartI`, `Part1/4`, `Part1/2`, `Part3/4`, `PartJ`. Default: `["PartI", "PartJ"]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS4:001(first)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the self-constraint beam stress result table.

### Example Usage

```python
# Get self-constraint stresses
self_con_stress_df = Result.TABLE.SelfConstraintBeamStress(
    keys=[101, 102],
    loadcase=["TG(+)(ST)"],
    force_unit="N",
    len_unit="mm"
)
print(self_con_stress_df)

# Get self-constraint stresses and export
Result.TABLE.SelfConstraintBeamStress(
    keys="Composite_Girders",
    loadcase=["Summation(CS)"],
    activationCSstep=True,
    stage_step=["CS5:001(last)"],
    output_path_excel="self_constraint_stress.xlsx"
)
```

---

## ElementPropertiesAtStage

Fetches Element Properties at Each Stage result tables.

**`Result.TABLE.ElementPropertiesAtStage(stage, components=['all'], force_unit='KN', len_unit='M', number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* **`stage`** (`str`): The construction stage to get properties for. Example: `"CS14"`.
* **`components`** (`list[str]`): Optional. List of components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the element properties at the specified stage.

### Example Usage

```python
# Get element properties for stage "CS14"
elem_props_df = Result.TABLE.ElementPropertiesAtStage(stage="CS14")
print(elem_props_df)

# Get specific element properties for stage "CS2" and export
Result.TABLE.ElementPropertiesAtStage(
    stage="CS2",
    components=["Element", "Section", "Area", "Iyy", "Izz"],
    output_path_excel="elem_props_cs2.xlsx"
)
```

---

## LackOfFitForce

Fetches Lack of Fit Force tables for Truss, Beam, or Plate elements.

**`Result.TABLE.LackOfFitForce(components=['all'], force_unit='KN', len_unit='M', number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None, type="Truss")`**

### Parameters

* **`components`** (`list[str]`): Optional. List of components to include. Default: `['all']`.
* **`type`** (`str`): Optional. Element type. Options: `Truss`, `Beam`, `Plate`. Default: `Truss`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the lack of fit force table.

### Example Usage

```python
# Get lack of fit forces for Beam elements
lof_beam_df = Result.TABLE.LackOfFitForce(type="Beam")
print(lof_beam_df)

# Get lack of fit forces for Truss elements and export
Result.TABLE.LackOfFitForce(
    type="Truss",
    components=["Element", "Force"],
    output_path_excel="lof_truss.xlsx"
)
```

---

## Equilibrium Element Nodal Force

Fetches Equilibrium Element Nodal Force tables.

**`Result.TABLE.EquilibriumElementNodalForce(components=['all'], force_unit='KN', len_unit='M', number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* Same as **LackOfFitForce**, except without `type`.

#### Returns

* **Polars DataFrame**: A DataFrame containing the equilibrium element nodal force table.

### Example Usage

```python
# Get equilibrium element nodal forces
eq_nodal_force_df = Result.TABLE.EquilibriumElementNodalForce()
print(eq_nodal_force_df)

# Get and export equilibrium element nodal forces
Result.TABLE.EquilibriumElementNodalForce(
    components=["Node", "Load", "FX", "FY", "FZ"],
    output_path_excel="equilibrium_nodal_force.xlsx"
)
```

## InitialElementForce

Fetches Initial Element Force result tables.

**`Result.TABLE.InitialElementForce(components=['all'], force_unit='KN', len_unit='M', number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None)`**

### Parameters

* **`components`** (`list[str]`): Optional. List of components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0–15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save as Excel. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Append to existing Excel file. Default: `None`.

#### Returns

* **Polars DataFrame**: A DataFrame containing initial element force results.

### Example Usage

```python
# Get initial element forces
init_force_df = Result.TABLE.InitialElementForce()
print(init_force_df)

# Get and export initial element forces
Result.TABLE.InitialElementForce(
    components=["Element", "Axial", "Shear-y", "Shear-z"],
    output_path_excel="initial_element_force.xlsx"
)
```

---

## PlaneForce

Fetches Plane Force (Local or Global) result tables.

**`Result.TABLE.PlaneForce(keys=[], loadcase=[], components=['all'], avg_nodal_result=True, force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None, type='Local')`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. Element IDs or Group Name.
* **`loadcase`** (`list[str]`): Optional. Load case names.
* **`components`** (`list[str]`): Optional. Table components. Default: `['all']`.
* **`avg_nodal_result`** (`bool`): Option to average nodal results. Default: `True`.
* **`force_unit`** (`str`): Force unit. Default: `KN`.
* **`len_unit`** (`str`): Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Activate construction stage steps.
* **`stage_step`** (`list[str]`): Stage steps to activate.
* **`type`** (`str`): Force type. Options: `Local`, `Global`. Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing plane force results.

### Example Usage

```python
# Get local plane forces
plane_force_df = Result.TABLE.PlaneForce(
    keys=[201, 202],
    loadcase=["DeadLoads(ST)"],
    type="Local"
)
print(plane_force_df)

# Get global plane forces and export
Result.TABLE.PlaneForce(
    keys="Shear_Wall",
    loadcase=["Summation(CS)"],
    type="Global",
    activationCSstep=True,
    stage_step=["CS3:001(last)"],
    output_path_excel="plane_force_global.xlsx"
)
```

---

## PlaneStress

Fetches Plane Stress (Local or Global) result tables.

**`Result.TABLE.PlaneStress(keys=[], loadcase=[], components=['all'], avg_nodal_result=True, node_flag_center=False, node_flag_nodes=True, force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None, type='Local')`**

### Parameters

* Same as `PlaneForce`, plus:

  * **`node_flag_center`** (`bool`): Retrieve results at center. Default: `False`.
  * **`node_flag_nodes`** (`bool`): Retrieve results at nodes. Default: `True`.

#### Returns

* **Polars DataFrame**: A DataFrame containing plane stress results.

### Example Usage

```python
# Get local plane stresses at element center
plane_stress_df = Result.TABLE.PlaneStress(
    keys=[201, 202],
    loadcase=["DeadLoads(ST)"],
    type="Local",
    node_flag_center=True,
    node_flag_nodes=False
)
print(plane_stress_df)

# Get global plane stresses at nodes and export
Result.TABLE.PlaneStress(
    keys="Shear_Wall",
    loadcase=["Summation(CS)"],
    type="Global",
    activationCSstep=True,
    stage_step=["CS3:001(last)"],
    output_path_excel="plane_stress_global.xlsx"
)
```

---

## PlaneStrainForce

Fetches Plane Strain Force (Local or Global) result tables.

**`Result.TABLE.PlaneStrainForce(keys=[], loadcase=[], components=['all'], avg_nodal_result=True, force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None, type='Local')`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DeadLoads(ST)", "Excavation(CS)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`avg_nodal_result`** (`bool`): Optional. Option to average nodal results. Default: `True`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS2:001(step-1)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.
* **`type`** (`str`): Optional. Force type. Options: `Local`, `Global`. Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing plane strain force results.

### Example Usage

```python
# Get local plane strain forces
plane_strain_force_df = Result.TABLE.PlaneStrainForce(
    keys=[301, 302],
    loadcase=["DeadLoads(ST)"],
    type="Local"
)
print(plane_strain_force_df)

# Get global plane strain forces and export
Result.TABLE.PlaneStrainForce(
    keys="Tunnel_Lining",
    loadcase=["Excavation(CS)"],
    type="Global",
    activationCSstep=True,
    stage_step=["CS2:001(step-1)"],
    output_path_excel="plane_strain_force.xlsx"
)
```

---

## PlaneStrainStress

Fetches Plane Strain Stress (Local or Global) result tables.

**`Result.TABLE.PlaneStrainStress(keys=[], loadcase=[], components=['all'], avg_nodal_result=True, node_flag_center=False, node_flag_nodes=True, force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None, type='Local')`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DeadLoads(ST)", "Excavation(CS)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`avg_nodal_result`** (`bool`): Optional. Option to average nodal results. Default: `True`.
* **`node_flag_center`** (`bool`): Optional. Include results at element center. Default: `False`.
* **`node_flag_nodes`** (`bool`): Optional. Include results at element nodes. Default: `True`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS2:001(step-1)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.
* **`type`** (`str`): Optional. Stress type. Options: `Local`, `Global`. Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing plane strain stress results.

### Example Usage

```python
# Get local plane strain stresses
plane_strain_stress_df = Result.TABLE.PlaneStrainStress(
    keys=[301, 302],
    loadcase=["DeadLoads(ST)"],
    type="Local",
    node_flag_center=True,
    node_flag_nodes=False
)
print(plane_strain_stress_df)

# Get global plane strain stresses and export
Result.TABLE.PlaneStrainStress(
    keys="Tunnel_Lining",
    loadcase=["Excavation(CS)"],
    type="Global",
    activationCSstep=True,
    stage_step=["CS2:001(step-1)"],
    output_path_excel="plane_strain_stress.xlsx"
)
```

---

## AxisymmetricForce

Fetches Axisymmetric Force (Local or Global) result tables.

**`Result.TABLE.AxisymmetricForce(keys=[], loadcase=[], components=['all'], avg_nodal_result=True, force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None, type='Local')`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Pressure(ST)", "Hydrostatic(ST)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`avg_nodal_result`** (`bool`): Optional. Option to average nodal results. Default: `True`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS2:001(step-1)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.
* **`type`** (`str`): Optional. Force type. Options: `Local`, `Global`. Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing axisymmetric force results.

### Example Usage

```python
# Get local axisymmetric forces
axi_force_df = Result.TABLE.AxisymmetricForce(
    keys=[401, 402],
    loadcase=["Pressure(ST)"],
    type="Local"
)
print(axi_force_df)

# Get global axisymmetric forces and export
Result.TABLE.AxisymmetricForce(
    keys="Tank_Wall",
    loadcase=["Hydrostatic(ST)"],
    type="Global",
    output_path_excel="axi_force_global.xlsx"
)
```

---

## AxisymmetricStress

Fetches Axisymmetric Stress (Local or Global) result tables.

**`Result.TABLE.AxisymmetricStress(keys=[], loadcase=[], components=['all'], avg_nodal_result=True, node_flag_center=False, node_flag_nodes=True, force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None, type='Local')`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Pressure(ST)", "Hydrostatic(ST)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`avg_nodal_result`** (`bool`): Optional. Option to average nodal results. Default: `True`.
* **`node_flag_center`** (`bool`): Optional. Include results at element center. Default: `False`.
* **`node_flag_nodes`** (`bool`): Optional. Include results at element nodes. Default: `True`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS2:001(step-1)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.
* **`type`** (`str`): Optional. Stress type. Options: `Local`, `Global`. Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing axisymmetric stress results.

### Example Usage

```python
# Get local axisymmetric stresses at element center
axi_stress_df = Result.TABLE.AxisymmetricStress(
    keys=[401, 402],
    loadcase=["Pressure(ST)"],
    type="Local",
    node_flag_center=True,
    node_flag_nodes=False
)
print(axi_stress_df)

# Get global axisymmetric stresses and export
Result.TABLE.AxisymmetricStress(
    keys="Tank_Wall",
    loadcase=["Hydrostatic(ST)"],
    type="Global",
    node_flag_nodes=True,
    output_path_excel="axi_stress_global.xlsx"
)
```

---

## SolidForce

Fetches Solid Force (Local or Global) result tables.

**`Result.TABLE.SolidForce(keys=[], loadcase=[], components=['all'], force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None, type='Local')`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)", "Summation(CS)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS2:001(last)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.
* **`type`** (`str`): Optional. Force type. Options: `Local`, `Global`. Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing solid force results.

### Example Usage

```python
# Get local solid forces
solid_force_df = Result.TABLE.SolidForce(
    keys=[501, 502],
    loadcase=["DL(ST)"],
    type="Local"
)
print(solid_force_df)

# Get global solid forces and export
Result.TABLE.SolidForce(
    keys="Foundation_Block",
    loadcase=["Summation(CS)"],
    type="Global",
    activationCSstep=True,
    stage_step=["CS2:001(last)"],
    output_path_excel="solid_force_global.xlsx"
)
```

---

## SolidStress

Fetches Solid Stress (Local or Global) result tables.

**`Result.TABLE.SolidStress(keys=[], loadcase=[], components=['all'], avg_nodal_result=True, node_flag_center=True, node_flag_nodes=True, force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Fixed", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None, type='Local')`**

### Parameters

* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)", "Summation(CS)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`avg_nodal_result`** (`bool`): Optional. Option to average nodal results. Default: `True`.
* **`node_flag_center`** (`bool`): Optional. Include results at element center. Default: `True`.
* **`node_flag_nodes`** (`bool`): Optional. Include results at element nodes. Default: `True`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS2:001(last)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Fixed`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.
* **`type`** (`str`): Optional. Stress type. Options: `Local`, `Global`. Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing solid stress results.

### Example Usage

```python
# Get local solid stresses at center
solid_stress_df = Result.TABLE.SolidStress(
    keys=[501, 502],
    loadcase=["DL(ST)"],
    type="Local",
    node_flag_center=True,
    node_flag_nodes=False
)
print(solid_stress_df)

# Get global solid stresses at nodes and export
Result.TABLE.SolidStress(
    keys="Foundation_Block",
    loadcase=["Summation(CS)"],
    type="Global",
    activationCSstep=True,
    stage_step=["CS2:001(last)"],
    node_flag_center=False,
    node_flag_nodes=True,
    output_path_excel="solid_stress_global.xlsx"
)
```

---

## SolidStrain

Fetches Solid Strain (Local/Global, Total/Plastic) result tables.

**`Result.TABLE.SolidStrain(strain_type='Total', keys=[], loadcase=[], components=['all'], avg_nodal_result=True, node_flag_center=False, node_flag_nodes=True, force_unit='KN', len_unit='M', activationCSstep=False, stage_step=[], number_format="Scientific", digit=12, output_path_json=None, output_path_excel=None, existing_excel_input=None, type='Local')`**

### Parameters

* **`strain_type`** (`str`): Optional. Type of strain. Options: `Total`, `Plastic`. Default: `Total`.
* **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: `[]`.
* **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Comp(ST)", "Nonlinear(ST)"]`. Default: `[]`.
* **`components`** (`list[str]`): Optional. Table components to include. Default: `['all']`.
* **`avg_nodal_result`** (`bool`): Optional. Option to average nodal results. Default: `True`.
* **`node_flag_center`** (`bool`): Optional. Include results at element center. Default: `False`.
* **`node_flag_nodes`** (`bool`): Optional. Include results at element nodes. Default: `True`.
* **`force_unit`** (`str`): Optional. Force unit. Default: `KN`.
* **`len_unit`** (`str`): Optional. Length unit. Default: `M`.
* **`activationCSstep`** (`bool`): Optional. Activate construction stage steps. Default: `False`.
* **`stage_step`** (`list[str]`): Optional. List of stage steps. Example: `["CS2:001(step-1)"]`. Default: `[]`.
* **`number_format`** (`str`): Optional. Number format. Default: `Scientific`.
* **`digit`** (`int`): Optional. Number of decimal places (0-15). Default: `12`.
* **`output_path_json`** (`str`): Optional. File path to save the raw JSON response. Default: `None`.
* **`output_path_excel`** (`str`): Optional. File path to save the result table as a new Excel file. Default: `None`.
* **`existing_excel_input`** (`list`): Optional. Write to existing Excel file. Default: `None`.
* **`type`** (`str`): Optional. Strain type. Options: `Local`, `Global`. Default: `Local`.

#### Returns

* **Polars DataFrame**: A DataFrame containing solid strain results.

### Example Usage

```python
# Get total local solid strain
solid_strain_df = Result.TABLE.SolidStrain(
    strain_type="Total",
    keys=[501, 502],
    loadcase=["Comp(ST)"],
    type="Local",
    node_flag_center=False,
    node_flag_nodes=True
)
print(solid_strain_df)

# Get plastic global solid strain and export
Result.TABLE.SolidStrain(
    strain_type="Plastic",
    keys="Foundation_Block",
    loadcase=["Nonlinear(ST)"],
    type="Global",
    output_path_excel="solid_strain_plastic.xlsx"
)
```


## Multiple Tables to Single Excel

You can export multiple result tables to different sheets in a single Excel file using `xlsxwriter`:

#### Example: Multiple Tables in One Workbook

```python
import xlsxwriter

# Get multiple result tables
reaction_df = Result.TABLE.Reaction(
    loadcase=["Dead Load(ST)", "Live Load(ST)"]
)

displacement_df = Result.TABLE.Displacement(
    loadcase=["Dead Load(ST)", "Live Load(ST)"],
    type="Global"
)

beam_force_df = Result.TABLE.BeamForce(
    loadcase=["Dead Load(ST)", "Live Load(ST)"],
    parts=["PartI", "PartJ"]
)

beam_stress_df = Result.TABLE.BeamStress(
    loadcase=["Dead Load(ST)", "Live Load(ST)"],
    parts=["PartI", "PartJ"]
)

# Write all tables to a single Excel file
with xlsxwriter.Workbook("Complete_Results.xlsx") as workbook:
    reaction_df.write_excel(
        workbook, 
        "Reactions",
        header_format={"bold": True},
        autofit=True,
        table_style="Table Style Light 8"
    )
    
    displacement_df.write_excel(
        workbook,
        "Displacements",
        header_format={"bold": True},
        autofit=True,
        table_style="Table Style Light 8"
    )
    
    beam_force_df.write_excel(
        workbook,
        "Beam Forces",
        header_format={"bold": True},
        autofit=True,
        table_style="Table Style Light 8"
    )
    
    beam_stress_df.write_excel(
        workbook,
        "Beam Stresses",
        header_format={"bold": True},
        autofit=True,
        table_style="Table Style Light 8"
    )

print("✅ All result tables exported to Complete_Results.xlsx")
```

---

## Writing to Existing Excel File

You can append result tables to an existing Excel file at specific cell locations:

```python
# Prepare existing Excel input
existing_excel = ["existing_workbook.xlsx", "Results_Sheet", "A1"]

# Get and write reaction results
reaction_df = Result.TABLE.Reaction(
    loadcase=["DL(ST)", "LL(ST)"],
    existing_excel_input=existing_excel
)

# The table will be written starting at cell A1 in the specified sheet
```

---

## Advanced Usage Examples

#### Example 1: Construction Stage Analysis

```python
# Get beam forces for multiple construction stages
cs_beam_forces = Result.TABLE.BeamForce(
    keys=[101, 102, 103, 104, 105],
    loadcase=["Selfweight(CS)", "SuperDead(CS)"],
    parts=["PartI", "Part1/2", "PartJ"],
    activationCSstep=True,
    stage_step=["CS1:001(first)", "CS2:003", "CS3:005(last)"],
    output_path_excel="construction_stages.xlsx"
)
```

#### Example 2: Envelope Results with VBM

```python
# Get envelope results for beam forces
envelope_forces = Result.TABLE.BeamForce_VBM(
    keys="MainBeams",
    loadcase=["ENV_STR(CB:max)", "ENV_STR(CB:min)"],
    items=["Moment-z", "Shear-y"],
    parts=["Max", "Min"],
    digit=3,
    output_path_excel="envelope_results.xlsx"
)
```


