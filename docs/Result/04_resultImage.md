<style>

.md-typeset table {
  width: 100%;
  border-collapse: collapse;
  font-size: 8px;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}

/* Remove all borders */
.md-typeset th,
.md-typeset td {
  border: none !important;
  padding: 0px 0px;   /* ↓ reduces height */
  line-height: 0.7;    /* tighter rows */
}

/* Header styling (optional clean look) */
.md-typeset th {
  background-color: transparent;
  font-weight: 600;
  text-align: left;
}


</style>



# Result Image

Captures Result Images from MIDAS CIVIL NX.

---

## Result.IMAGE

**`Result.IMAGE(ResultGraphic,location='',image_size = View.Image_Size , CS_StageName='',_bOutputImage=True):`**   


The `IMAGE` function captures a result graphic image from CIVIL NX using a provided result graphic definition.   
It allows you to control image size, output location, and optional construction stage settings.


#### Parameters

- `ResultGraphic` (`ResultGraphic`): ResultGraphic object defining the result

- `location` (`str`): Optional. File path where the image will be saved

- `image_size` (`tuple`): (Width , Height) of the output image in pixels. Default to View.Image_Size

- `CS_StageName` (`str`): Optional. Construction stage name

- `_bOutputImage` (`bool`): Optional. Whether to return `Image` object or JSON.

#### Returns

- Pillow `Image` object  or
- JSON dictionary



### Example Usage

#### 1. Saving Displacement Contour image

```python
from midas_civil import *

ResultGraphic.Deform(True)          # Set the Deform option to true
resG_deform = ResultGraphic.DisplacementContour('ST','Dead Load')
image_deform = Result.IMAGE(resG_deform,"E://API//temp//deformation.jpg")

```

#### 2. Saving Batch images of all Construction stages

```python
from midas_civil import *

View.Angle(0,0) # SIDE VIEW (ELEVATION)

output_path = "E://API//temp//"

resG_bmd = ResultGraphic.BeamDiagram('CS','Summation',component='My',fidelity='5 Points',fill='Line')   # BMD for CS Summation case

CS.STAGE.sync() # Get all the Construction stage data
for stage in CS.STAGE.stages:
    stg_name = stage.NAME   # CS Stage name
    stg_file_BMD = f"{output_path}BMD_{stg_name}.jpg"   # Image file location for each stage
    Result.IMAGE(resG_bmd,stg_file_BMD,CS_StageName=stg_name)    # Image Capture command

```


![SEPARATOR](../assets/separator.png)


## Result Graphic

The `ResultGraphic` class provides utilities to define and generate **result visualization settings** and **JSON data** for CIVIL NX.

It includes:   
- Display configuration (Contour, Legend, Values, Deform)   
- Result graphic generators (Beam Diagram, Displacement Contour, etc.)   

---

## Display options
These options can be defined before ResultGraphic definition to configure the result image display.

### Contour

Controls contour visualization.

#### Parameters

| Parameter   | Type | Default | Description |
|------------|------|--------|-------------|
| `use`      | bool | True   | Enable/disable contour |
| `num_color`| int  | 12     | Number of contour colors (6, 12, 18, 24) |
| `color`    | str  | "rgb"  | Color scheme (`"vrgb"`, `"rgb"`, `"rbg"`, `"gray scaled"`) |

```python
from midas_civil import *

# Single definition
ResultGraphic.Contour( use=True,num_color=12,color='rgb')

#OR Individual definition
ResultGraphic.Contour.use = True
ResultGraphic.Contour.num_color = 12
ResultGraphic.Contour.color = 'rgb

```

---

### Legend

Controls legend display.

| Parameter      | Type | Default | Description |
|---------------|------|--------|-------------|
| `use`           | bool | True   | Show/hide legend |
| `position`      | str  | right  | left/right |
| `bExponent`     | bool | False  | Use exponential format |
| `num_decimal`   | int  | 2      | Decimal precision |

```python
from midas_civil import *

# Single definition
ResultGraphic.Legend(use=True,position = 'right',bExponent=False,num_decimal=2)

#OR Individual definition
ResultGraphic.Legend.use = True
ResultGraphic.Legend.position = 'right
ResultGraphic.Legend.bExponent = False
ResultGraphic.Legend.num_decimal = 2

```

---

### Values

Controls value display.

| Parameter       | Type | Default | Description |
|----------------|------|--------|-------------|
| `use`            | bool | False  | Show/hide values |
| `bExpo`          | bool | False  | Use exponential format |
| `num_decimal`    | int  | 2      | Decimal precision |
| `orient_angle`   | int  | 0      | Orientation angle (0–90° , 15° increment) |

