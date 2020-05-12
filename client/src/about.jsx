import React from 'react';
import Navbar from './navbar.jsx';

function About() {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM3Njd9&auto=format&fit=crop&w=2102&q=80')";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment= "fixed";
      document.body.style.backgroundSize = "cover";

    return(
        <div>
           <Navbar />
           <h1>About Us</h1>
           <p>Creators: Lingwei Gu & Ivan Hu</p>
           <p>Tech Stacks: Node, Express, MongoDB, React (Hooks), RESTful APIs, Selenium, Beautiful Soup 4 </p>
           <p>Special Thanks to: Iris Mu</p>
        </div>
        
    )
}

export default About;
