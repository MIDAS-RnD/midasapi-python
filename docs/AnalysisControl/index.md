# AnalysisControl

The AnalysisControl class provides a unified interface to create different types of analysis control settings and includes nested classes for specific analysis control types.

## Nested Classes
---
- **MainControlData**: Main control data for analysis settings
- **PDelta**: P-Delta analysis control for geometric nonlinear analysis
- **Buckling**: Buckling analysis control for eigenvalue buckling analysis
- **EigenValue**: Eigen vector analysis control for dynamic analysis
- **Settlement**: Settlement analysis control for settlement analysis

## Complete Example
---
```py
from midas_civil import*

MAPI_KEY("eyJ1ciI6IklOMjQwN0ZZVDIiLCJwZyI6ImNpdmlsIiwi") #Paste your Mapi Key

# Create nodes and elements for the model
for j in range(6):
    for i in range(2):
        Node(i*10,j*2,0)
        Node.create()

j = 0
for k in range(6):   
    for i in range(1,2):
        Element.Beam(i +j,i+1 +j)
        Element.create()
    j = j + 2

# Load Cases
Load_Case("D","DL")
Load_Case("L","LL") 

Load_Case.create()

# Main Control Data - Basic analysis control settings
AnalysisControl.MainControlData(
    ardc=True,
    anrc=True,
    iter=30,
    tol=0.0005,
    csecf=False,
    trs=True,
    crbar=False,
    bmstress=True,
    clats=False
)

# P-Delta Analysis Control
AnalysisControl.PDelta(
    iter=5,
    tol=0.00001,
    load_case_data=[["DL", 1.0], ["LL", 0.5]]
)

# Buckling Analysis Control
AnalysisControl.Buckling(
    mode_num=8,
    opt_positive=False,
    load_factor_from=-2.0,
    load_factor_to=5.0,
    opt_consider_axial_only=True,
    load_case_data=[["DL", 1.0, 1], ["LL", 1.0, 0]]
)

# Eigen Value Analysis Control - LANCZOS method
AnalysisControl.EigenValue(
    analysis_type="LANCZOS",
    ifreq=15,
    frequency_range=[0, 1600],
    bstrum=True
)

# Settlement Analysis Control
AnalysisControl.Settlement(
    concurrent_calc=True,
    concurrent_link=False
)
```