# Buckling Analysis Control

A nested class within AnalysisControl used to create buckling analysis control for eigenvalue buckling analysis.

## Constructor
---
**<font color="green">`AnalysisControl.Buckling(mode_num = None, opt_positive = True, load_factor_from = 0, load_factor_to = 0, opt_sturm_seq = False, opt_consider_axial_only = False, load_case_data = None)`</font>**

Creates buckling analysis control settings for eigenvalue buckling analysis.

### Parameters
* `mode_num`: Number of Modes (required)
* `opt_positive (default=True)`: Load Factor Range Type
* `load_factor_from (default=0)`: Search From - Lower bound for load factor search range (only used when opt_positive is False)
* `load_factor_to (default=0)`: Search To - Upper bound for load factor search range (only used when opt_positive is False)
* `opt_sturm_seq (default=False)`: Check Sturm Sequence
* `opt_consider_axial_only (default=False)`: Frame Geometric Stiffness Option
* `load_case_data`: Load Cases with Scale Factors and Types (required)
  - List of load cases with their scale factors and load types
  - Format: `[["LC1", factor1, load_type1], ["LC2", factor2, load_type2], ...]`
  - Load Type: `0`=Variable, `1`=Constant

### Object Attributes
* `ID` (int): The ID of the buckling control entry (always 1).
* `MODE_NUM` (int): Number of modes to calculate.
* `OPT_POSITIVE` (bool): Load factor range type setting.
* `LOAD_FACTOR_FROM` (float): Lower bound for load factor search.
* `LOAD_FACTOR_TO` (float): Upper bound for load factor search.
* `OPT_STURM_SEQ` (bool): Sturm sequence check setting.
* `OPT_CONSIDER_AXIAL_ONLY` (bool): Frame geometric stiffness option.
* `LOAD_CASE_DATA` (list): Load cases with scale factors and types.

## Examples
---
```py
# Basic buckling analysis
AnalysisControl.Buckling(
    mode_num=5,
    load_case_data=[["DL", 1.0, 1]]
)

# Advanced buckling analysis with search range
AnalysisControl.Buckling(
    mode_num=8,
    opt_positive=False,
    load_factor_from=-2.0,
    load_factor_to=5.0,
    opt_consider_axial_only=True,
    load_case_data=[
        ["DL", 1.0, 1],
        ["LL", 1.0, 0]
    ]
)

```