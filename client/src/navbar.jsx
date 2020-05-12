import React from 'react';
import { Link } from "react-router-dom";


const a = {
  left: "10%"
};

const b = {
  fontSize: "1.5rem",
  color: "grey",
  marginLeft: "20%",
};

const c = {
  width: "120px",
  fontSize: "1.5rem",
  color: "grey",
  marginRight: "4%"
}

const d = {
  fontFamily: "Montserrat",
  fontSize: "2rem",
  color: "#f4f4f4"
};




function Navbar() {
    return <nav className="navbar navbar-expand-lg navbar-light">
    <a style={d} className="navbar-brand" href="/"><Link to="/" id="brand" ><i className="fas fa-desktop"></i> UWork</Link></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div style={a} className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul style={{fontWeight:"300"}} className="navbar-nav ml-auto">
        <li className="nav-item">
          <a style={b} className="nav-link" href="/about">About</a>
        </li>
        <li className="nav-item">
          <a style={c} className="nav-link" href="http://waterlooworks.uwaterloo.ca/waterloo.htm">Log in</a>
        </li>
      </ul>
    </div>
  </nav>
}

export default Navbar;
