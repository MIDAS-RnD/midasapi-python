# Compressive Strength

The CompStrength class manages time-dependent compressive strength properties for concrete materials.

## Class Attributes
*CompStrength.mats* -> List of all compressive strength instances.   

## Methods
---
### json
Returns a JSON representation of all Compressive Strength properties defined in python.

```py
print(CompStrength.json())
# Output:
# {'Assign': {1: {'NAME': 'Comp_M25', 'TYPE': 'CODE', ...}}}
```

### create
Sends compressive strength data to Civil NX using a PUT request.

```py
CompStrength.create()
```

### get
Fetches compressive strength data from Civil NX and returns the JSON representation.

```py
print(CompStrength.get())
```

### sync
Retrieves Compressive Strength data from Civil NX and rebuilds the internal list.

```py
CompStrength.sync()
```

### delete
Deletes all compressive strength data from both Python and Civil NX.

```py
CompStrength.delete()
```

![TERS](../assets/separator.png)

## Codal Provision

??? sumit_block "IRC Code (112)"

    ### IRC
    **<font color="green">`CompStrength.IRC(name, code_year=2020, fck_delta=0, cement_type=1, aggregate_type=0, id =None)`</font>**

    Creates IRC standard compressive strength properties for Indian Road Congress standards.

    #### Parameters
    * `name` (str): Property name (required)
    * `code_year` (int, optional): Year of the IRC standard. Can be 2020, 2011, or 2000. Defaults to 2020.
    * `fck_delta` (float): 28-day characteristic compressive strength
    * `cement_type` (int, optional): Type of cement used
      * 1: Slow setting (default)
      * 2: Normal 
      * 3: Rapid hardening
    * `aggregate_type` (int, optional): Type of aggregate used (for IRC:112 only)
      * 0: Basalt, dense limestone (default)
      * 1: Quartzite 
      * 2: Limestone 
      * 3: Sandstone
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): Code standard (e.g., "INDIA(IRC:112-2020)").
      * `STRENGTH` (float): Concrete characteristic compressive strength fck (delta fck).
      * `iCTYPE` (int): Type of cement.
      * `nAGGRE` (int): Type of aggregate.

    #### Examples
    ```py
    # IRC 112-2020 with normal cement
    CompStrength.IRC("C30_IRC2020", code_year=2020, fck_delta=30000, cement_type=2)

    # IRC 18-2000 standard
    CompStrength.IRC("C25_IRC2000", code_year=2000, fck_delta=25000)

    # IRC 112-2011 with rapid hardening cement and quartzite aggregate
    CompStrength.IRC("C40_IRC2011", code_year=2011, fck_delta=40000, cement_type=3, aggregate_type=1)
    ```

 

??? sumit_block "ACI Code"

    ### ACI
    **<font color="green">`CompStrength.ACI(name, fck=0, factor_a=1, factor_b=2, id =None)`</font>**

    Creates ACI standard compressive strength properties for American Concrete Institute standards.

    #### Parameters
    * `name` (str): Property name (required)
    * `fck` (float): 28-day compressive strength (default=0)
    * `factor_a` (float): ACI model parameter A (default=1)
    * `factor_b` (float): ACI model parameter B (default=2)
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): "ACI"
      * `STRENGTH` (float): 28-day compressive strength
      * `A` (float): ACI model parameter A
      * `B` (float): ACI model parameter B

    #### Examples
    ```py
    # Standard ACI material
    CompStrength.ACI("C30_ACI", 30000, 1, 2)

    # Custom factors
    CompStrength.ACI("C25_ACI_Custom", 25000, 1.2, 1.8)
    ```

 

