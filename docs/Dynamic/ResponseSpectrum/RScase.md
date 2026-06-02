# Response Spectrum Case





## Modal Combination Control
---
#### Constructor
To create section offset parameters, use the Offset constructor.

**`RS.ModalCombination(combType='CQC', bAddSign=False , AddSignType=0 , ModeShapeFactor=None )`**

Constructs Modal Combination control  

#### Parameters
* `combType`: Modal combination method used to combine modal responses.   
&emsp;&emsp;&emsp;&emsp;
'CQC' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'SRSS' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'ABS' <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
'Linear'

* `bAddSign`: Enables signed results for modal combination.    
* `AddSignType`: Vertical offset option    
&emsp;&emsp;&emsp;&emsp;
0 : Along Major Mode Direction <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
1 : Along Absolute Maximum Value   
* `ModeShapeFactor`: Optional. List of scale factor corresponding to modes.


---


## Damping Control
---

### Modal Damping

#### Constructor

**`RS.Damping.Modal(dampRatioAllMode=0.05)`**

Constructs Damping control with Modal damping 

#### Parameters
* `dampRatioAllMode`: Damping ratio for all modes. Default is `0.05` (5% damping).   


---

### Mass and Stiffness Proportional Damping

#### Constructor

**`RS.Damping.MassStiffness(inpType=1 , massProp=None , stiffProp=None , freq1=0 , damp1=0 , freq2=0 , damp2=0)`**

Constructs Damping control with Modal damping 

#### Parameters
* `inpType`: Damping input method/type.   
&emsp;&emsp;&emsp;&emsp;
1 : Direct Specification <font color="orange">&nbsp;&nbsp;|&nbsp;&nbsp;</font> 
2 : Calc. from Modal Damping       
* `massProp`: Mass proportional damping coefficient.     
* `stiffProp`: Stiffness proportional damping coefficient.    
* `freq1`: First reference frequency for damping calculation.   
* `damp1`: Damping ratio corresponding to freq1.  
* `freq1`: Second reference frequency for damping calculation.   
* `damp1`: Damping ratio corresponding to freq2.  


---

### Strain Energy Proportional Damping

#### Constructor

**`RS.Damping.StrainEnergy()`**

Constructs Damping control with Strain Energy Proportional damping 



## Case

#### Constructor

**`RS.Case(name , direction="XY" , excitation_angle=0 , scale_factor=1 , period_modify_factor = 1 , spectrum_functions=['RS_FUNC'] , interpolation='LINEAR', modal_combination_control=None , damping_control=None , bDampCorrection=False , desc='', id=None)`**

Constructs Damping control with Modal damping 

#### Parameters
* `name`: Name of the response spectrum load case.     
* `direction`: Excitation direction for seismic loading.      
* `excitation_angle`: Rotation angle of excitation in degrees.      
* `scale_factor`: Scale multiplier applied to the response spectrum.      
* `period_modify_factor`: Time period modification factor.      
* `spectrum_functions`: List of assigned response spectrum function names.      
* `interpolation`: Interpolation method between spectrum data points.      
* `modal_combination_control`: Modal combination control object.      
* `damping_control`: Damping control object.      
* `bDampCorrection`: Enables damping correction for the response spectrum.      
* `desc`: Description of the response spectrum case.       
* `id`: Manually assign an ID.   If **None**, ID will be auto-assigned.


#### Examples
```py

RS.Function.India(name="EQX_RS", code="IS1893(2002)", soilType="Hard", zone="IV")
RS.Function.create()

RS.Case("EQ_X",'XY',0,
        spectrum_functions=['EQX_RS'],
        modal_combination_control=RS.ModalCombination('CQC',True),
        damping_control=RS.Damping.Modal(0.05),
        bDampCorrection=True)
RS.Case.create()

```