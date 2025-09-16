# Eigen Vector Analysis Control

A nested class within AnalysisControl used to create eigen vector analysis control for dynamic analysis.

## Constructor
---
**<font color="green">`AnalysisControl.EigenValue(analysis_type = None, ifreq = 1, iiter = 20, idim = 1, tol = 0, frequency_range = None, bstrum = False, bminmax = None, frmin = None, frmax = None, bincnl = False, ignum = None, load_vector = None, vritz = None)`</font>**

Creates eigen vector analysis control settings for dynamic analysis.

### Parameters
* `analysis_type`: Type of Analysis (required)
  - `"EIGEN"`: Subspace Iteration
  - `"LANCZOS"`: Lanczos
  - `"RITZ"`: Ritz Vectors

#### For EIGEN:
* `ifreq (default=1)`: Number of Frequencies (required for EIGEN)
* `iiter (default=20)`: Number of Iterations (required for EIGEN)
* `idim (default=1)`: Subspace Dimension (optional for EIGEN)
* `tol (default=0)`: Convergence Tolerance (optional for EIGEN)

#### For LANCZOS:
* `frequency_range`: Frequency Range [frmin, frmax] (optional for LANCZOS)
  - If provided, automatically sets bMINMAX=True
  - Format: `[min_freq, max_freq]`
* `bstrum (default=False)`: Sturm Sequence Check (optional for LANCZOS)

#### For RITZ:
* `bincnl (default=False)`: Include GL-link Force Vectors (optional for RITZ)
* `ignum`: Number of Generations for Each GL-link Force (required for RITZ)
* `load_vector`: Load Cases in simple format (required for RITZ)
  - Format: `[["case_or_acc", nog], ...]`
  - For ground acceleration: `["ACCX"/"ACCY"/"ACCZ", nog]`
  - For load case: `["case_name", nog]`

### Object Attributes
* `ID` (int): The ID of the eigen value control entry (always 1).
* `TYPE` (str): Type of analysis ("EIGEN", "LANCZOS", or "RITZ").
* `iFREQ` (int): Number of frequencies.
* `iITER` (int): Number of iterations.
* `iDIM` (int): Subspace dimension.
* `TOL` (float): Convergence tolerance.
* `bMINMAX` (bool): Frequency range flag.
* `FRMIN` (float): Minimum frequency.
* `FRMAX` (float): Maximum frequency.
* `bSTRUM` (bool): Sturm sequence check flag.
* `bINCNL` (bool): Include GL-link force vectors flag.
* `iGNUM` (int): Number of generations.
* `vRITZ` (list): Ritz vector load cases.

## Examples
---
```py
# EIGEN analysis - Subspace Iteration
AnalysisControl.EigenValue(
    analysis_type="EIGEN",
    ifreq=10,
    iiter=20,
    idim=1,
    tol=1e-10
)

# LANCZOS analysis with frequency range
AnalysisControl.EigenValue(
    analysis_type="LANCZOS",
    ifreq=15,
    frequency_range=[0, 1600],
    bstrum=True
)

# LANCZOS analysis without frequency range
AnalysisControl.EigenValue(
    analysis_type="LANCZOS",
    ifreq=12,
    bstrum=False
)

# RITZ analysis with load cases and ground acceleration
AnalysisControl.EigenValue(
    analysis_type="RITZ",
    bincnl=False,
    ignum=1,
    load_vector=[
        ["DL", 1], 
        ["ACCX", 1],
        ["ACCY", 1]
    ]
)

```