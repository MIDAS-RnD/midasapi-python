# Release Notes


## Version 1.6.1
Released on - 15 April 2026

#### Fixes   
* Fixed error with node assignment.    
* Restores original parameter name for lane width and allowable width for backwards compatibility.   


## Version 1.6.0
Released on - 13 April 2026

#### What's New
* Added `Mdodel.getSelected` for retrieving selected nodes/elements ID.    
* Added `Load.Misc.PreCompositeSection`.    
* Added `maxID` in Node for faster automatic Node ID assignment.       
* Added error messages ouput if request fails (eg. beam load applied to truss now returns clear error instead of silently failing).       

#### Fixes   
* Speed improvement in `utils.Line2Plate`.     
* Clear Parameter names for Line Lanes.     


## Version 1.5.9
Released on - 09 April 2026

#### What's New
* Added `Node.fromList` for quick creation of nodes.    
* Added `Load.FloorLoadDefine` and `Load.FloorLoadAssign` to create Floor loads.    

#### Fixes   
* Defining new structure group with existing name will display warning and updates the group.    
* HTTP method request checks added in `MidasAPI` function.    
* Structure groups now support tuple, set, list and numpy array as input.   



## Version 1.5.8
Released on - 26 March 2026

#### What's New
* Added Radius input in Tendon Profiles. New input parameters :   
    - `prof_xyzR`   
    - `prof_xyR`   
    - `prof_xzR`    

* Added `Tendon_Loss` table in Result Table. **`Result.TABLE.Tendon_Loss()`**    
* Added warning when `midas_civil` is used with GEN NX   

#### Bug Fixes   
* Fixed Tendon Profile Insertion Point - End location . Earlier always set to `'END-I'`.


## Version 1.5.7
Released on - 20 March 2026

#### What's New
- Implemented `Model.getBounds()` method   
- Added `Model.bound` property  to return the model dimensions   
- Added `Model.close()` function   
- Added `Model.saveStageAs()` function   

- Model Selection Option
    - Line  
    - Line Along X,Y,Z 
    - Box  
    - Plane XY,YZ,XZ  
    - Type, Material, Section     

- Added `utils.RC Grillage()` function  
- Added `Model.IMAGE()` function  

- Added `View` class to customise viewport display.
    - Image Size  
    - Hidden View 
    - Active  
    - Angle  

- Added `Result.IMAGE()` function  
- Added `ResultGraphic` to customised Result images


## Version 1.5.6 - 1.5.5 
Released on - 13 March 2026

#### What's New
* Added `Boundary.BeamEndRelease`
* Structure Groups with name starting with `#` are skipped in Group creation (can be used as temporary groups for selection)   
* Optimised Model.Select.Line() and Model.Select.Box()
* Output of Model.Select.Line() is ordered on basis of distance from the start point.

#### Bug Fixes   
* Fixed missing `CENTER` property for Tension only, Compression only and Solid elements.

## Version 1.5.4
Released on - 10 March 2026

#### What's New
* Design Parameters for Tapered PSC Value Section   
* Auto Generation of Tapered Group   
    `NX.autoTaperGroup = True`  or   
    `Section.TaperedGroup.autoGenerate()` before Model.create()   
* `NX.print_box()` function for easy command line printing

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


