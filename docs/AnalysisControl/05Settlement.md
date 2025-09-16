# Settlement Analysis Control

A nested class within AnalysisControl used to create settlement analysis control for settlement analysis.

## Constructor
---
**<font color="green">`AnalysisControl.Settlement(concurrent_calc = True, concurrent_link = True)`</font>**

Creates settlement analysis control settings for settlement analysis.

### Parameters
* `concurrent_calc (default=True)`: Plate Concurrent Force (optional)
  - `True`: Active
  - `False`: Inactive
* `concurrent_link (default=True)`: Elastic / General Links Concurrent Force (optional)
  - `True`: Active  
  - `False`: Inactive

### Object Attributes
* `ID` (int): The ID of the settlement control entry (always 1).
* `CONCURRENT_CALC` (bool): Plate concurrent force setting.
* `CONCURRENT_LINK` (bool): Elastic/General links concurrent force setting.

## Examples
---
```py
# Basic settlement analysis with default settings
AnalysisControl.Settlement()


# Settlement analysis with plate concurrent force only
AnalysisControl.Settlement(
    concurrent_calc=True,
    concurrent_link=False
)

```