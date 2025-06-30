# Creep and Shrinkage

The CreepShrinkage class manages time-dependent creep and shrinkage properties for concrete materials.

### Class Attributes
*CreepShrinkage.mats* -> List of all creep and shrinkage instances.   

## Methods
---
### json
Returns a JSON representation of all Creep and Shrinkage properties defined in python.

```py
print(CreepShrinkage.json())
# Output:
# {'Assign': {1: {'NAME': 'CS_M25', 'CODE': 'INDIA_IRC_112_2011', ...}}}
```

### create
Sends creep and shrinkage data to Civil NX using a PUT request.

```py
CreepShrinkage.create()
```

### get
Fetches creep and shrinkage data from Civil NX and returns the JSON representation.

```py
print(CreepShrinkage.get())
```

### sync
Retrieves Creep and Shrinkage data from Civil NX and rebuilds the internal list.

```py
CreepShrinkage.sync()
```

### delete
Deletes all creep and shrinkage data from both Python and Civil NX.

```py
CreepShrinkage.delete()
```

![TERS](../assets/separator.png)

## Codal Provisions
---
??? sumit_block "IRC Code (18 & 112)"

    ### IRC
    **<font color="green">`CreepShrinkage.IRC(name='', code_year=2011, fck=0, notional_size=1, relative_humidity=70, age_shrinkage=3, type_cement='NR', id=0)`</font>**

    Creates IRC standard creep and shrinkage properties.

    #### Parameters
    * `name (str)`: Property name
    * `code_year (int, optional)`: The year of the IRC code. Can be 2000 or 2011. Defaults to 2011.
    * `fck (float)`: 28-day characteristic compressive strength
    * `notional_size (float, optional)`: The notional size of the member. Defaults to 1.
    * `relative_humidity (float, optional)`: Relative humidity (40-99%). Defaults to 70.
    * `age_shrinkage (int, optional)`: Age at start of shrinkage (days). Defaults to 3.
    * `type_cement (str, optional)`: Type of cement ('SL'= Slow Setting cement, 'NR'= Normal cement, 'RS'=Rapid hardening cement). Only for IRC:112-2011. Defaults to 'NR'.
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Object Attributes
    * `ID` (int): The ID of the creep/shrinkage definition.
    * `DATA` (dict): A dictionary containing the creep/shrinkage properties. Specific keys include:
      * `NAME` (str): Name of the creep/shrinkage definition.
      * `CODE` (str): Code standard (e.g., "INDIA_IRC_112_2011").
      * `STR` (float): Characteristic compressive cylinder strength fck.
      * `HU` (float): Relative humidity (%).
      * `AGE` (float): Age of concrete at beginning of shrinkage (days).
      * `MSIZE` (float): Notional size of member.
      * `CTYPE` (str): Type of cement (e.g., "NR").

    #### Examples
    ```py
    # Create IRC:112-2011 creep and shrinkage properties
    cs1 = CreepShrinkage.IRC("IRC_M30_2011", code_year=2011, fck=30, notional_size=150, relative_humidity=75, age_shrinkage=7, type_cement='R', id=1)

    # Create IRC:18-2000 creep and shrinkage properties
    cs2 = CreepShrinkage.IRC("IRC_M25_2000", code_year=2000, fck=25, notional_size=200, relative_humidity=70, age_shrinkage=3, type_cement='NR', id=2)

    CreepShrinkage.create()
    ```