```python
from midas_civil import *

# Single definition
ResultGraphic.Values(use = False, bExpo = False, num_decimal = 2, orient_angle = 0)

#OR Individual definition
ResultGraphic.Values.use = True
ResultGraphic.Values.bExpo = False
ResultGraphic.Values.num_decimal = 2
ResultGraphic.Values.orient_angle = 0

```

---

### Deform

Controls deformation display.

| Parameter        | Type  | Default | Description |
|-----------------|-------|--------|-------------|
| `use`             | bool  | False  | Enable deformation display |
| `scale`           | float | 1.0    | Scale factor |
| `bRealDeform`     | bool  | False  | Real deformation vs nodal |
| `bRealDisp`       | bool  | False  | Show real displacement |
| `bRelativeDisp`   | bool  | False  | Relative displacement |

```python
from midas_civil import *

# Single definition
ResultGraphic.Deform( use = False, scale = 1.0,bRealDeform = False, bRealDisp = False, bRelativeDisp = False)

#OR Individual definition
ResultGraphic.Deform.use = True
ResultGraphic.Deform.scale = 1.0
ResultGraphic.Deform.bRealDeform = False


```

---

## Results Images

Parameters common in below Result Graphic generators.   


- `lcase_type` (`str`): Load case type. Options: `"ST"`, `"CS"`, `"RS"`, `"TH"`, `"MV"`, `"SM"`, `"CB"`

- `lcase_name` (`str`): Load case or combination name. Example: `"Dead Load"`

- `lcase_minmax` (`str`): Load type. Options: `"Max"`, `"Min"`, `"All"` (Default: `"Max"`)

### Beam Diagram


**`ResultGraphic.BeamDiagram(lcase_type:str, lcase_name:str, lcase_minmax:str="Max", part:str="total", component:str="My", fidelity:str="Exact", fill:str="Solid", scale:float=1.0)`**   

Generates JSON for Beam Diagrams Result Graphic.  
        

- `part` (`str`): Component Part. Options: `"total"`, `"part1"`, `"part2"` (Default: `"total"`)

- `component` (`str`): Component Name. Options: `"Fx"`, `"Fy"`, `"Fz"`, `"Mx"`, `"My"`, `"Mz"` (Default: `"My"`)

- `fidelity` (`str`): Fidelity of the diagram. Options: `"Exact"`, `"5 Points"`, ... (Default: `"Exact"`)

- `fill` (`str`): Fill of Diagram. Options: `"No"`, `"Line"`, `"Solid"` (Default: `"Solid"`)

- `scale` (`float`): Scale of Diagram (Default: `1.0`)

---

### Displacement Contour

**`ResultGraphic.DisplacementContour(lcase_type:str, lcase_name:str, lcase_minmax:str="Max", component:str="DXYZ",th_option:str="Displacement", opt_local_check:bool=False)`**

Generates JSON for Displacement Contour Result Graphic.  


- `component` (`str`): Component Name. Options: `"DX"`, `"DY"`, `"DZ"`, `"DXY"`, `"DYZ"`, `"DXZ"`, `"DXYZ"`, `"RX"`, `"RY"`, `"RZ"`, `"RW"` (Default: `"DXYZ"`)  

- `th_option` (`str`): Time History Function Type. Options: `"Displacement"`, `"Velocity"`, `"Acceleration"` (Default: `"Displacement"`)  

- `opt_local_check` (`bool`): Use Node Local Axis (`True`) or Global Coord System (`False`) (Default: `False`)  

---


### Reaction Forces & Moments

**`ResultGraphic.ReactionForcesMoments(lcase_type:str, lcase_name:str, lcase_minmax:str="Max", component:str="FXYZ", opt_local_check:bool=False, arrow_scale_factor:float=1.0)`**

Generates JSON for Reaction Forces and Moments Result Graphic.  


- `component` (`str`): Component Name. Options: `"FX"`, `"FY"`, `"FZ"`, `"FXYZ"`, `"MX"`, `"MY"`, `"MZ"`, `"MXYZ"`, `"Mb"` (Default: `"FXYZ"`)

- `opt_local_check` (`bool`): Use Node Local Axis (`True`) or Global Coord System (`False`) (Default: `False`)

- `arrow_scale_factor` (`float`): Scale factor for reaction arrows (Default: `1.0`)

---

### Deformed Shape

**`ResultGraphic.DeformedShape(lcase_type:str, lcase_name:str, lcase_minmax:str="Max", component:str="DZ", th_option:str="Displacement", opt_local_check:bool=False)`**

Generates JSON for Deformed Shape Result Graphic.  


- `component` (`str`): Component Name. Options: `"DX"`, `"DY"`, `"DZ"`, `"DXY"`, `"DYZ"`, `"DXZ"`, `"DXYZ"` (Default: `"DZ"`)

- `th_option` (`str`): Time History Function Type. Options: `"Displacement"`, `"Velocity"`, `"Acceleration"` (Default: `"Displacement"`)

