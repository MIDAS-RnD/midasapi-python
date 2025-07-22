# Moving Load Code

A nested class within MovingLoad used to set and manage moving load design codes for different countries.

## Constructor
---
**<font color="green">`MovingLoad.Code(code_name)`</font>**

Sets the active moving load design code in the Civil NX model.

### Parameters
* `code_name` (str): The name of the moving load code to be used

#### Available Codes
* `"KSCE-LSD15"` - Korean Society of Civil Engineers Load & Resistance Factor Design
* `"KOREA"` - Korean standards
* `"AASHTO STANDARD"` - American Association of State Highway Officials Standard
* `"AASHTO LRFD"` - AASHTO Load and Resistance Factor Design
* `"AASHTO LRFD(PENNDOT)"` - Pennsylvania DOT variant of AASHTO LRFD
* `"CHINA"` - Chinese bridge design standards
* `"INDIA"` - Indian Road Congress (IRC) standards
* `"TAIWAN"` - Taiwanese bridge design standards
* `"CANADA"` - Canadian Highway Bridge Design Code
* `"BS"` - British Standards
* `"EUROCODE"` - European standards (EN 1991-2)
* `"AUSTRALIA"` - Australian bridge design standards
* `"POLAND"` - Polish bridge design standards
* `"RUSSIA"` - Russian bridge design standards
* `"SOUTH AFRICA"` - South African bridge design standards

### Object Attributes
* `code_name` (str): The name of the selected design code

## Class Methods
---
#### get
Retrieves the currently active moving load code from Civil NX.

```py
current_code = MovingLoad.Code.get()
print(current_code)
```

**Returns:** Dictionary containing the active moving load code information

#### delete
Removes the moving load code setting from Civil NX.

```py
MovingLoad.Code.delete()
```

## Examples
---

#### Indian Standards
```py
# Set Indian Road Congress standards
MovingLoad.Code("INDIA")
```

#### AASHTO LRFD Standards
```py
# Set AASHTO LRFD standards
MovingLoad.Code("AASHTO LRFD")
```

#### Eurocode Standards
```py
# Set Eurocode standards
MovingLoad.Code("EUROCODE")
```