??? sumit_block "CEB-FIP Code (2010, 1990, 1978)"

    ### CEB_FIP
    **<font color="green">`CreepShrinkage.CEB_FIP(name='', code_year=2010, fck=0, notional_size=1, relative_humidity=70, age_shrinkage=3, type_cement='RS', type_of_aggregate=0, id=0)`</font>**

    Creates CEB-FIP standard creep and shrinkage properties for European concrete standards.

    #### Parameters
    * `name (str)`: Property name
    * `code_year (int, optional)`: Year of the CEB-FIP standard (2010, 1990, 1978). Defaults to 2010.
    * `fck (float)`: 28-day characteristic compressive strength
    * `notional_size (float, optional)`: The notional size of the member. Defaults to 1.
    * `relative_humidity (float, optional)`: Relative humidity (40-100%). Defaults to 70.
    * `age_shrinkage (int, optional)`: Age at start of shrinkage (days). Defaults to 3.
    * `type_cement (str, optional)`: Type of cement ('RS', 'NR', 'SL'). Defaults to 'RS'.
    * `type_of_aggregate (int, optional)`: Type of aggregate, only for CEB-FIP 2010. 0: Basalt, 1: Quartzite, 2: Limestone, 3: Sandstone. Defaults to 0.
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Object Attributes
    * `ID` (int): The ID of the creep/shrinkage definition.
    * `DATA` (dict): A dictionary containing the creep/shrinkage properties. Specific keys include:
      * `NAME` (str): Name of the creep/shrinkage definition.
      * `CODE` (str): Code standard (e.g., "CEB_FIP_2010").
      * `STR` (float): Characteristic compressive strength.
      * `HU` (float): Relative humidity (%).
      * `AGE` (float): Age of concrete at beginning of shrinkage (days).
      * `MSIZE` (float): Notional size of member.
      * `CTYPE` (str): Type of cement.
      * `TYPEOFAFFR` (int): Type of aggregate (only for CEB-FIP 2010).

    #### Examples
    ```py
    # Create CEB-FIP 2010 material
    cs1 = CreepShrinkage.CEB_FIP("CEB_M40", code_year=2010, fck=40, notional_size=2, relative_humidity=65, age_shrinkage=5)

    # Create CEB-FIP 1990 material
    cs2 = CreepShrinkage.CEB_FIP("CEB_M35", code_year=1990, fck=35, notional_size=3, relative_humidity=70, age_shrinkage=3)

    CreepShrinkage.create()
    ```



??? sumit_block "ACI Code"

    ### ACI
    **<font color="green">`CreepShrinkage.ACI(name='', fck=0, relative_humidity=70, age_shrinkage=3, vol_surface_ratio=1.2, cfact_a=4, cfact_b=0.85, curing_method='MOIST', material_type='CODE', cement_content=24, slump=1.1, fine_agg_percent=12, air_content=13, creep_coeff=None, shrink_strain=None, id=0)`</font>**

    Creates ACI standard creep and shrinkage properties for American Concrete Institute standards.

    #### Parameters
    * `name (str)`: Property name
    * `fck (float)`: 28-day compressive strength
    * `relative_humidity (float, optional)`: Relative humidity (40-99%). Defaults to 70.
    * `age_shrinkage (int, optional)`: Age at start of shrinkage (days). Defaults to 3.
    * `vol_surface_ratio (float, optional)`: Volume to surface area ratio. Defaults to 1.2.
    * `cfact_a (float, optional)`: Concrete compressive strength factor 'a'. Defaults to 4.
    * `cfact_b (float, optional)`: Concrete compressive strength factor 'b'. Defaults to 0.85.
    * `curing_method (str, optional)`: Curing method ('MOIST' or 'STEAM'). Defaults to 'MOIST'.
    * `material_type (str, optional)`: Material factored ultimate value type ('CODE' or 'USER'). Defaults to 'CODE'.
    * `cement_content (float, optional)`: Cement content (used if material_type='CODE'). Defaults to 24.
    * `slump (float, optional)`: Slump value (used if material_type='CODE'). Defaults to 1.1.
    * `fine_agg_percent (float, optional)`: Fine aggregate percentage (used if material_type='CODE'). Defaults to 12.
    * `air_content (float, optional)`: Air content (used if material_type='CODE'). Defaults to 13.
    * `creep_coeff (float, optional)`: Creep coefficient (used if material_type='USER'). Defaults to None.
    * `shrink_strain (float, optional)`: Shrinkage strain in E-6 (used if material_type='USER'). Defaults to None.
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Object Attributes
    * `ID` (int): The ID of the creep/shrinkage definition.
    * `DATA` (dict): A dictionary containing the creep/shrinkage properties. Specific keys include:
      * `NAME` (str): Name of the creep/shrinkage definition.
      * `CODE` (str): Code standard ("ACI").
      * `STR` (float): Compressive strength.
      * `HU` (float): Relative humidity (%).
      * `AGE` (float): Age of concrete at beginning of shrinkage (days).
      * `VOL` (float): Volume to surface area ratio.
      * `CFACTA` (float): Concrete compressive strength factor 'a'.
      * `CFACTB` (float): Concrete compressive strength factor 'b'.
      * `TYPE` (str): Material type ('CODE' or 'USER').
      * `CMETHOD` (str): Curing method.

    #### Examples
    ```py
    # Create ACI material using code-based properties
    cs1 = CreepShrinkage.ACI("ACI_C35_Code", fck=35, relative_humidity=75, age_shrinkage=7, vol_surface_ratio=50)

    # Create ACI material using user-defined ultimate values
    cs2 = CreepShrinkage.ACI("ACI_C35_User", fck=35, relative_humidity=75, age_shrinkage=7, vol_surface_ratio=50, material_type="USER", creep_coeff=2.5, shrink_strain=600)

    CreepShrinkage.create()
    ```