- `opt_local_check` (`bool`): Use Node Local Axis (`True`) or Global Coord System (`False`) (Default: `False`)

---

### Beam Forces & Moments

**`ResultGraphic.BeamForcesMoments(lcase_type:str, lcase_name:str, lcase_minmax:str="Max", part:str="total", component:str="Fx")`**

Generates JSON for Beam Forces & Moments Result Graphic.  


- `part` (`str`): Component Part. Options: `"total"`, ... (Default: `"total"`)

- `component` (`str`): Component Name. Options: `"Fx"`, `"Fy"`, `"Fz"`, `"Mx"`, `"My"`, `"Mz"` (Default: `"Fx"`)

---

### Plate Forces & Moments

**`ResultGraphic.PlateForcesMoments(lcase_type:str, lcase_name:str, lcase_minmax:str="Max", component:str="MMax", local_ucs_type:str="Local", avg_nodal_type:str="Element", wood_armer_pos:str="Top", wood_armer_dir:str="Dir.1", vector_opt_pos:bool=True, vector_opt_neg:bool=False)`**

Generates JSON for Plate Forces & Moments Result Graphic.  


- `component` (`str`): Component. Options: `"Fxx"`, `"Mxx"`, `"MMax"`, `"WoodArmerMoment"`, `"Mvector"` (Default: `"MMax"`)

- `local_ucs_type` (`str`): Coordinate System. Options: `"Local"`, `"UCS"` (Default: `"Local"`)

- `avg_nodal_type` (`str`): Avg. Calculation. Options: `"Element"`, `"Avg.Nodal"` (Default: `"Element"`)

- `wood_armer_pos` (`str`): For `"WoodArmerMoment"`. Options: `"Top"`, `"Bottom"` (Default: `"Top"`)

- `wood_armer_dir` (`str`): For `"WoodArmerMoment"`. Options: `"Dir.1"`, `"Dir.2"` (Default: `"Dir.1"`)

- `vector_opt_pos` (`bool`): For `"Mvector"`/`"Fvector"`, display positive (Default: `True`)

- `vector_opt_neg` (`bool`): For `"Mvector"`/`"Fvector"`, display negative (Default: `False`)

---


### Beam Stresses

**`ResultGraphic.BeamStresses(lcase_type:str, lcase_name:str, part:str="Total", component:str="Combined", comp_sub:str="Maximum", output_loc:str="Max",                 comp_7th_dof:str="Combined(Ssy)")`**

Generates JSON for Beam Stresses Result Graphic.  

- `part` (`str`): Part Name (Default: `"Total"`)

- `component` (`str`): Component. Options: `"Sax"`, `"Ssy"`, `"Ssz"`, `"Sby"`, `"Sbz"`, `"Combined"`, `"7thDOF"` (Default: `"Combined"`)

- `comp_sub` (`str`): Sub-component. Options: `"Maximum"`, `"1(-y,+z)"`, ... (Default: `"Maximum"`)

- `output_loc` (`str`): Output Section Location. Options: `"Max"`, `"All"` (Default: `"Max"`)

- `comp_7th_dof` (`str`): 7th DOF Component. Options: `"Sax(Warping)"`, `"Combined(Ssy)"`, ... (Default: `"Combined(Ssy)"`)

---

### Truss Stresses

**`ResultGraphic.TrussStresses(lcase_type:str, lcase_name:str, component:str="All", output_loc:str="All")`**

Generates JSON for Truss Stresses Result Graphic.  

- `component` (`str`): Component. Options: `"All"`, `"Tens."`, `"Comp."` (Default: `"All"`)

- `output_loc` (`str`): Output Section Location. Options: `"I"`, `"J"`, `"Max"`, `"All"` (Default: `"All"`)

---


### Vibration Mode Shapes

**`ResultGraphic.VibrationModeShapes(mode_name:str, component:str="Md-XYZ")`**

Generates JSON for Vibration Mode Shapes Result Graphic.  


- `mode_name` (`str`): Mode Name. Example: `"Mode 6"`

- `component` (`str`): Component Name. Options: `"Md-X"`, `"Md-Y"`, `"Md-Z"`, `"Md-XY"`, `"Md-YZ"`, `"Md-XZ"`, `"Md-XYZ"` (Default: `"Md-XYZ"`) 

---
 

### Buckling Mode Shapes

**`ResultGraphic.BucklingModeShapes(mode_name:str, component:str="Md-XYZ")`**

Generates JSON for Buckling Mode Shapes Result Graphic.  


- `mode_name` (`str`): Mode Name. Example: `"Mode 2 "`

- `component` (`str`): Component Name. Options: `"Md-X"`, `"Md-Y"`, `"Md-Z"`, `"Md-XY"`, `"Md-YZ"`, `"Md-XZ"`, `"Md-XYZ"` (Default: `"Md-XYZ"`)

---


---