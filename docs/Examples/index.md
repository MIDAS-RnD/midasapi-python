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
    height: 200px;
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
      <div class="caption">3-D SIMPLE 2-BAY FRAME</div>
    </a>
  </div>
  <div class="grid-item">
    <a href="ex02">
      <img src="../Examples/images/EX02.png" alt="Image 1">
      <div class="caption">PLANT STRUCTURE </div>
    </a>
  </div>
  <div class="grid-item">
    <a href="ex03">
      <img src="../Examples/images/EX03.png" alt="Image 1">
      <div class="caption">WEB–OPENING DETAIL ANALYSIS</div>
    </a>
  </div>
  <div class="grid-item">
    <a href="ex04">
      <img src="../Examples/images/EX04.png" alt="Image 1">
      <div class="caption">ARCH BRIDGE</div>
    </a>
  </div>
</div>



---