??? sumit_block "AASHTO Code"

    ### AASHTO
    **<font color="green">`CreepShrinkage.AASHTO(name='', fck=0, relative_humidity=70, age_shrinkage=3, vol_surface_ratio=1.2, b_expose=False, id=0)`</font>**

    Creates AASHTO standard creep and shrinkage properties.

    #### Parameters
    * `name (str)`: Property name
    * `fck (float)`: 28-day compressive strength
    * `relative_humidity (float, optional)`: Relative humidity (40-99%). Defaults to 70.
    * `age_shrinkage (int, optional)`: Age at start of shrinkage (days). Defaults to 3.
    * `vol_surface_ratio (float, optional)`: Volume to surface area ratio. Defaults to 1.2.
    * `b_expose (bool, optional)`: Expose to drying before 5 days of curing. Defaults to False.
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Object Attributes
    * `ID` (int): The ID of the creep/shrinkage definition.
    * `DATA` (dict): A dictionary containing the creep/shrinkage properties. Specific keys include:
      * `NAME` (str): Name of the creep/shrinkage definition.
      * `CODE` (str): Code standard ("AASHTO").
      * `STR` (float): Compressive strength.
      * `HU` (float): Relative humidity (%).
      * `AGE` (float): Age of concrete at beginning of shrinkage (days).
      * `VOL` (float): Volume to surface area ratio.
      * `bEXPOSE` (bool): Expose to drying before 5 days of curing.

    #### Examples
    ```py
    # Create AASHTO material
    cs1 = CreepShrinkage.AASHTO("AASHTO_M30", fck=30, relative_humidity=80, age_shrinkage=5, vol_surface_ratio=60)

    CreepShrinkage.create()
    ```



??? sumit_block "European Code (EN 1992)""

    ### European
    **<font color="green">`CreepShrinkage.European(name='', fck=0, relative_humidity=70, age_shrinkage=3, notional_size=1.2, type_cement='Class N', t_code=0, b_silica=False, id=0)`</font>**

    Creates European standard creep and shrinkage properties (EN 1992).

    #### Parameters
    * `name (str)`: Property name
    * `fck (float)`: 28-day characteristic compressive strength
    * `relative_humidity (float, optional)`: Relative humidity (40-99%). Defaults to 70.
    * `age_shrinkage (int, optional)`: Age at start of shrinkage (days). Defaults to 3.
    * `notional_size (float, optional)`: Notional size of the member. Defaults to 1.2.
    * `type_cement (str, optional)`: Cement class ('Class S', 'Class N', 'Class R'). Defaults to 'Class N'.
    * `t_code (int, optional)`: Type of code. 0: EN 1992-1 (General), 1: EN 1992-2 (Bridge). Defaults to 0.
    * `b_silica (bool, optional)`: Whether silica fume is used. Only applicable when t_code is 1. Defaults to False.
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Object Attributes
    * `ID` (int): The ID of the creep/shrinkage definition.
    * `DATA` (dict): A dictionary containing the creep/shrinkage properties. Specific keys include:
      * `NAME` (str): Name of the creep/shrinkage definition.
      * `CODE` (str): Code standard ("EUROPEAN").
      * `STR` (float): Characteristic compressive strength.
      * `HU` (float): Relative humidity (%).
      * `AGE` (float): Age of concrete at beginning of shrinkage (days).
      * `MSIZE` (float): Notional size of member.
      * `CTYPE` (str): Type of cement.
      * `TCODE` (int): Type of code.
      * `bSILICA` (bool): Whether silica fume is used (only for bridge code).

    #### Examples
    ```py
    # EN 1992-1 General Structure
    cs1 = CreepShrinkage.European("Euro_General_C30", fck=30, relative_humidity=75, age_shrinkage=7, notional_size=2)

    # EN 1992-2 Concrete Bridge with Silica Fume
    cs2 = CreepShrinkage.European("Euro_Bridge_C40", fck=40, relative_humidity=70, age_shrinkage=5, notional_size=2, t_code=1, b_silica=True)

    CreepShrinkage.create()
    ```



