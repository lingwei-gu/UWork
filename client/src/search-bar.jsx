import React, { useState } from 'react';

const a = {
    fontSize: "1.25rem",
    textAlign: "left",
    padding: "1%",
}



function Search() {

  const [input, setInput] = useState("");

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleClick() {
    alert(input);
  }

  function handleKeyPress(event) {
    if(event.key === 'Enter') {
      alert(event.target.value);
      
    }
  }


    const [region, setRegion] = useState("Region");
    const [duration, setDuration] = useState("Duration");
    return(
        <div>
    <input className="search-input" type="text" placeholder="Enter company name or job posting ID " onKeyPress={handleKeyPress} onChange={handleChange}></input>
    <button onClick={handleClick} className="search-btn"><i class="fas fa-search"></i></button>
    <p style={a}><i class="fas fa-angle-double-down icon-large"></i> Advanced Search</p>

<div class="container">
  

    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">{region}<span class="caret"></span></button>
  <ul class="dropdown-menu">
    <li><button onClick={() => setRegion("Waterloo")} class="dropdown-item" >Waterloo</button></li>
    <li><button onClick={() => setRegion("Toronto")} class="dropdown-item" >Toronto</button></li>
    <li><button onClick={() => setRegion("Ontario")} class="dropdown-item" >Ontario</button></li>
    <li><button onClick={() => setRegion("Canada")} class="dropdown-item" >Canada</button></li>
    <li><button onClick={() => setRegion("Amercia")} class="dropdown-item" >Amercia</button></li>
    <li><button onClick={() => setRegion("International")} class="dropdown-item" >International</button></li>
  </ul>
</div>


    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">Work Term Priority<span class="caret"></span></button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">First</a></li>
    <li><a class="dropdown-item" href="#">Second</a></li>
    <li><a class="dropdown-item" href="#">Third</a></li>
    <li><a class="dropdown-item" href="#">Fourth</a></li>
    <li><a class="dropdown-item" href="#">Fifth</a></li>
    <li><a class="dropdown-item" href="#">Sixth</a></li>
  </ul>
</div>

    
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">Cover Letter<span class="caret"></span></button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Yes</a></li>
    <li><a class="dropdown-item" href="#">No</a></li>
  </ul>
</div>
    
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">{duration}<span class="caret"></span></button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">4 Month</a></li>
    <li><a class="dropdown-item" href="#">8 Month Preferred/Required</a></li>
  </ul>
</div>


    
  </div>
</div>
    )
}

export default Search;