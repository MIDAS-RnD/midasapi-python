# Shape

A separate class to create section shapes (polygon points) or a shape object (polygon + material properties).   

### Constructor
---
**<font color="green">`Shape(outerPTs,innerPTs=None,mat=(2.1e8,0.3,7.85))`</font>**

Creates a shape object with given outer points (outer shape)  , inner points (holes) and material properties.

### Parameters
* `outerPTs`: List of (x,y) points representing the outer polygon. Can be List of list of (x,y) points for multiple outer polygons. 
* `innerPTs`: List of (x,y) points representing the inner polygon. Can be List of list of (x,y) points for multiple inner polygons.
* `mat`: Tuple (E (Modulus of elasticity) , v (Poisson's Ratio) , w (Weight density)) . Eg. `(2.1e8 , 0.3 , 7.85)`         



### Shapes
Shape function can generate various shapes points [(x,y)...] to easily create parametric sections.

#### Angle
---
**<font color="green">`Shape.angle(outerPTs,innerPTs=None,mat=(2.1e8,0.3,7.85))`</font>**

Creates a shape object with given outer points (outer shape)  , inner points (holes) and material properties.
