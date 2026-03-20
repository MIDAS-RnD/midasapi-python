# View

Options related to Viewport display in CIVIL NX 


---


### View.Hidden

**`View.Hidden = False`**   

Toggle Hidden mode ie. 3D section display or line

```python
from midas_civil import *

View.Hidden = False

```

### View.Image_Size

**`View.Image_Size = (1280,720)`**   

Tuple representing Width, Height of the captured image. Default: (1280,720)

```python
from midas_civil import *

View.Image_Size = (1920,1080)

```

### View.Active

**`View.Active(mode:str='All',node_list:list=[],elem_list:list=[],ident_type='Group',ident_list:list=[])`**   

Sets Elements to be Active for Model.IMAGE() and Result.IMAGE()

- `Mode` (`str`): Selection mode. Options: `"All"`, `"Active"`, `"Identity"`

- `Node_List` (`list[int]`): List of node IDs to be active when `Mode` is `"Active"`

- `Elem_List` (`list[int]`): List of element IDs to be active when `Mode` is `"Active"`

- `Identity_Type` (`str`): Identity classification. Options: `"Group"`, `"Boundary Group"`, `"Load Group"`, `"Named Plane"`

- `Identity_List` (`list[str]`): List of identity item names corresponding to the selected `Identity_Type`



```python
from midas_civil import *

# Single line definition
View.Active(mode='Active',node_list=[1,2,3],elem_list=[2,3,4])

# OR Individual definition
View.Active.mode = 'Active'
View.Active.node_list = [1,2,3]
View.Active.elem_list = [2,3,4]

```

### View.Angle

**`View.Angle(horizontal, vertical)`**   

Sets viewport angle. Current viewport angle can be obtained from *View > View Point > Angle* .


- `horizontal` (`int`): Horizontal angle of Viewport (-180 to +180)

- `vertical` (`list[int]`): Vertical angle of Viewport (-180 to +180)



```python
from midas_civil import *

# Single line definition
View.Angle(horizontal=30, vertical=40)

# OR Individual definition
View.Angle.Horizontal = 30
View.Angle.Vertical = 40

```

### Examples

#### 1. Multipe images of Viewport

```python
from midas_civil import *

View.Hidden = True    # Toggle ON Hidden View
View.Angle(33,29)     

for i in range(10):
    View.Angle.Horizontal += 10           # Rotate the view 10 degrees about Z axis 
    Model.IMAGE(f"ModelImage_{i+1}.jpg")  # Save the images

```

#### 2. Creating a Report of Model images

The following code requires `docx` library to create MS Word file.

```python
import docx                                   # Library to create and edit Word (.docx) documents
from docx.shared import Inches              
from docx.enum.text import WD_ALIGN_PARAGRAPH
from midas_civil import *                     

View.Hidden = True                            # Toggle ON Hidden View
View.Angle(30,15)                             # Sets initial view angle (horizontal=30°, vertical=15°)

doc = docx.Document()                         # Creates a new Word document
doc.add_heading('DOCX REPORT SAMPLE', 0)      # Adds main title
doc.add_paragraph("Sample MS Word document with Model Images")  # Adds introductory paragraph

doc.add_heading('Model Images from vaious viewpoints', 3)       # Adds a subheading

for i in range(10):                           
    View.Angle.Horizontal += 10               # Rotate the view 10 degrees about Z axis 
    Model.IMAGE(f"ModelImage_{i+1}.jpg")      # Captures and saves the current model view as an image

    doc.add_picture(f"ModelImage_{i+1}.jpg", width=Inches(6))  # Inserts the image into the document with width 6 inches
 
    para = doc.add_paragraph(f"Model Image from Angle [ {View.Angle.Horizontal}° , {View.Angle.Vertical}° ] ")  # Adds caption for image
    para.alignment = WD_ALIGN_PARAGRAPH.CENTER  # Centers the caption text

doc.save('Report_Model_Image.docx')           # Saves the Word document to file

```

---