??? sumit_block "CEB-FIP Code"

    ### CEB_FIP
    **<font color="green">`CompStrength.CEB_FIP(name, code_year=2010, fck=0, cement_type=1, aggregate_type=0, id =None)`</font>**

    Creates CEB-FIP standard compressive strength properties for European concrete standards.

    #### Parameters
    * `name` (str): Property name (required)
    * `code_year` (int, optional): Year of the CEB-FIP standard. Can be 1978, 1990, or 2010. Defaults to 2010.
    * `fck` (float): 28-day compressive strength (default=0)
    * `cement_type` (int, optional): Type of cement (for 1990 and 2010)
      * 1: RS: 0.2 / 42.5 R, 52.5 N, 52.5 R: 0.20 (default)
      * 2: N, R: 0.25 / 32.5 R, 42.5 N: 0.25
      * 3: SL: 0.38 / 32.5 N: 0.38
    * `aggregate_type` (int, optional): Type of aggregate (for 2010 only)
      * 0: Basalt, dense limestone aggregates (1.2): 0 (default)
      * 1: Quartzite aggregates: 1
      * 2: Limestone aggregates: 2
      * 3: Sandstone aggregates: 3
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): Code standard (e.g., "CEB-FIP(2010)").
      * `STRENGTH` (float): 28-day compressive strength
      * `iCTYPE` (int): Type of cement (for 1990 and 2010).
      * `nAGGRE` (int): Type of aggregate (for 2010 only).

    #### Examples
    ```py
    # CEB-FIP 2010 with normal cement and basalt aggregate
    CompStrength.CEB_FIP("C30_CEBFIP2010", 2010, 30000, 1, 0)

    # CEB-FIP 1990 with slow setting cement
    CompStrength.CEB_FIP("C25_CEBFIP1990", 1990, 25000, 3)

    # CEB-FIP 1978 (no cement/aggregate type)
    CompStrength.CEB_FIP("C40_CEBFIP1978", 1978, 40000)
    ```

 

??? sumit_block "Ohzagi Code"

    ### Ohzagi
    **<font color="green">`CompStrength.Ohzagi(name, fck=0, cement_type=2, id =None)`</font>**

    Creates Ohzagi compressive strength model properties.

    #### Parameters
    * `name` (str): Property name (required)
    * `fck` (float): 28-day compressive strength (default=0)
    * `cement_type` (int, optional): Type of cement used
      * 1: RS
      * 2: N, R (default)
      * 3: SL
      * 4: Fly-ash
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): "Ohzagi"
      * `STRENGTH` (float): 28-day compressive strength
      * `iCTYPE` (int): Type of cement

    #### Examples
    ```py
    # Standard Ohzagi material with N,R cement
    CompStrength.Ohzagi("C30_Ohzagi", 30000, 2)

    # Fly-ash cement type
    CompStrength.Ohzagi("C25_Ohzagi_FA", 25000, 4)
    ```

 

??? sumit_block "European Code"

    ### European
    **<font color="green">`CompStrength.European(name, fck=0, cement_type=2, id =None)`</font>**

    Creates European compressive strength model properties.

    #### Parameters
    * `name` (str): Property name (required)
    * `fck` (float): 28-day compressive strength (default=0)
    * `cement_type` (int, optional): Cement class type
      * 1: Class R: 0.20
      * 2: Class N: 0.25 (default)
      * 3: Class S: 0.38
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): "EUROPEAN"
      * `STRENGTH` (float): 28-day compressive strength
      * `iCTYPE` (int): Cement class type

    #### Examples
    ```py
    # European standard with Class N cement
    CompStrength.European("C30_Euro", 30000, 2)

    # High early strength with Class R cement
    CompStrength.European("C40_Euro_R", 40000, 1)
    ```

 

??? sumit_block "Russian Code"

    ### Russian
    **<font color="green">`CompStrength.Russian(name, fck=0, cement_type=1, curing_method=1, concrete_type=1, max_aggregate_size=0.02, specific_cement_content=0.25, id =None)`</font>**

    Creates Russian compressive strength model properties.

    #### Parameters
    * `name` (str): Property name (required)
    * `fck` (float): 28-day compressive strength (default=0)
    * `cement_type` (int, optional): Type of cement
      * 1: Normal (default)
      * 2: Fast-hardened
      * 3: Slag
      * 4: Pozzolan
    * `curing_method` (int, optional): Method of curing
      * 0: Natural cure: 0
      * 1: Steam cure: 1 (default)
    * `concrete_type` (int, optional): Type of concrete
      * 0: Heavy concrete: 0
      * 1: Fine-grained concrete: 1 (default)
    * `max_aggregate_size` (float): Maximum aggregate size in meters (default=0.02)
    * `specific_cement_content` (float): Specific content of cement paste (default=0.25)
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): "RUSSIAN"
      * `STRENGTH` (float): 28-day compressive strength
      * `iCTYPE` (int): Type of cement
      * `CMETH` (int): Curing method
      * `CTYPE` (int): Concrete type
      * `MAXS` (float): Maximum aggregate size
      * `PZ` (float): Specific cement content

    #### Examples
    ```py
    # Standard Russian concrete
    CompStrength.Russian("C30_RU", 30000, 1, 1, 1, 0.02, 0)

    # Fast-hardened cement with natural curing
    CompStrength.Russian("C25_RU_FH", 25000, 2, 0, 0, 0.025, 0)
    ```

    