??? sumit_block "Russian Code"

    ### Russian
    **<font color="green">`CreepShrinkage.Russian(name='', fck=0, relative_humidity=70, module_exposed_surface=10, age_concrete=14, water_content=180, max_aggregate_size=0.02, air_content=30, specific_cement_paste_content=0.25, curing_method=0, cement_type=1, fast_accumulating_creep=False, concrete_type=0, id=0)`</font>**

    Creates Russian standard creep and shrinkage properties.

    #### Parameters
    * `name (str)`: Property name
    * `fck (float)`: 28-day compressive strength
    * `relative_humidity (float)`: Relative humidity in percentage
    * `module_exposed_surface (float)`: Module of an exposed surface
    * `age_concrete (int)`: Age of the concrete in days
    * `water_content (float)`: Water content
    * `max_aggregate_size (float)`: Maximum aggregate size
    * `air_content (float)`: Air content
    * `specific_cement_paste_content (float)`: Specific content of the cement paste
    * `curing_method (int, optional)`: Curing method. 0: Natural, 1: Steam. Defaults to 0.
    * `cement_type (int, optional)`: Cement Type. 0: Normal, 1: Fast-hardened, 2: Slag, 3: Pozzolan. Defaults to 1.
    * `fast_accumulating_creep (bool, optional)`: Whether to consider fast-accumulating creep. Defaults to False.
    * `concrete_type (int, optional)`: Type of concrete. 0: Heavy, 1: Fine-grained. Defaults to 0.
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Object Attributes
    * `ID` (int): The ID of the creep/shrinkage definition.
    * `DATA` (dict): A dictionary containing the creep/shrinkage properties with various Russian standard specific parameters.

    #### Examples
    ```py
    # Standard Russian model with natural curing
    cs1 = CreepShrinkage.Russian("RU_Heavy_C30", fck=30, relative_humidity=70, module_exposed_surface=10, age_concrete=14, water_content=180, max_aggregate_size=0.02, air_content=30, specific_cement_paste_content=0.25, cement_type=2)

    CreepShrinkage.create()
    ```


??? sumit_block "AS & NZ Code (Australian & New Zealand Standards)"

    ### AS_NZ
    **<font color="green">`CreepShrinkage.AS_NZ(name='', standard='AS_5100_5_2017', fck=0, concrete_age=7, hypothetical_thickness=0.3, drying_shrinkage_type=0, user_defined_shrinkage_strain=0, humidity_factor=0.72, exposure_environment=0, id=0)`</font>**

    Creates Australian & New Zealand standards creep and shrinkage properties.

    #### Parameters
    * `name (str)`: Property name
    * `standard (str)`: Standard code ('AS_5100_5_2017', 'AS_5100_5_2016', 'AS_RTA_5100_5_2011', 'AS_3600_2009', 'NEWZEALAND')
    * `fck (float)`: 28-day compressive strength
    * `concrete_age (int)`: Age of the concrete in days
    * `hypothetical_thickness (float)`: Hypothetical thickness of the member
    * `drying_shrinkage_type (int, optional)`: Type of drying basic shrinkage strain. Values depend on chosen standard. Defaults to 0.
    * `user_defined_shrinkage_strain (float, optional)`: User-defined drying basic shrinkage strain. Defaults to 0.
    * `humidity_factor (float, optional)`: Relative humidity thickness (NZ Bridge standard only). Defaults to 0.72.
    * `exposure_environment (int, optional)`: Exposure environment classification for AS standards. Defaults to 0.
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Examples
    ```py
    # AS 5100.5-2017 
    cs1 = CreepShrinkage.AS_NZ("AS_Melbourne_C40", standard="AS_5100_5_2017", fck=40, hypothetical_thickness=0.3, concrete_age=7, drying_shrinkage_type=1)

    # NZ Bridge standard 
    cs2 = CreepShrinkage.AS_NZ("NZ_Bridge_Custom", standard="NEWZEALAND", fck=35, hypothetical_thickness=0.25, concrete_age=14, drying_shrinkage_type=10, user_defined_shrinkage_strain=955.5)

    CreepShrinkage.create()
    ```


