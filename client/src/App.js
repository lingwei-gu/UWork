import React, { useEffect } from 'react';
import { useState} from 'react';
import './App.css';
import Job from "./job-search.jsx";
import About from "./about.jsx";
import Temp_data from "./temp_data";
import Navbar from './navbar.jsx';
import { Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {render_bg} from "./job_attribute.jsx";

function App() {
  var temp_data = new Temp_data();
  const [data] = useState(temp_data.data);
  const [query_condition] = useState({});
  const [sort_condition] = useState({});
  
  function Home() {
    const [input_query, setInput_query] = useState("");
    const [region, setRegion] = useState("Region");
    const [is_cover, setIs_cover] = useState("Cover Letter");
    const [term_priority, setTerm_priority] = useState("Work Term Priority");
    const [duration, setDuration] = useState("Duration");
    useEffect(() => {
      render_bg();
    }, []);

    
    function handleChange(e) {
      setInput_query(e.target.value);
      e.preventDefault();
    }

    function handleKeyPress(e) {
      if (e.key === 'Enter') {
        //alert(input_query);
        document.getElementById("search-btn").click();
      }
    }

    function get_location(e) {
      const condition = JSON.parse(e.target.value);
      
      delete query_condition["overview.Job - City"];
      delete query_condition["overview.Job - Province / State"];
      delete query_condition["overview.Job - Country"];
  
      // update query_condition
      if (condition.city === "International") {
        setRegion(condition.city);
        query_condition["overview.Job - Country"] = {$nin: ["Canada", "United States"]};
      } else if (condition.city !== "Unselect") {
        setRegion(condition.city); // re-render with the checkbox option
        query_condition[condition.condition] = condition.city;
      } else {
        setRegion("Region"); // re-render with the checkbox option
      }
      
      e.preventDefault();
      
    }
  
    // query by cover letter
    function get_cover_letter(e) {
      const condition = JSON.parse(e.target.value);
      
      delete query_condition["app.Cover Letter"]; 
  
      if (condition.condition !== "Unselect") {
        setIs_cover(condition.cover);
        query_condition["app.Cover Letter"] = condition.condition;
      } else {
        setIs_cover("Cover Letter");
      }
      e.preventDefault();
    }
    
    // query by duration
    function get_duration(e) {
      const condition = JSON.parse(e.target.value);
      delete query_condition["overview.Work Term Duration"];
  
      if (condition.term !== "Unselect") {
        setDuration(condition.term);
        query_condition[condition.condition] = condition.term;
      } else {
        setDuration("Duration");
      }
      e.preventDefault();
    }
  
    // query by work term priority
    function get_priority(e) {
      const priorities = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];
      const condition = JSON.parse(e.target.value);
      //setTerm_priority(condition.order);
      for (var i = 0; i < 6; i++) {
        let delete_condition = "work_term_ratings.by_work_term" + "." + priorities[i];
        delete sort_condition[delete_condition];
      }
      delete query_condition['work_term_ratings'];
  
      if (condition.order !== "Unselect") {
        setTerm_priority(condition.order);
        query_condition['work_term_ratings'] = {$exists: true};
        let term_copy = condition.condition + "." + condition.order;
        sort_condition[term_copy] = -1;
      } else {
        setTerm_priority("Work Term Priority");
      }
      e.preventDefault();
    }

    return (
      <div>
        <Navbar />
        <div className="search-bar-home">
          <p className="home-text">
            Searching for the best job
          </p>
          <div>
            <input className="search-input" type="text" placeholder="Enter company name or job title "
              onChange={handleChange} onKeyPress={handleKeyPress}></input>
            <Link to={{
              pathname: "/job-search",
              search: input_query,
              region: region,
              term_priority: term_priority,
              is_cover: is_cover,
              duration: duration
            }} >
              <button id="search-btn" className="search-btn"><i class="fas fa-search"></i></button>
            </Link>
            <p style={{fontSize: "1.70rem", textAlign: "left", padding: "1%", fontFamily: "monospace", color: "grey"}}>
              <i class="fas fa-angle-double-down icon-large"></i> Advanced Search</p>
            

            <div className="search-bar-job">
              <div>
                <form>
                  <div class="container">
                    <div class="dropdown">
                      <button class={"btn btn-secondary " + (region !== "Region" ? 'new-btn' : '')} type="button" data-toggle="dropdown">{region + (region === "Region" ? ' ▾' : ' ✓')}</button>
                      <ul class="dropdown-menu">
                        <li><button onClick={get_location} value='{"condition": "overview.Job - City", "city": "Waterloo"}' class="dropdown-item" >Waterloo</button></li>
                        <li><button onClick={get_location} value='{"condition": "overview.Job - City", "city": "Toronto"}' class="dropdown-item">Toronto</button></li>
                        <li><button onClick={get_location} value='{"condition": "overview.Job - Province / State", "city": "Ontario"}' class="dropdown-item">Ontario</button></li>
                        <li><button onClick={get_location} value='{"condition": "overview.Job - Country", "city": "Canada"}' class="dropdown-item" >Canada</button></li>
                        <li><button onClick={get_location} value='{"condition": "overview.Job - Country", "city": "United States"}' class="dropdown-item" >United States</button></li>
                        <li><button onClick={get_location} value='{"condition": "International", "city": "International"}' class="dropdown-item" >International</button></li>
                        <div class="dropdown-divider"></div>
                        <li><button onClick={get_location} value='{"condition": "Unselect", "city": "Unselect"}' class="dropdown-item" >Unselect</button></li>
                      </ul>
                    </div>

                    <div class="dropdown">
                      <button class={"btn btn-secondary " + (term_priority !== "Work Term Priority" ? 'new-btn' : '')} type="button" data-toggle="dropdown">
                        {term_priority + (term_priority === "Work Term Priority" ? ' ▾' : ' ✓')}
                      </button>
                      <ul class="dropdown-menu">
                        <li><button onClick={get_priority} value='{"condition": "work_term_ratings.by_work_term", "order": "First"}' class="dropdown-item">First</button></li>
                        <li><button onClick={get_priority} value='{"condition": "work_term_ratings.by_work_term", "order": "Second"}' class="dropdown-item">Second</button></li>
                        <li><button onClick={get_priority} value='{"condition": "work_term_ratings.by_work_term", "order": "Third"}' class="dropdown-item">Third</button></li>
                        <li><button onClick={get_priority} value='{"condition": "work_term_ratings.by_work_term", "order": "Fourth"}' class="dropdown-item">Fourth</button></li>
                        <li><button onClick={get_priority} value='{"condition": "work_term_ratings.by_work_term", "order": "Fifth"}' class="dropdown-item">Fifth</button></li>
                        <li><button onClick={get_priority} value='{"condition": "work_term_ratings.by_work_term", "order": "Sixth"}' class="dropdown-item">Sixth</button></li>
                        <div class="dropdown-divider"></div>
                        <li><button onClick={get_priority} value='{"condition": "Unselect", "order": "Unselect"}' class="dropdown-item">Unselect</button></li>
                      </ul>
                    </div>
                      
                    <div class="dropdown">
                      <button class={"btn btn-secondary " + (is_cover !== "Cover Letter" ? 'new-btn' : '')}  type="button" data-toggle="dropdown">{is_cover + (is_cover === "Cover Letter" ? ' ▾' : ' ✓')}</button>
                      <ul class="dropdown-menu">
                        <li><button onClick={get_cover_letter} value='{"condition": "true", "cover": "Yes"}'  class="dropdown-item" href="#">Yes</button></li>
                        <li><button onClick={get_cover_letter}  value='{"condition": "false", "cover": "No"}' class="dropdown-item" href="#">No</button></li>
                        <div class="dropdown-divider"></div>
                        <li><button onClick={get_cover_letter}  value='{"condition": "Unselect", "cover": "Unselect"}' class="dropdown-item" href="#">Unselect</button></li>
                      </ul>
                    </div>
                      
                    <div class="dropdown">
                      <button class={"btn btn-secondary " + (duration !== "Duration" ? 'new-btn' : '')} type="button" data-toggle="dropdown">{duration + (duration === "Duration" ? ' ▾' : ' ✓')}</button>
                      <ul class="dropdown-menu">
                        <li><button onClick={get_duration} value='{"condition": "overview.Work Term Duration", "term": "4 month"}' class="dropdown-item">4 Month</button></li>
                        <li><button onClick={get_duration} value='{"condition": "overview.Work Term Duration", "term": "8 month"}' class="dropdown-item">8 Month</button></li>
                        <div class="dropdown-divider"></div>
                        <li><button onClick={get_duration} value='{"condition": "Unselect", "term": "Unselect"}' class="dropdown-item" href="#">Unselect</button></li>
                      </ul>
                    </div>

                  </div>
                </form>
              </div>
            </div>
            <footer id="footer">
              <p style={{marginTop: "28%", fontFamily: "fantasy", fontSize: "1.25rem"}}>© Copyright 2020 Lingwei Gu & Ivan Hu</p>
            </footer>
            

          </div>
        </div>

    </div>);
  }

  return (

    <Router>
      <div className="App">

        <Switch>
          <Route exact path="/" component={Home}></Route>

          <Route path="/job-search"><Job
            array = {data}
            passed_conditions = {[query_condition, sort_condition]}
            // passed_tags = {[region, term_priority, is_cover, duration]}
          /></Route>

          <Route path="/about" component={About}></Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App; 
