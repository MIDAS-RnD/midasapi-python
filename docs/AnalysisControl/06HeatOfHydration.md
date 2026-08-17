# Heat of Hydration Analysis Control

A nested class within AnalysisControl used to specify the analysis conditions and parameters for a heat of hydration analysis.

## Constructor
---
**<font color="green">`AnalysisControl.HeatOfHydration(final_stage = True, other_stage = None, integration_factor = 0.5, initial_temperature = 20, element_stress_evaluation = 'GAUSS', creep_and_shringkage = True, type = "BOTH", creep_calculation_method = "GENERAL", no_of_iteration = None, Tolerance = None, phi_1 = None, day_1 = None, phi_2 = None, day_2 = None, use_equivalent_age = False, include_self_load = False, self_weight_factor = None)`</font>**

Creates a heat of hydration analysis control to specify the analysis conditions for a heat of hydration analysis.

### Parameters
* `final_stage (default=True)`: Assign the last stage as the true last stage of the heat of hydration analysis
* `other_stage (default=None)`: Construction Stage for Hydration
    - Assign a stage within the overall construction stages as the final stage. Analysis will be performed only up to the Stage specified here
    - Required when `final_stage` is `False`
* `integration_factor (default=0.5)`: Temporal discretization factor, Φ, used in heat transfer analysis
    - `0.0`: Forward difference
    - `0.5`: Crank-Nicolson method
    - `0.66`: Galerkin method (approx. 2/3)
    - `1.0`: Backward difference
* `initial_temperature (default=20)`: Initial temperature used in the heat transfer analysis
* `element_stress_evaluation (default='GAUSS')`: Location in solid elements for stress output
    - `'CENTER'`: Use the stresses at the centers of the solid elements to represent the stresses of the individual elements
    - `'GAUSS'`: Use the stresses at the Gauss points as the nodal stresses
    - `'NODAL POINT'`: Interpolate the stresses at the Gauss points for nodal stresses
* `creep_and_shringkage (default=True)`: Account for Creep and Shrinkage in the analysis
* `type (default="BOTH")`: Inclusion type of creep and shrinkage in the analysis
    - Options: `'CREEP'`, `'SHRINK'`, `'BOTH'`
    - Only used if `creep_and_shringkage` is `True`
* `creep_calculation_method (default="GENERAL")`: Method for calculating creep
    - `'GENERAL'`: Creep and shrinkage are accounted for according to the Code specified in Time Dependent Material (Creep/Shrinkage) (requires `no_of_iteration` and `Tolerance`)
    - `'EFFECTIVE MODULUS'`: Approximate calculation method using effective Modulus of Elasticity to account for creep (requires `phi_1`, `day_1`, `phi_2`, `day_2`)
* `no_of_iteration (default=None)`: Maximum number of repetitions for the creep iteration convergence
    - Required if `creep_and_shringkage` is `True` and `creep_calculation_method` is `'GENERAL'`
* `Tolerance (default=None)`: Convergence tolerance for the creep iteration
    - Required if `creep_and_shringkage` is `True` and `creep_calculation_method` is `'GENERAL'`
* `phi_1 (default=None)`: Reduction factor, phi1, applied to Modulus of Elasticity from 0(day) to `day_1`
    - Required if `creep_calculation_method` is `'EFFECTIVE MODULUS'`
* `day_1 (default=None)`: End day, n1, for the `phi_1` application
    - Required if `creep_calculation_method` is `'EFFECTIVE MODULUS'`
* `phi_2 (default=None)`: Reduction factor, phi2, applied to Modulus of Elasticity after `day_2`
    - Required if `creep_calculation_method` is `'EFFECTIVE MODULUS'`
* `day_2 (default=None)`: Start day, n2, for the `phi_2` application
    - Required if `creep_calculation_method` is `'EFFECTIVE MODULUS'`
* `use_equivalent_age (default=False)`: Use Equivalent Age based on Time and Temperature for the Heat of Hydration Analysis
* `include_self_load (default=False)`: Include Selfweight Load
* `self_weight_factor (default=None)`: Scale factor for the Selfweight
    - Example: `-1` to consider the self-weight in the gravity direction
    - Required if `include_self_load` is `True`
    - Needs to be `<= 0`

### Object Attributes
* `FINAL_STAGE` (bool): Whether the last stage is assigned as the true last stage.
* `STAGE_NAME` (str): Name of the construction stage assigned as the final stage (blank if `FINAL_STAGE` is `True`).
* `THETA` (float): Temporal discretization factor used in heat transfer analysis.
* `INIT_TEMP` (float): Initial temperature used in the heat transfer analysis.
* `EVAL` (str): Element stress evaluation location setting.
* `OPT_USE_EQUI_AGE` (bool): Use Equivalent Age by Time & Temperature setting.
* `OPT_INCL_SELF_WEIGHT` (bool): Include Selfweight Load setting.
* `SELF_WEIGHT_FACTOR` (float): Scale factor applied to the Selfweight (0 if `OPT_INCL_SELF_WEIGHT` is `False`).
* `OPT_IS_CREEP_SHRINKAGE` (bool): Account for Creep and Shrinkage setting.
* `ITEM` (dict): Creep and shrinkage settings, containing the inclusion `TYPE`, the `CREEP_CALC_METHOD`, and either the `M_GENERAL` (`ITER`, `TOL`) or `M_EFF_MOD` (`PHI1`, `DAY1`, `PHI2`, `DAY2`) sub-settings depending on the calculation method (`None` if `OPT_IS_CREEP_SHRINKAGE` is `False`).

## Examples
---
```py
# Basic control with General Creep method
AnalysisControl.HeatOfHydration(
    final_stage=True,
    integration_factor=0.5,
    initial_temperature=20,
    creep_and_shringkage=True,
    creep_calculation_method="GENERAL",
    no_of_iteration=20,
    Tolerance=0.001
)

# Control up to a specific stage with Effective Modulus method and self-weight
AnalysisControl.HeatOfHydration(
    final_stage=False,
    other_stage="CS3",
    element_stress_evaluation="CENTER",
    creep_and_shringkage=True,
    creep_calculation_method="EFFECTIVE MODULUS",
    phi_1=0.73, day_1=3,
    phi_2=1.0, day_2=5,
    include_self_load=True,
    self_weight_factor=-1.0
)

# Control without creep and shrinkage, using equivalent age
AnalysisControl.HeatOfHydration(
    final_stage=True,
    integration_factor=0.66,
    initial_temperature=25,
    element_stress_evaluation="NODAL POINT",
    creep_and_shringkage=False,
    use_equivalent_age=True
)
```