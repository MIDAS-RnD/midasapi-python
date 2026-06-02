# Eigen Value Analysis Control

A nested class within AnalysisControl used to define Eigen Value Analysis control for dynamic analysis.

## Constructor
---
**<font color="green">`AnalysisControl.EigenValue(analysis_type = None, nFreq = 1, nIter = 20, nSubspaceDim = 1, tol = 1e-10, frequency_range = [None,None], bStrum = False, load_Vectors = None, nGL_LinkVectors = 0)`</font>**

Creates eigen vector analysis control settings for dynamic analysis.

### Parameters
* `analysis_type`: Type of Analysis (required)
    1. `"EIGEN"`: Subspace Iteration
    2. `"LANCZOS"`: Lanczos
    3. `"RITZ"`: Ritz Vectors

#### For EIGEN:
* `nFreq (default=1)`: Number of Frequencies (required for EIGEN)
* `nIter (default=20)`: Number of Iterations (required for EIGEN)
* `nSubspaceDim (default=1)`: Subspace Dimension
* `tol (default=1e-10)`: Convergence Tolerance 

#### For LANCZOS:
* `nFreq (default=1)`: Number of Frequencies (required for LANCZOS)
* `frequency_range`: Frequency Range [frmin, frmax] 
  - Format: `[min_freq, max_freq]`
* `bstrum (default=False)`: Toggles Sturm Sequence Check

#### For RITZ:
* `load_Vectors`: Load Vectors definition (required for RITZ)
  - Format: `[["case or acc", num_generations], ...]`
  - For ground acceleration: `["ACCX"/"ACCY"/"ACCZ", num_generations]`
  - For load case: `["case_name", num_generations]`
* `nGL_LinkVectors (default=0)`: Number of generations for each GL-link. If value = 0 , then GL-link force vector won't be included.    

## Examples
---
```py
# EIGEN analysis - Subspace Iteration
AnalysisControl.EigenValue('EIGEN',
            nFreq=33,
            nIter=21,
            nSubspaceDim=3,
            tol=1e-12
            )

# LANCZOS analysis without frequency range
AnalysisControl.EigenValue('LANCZOS',
            nFreq=33,
            bStrum=True
            )

# LANCZOS analysis with frequency range
AnalysisControl.EigenValue('LANCZOS',
            nFreq=33,
            frequency_range=(5,100),
            bStrum=True
            )


# RITZ analysis with load cases and ground acceleration

# Sample Load Case is created
Load_Case('USER','DL')
Load_Case.create()

AnalysisControl.EigenValue('RITZ',
            load_Vectors=[('ACCX',6),('ACCY',7),('DL',4)],
            nGL_LinkVectors=0
            )

```