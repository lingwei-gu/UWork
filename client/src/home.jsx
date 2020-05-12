import React from "react";
import Navbar from './navbar.jsx';
import { Link } from "react-router-dom";
import Search from "./search-bar";

function Home() {

      document.body.style.backgroundImage = "url('https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment= "fixed";
      document.body.style.backgroundSize = "cover";

    return (
        <div>
        <Navbar />
        
        <div className="search-bar-home">
            <p className="home-text">
            Searching for the best job
            <Search />
            </p>
            
        </div>

    <Link to="/job-search" id="scroll">scroll</Link>

    </div>);
}

export default Home;
