# Result Table

Fetches result tables like reactions, displacements, forces, and stresses for given elements and load cases from MIDAS CIVIL NX.

---

## Result.TABLE

**`Result.TABLE(tabletype, keys=[], loadcase=[], cs_stage=[], options=None)`**

General method to extract any type of result table from MIDAS CIVIL NX.

### Parameters

- **`tabletype`** (`str`): Analysis Results Table type.

| Result Table              | Table Type               |
|---------------------------|--------------------------|
| Reaction (Global)         | REACTIONG                |
| Reaction (Local)          | REACTIONL                |
| Displacement (Global)     | DISPLACEMENTG            |
| Displacement (Local)      | DISPLACEMENTL            |
| Truss Force               | TRUSSFORCE               |
| Truss Stress              | TRUSSSTRESS              |
| Beam Force                | BEAMFORCE                |
| Beam Stress               | BEAMSTRESS               |

Details of all available tables can be found [here](https://support.midasuser.com/hc/en-us/articles/33016922742937-MIDAS-API-Online-Manual).

- **`keys`** (`list[int]` or `str`): Optional. Element or Node IDs (Default: All) | `list[int]` → IDs or `str` → Group Name.

- **`loadcase`** (`list[str]`): Optional. Load case names (Default: All). Example: `["Dead Load(ST)", "Live Load(ST)"]`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction stages. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A high-performance DataFrame containing the result table.

Polars is a high-performance DataFrame library designed to provide fast and efficient data processing capabilities. Polars DataFrames support exporting tabular data as CSV and Excel sheets.

Write Excel: [https://docs.pola.rs/api/python/dev/reference/api/polars.DataFrame.write_excel.html](https://docs.pola.rs/api/python/dev/reference/api/polars.DataFrame.write_excel.html)

### Example Usage

#### 1. Printing Result Table

```python
# Reaction table for all nodes and load cases
rkn_res = Result.TABLE('REACTIONG')
print(rkn_res)

# Output
# shape: (36, 9)
# +-------+------+------------+-----------+-------+-----------+---------+---------+---------+
# | Index | Node |   Load     |    FX     |  ...  |    FZ     |   MX    |   MY    |   MZ    |
# +-------+------+------------+-----------+-------+-----------+---------+---------+---------+
# |   1   |   1  | Dead Load  |  338.647  |  ...  |  3273.412 |  0.000  |  0.000  |  0.000  |
# |   2   |  11  | Dead Load  |    0.000  |  ...  |  3687.690 |  0.000  |  0.000  |  0.000  |
# |   3   |  21  | Dead Load  | -338.647  |  ...  |  1463.059 |  0.000  |  0.000  |  0.000  |
# |  ...  | ...  |    ...     |    ...    |  ...  |    ...    |   ...   |   ...   |   ...   |
# +-------+------+------------+-----------+-------+-----------+---------+---------+---------+
```

#### 2. Result Table for Displacement

```python
Result.TABLE('DISPLACEMENTG',loadcase='UDL(ST)')

```

#### 3. Multiple Result Tables to Excel

```python

sheetloaction = 'D:\\ResultTest.xlsx'

sheetA = TableOptions('KN','M','Fixed',ExcelFileLoc=sheetloaction,ExcelSheetName='Displacement')
sheetB = TableOptions('KN','M','Fixed',ExcelFileLoc=sheetloaction,ExcelSheetName='Reaction')

Result.TABLE('DISPLACEMENTG',loadcase='UDL(ST)',options=sheetA)

sheetB.EXCEL_CELL_POS = "B5"
Result.TABLE.Reaction(options=sheetB)
sheetB.EXCEL_CELL_POS = "end"
Result.TABLE('REACTIONG',loadcase='UVL(ST)',options=sheetB)
```

---

## TableOptions

**`TableOptions(force_unit=None, len_unit=None, num_format=None, decimal_place=None, JSONFileLoc=None, ExcelFileLoc=None, ExcelSheetName=None, ExcelCellPos=None)`**

Configuration class for customizing result table output formatting and export options.

### Parameters

- **`force_unit`** (`str`): Force unit. Options: `KN`, `N`, `KGF`, `TONF`, `LBF`, `KIPS`. Default: `KN`.

- **`len_unit`** (`str`): Length unit. Options: `M`, `CM`, `MM`, `FT`, `IN`. Default: `M`.

- **`num_format`** (`str`): Number format. Options: `Fixed`, `Scientific`, `General`. Default: `Fixed`.

- **`decimal_place`** (`int`): Number of decimal places for result output (0-15). Default: `5`.

- **`JSONFileLoc`** (`str`): Optional. File path to save the raw JSON response.

- **`ExcelFileLoc`** (`str`): Optional. File path to save or update the result table as an Excel file.

- **`ExcelSheetName`** (`str`): Optional. Sheet name for Excel output. If not provided, a default name is generated.

- **`ExcelCellPos`** (`str`): Optional. Starting cell position for writing to Excel (e.g., `"A1"`). Use `"end"` to append to the end of the sheet. Default: `"end"`.

### Example Usage

```python
# Create custom table options
options = TableOptions(
    force_unit='KN',
    len_unit='M',
    num_format='Fixed',
    decimal_place=3,
    ExcelFileLoc='D:\\results.xlsx',
    ExcelSheetName='Reactions',
    ExcelCellPos='A1'
)

# Use options with Result.Table
reaction_df = Result.Table('REACTIONG', loadcase=['Dead Load(ST)'], options=options)
```

---

## Result.TABLE Methods

The `Result.TABLE` class provides specialized methods to fetch various types of result tables from MIDAS CIVIL NX, including reactions, displacements, forces, and stresses for different element types.

---

### Reaction

Fetches Reaction result tables (Global, Local, or Surface Spring).

**`Result.TABLE.Reaction(keys=[], loadcase=[], components=['all'], cs_stage=[], type="Global", options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Node IDs or a Structure Group Name. Default: All nodes.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)", "LL(ST)"]`. Default: All load cases.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`type`** (`str`): Reaction type. Options: `Global`, `Local`, `SurfaceSpring`. Default: `Global`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the reaction result table.

#### Example Usage

```python
# Get global reactions for specific nodes
reaction_df = Result.TABLE.Reaction(
    keys=[1, 2, 3, 10],
    loadcase=["Dead Load(ST)", "Live Load(ST)"],
    type="Global"
)
print(reaction_df)

# Export reaction table to Excel with custom options
options = TableOptions(ExcelFileLoc="reactions.xlsx", ExcelSheetName="Reactions")
Result.TABLE.Reaction(loadcase=["DL(ST)", "LL(ST)"], options=options)
```

---

### Displacement

Fetches Displacement result tables (Global or Local).

**`Result.TABLE.Displacement(keys=[], loadcase=[], components=['all'], cs_stage=[], type="Global", displacement_type="Accumulative", options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Node IDs or a Structure Group Name. Default: All nodes.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Self(ST)", "Wind(ST)"]`. Default: All load cases.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`type`** (`str`): Displacement type. Options: `Global`, `Local`. Default: `Global`.

- **`displacement_type`** (`str`): Displacement option. Options: `Accumulative`, `Current`, `Real`. Default: `Accumulative`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the displacement result table.

#### Example Usage

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
options = TableOptions(ExcelFileLoc="displacements_cs.xlsx")
Result.TABLE.Displacement(
    cs_stage='all',
    options=options
)
```

---

### TrussForce

Fetches Truss Force result tables.

**`Result.TABLE.TrussForce(keys=[], loadcase=[], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)", "LL(ST)"]`. Default: All load cases.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the truss force result table.

#### Example Usage

```python
# Get truss forces for specific elements
truss_df = Result.TABLE.TrussForce(
    keys=[1, 2, 3],
    loadcase=["DL(ST)", "LL(ST)"]
)
print(truss_df)
```

---

### TrussStress

Fetches Truss Stress result tables.

**`Result.TABLE.TrussStress(keys=[], loadcase=[], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)", "LL(ST)"]`. Default: All load cases.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the truss stress result table.

#### Example Usage

```python
# Get truss stresses with custom units
options = TableOptions(force_unit='N', len_unit='MM')
stress_df = Result.TABLE.TrussStress(
    keys=[1, 2, 3],
    loadcase=["DL(ST)"],
    options=options
)
print(stress_df)
```

---

### BeamForce

Fetches standard Beam Force result tables.

**`Result.TABLE.BeamForce(keys=[], loadcase=[], parts=["PartI", "PartJ"], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Selfweight(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts: `["PartI", "Part1/4", "PartJ"]`, etc. Default: `["PartI", "PartJ"]`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam force result table.

#### Example Usage

```python
# Get beam forces at specific parts
beam_df = Result.TABLE.BeamForce(
    keys=[10, 20, 30],
    loadcase=["Selfweight(ST)", "Dead Load(ST)"],
    parts=["PartI", "Part1/4", "PartJ"]
)
print(beam_df)
```

---

### BeamForce_VBM

Fetches Beam Force (View by Max Value) result tables.

**`Result.TABLE.BeamForce_VBM(keys=[], loadcase=[], items=['all'], parts=["PartI", "PartJ"], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["STLENV_STR(CB:max)"]`. Default: All load cases.

- **`items`** (`list[str]`): Items to display: `["Axial", "Shear-y", "Moment-z"]`, etc. Default: `['all']`.

- **`parts`** (`list[str]`): Element parts: `["PartI", "Part1/4", "PartJ"]`, etc. Default: `["PartI", "PartJ"]`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam force (view by max) result table.

#### Example Usage

```python
# Get maximum beam forces
beam_max_df = Result.TABLE.BeamForce_VBM(
    loadcase=["STLENV_STR(CB:max)"],
    items=["Axial", "Shear-y", "Moment-z"]
)
print(beam_max_df)
```

---

### BeamForce_StaticPrestress

Fetches Beam Force (Static Prestress) result tables.

> **Note:** Construction Stage options are not applicable to this table type.

**`Result.TABLE.BeamForce_StaticPrestress(keys=[], loadcase=[], parts=["PartI", "PartJ"], components=['all'], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Prestress(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts: `["PartI", "PartJ"]`, etc. Default: `["PartI", "PartJ"]`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam force (static prestress) result table.

#### Example Usage

```python
# Get prestress beam forces
prestress_df = Result.TABLE.BeamForce_StaticPrestress(
    loadcase=["Prestress(ST)"],
    parts=["PartI", "PartJ"]
)
print(prestress_df)
```

---

### BeamStress

Fetches standard Beam Stress result tables.

**`Result.TABLE.BeamStress(keys=[], loadcase=[], parts=["PartI", "PartJ"], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Selfweight(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts: `["PartI", "PartJ"]`, etc. Default: `["PartI", "PartJ"]`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam stress result table.

#### Example Usage

```python
# Get beam stresses
stress_df = Result.TABLE.BeamStress(
    keys=[10, 20],
    loadcase=["Selfweight(ST)", "Live Load(ST)"]
)
print(stress_df)
```

---

### BeamStress_VBM

Fetches Beam Stress (View by Max Value) result tables.

**`Result.TABLE.BeamStress_VBM(keys=[], loadcase=[], items=['all'], parts=["PartI", "PartJ"], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["STLENV_SER(CB:max)"]`. Default: All load cases.

- **`items`** (`list[str]`): Items to display: `["Axial", "Shear-y", "Bend(+y)"]`, etc. Default: `['all']`.

- **`parts`** (`list[str]`): Element parts: `["PartI", "PartJ"]`, etc. Default: `["PartI", "PartJ"]`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam stress (view by max) result table.

#### Example Usage

```python
# Get maximum beam stresses
stress_max_df = Result.TABLE.BeamStress_VBM(
    loadcase=["STLENV_SER(CB:max)"],
    items=["Axial", "Bend(+y)", "Bend(-y)"]
)
print(stress_max_df)
```

---

### BeamStress_7DOF

Fetches Beam Stress (7th DOF) result tables.

**`Result.TABLE.BeamStress_7DOF(keys=[], loadcase=[], parts=["PartI", "PartJ"], section_position=['Max'], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["EccentricLoads(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts: `["PartI", "PartJ"]`, etc. Default: `["PartI", "PartJ"]`.

- **`section_position`** (`list[str]`): Section positions: `["Pos-1", "Pos-4", "Max"]`, etc. Default: `['Max']`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam stress (7th DOF) result table.

#### Example Usage

```python
# Get beam stresses with 7th DOF
stress_7dof_df = Result.TABLE.BeamStress_7DOF(
    loadcase=["EccentricLoads(ST)"],
    section_position=["Pos-1", "Max"]
)
print(stress_7dof_df)
```

---

### BeamStress_PSC

Fetches Beam Stress (PSC) result tables.

**`Result.TABLE.BeamStress_PSC(keys=[], loadcase=[], parts=["PartI", "PartJ"], section_position=['All'], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Selfweight(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts: `["PartI", "PartJ"]`, etc. Default: `["PartI", "PartJ"]`.

- **`section_position`** (`list[str]`): Section positions: `["Pos-1", "Pos-10", "Max", "Min", "All"]`. Default: `['All']`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam stress (PSC) result table.

#### Example Usage

```python
# Get PSC beam stresses
psc_df = Result.TABLE.BeamStress_PSC(
    loadcase=["Selfweight(ST)"],
    section_position=["Max", "Min"]
)
print(psc_df)
```

---

### BeamStress_7DOF_PSC

Fetches Beam Stress (7th DOF PSC) result tables.

**`Result.TABLE.BeamStress_7DOF_PSC(keys=[], loadcase=[], parts=["PartI", "PartJ"], section_position=['All'], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["EccentricLoads(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts: `["PartI", "PartJ"]`, etc. Default: `["PartI", "PartJ"]`.

- **`section_position`** (`list[str]`): Section positions: `["Pos-1", "Pos-10", "Max", "Min", "All"]`. Default: `['All']`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam stress (7th DOF PSC) result table.

#### Example Usage

```python
# Get 7DOF PSC beam stresses
psc_7dof_df = Result.TABLE.BeamStress_7DOF_PSC(
    loadcase=["EccentricLoads(ST)"],
    section_position=["All"]
)
print(psc_7dof_df)
```

---

### BeamStress_Equivalent

Fetches Beam Stress (Equivalent) result tables.

**`Result.TABLE.BeamStress_Equivalent(keys=[], loadcase=[], parts=["PartI", "PartJ"], section_position=['Maximum'], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["Selfweight(ST)"]`. Default: All load cases.

- **`parts`** (`list[str]`): Element parts: `["PartI", "PartJ"]`, etc. Default: `["PartI", "PartJ"]`.

- **`section_position`** (`list[str]`): Section positions: `["Maximum", "1", "12"]`, etc. Default: `['Maximum']`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the beam stress (equivalent) result table.

#### Example Usage

```python
# Get equivalent beam stresses
equiv_df = Result.TABLE.BeamStress_Equivalent(
    loadcase=["Selfweight(ST)"],
    section_position=["Maximum"]
)
print(equiv_df)
```

---

### PlateForce

Fetches Plate Force (Local or Global) result tables.

**`Result.TABLE.PlateForce(keys=[], loadcase=[], components=['all'], cs_stage=[], avg_nodal_result=False, type="Local", options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)"]`. Default: All load cases.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`avg_nodal_result`** (`bool`): Option to average nodal results. Default: `False`.

- **`type`** (`str`): Plate Force type. Options: `Local`, `Global`. Default: `Local`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the plate force result table.

#### Example Usage

```python
# Get local plate forces
plate_df = Result.TABLE.PlateForce(
    loadcase=["DL(ST)", "LL(ST)"],
    avg_nodal_result=True,
    type="Local"
)
print(plate_df)
```

---

### PlateForce_UnitLength

Fetches Plate Force (Unit Length) for Local or Global coordinates.

**`Result.TABLE.PlateForce_UnitLength(keys=[], loadcase=[], components=['all'], cs_stage=[], avg_nodal_result=False, node_flag_center=False, node_flag_nodes=True, type="Local", options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)"]`. Default: All load cases.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`avg_nodal_result`** (`bool`): Option to average nodal results. Default: `False`.

- **`node_flag_center`** (`bool`): Retrieve results at the center of the plate. Default: `False`.

- **`node_flag_nodes`** (`bool`): Retrieve results at the nodes of the plate. Default: `True`.

- **`type`** (`str`): Plate Force type. Options: `Local`, `Global`. Default: `Local`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the plate force (unit length) result table.

#### Example Usage

```python
# Get plate forces per unit length
plate_ul_df = Result.TABLE.PlateForce_UnitLength(
    loadcase=["DL(ST)"],
    node_flag_center=True,
    node_flag_nodes=True,
    type="Local"
)
print(plate_ul_df)
```

---

### PlateForce_UnitLength_VBM

Fetches Plate Force (Unit Length, View by Max Value) for Local or Global coordinates.

**`Result.TABLE.PlateForce_UnitLength_VBM(keys=[], loadcase=[], items=['all'], components=['all'], cs_stage=[], avg_nodal_result=False, node_flag_center=False, node_flag_nodes=True, type="Local", options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["STLENV_STR(CB:max)"]`. Default: All load cases.

- **`items`** (`list[str]`): Items to display: `["Fxx", "Fyy", "Mxx"]`, etc. Default: `['all']`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`avg_nodal_result`** (`bool`): Option to average nodal results. Default: `False`.

- **`node_flag_center`** (`bool`): Retrieve results at the center of the plate. Default: `False`.

- **`node_flag_nodes`** (`bool`): Retrieve results at the nodes of the plate. Default: `True`.

- **`type`** (`str`): Plate Force type. Options: `Local`, `Global`. Default: `Local`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the plate force (unit length, view by max) result table.

#### Example Usage

```python
# Get maximum plate forces per unit length
plate_ul_max_df = Result.TABLE.PlateForce_UnitLength_VBM(
    loadcase=["STLENV_STR(CB:max)"],
    items=["Fxx", "Fyy", "Mxx"],
    node_flag_center=True
)
print(plate_ul_max_df)
```

---

### PlateForce_UnitLength_WA

Fetches Plate Force (Unit Length, W-A Moment) result tables.

**`Result.TABLE.PlateForce_UnitLength_WA(keys=[], loadcase=[], components=['all'], cs_stage=[], avg_nodal_result=False, node_flag_center=False, node_flag_nodes=True, options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`loadcase`** (`list[str]`): Optional. List of load case names. Example: `["DL(ST)"]`. Default: All load cases.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`avg_nodal_result`** (`bool`): Option to average nodal results. Default: `False`.

- **`node_flag_center`** (`bool`): Retrieve results at the center of the plate. Default: `False`.

- **`node_flag_nodes`** (`bool`): Retrieve results at the nodes of the plate. Default: `True`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the plate force (unit length, W-A moment) result table.

#### Example Usage

```python
# Get W-A moment plate forces
plate_wa_df = Result.TABLE.PlateForce_UnitLength_WA(
    loadcase=["DL(ST)"],
    node_flag_center=True,
    node_flag_nodes=True
)
print(plate_wa_df)
```

---


### Tendon_Loss

Fetches Tendon Loss for Tendon/Tendon Group for a particular Construction stage.   

**`Result.TABLE.Tendon_Loss(tdn_group="", cs_stage="", options:TableOptions=None)`**

#### Parameters

- **`tdn_group`** (`str`): Tendon Name or Tendon Group Name.   

- **`cs_stage`** (`str`): Construction Stage name.   

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the plate force (unit length) result table.

#### Example Usage

```python
from midas_civil import *

# SAVES TENDON LOSS TABLE FOR ALL THE TENDON PROFILES
TableOptions.EXCEL_FILE_LOC='zzz_Test2.xlsx'

CS.STAGE.sync()
Tendon.Profile.sync()

for stage in CS.STAGE.stages:
    for profile in Tendon.Profile.profiles:
        Result.TABLE.Tendon_Loss(profile.NAME,stage.NAME)

```


---

### Story_Displacement

Fetches Story displacement - Story result tables.     

**`Result.TABLE.Story_Displacement(SD_type:_SD_Type = "X", loadcase:list=[], options:TableOptions=None)`**

#### Parameters

- **`SD_type`** (`str`): Story Displacement direction. Can be `X` , `Y` or `COMB`.   

- **`loadcase`** (`list`): List of load case names, e.g., ["Selfweight(ST)"].   

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the Story displacement result table.

#### Example Usage

```python
from midas_civil import *

disp = Result.TABLE.Story_Displacement(SD_type = "COMB", loadcase=["Selfweight(ST)"])
print(disp)

```


---

### Story_Drift

Fetches Story drift - Story result tables.     

**`Result.TABLE.Story_Drift(SD_type:_SD_Type = "X", loadcase:list=[], allowable_ratio:float = 0.0015, options:TableOptions=None)`**

#### Parameters

- **`SD_type`** (`str`): Story Displacement direction. Can be `X` , `Y` or `COMB`.   

- **`loadcase`** (`list`): List of load case names, e.g., ["Selfweight(ST)"].   

- **`allowable_ratio`** (`float`): Allowable Story Drift Ratio. Default is `0.0015`.   

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the Story drift result table.

#### Example Usage

```python
from midas_civil import *

drift = Result.TABLE.Story_Drift(SD_type = "COMB", loadcase=["Selfweight(ST)"],allowable_ratio=0.002)
print(drift)

```

---

### HoH_Stress

Fetches Heat of Hydration Stress result tables.

**`Result.TABLE.HoH_Stress(keys=[], Stress_option="Local", node_flag_center=False, node_flag_nodes=True, components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`Stress_option`** (`str`): Stress Option for `"Local"` or `"Global"`. Default: `"Local"`.

- **`node_flag_center`** (`bool`): Retrieve results at the center of the solid element. Default: `False`.

- **`node_flag_nodes`** (`bool`): Retrieve results at the nodes of the solid element. Default: `True`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Stage`, `Step`, `Time`, `Node`, `Sig-xx`, `Sig-yy`, `Sig-zz`, `Sig-xy`, `Sig-yz`, `Sig-xz`,`Sig-P1`,`Sig-P2`,`Sig-P3`, `Max-Shear`, `Sig-EFF`,`Sig-OCT`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the heat of hydration stress result table.

#### Example Usage

```python
# Get local heat of hydration stresses for specific elements
hoh_stress_df = Result.TABLE.HoH_Stress(
    keys=[10, 11, 12],
    Stress_option="Local",
    node_flag_center=False,
    node_flag_nodes=True,
    cs_stage=["CS2:013"]
)
print(hoh_stress_df)
```

---

### HoH_Temperature

Fetches Heat of Hydration Temperature result tables.

**`Result.TABLE.HoH_Temperature(keys=[], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Node`, `Stage`, `Step`, `Time`, `Temperature`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the heat of hydration temperature result table.

#### Example Usage

```python
# Get heat of hydration temperatures for a specific stage
hoh_temp_df = Result.TABLE.HoH_Temperature(
    cs_stage=["CS2:013"]
)
print(hoh_temp_df)
```

---

### HoH_Displacement

Fetches Heat of Hydration Displacement result tables.

**`Result.TABLE.HoH_Displacement(keys=[], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Node`, `Stage`, `Step`, `Time`, `DX`, `DY`, `DZ`, `RX`, `RY`, `RZ`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the heat of hydration displacement result table.

#### Example Usage

```python
# Get heat of hydration displacements with custom options
options = TableOptions(len_unit='MM', ExcelFileLoc="hoh_results.xlsx")
hoh_disp_df = Result.TABLE.HoH_Displacement(
    keys="Bridge_Deck_Group",
    options=options,
    cs_stage=["CS2:013"]
)
print(hoh_disp_df)
```

---

### HoH_Tensile_Stress

Fetches Heat of Hydration Allowable Tensile Stress result tables.

**`Result.TABLE.HoH_Tensile_Stress(keys=[], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Node`, `Stage`, `Step`, `Time`, `Stress`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the heat of hydration allowable tensile stress result table.

#### Example Usage

```python
# Get allowable tensile stresses for all elements
hoh_tensile_df = Result.TABLE.HoH_Tensile_Stress(cs_stage=["CS2:013"])
print(hoh_tensile_df)
```

---

### HoH_Pipe_Node_Temperature

Fetches Heat of Hydration Pipe Cooling Nodal Temperature result tables.

**`Result.TABLE.HoH_Pipe_Node_Temperature(keys=[], components=['all'], cs_stage=[], options=None)`**

#### Parameters

- **`keys`** (`list[int]` or `str`): Optional. List of Element IDs or a Structure Group Name. Default: All elements.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Pipe Cooling`, `Node`, `Stage`, `Step`, `Time`, `Temperature`.

- **`cs_stage`** (`list` or `'all'`): Optional. Construction Stage options. Default: `[]`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the heat of hydration pipe cooling nodal temperature result table.

#### Example Usage

```python
# Get pipe cooling nodal temperatures for specific nodes
hoh_pipe_temp_df = Result.TABLE.HoH_Pipe_Node_Temperature(
    keys=[1001, 1002, 1003],
    cs_stage=['all']
)
print(hoh_pipe_temp_df)
```

---

### TH_Disp

Fetches Time History Displacement (Node) result tables.

**`Result.TABLE.TH_Disp(th_case:list, keys=[], step_from:float=0, step_to:float=1, step_interval:int=1, components=['all'], ref_pt:str="Ground", anr_node:int=None, options:TableOptions=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names, e.g., `["Elcent"]`.

- **`keys`** (`list[int]` or `str`): Optional. List of Node IDs or a Structure Group Name. Default: All nodes.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`ref_pt`** (`str`): Reference point (Method 1). Options: `Ground`, `AddGroundMotion`. Default: `Ground`. Ignored if `anr_node` is provided.

- **`anr_node`** (`int`): Reference point (Method 2) - another node number. Optional.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history displacement result table.

#### Example Usage

```python
from midas_civil import *

disp = Result.TABLE.TH_Disp(
    th_case=["Elcent"],
    keys=[10],
    step_from=0.1, step_to=0.5, step_interval=1
)
print(disp)
```

---

### TH_Velocity

Fetches Time History Velocity (Node) result tables.

**`Result.TABLE.TH_Velocity(th_case:list, keys=[], step_from:float=0, step_to:float=1, step_interval:int=1, components=['all'], ref_pt:str="Ground", anr_node:int=None, options:TableOptions=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names, e.g., `["Elcent"]`.

- **`keys`** (`list[int]` or `str`): Optional. List of Node IDs or a Structure Group Name. Default: All nodes.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`ref_pt`** (`str`): Reference point (Method 1). Options: `Ground`, `AddGroundMotion`. Default: `Ground`. Ignored if `anr_node` is provided.

- **`anr_node`** (`int`): Reference point (Method 2) - another node number. Optional.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history velocity result table.

#### Example Usage

```python
from midas_civil import *

vel = Result.TABLE.TH_Velocity(
    th_case=["Elcent"],
    keys=[10],
    step_from=0.1, step_to=0.5, step_interval=1
)
print(vel)
```

---

### TH_Acceleration

Fetches Time History Acceleration (Node) result tables.

**`Result.TABLE.TH_Acceleration(th_case:list, keys=[], step_from:float=0, step_to:float=1, step_interval:int=1, components=['all'], ref_pt:str="Ground", anr_node:int=None, options:TableOptions=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names, e.g., `["Elcent"]`.

- **`keys`** (`list[int]` or `str`): Optional. List of Node IDs or a Structure Group Name. Default: All nodes.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`.

- **`ref_pt`** (`str`): Reference point (Method 1). Options: `Ground`, `AddGroundMotion`. Default: `Ground`. Ignored if `anr_node` is provided.

- **`anr_node`** (`int`): Reference point (Method 2) - another node number. Optional.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history acceleration result table.

#### Example Usage

```python
from midas_civil import *

accel = Result.TABLE.TH_Acceleration(
    th_case=["Elcent"],
    keys=[10],
    step_from=0.1, step_to=0.5, step_interval=1
)
print(accel)
```

---

### TH_BeamForce

Fetches Time History Beam Force result tables.

**`Result.TABLE.TH_BeamForce(th_case, keys=[], parts=["PartI", "PartJ"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Beam Element IDs.

- **`parts`** (`list[str]`): Element parts. Options: `PartI`, `PartJ`. Default: `["PartI", "PartJ"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Part`, `Time/Step`, `Axial`, `Shear-y`, `Shear-z`, `Torsion`, `Moment-y`, `Moment-z`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history beam force result table.

#### Example Usage

```python
# Get time history beam forces for a specific element
th_beam_df = Result.TABLE.TH_BeamForce(
    th_case=["Elcent"],
    keys=[5],
    parts=["PartI", "PartJ"],
    step_from=0.1, step_to=0.5, step_interval=1
)
print(th_beam_df)
```

---

### TH_TrussForce

Fetches Time History Truss Force result tables.

**`Result.TABLE.TH_TrussForce(th_case, keys=[], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Truss Element IDs.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Force-I`, `Force-J`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

> **Note:** Truss elements do not support the `parts` argument, since results are reported directly at the I and J ends.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history truss force result table.

#### Example Usage

```python
# Get time history truss forces for a specific element
th_truss_df = Result.TABLE.TH_TrussForce(
    th_case=["Elcent"],
    keys=[55],
    step_from=0.1, step_to=0.5, step_interval=1
)
print(th_truss_df)
```

---

### TH_PlaneStressForce

Fetches Time History Plane Stress Element Force result tables.

**`Result.TABLE.TH_PlaneStressForce(th_case, keys=[], parts=["PartI", "PartJ", "PartK", "PartL"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Plane Stress Element IDs.

- **`parts`** (`list[str]`): Element parts. Options: `PartI`, `PartJ`, `PartK`, `PartL`. Default: `["PartI", "PartJ", "PartK", "PartL"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Part`, `Fx`, `Fy`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history plane stress force result table.

#### Example Usage

```python
# Get time history plane stress forces for a specific element
th_ps_force_df = Result.TABLE.TH_PlaneStressForce(
    th_case=["Elcent"],
    keys=[50],
    step_from=0.1, step_to=0.3, step_interval=1
)
print(th_ps_force_df)
```

---

### TH_PlaneStrainForce

Fetches Time History Plane Strain Element Force result tables.

**`Result.TABLE.TH_PlaneStrainForce(th_case, keys=[], parts=["PartI", "PartJ", "PartK", "PartL"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Plane Strain Element IDs.

- **`parts`** (`list[str]`): Element parts. Options: `PartI`, `PartJ`, `PartK`, `PartL`. Default: `["PartI", "PartJ", "PartK", "PartL"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Part`, `Fx`, `Fy`, `Fz`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history plane strain force result table.

#### Example Usage

```python
# Get time history plane strain forces for a specific element
th_pstrain_force_df = Result.TABLE.TH_PlaneStrainForce(
    th_case=["Elcent"],
    keys=[49],
    step_from=0.1, step_to=0.3, step_interval=1
)
print(th_pstrain_force_df)
```

---

### TH_SolidForce

Fetches Time History Solid Element Force result tables.

**`Result.TABLE.TH_SolidForce(th_case, keys=[], parts=["PartI", "PartJ", "PartK", "PartL", "PartM", "PartN", "PartO", "PartP"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Solid Element IDs.

- **`parts`** (`list[str]`): Element parts. Options: `PartI` through `PartP` (8 corner parts). Default: `["PartI", "PartJ", "PartK", "PartL", "PartM", "PartN", "PartO", "PartP"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Part`, `Fx`, `Fy`, `Fz`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history solid force result table.

#### Example Usage

```python
# Get time history solid forces for a specific element
th_solid_force_df = Result.TABLE.TH_SolidForce(
    th_case=["Elcent"],
    keys=[53],
    step_from=0.1, step_to=0.2, step_interval=1
)
print(th_solid_force_df)
```

---

### TH_PlateForce

Fetches Time History Plate Force result tables.

**`Result.TABLE.TH_PlateForce(th_case, keys=[], parts=["PartI", "PartJ", "PartK", "PartL"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Plate Element IDs .

- **`parts`** (`list[str]`): Element parts. Options: `PartI`, `PartJ`, `PartK`, `PartL`. Default: `["PartI", "PartJ", "PartK", "PartL"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Part`, `FX`, `FY`, `FZ`, `MX`, `MY`, `MZ`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history plate force result table.

#### Example Usage

```python
# Get time history plate forces for a specific element
th_plate_df = Result.TABLE.TH_PlateForce(
    th_case=["Elcent"],
    keys=[51],
    step_from=0.1, step_to=0.3, step_interval=1
)
print(th_plate_df)
```

---

### TH_PlateUnitForce

Fetches Time History Plate Force (Unit Length) result tables.

**`Result.TABLE.TH_PlateUnitForce(th_case, keys=[], parts=["PartC", "PartI", "PartJ", "PartK", "PartL"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Plate Element IDs.

- **`parts`** (`list[str]`): Element parts. Options: `PartC`, `PartI`, `PartJ`, `PartK`, `PartL`. Default: `["PartC", "PartI", "PartJ", "PartK", "PartL"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Part`, `Fxx`, `Fyy`, `Fxy`, `Mxx`, `Myy`, `Mxy`, `Vxx`, `Vyy`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history plate force (unit length) result table.

#### Example Usage

```python
# Get time history plate unit forces for a specific element
th_plate_ul_df = Result.TABLE.TH_PlateUnitForce(
    th_case=["Elcent"],
    keys=[51],
    step_from=0.1, step_to=0.2, step_interval=1
)
print(th_plate_ul_df)
```

---

### TH_WallForce

Fetches Time History Wall Force result tables.

**`Result.TABLE.TH_WallForce(th_case, keys=[], parts=["PartI", "PartJ"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["EQ1"]`.

- **`keys`** (`list[int]`): Required. List of Wall Element IDs.

- **`parts`** (`list[str]`): Element parts. Options: `PartI`, `PartJ`. Default: `["PartI", "PartJ"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `WallID`, `Load`, `Time/Step`, `Part`, `Axial`, `Shear-y`, `Shear-z`, `Torsion`, `Moment-y`, `Moment-z`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history wall force result table.

#### Example Usage

```python
# Get time history wall forces for a specific element
th_wall_df = Result.TABLE.TH_WallForce(
    th_case=["EQ1"],
    keys=[466],
    step_from=0.1, step_to=0.2, step_interval=1
)
print(th_wall_df)
```

---

### TH_BeamStress

Fetches Time History Beam Stress result tables.

**`Result.TABLE.TH_BeamStress(th_case, keys=[], parts=["PartI", "PartJ"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Beam Element IDs.

- **`parts`** (`list[str]`): Element parts. Options: `PartI`, `PartJ`. Default: `["PartI", "PartJ"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Part`, `Axial`, `Shear-y`, `Shear-z`, `Bend(+y)`, `Bend(-y)`, `Bend(+z)`, `Bend(-z)`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history beam stress result table.

#### Example Usage

```python
# Get time history beam stresses for a specific element
th_beam_stress_df = Result.TABLE.TH_BeamStress(
    th_case=["Elcent"],
    keys=[5],
    step_from=0.1, step_to=0.4, step_interval=1
)
print(th_beam_stress_df)
```

---

### TH_TrussStress

Fetches Time History Truss Stress result tables.

**`Result.TABLE.TH_TrussStress(th_case, keys=[], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Truss Element IDs.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Stress-I`, `Stress-J`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

> **Note:** Truss elements do not support the `parts` argument, since results are reported directly at the I and J ends.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history truss stress result table.

#### Example Usage

```python
# Get time history truss stresses for a specific element
th_truss_stress_df = Result.TABLE.TH_TrussStress(
    th_case=["Elcent"],
    keys=[55],
    step_from=0.1, step_to=0.5, step_interval=1
)
print(th_truss_stress_df)
```

---

### TH_PlateStress

Fetches Time History Plate Element Stress result tables.

**`Result.TABLE.TH_PlateStress(th_case, keys=[], parts=["PartC", "PartI", "PartJ", "PartK", "PartL"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Plate Element IDs.

- **`parts`** (`list[str]`): Element parts. Options: `PartC`, `PartI`, `PartJ`, `PartK`, `PartL`. Default: `["PartC", "PartI", "PartJ", "PartK", "PartL"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Part`, `Sig-xx(Top)`, `Sig-yy(Top)`, `Sig-xy(Top)`, `Sig-xx(Bot)`, `Sig-yy(Bot)`, `Sig-xy(Bot)`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history plane stress element stress result table.

#### Example Usage

```python
# Get time history plane stress element stresses for a specific element
th_plate_stress_df = Result.TABLE.TH_PlateStress(
    th_case=["Elcent"],
    keys=[50],
    step_from=0.1, step_to=0.3, step_interval=1
)
print(th_plate_stress_df)
```

---

### TH_PlaneStress_Stress

Fetches Time History Plane Stress Element Stress result tables.

**`Result.TABLE.TH_PlaneStress_Stress(th_case, keys=[], parts=["PartC", "PartI", "PartJ", "PartK", "PartL"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Plane Stress Element IDs.

- **`parts`** (`list[str]`): Element parts. Options: `PartC`, `PartI`, `PartJ`, `PartK`, `PartL`. Default: `["PartC", "PartI", "PartJ", "PartK", "PartL"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Part`, `Sig-xx`, `Sig-yy`, `Sig-xy`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history plane stress element stress result table.

#### Example Usage

```python
# Get time history plane stress element stresses for a specific element
th_ps_stress_df = Result.TABLE.TH_PlaneStress_Stress(
    th_case=["Elcent"],
    keys=[50],
    step_from=0.1, step_to=0.3, step_interval=1
)
print(th_ps_stress_df)
```

---

### TH_PlaneStrain_Stress

Fetches Time History Plane Strain Element Stress result tables.

**`Result.TABLE.TH_PlaneStrain_Stress(th_case, keys=[], parts=["PartC", "PartI", "PartJ", "PartK", "PartL"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Plane Strain Element IDs.

- **`parts`** (`list[str]`): Element parts. Options: `PartC`, `PartI`, `PartJ`, `PartK`, `PartL`. Default: `["PartC", "PartI", "PartJ", "PartK", "PartL"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Part`, `Sig-xx`, `Sig-yy`, `Sig-zz`, `Sig-xy`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history plane strain element stress result table.

#### Example Usage

```python
# Get time history plane strain element stresses for a specific element
th_pstrain_stress_df = Result.TABLE.TH_PlaneStrain_Stress(
    th_case=["Elcent"],
    keys=[49],
    step_from=0.1, step_to=0.3, step_interval=1
)
print(th_pstrain_stress_df)
```

---

### TH_SolidStress

Fetches Time History Solid Element Stress result tables.

**`Result.TABLE.TH_SolidStress(th_case, keys=[], parts=["PartI", "PartJ", "PartK", "PartL", "PartM", "PartN", "PartO", "PartP"], step_from=0, step_to=1, step_interval=1, components=['all'], options=None)`**

#### Parameters

- **`th_case`** (`list`): Required. Time history load case names. Example: `["Elcent"]`.

- **`keys`** (`list[int]`): Required. List of Solid Element IDs.

- **`parts`** (`list[str]`): Element parts. Options: `PartI` through `PartP` (8 corner parts). Default: `["PartI", "PartJ", "PartK", "PartL", "PartM", "PartN", "PartO", "PartP"]`.

- **`step_from`** (`float`): Start time. Default: `0`.

- **`step_to`** (`float`): End time. Default: `1`.

- **`step_interval`** (`int`): Time interval (STEPS). Default: `1`.

- **`components`** (`list[str]`): Table components to include. Default: `['all']`. Available: `Elem`, `Load`, `Time/Step`, `Part`, `Sig-xx`, `Sig-yy`, `Sig-zz`, `Sig-xy`, `Sig-yz`, `Sig-xz`.

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns
- **Polars DataFrame**: A DataFrame containing the time history solid element stress result table.

#### Example Usage

```python
# Get time history solid element stresses for a specific element
th_solid_stress_df = Result.TABLE.TH_SolidStress(
    th_case=["Elcent"],
    keys=[53],
    step_from=0.1, step_to=0.2, step_interval=1
)
print(th_solid_stress_df)
```

---

### VibrationModeShapes

Fetches Vibration Mode Shape (Eigenvalue Mode) result tables.
**`Result.TABLE.VibrationModeShapes(modes, nodeIDs=[], output="EigenVector", options=None)`**

#### Parameters

- **`modes`** (`str`, `int`, or `list`): Mode number(s) to fetch. Example: `1`, `'Mode 1'`, `['Mode1', 'Mode2']`, or `[1, 2]`.

- **`nodeIDs`** (`list[int]` or `str`): Optional. List of Node IDs or a Structure Group Name. Default: All nodes.

- **`output`** (`str`): The specific eigenvalue analysis result to output. Options include:
    - **`EigenVector`** (Default: Outputs eigenvector for each degree of freedom)
    - **`Eigenvalue_Analysis`** (Summary table of natural periods and participating masses)
    - **`Modal_Participation_Percent`**
    - **`Modal_Participation_Mass`**
    - **`Modal_Participation_Factor`**
    - **`Modal_Direction_Factor`**

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns

- **Polars DataFrame**: A DataFrame containing the specified vibration mode shape result table.

#### Example Usage

```python
from midas_civil import *

# Get eigenvectors for Modes 1 and 2 for specific nodes
eigen_vector_df = Result.TABLE.VibrationModeShapes(
    modes=[1, 2],
    nodeIDs=[10, 20, 30],
    output="EigenVector"
)
```

---

### BucklingModeShapes

Fetches Buckling Mode Shape result tables.

**`Result.TABLE.BucklingModeShapes(modes, nodeIDs=[], output="BucklingVector", options=None)`**

#### Parameters

- **`modes`** (`str`, `int`, or `list`): Mode number(s) to fetch. Example: `1`, `'Mode 1'`, `['Mode1', 'Mode2']`, or `[1, 2]`.

- **`nodeIDs`** (`list[int]` or `str`): Optional. List of Node IDs or a Structure Group Name. Default: All nodes.

- **`output`** (`str`): The specific buckling analysis result to output. Options include:
    - **`BucklingVector`** (Default: Outputs the buckling mode vectors)
    - **`Buckling_Analysis`** (Outputs critical buckling coefficients from the summary table)

- **`options`** (`TableOptions`): Optional. Table options object for formatting and output settings.

#### Returns

- **Polars DataFrame**: A DataFrame containing the specified buckling mode shape result table.

#### Example Usage

```python
from midas_civil import *

# Get buckling mode vectors for Mode 1
buckling_vector_df = Result.TABLE.BucklingModeShapes(
    modes='Mode 1',
    output="BucklingVector"
)
print(buckling_vector_df)
```