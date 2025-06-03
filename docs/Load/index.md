# Load

The Load class provides a unified interface to create different types of loads and includes nested classes for specific load types.

## Methods

### create
Creates all defined load cases and loads (Self-Weight, Nodal, and Beam loads) in Civil NX.

```py
Load.create()
```


## Complete Example

```py
from midas_civil import*

MAPI_KEY("eyJ1ciI6IklOMjQwN0ZZVDIiLCJwZyI6ImNpdmlsIiwi") #Paste your Mapi Key

for j in range(6):
    for i in range(2):
        Node(i*10,j*2,0)
        Node.create()
j = 0
for k in range(6):   
    for i in range(1,2):
        Element.Beam(i +j,i+1 +j)
        Element.create()
    j = j + 2

#Load Case
Load_Case("D","SW")
Load_Case("L","Nodal Load")
Load_Case("USER","Test Load 1","Test Load 2","Test Load 3","Test Load 4","Test Load 5","Test Load 6")

Load_Case.create()  #Create Load Case in Civil NX

#Self Weight Load

Load.SW("SW","Z",-1)

#Nodal Load

Load.Nodal(1,"Nodal Load","",FX=10,FY=20,FZ=-50,id=1)
Load.Nodal(3,"Nodal Load","",MX=100,MY=20,MZ=-5,id=2)

#Concentrated Load

Load.Beam(1,"Test Load 1",0,"","GZ",1,[0.3,0.5,0.7],[-20,-30,-40],"BEAM","CONLOAD")

#UDL Load

Load.Beam(2,"Test Load 2",-50,"","GZ")

#Trapezoidal load

Load.Beam(3,"Test Load 3",0,"","GZ","",[0,0.3,0.7,1],[0,-20,-50,0])

#Concentrated Moment/Torsion

Load.Beam(4,"Test Load 4",0,"","GZ","",[0.3,0.7],[-20,-50],"BEAM","CONMOMENT")

#Uniform Moment/Torsion

Load.Beam(5,"Test Load 5",0,"","GZ","",[0,1],[-20,-20],"BEAM","UNIMOMENT")

#Trapezoidal Moment/Torsion

Load.Beam(6,"Test Load 6",0,"","GZ","",[0.3,0.7],[-30,-50],"BEAM","UNIMOMENT")

#Create All load in Civil NX
Load.create()


```