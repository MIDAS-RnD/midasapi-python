# Release Notes

## Version 1.5.0
Released on - 17 Feb 2026

#### What's New
* Tapered PSC Value Section   
* Tapered Section byShape   
* Material.sync() has new inputs : `bMaterialParam`   
    - `bMaterialParam` - adds property in Material object    
        Added properties 

        | Property	 |	Name	|
        |--------|-------|
        | Elastic Modulus	|	`mat.E` |
        | Poisson's Ratio	|	`mat.V`    |
        | Coeff. Thermal Exp	|	`mat.ALPHA`    |
        | Weight Density	|	`mat.W` 	|
        | Damping	|	`mat.D`  |
* Helper Classes for Support, Elastic Link , Rigid Link , MLFC  

#### Bug Fixes   
* Fix Model.maxID updates    


## Version 1.4.9
Released on - 12 Feb 2026

#### What's New
* Section.sync() has two new inputs : `bSectionProperty`  , `bDBSectParams`   
    - `bSectionProperty` - adds Section property in section object   
        Added properties 

        | Property	 |	Name	|
        |--------|-------|
        | Area	|	`sec.AREA` |
        | Eff. Shear Area Y	|	`sec.ASY`    |
        | Eff. Shear Area Z	|	`sec.ASZ`    |
        | Torsional Resistance	|	`sec.IXX` 	|
        | Moment of Inertia Y	|	`sec.IYY`  |
        | Moment of Inertia Z	|	`sec.IZZ`	|  

    - `bDBSectParams` - adds `PARAMS` to DB section parameters  
        DB sections are codal sections and hence contains only Code Name and Section Name. Incase section dimensions are need, this option can be used.
        Parameters are stored in `sec.PARAMS`

* Element.sync() will call Node.sync() if no Node data is present to prevent errors during length/area calculation   
* Wall Elements added (GEN NX)  


#### Bug Fixes
* Load Case creation and sync creates untupled cases
    eg. earlier to access name of a load case , we used `lc.NAME[0]`.
    Now, `lc.NAME`



## Version 1.4.8
Released on - 5 Feb 2026

#### Bug Fixes
* Sync issues fixed for Material, Load Case and Load Combination