??? sumit_block "Australian Standards Code"

    ### AS
    **<font color="green">`CompStrength.AS(name, standard="AS5100.5-2017", fck=0, id =None)`</font>**

    Creates Australian Standards compressive strength model properties.

    #### Parameters
    * `name` (str): Property name (required)
    * `standard` (str, optional): Australian standard specification
      * "AS5100.5-2017": AS 5100.5-2017 (default)
      * "AS5100.5-2016": AS 5100.5-2016
      * "AS/RTA5100.5-2011": AS/RTA 5100.5-2011
      * "AS3600-2009": AS 3600-2009
    * `fck` (float): 28-day compressive strength (default=0)
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): Australian standard specification
      * `STRENGTH` (float): 28-day compressive strength

    #### Examples
    ```py
    # AS 5100.5-2017 standard
    CompStrength.AS("C30_AS2017", "AS5100.5-2017", 30000)

    # AS 3600-2009 standard
    CompStrength.AS("C25_AS3600", "AS3600-2009", 25000)
    ```

    

??? sumit_block "Gilbert and Ranzi Code"

    ### GilbertRanzi
    **<font color="green">`CompStrength.GilbertRanzi(name, fck=0, cement_type=1, density=230, id =None)`</font>**

    Creates Gilbert and Ranzi compressive strength model properties.

    #### Parameters
    * `name` (str): Property name (required)
    * `fck` (float): 28-day compressive strength (default=0)
    * `cement_type` (int, optional): Type of cement
      * 1: Ordinary Portland cement: 0.38 (default)
      * 2: High early strength cement: 0.25
    * `density` (float): Weight density in kg/m³ (default=230)
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): "GILBERT AND RANZI"
      * `STRENGTH` (float): 28-day compressive strength
      * `iCTYPE` (int): Type of cement
      * `DENSITY` (float): Weight density

    #### Examples
    ```py
    # Standard Gilbert-Ranzi model
    CompStrength.GilbertRanzi("C30_GR", 30000, 1, 2400)

    # High early strength cement
    CompStrength.GilbertRanzi("C40_GR_HES", 40000, 2, 2450)
    ```

    

??? sumit_block "Japan Hydration Code"

    ### JapanHydration
    **<font color="green">`CompStrength.JapanHydration(name, fck=0, cement_type=1, use_concrete_data=True, tensile_strength_factor=3, factor_a=4.5, factor_b=0.95, factor_d=1.11, id =None)`</font>**

    Creates Japan Hydration compressive strength model properties.

    #### Parameters
    * `name` (str): Property name (required)
    * `fck` (float): 28-day compressive strength (default=0)
    * `cement_type` (int, optional): Type of cement
      * 0: Normal Portland cement
      * 1: Moderate Portland cement (default)
      * 2: High-early-strength Portland cement
    * `use_concrete_data` (bool): Enable concrete data option (default=True)
    * `tensile_strength_factor` (float): Factor for tensile strength (default=3)
    * `factor_a` (float): Model parameter A (default=4.5, used when use_concrete_data=False)
    * `factor_b` (float): Model parameter B (default=0.95, used when use_concrete_data=False)
    * `factor_d` (float): Model parameter D (default=1.11, used when use_concrete_data=False)
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): "Japan(hydration)"
      * `STRENGTH` (float): 28-day compressive strength
      * `iCTYPE` (int): Type of cement
      * `bUSE` (bool): Use concrete data option
      * `TENS_STRN_FACTOR` (float): Tensile strength factor
      * `A` (float): Model parameter A (when use_concrete_data=False)
      * `B` (float): Model parameter B (when use_concrete_data=False)
      * `D` (float): Model parameter D (when use_concrete_data=False)

    #### Examples
    ```py
    # Standard Japan hydration with concrete data
    CompStrength.JapanHydration("C30_JH", 30000, 1, True, 3)

    # Custom factors without concrete data
    CompStrength.JapanHydration("C25_JH_Custom", 25000, 0, False, 3, 4.0, 0.9, 1.0)
    ```

 

