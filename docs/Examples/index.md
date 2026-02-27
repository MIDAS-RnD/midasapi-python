<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4);
    gap: 15px;
    margin: auto;
  }

  .grid-item a {
    display: block;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
    text-align: center;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .grid-item a:hover {
    transform: translateY(-5px);
    box-shadow: 0px 7px 17px 4px rgba(2, 59, 109, 0.26);
  }

  .grid-item img {
    height: 250px;
    object-fit: cover;
  }

  .caption {
    padding: 10px;
    font-size: 17px;
  }


</style>


# Examples

This page shares practical examples of Python code for structural analysis using the `midas_civil` library in MIDAS Civil NX. The scripts demonstrate a typical automated workflow—defining materials and sections, creating nodes and elements, applying supports and loads, running the analysis, and retrieving results.   

These examples are meant to show the basic structure of a MIDAS Civil NX Python script and provide a solid starting point for building more advanced, parametric, and automated structural analysis models.


![WAITING](../assets/separator.png)

## CIVIL NX Tutorials
---



<div class="grid">
  <div class="grid-item">
    <a href="ex01">
      <img src="../Examples/images/EX01.png" alt="Image 1">
      <div class="caption">3-D Simple 2–Bay Frame</div>
    </a>
  </div>
</div>



---
