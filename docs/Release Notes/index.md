# Release Notes

## Version 1.5.5
Released on - 13 March 2026

#### What's New
* Added `Boundary.BeamEndRelease`
* Structure Groups with name starting with `#` are skipped in Group creation (can be used as temporary groups for selection)   

#### Bug Fixes   
* Fixed missing `CENTER` property for Tension only, Compression only and Solid elements.

## Version 1.5.4
Released on - 10 March 2026

#### What's New
* Design Parameters for Tapered PSC Value Section   
* Auto Generation of Tapered Group   
    NX.autoTaperGroup = True  or   
    Section.TaperedGroup.autoGenerate() before Model.create()   
* NX.print_box() function for easy command line printing

#### Bug Fixes   
* Fixed `from __future__ import annotations` error

## Version 1.5.3
Released on - 8 March 2026

#### Bug Fixes   
* Automatic Transfer length in Tendons      

## Version 1.5.2
Released on - 1 Mar 2026

#### What's New
* 3D Alignment transformation  
* Design Parameters for PSC Value Section
* Multiple holes support for `Element.Plate.fromPoints()`   


## Version 1.5.1
Released on - 27 Feb 2026


#### What's New
* 3D Alignment - Separate interpolation for Z axis  
* Data type conversion for Result Tables
* Added Tutorial 1 example


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