??? sumit_block "Chinese Standards"

    ### Chinese
    **<font color="green">`CreepShrinkage.Chinese(name='', standard='CHINESE', fck=0, relative_humidity=70, concrete_age=14, notional_size=2, humidity_type='RH', cement_coeff=5, fly_ash_amount=20, id=0)`</font>**

    Creates Chinese standards creep and shrinkage properties.

    #### Parameters
    * `name (str)`: Property name
    * `standard (str)`: Chinese standard code ('CHINESE', 'JTG', 'CHINA_JTG3362_2018')
    * `fck (float)`: 28-day compressive strength
    * `relative_humidity (float)`: Relative humidity in percentage
    * `concrete_age (int)`: Age of the concrete in days
    * `notional_size (float)`: Notional size of the member
    * `humidity_type (str, optional)`: Type of relative humidity ('CU' for Curing Underwater, 'RH' for Relative Humidity). Defaults to 'RH'.
    * `cement_coeff (float, optional)`: Cement type coefficient (for JTG codes). Defaults to 5.
    * `fly_ash_amount (float, optional)`: Amount of added fly ash (for JTG3362-2018). Range 0-30. Defaults to 20.
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Examples
    ```py
    # General Chinese Standard
    cs1 = CreepShrinkage.Chinese("Chinese_C30", standard="CHINESE", fck=30, relative_humidity=75, concrete_age=14, notional_size=2)

    # JTG D62-2004 Standard
    cs2 = CreepShrinkage.Chinese("JTG_D62_C40", standard="JTG", fck=40, relative_humidity=80, concrete_age=7, notional_size=250, cement_coeff=5)

    CreepShrinkage.create()
    ```



??? sumit_block "Korean Standards"

    ### Korean
    **<font color="green">`CreepShrinkage.Korean(name='', standard='KDS_2016', fck=0, relative_humidity=70, concrete_age=14, notional_size=2, cement_type='NR', density=240, id=0)`</font>**

    Creates Korean standards creep and shrinkage properties.

    #### Parameters
    * `name (str)`: Property name
    * `standard (str)`: Korean standard code ('KDS_2016', 'KSI_USD12', 'KSCE_2010', 'KS')
    * `fck (float)`: 28-day compressive strength
    * `relative_humidity (float)`: Relative humidity in percentage
    * `concrete_age (int)`: Age of the concrete in days
    * `notional_size (float)`: Notional size of the member
    * `cement_type (str, optional)`: Type of cement ('SL', 'NR', 'RS'). Defaults to 'NR'.
    * `density (float, optional)`: Weight density (Only for KDS-2016). Defaults to 240.
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Examples
    ```py
    # KDS-2016 Standard
    cs1 = CreepShrinkage.Korean("KDS_C35", standard="KDS_2016", fck=35, relative_humidity=65, concrete_age=10, notional_size=2, density=2400)

    # Korea Standard (KS)
    cs2 = CreepShrinkage.Korean("KS_C30", standard="KS", fck=30, relative_humidity=70, concrete_age=14, notional_size=2)

    CreepShrinkage.create()
    ```



??? sumit_block "PCA Code"

    ### PCA
    **<font color="green">`CreepShrinkage.PCA(name='', fck=0, relative_humidity=70, ultimate_creep_strain=4, vol_surface_ratio=1.2, reinforcement_ratio=20, steel_elasticity_modulus=2e8, ultimate_shrinkage_strain=780, id=0)`</font>**

    Creates PCA standard creep and shrinkage properties.

    #### Parameters
    * `name (str)`: Property name
    * `fck (float)`: Compressive strength
    * `relative_humidity (float)`: Relative humidity (40-99%)
    * `ultimate_creep_strain (float)`: Ultimate creep strain (Range: 3-5)
    * `vol_surface_ratio (float)`: Volume to surface area ratio
    * `reinforcement_ratio (float)`: Reinforcement ratio of the cross section
    * `steel_elasticity_modulus (float)`: Modulus of elasticity of steel
    * `ultimate_shrinkage_strain (float)`: Ultimate shrinkage strain (Range: 500-800)
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Examples
    ```py
    cs1 = CreepShrinkage.PCA("PCA_Material", fck=50, relative_humidity=70, ultimate_creep_strain=4, vol_surface_ratio=1.2, reinforcement_ratio=20, steel_elasticity_modulus=2e8, ultimate_shrinkage_strain=780)

    CreepShrinkage.create()
    ```