??? sumit_block "Japan Elastic Code"

    ### JapanElastic
    **<font color="green">`CompStrength.JapanElastic(name, fck=0, elastic_cement_type=0, id =None)`</font>**

    Creates Japan Elastic compressive strength model properties.

    #### Parameters
    * `name` (str): Property name (required)
    * `fck` (float): 28-day compressive strength (default=0)
    * `elastic_cement_type` (int, optional): Type of cement for elastic model
      * 0: Normal type: 0 (default)
      * 1: Rapid type: 1
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): "Japan(elastic)"
      * `STRENGTH` (float): 28-day compressive strength
      * `iECTYPE` (int): Elastic cement type

    #### Examples
    ```py
    # Normal type cement
    CompStrength.JapanElastic("C30_JE", 30000, 0)

    # Rapid type cement
    CompStrength.JapanElastic("C40_JE_Rapid", 40000, 1)
    ```

 

??? sumit_block "KDS-2016 Code"

    ### KDS
    **<font color="green">`CompStrength.KDS(name, fck=0, cement_type=1, density=230, id =None)`</font>**

    Creates KDS-2016 compressive strength model properties.

    #### Parameters
    * `name` (str): Property name (required)
    * `fck` (float): 28-day compressive strength (default=0)
    * `cement_type` (int, optional): Type of cement
      * 1: N,R moist cured: 0.35 (default)
      * 2: N,R steam cured: 0.15
      * 3: RS moist cured: 0.25
      * 4: RS steam cured: 0.12
      * 5: SL: 0.40
    * `density` (float): Weight density in kg/m³ (default=230)
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): "KDS-2016"
      * `STRENGTH` (float): 28-day compressive strength
      * `iCTYPE` (int): Type of cement
      * `DENSITY` (float): Weight density

    #### Examples
    ```py
    # Standard KDS with N,R moist cured cement
    CompStrength.KDS("C30_KDS", 30000, 1, 2400)

    # Steam cured cement
    CompStrength.KDS("C25_KDS_Steam", 25000, 2, 2350)
    ```

 

??? sumit_block "KCI-USD12 Code"

    ### KCI
    **<font color="green">`CompStrength.KCI(name, fck=0, cement_type=1, id =None)`</font>**

    Creates KCI-USD12 compressive strength model properties.

    #### Parameters
    * `name` (str): Property name (required)
    * `fck` (float): 28-day compressive strength (default=0)
    * `cement_type` (int, optional): Type of cement
      * 1: N,R moist cured: 0.35 (default)
      * 2: N,R steam cured: 0.15
      * 3: RS moist cured: 0.25
      * 4: RS steam cured: 0.12
      * 5: SL: 0.40
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): "KCI-USD12"
      * `STRENGTH` (float): 28-day compressive strength
      * `iCTYPE` (int): Type of cement

    #### Examples
    ```py
    CompStrength.KCI("C30_KCI", 30000, 1)
    ```

 

??? sumit_block "Korean Standard Code"

    ### KoreanStandard
    **<font color="green">`CompStrength.KoreanStandard(name, fck=0, factor_a=1, factor_b=2, id =None)`</font>**

    Creates Korean Standard compressive strength model properties.

    #### Parameters
    * `name` (str): Property name (required)
    * `fck` (float): 28-day compressive strength (default=0)
    * `factor_a` (float): Model parameter A (default=1)
    * `factor_b` (float): Model parameter B (default=2)
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "CODE"
      * `CODENAME` (str): "KoreanStandard"
      * `STRENGTH` (float): 28-day compressive strength
      * `A` (float): Model parameter A
      * `B` (float): Model parameter B

    #### Examples
    ```py
    # Standard Korean model
    CompStrength.KoreanStandard("C30_KS", 30000, 1, 2)

    # Custom factors
    CompStrength.KoreanStandard("C25_KS_Custom", 25000, 1.1, 1.8)
    ```

 

??? sumit_block "User Defined Code"

    ### UserDefined
    **<font color="green">`CompStrength.UserDefined(name, scale_factor=1, time_data=None, id =None)`</font>**

    Creates User Defined compressive strength model properties.

    #### Parameters
    * `name` (str): Property name (required)
    * `scale_factor` (float): Scaling factor for the data (default=1)
    * `time_data` (list, optional): Time-dependent strength data. Each object should contain:
      * `TIME`: Time in days (number)
      * `COMP`: Compression strength (number)
      * `TENS`: Tensile strength (number)
      * `ELAST`: Elastic modulus (number)
    * `id` (int, optional): Unique identifier. Auto-generated if not specified.

    #### Object Attributes
    * `ID` (int): The ID of the compressive strength definition.
    * `DATA` (dict): A dictionary containing the compressive strength properties. Specific keys include:
      * `NAME` (str): Name of the compressive strength definition.
      * `TYPE` (str): "USER"
      * `SCALE` (float): Scale factor
      * `aDATA` (list): Time-dependent strength data


 