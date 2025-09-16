# P-Delta Analysis Control

A nested class within AnalysisControl used to create P-Delta analysis control for geometric nonlinear analysis.

## Constructor
---
**<font color="green">`AnalysisControl.PDelta(iter = 5, tol = 0.00001, load_case_data = None)`</font>**

Creates P-Delta analysis control settings for geometric nonlinear analysis.

### Parameters
* `iter (default=5)`: Number of Iterations (required)
* `tol (default=0.00001)`: Convergence Tolerance (required)
* `load_case_data`: Load Cases with Scale Factors (required)
  - List of load cases and their corresponding scale factors for P-Delta analysis
  - Format: `[["LC1", factor1], ["LC2", factor2], ...]`

### Object Attributes
* `ID` (int): The ID of the P-Delta control entry (always 1).
* `ITER` (int): Number of iterations for P-Delta analysis.
* `TOL` (float): Convergence tolerance for P-Delta analysis.
* `LOAD_CASE_DATA` (list): Load cases with their scale factors.

## Examples
---
```py
# Basic P-Delta analysis with single load case
AnalysisControl.PDelta(
    iter=5,
    tol=0.00001,
    load_case_data=[["DL", 1.0]]
)

# P-Delta analysis with multiple load cases

AnalysisControl.PDelta(
    iter=15,
    tol=0.0000001,
    load_case_data=[
        ["DL", 1.0],
        ["LL", 0.75]
    ]
)
```