??? sumit_block "Japan Standards (JSCE)"

    ### Japan
    **<font color="green">`CreepShrinkage.Japan(name='', standard='JSCE_12', relative_humidity=70, concrete_age=3, vol_surface_ratio=0.2, cement_content=30, water_content=20, fck=30, impact_factor=1, age_of_solidification=5, alpha_factor=11, autogenous_shrinkage=True, gamma_factor=1, a_factor=0.1, b_factor=0.7, general_shrinkage=True, id=0)`</font>**

    Creates Japan standards creep and shrinkage properties (JSCE).

    #### Parameters
    * `name (str)`: Property name
    * `standard (str)`: Japanese standard ('JSCE_12', 'JSCE_07', 'JSCE')
    * `relative_humidity (float)`: Relative humidity in percentage
    * `concrete_age (int)`: Age of the concrete in days
    * `vol_surface_ratio (float)`: Volume to surface area ratio
    * `cement_content (float)`: Cement content
    * `water_content (float)`: Water content
    * `fck (float, optional)`: Compressive strength (not for JSCE). Defaults to 30.
    * `impact_factor (float, optional)`: Impact factor by cement type (JSCE 2012 only). Defaults to 1.
    * `age_of_solidification (int, optional)`: Age at beginning of solidification (JSCE 2012 only). Defaults to 5.
    * `alpha_factor (int, optional)`: Alpha-factor by cement type (JSCE 2007 only). Defaults to 11.
    * `autogenous_shrinkage (bool, optional)`: Autogenous shrinkage option (JSCE 2007 only). Defaults to True.
    * `gamma_factor (int, optional)`: Gamma-factor (JSCE 2007 only). Defaults to 1.
    * `a_factor (float, optional)`: a-factor (JSCE 2007 only). Defaults to 0.1.
    * `b_factor (float, optional)`: b-factor (JSCE 2007 only). Defaults to 0.7.
    * `general_shrinkage (bool, optional)`: General shrinkage option (JSCE 2007 only). Defaults to True.
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Examples
    ```py
    # JSCE 2012
    cs1 = CreepShrinkage.Japan("JSCE12_mat", "JSCE_12", 70, 3, 0.2, 30, 20, fck=30)

    # JSCE 2007
    cs2 = CreepShrinkage.Japan("JSCE07_mat", "JSCE_07", 70, 3, 0.2, 30, 20, fck=30, alpha_factor=15)

    CreepShrinkage.create()
    ```


??? sumit_block "Japanese Standard"

    ### JapaneseStandard
    **<font color="green">`CreepShrinkage.JapaneseStandard(name='', fck=0, relative_humidity=70, concrete_age=3, notional_size=1.2, calculation_method='JSCE', humidity_type='RH', cement_type='NC', environmental_coeff=1, id=0)`</font>**

    Creates Japanese standard creep and shrinkage properties.

    #### Parameters
    * `name (str)`: Property name
    * `fck (float)`: Compressive strength
    * `relative_humidity (float)`: Relative humidity (40-90%)
    * `concrete_age (int)`: Age of the concrete in days
    * `notional_size (float)`: Notional size of the member
    * `calculation_method (str, optional)`: Calculation method for E ('JSCE' or 'AIJ'). Defaults to 'JSCE'.
    * `humidity_type (str, optional)`: Relative humidity type ('RH' or 'CU'). Defaults to 'RH'.
    * `cement_type (str, optional)`: Type of cement ('RH', 'NC'). Defaults to 'NC'.
    * `environmental_coeff (int, optional)`: Environmental coefficient. Defaults to 1.
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.

    #### Examples
    ```py
    cs1 = CreepShrinkage.JapaneseStandard("JapanStd_C30", fck=30, relative_humidity=70, concrete_age=3, notional_size=1.2)

    CreepShrinkage.create()
    ```



??? sumit_block "User Defined"

    ### UserDefined
    **<font color="green">`CreepShrinkage.UserDefined(name='', shrinkage_func_name='', creep_func_name='', creep_age=0, id=0)`</font>**

    Creates user defined creep and shrinkage properties.

    #### Parameters
    * `name (str)`: Property name
    * `shrinkage_func_name (str)`: Name of the user-defined shrinkage strain function
    * `creep_func_name (str)`: Name of the user-defined creep function
    * `creep_age (int)`: Concrete age for the creep function
    * `id (int, optional)`: Manual ID assignment. Defaults to 0.
