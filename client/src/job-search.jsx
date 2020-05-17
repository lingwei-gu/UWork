import React, { useState, useEffect } from 'react';
// import { creatStore } from 'redux';
import Navbar from './navbar.jsx';
import axios from 'axios';
// import { useEffect } from 'react';
import {Card, render_bg} from "./job_attribute.jsx";
import { useLocation } from 'react-router-dom';

function Job(props) {
  const [count, setCount] = useState(0);
  
  const [region, setRegion] = useState(check_defined(useLocation().region, "Region"));
  const [term_priority, setTerm_priority] = useState(check_defined(useLocation().term_priority, "Work Term Priority"));
  const [is_cover, setIs_cover] = useState(check_defined(useLocation().is_cover, "Cover Letter"));
  const [duration, setDuration] = useState(check_defined(useLocation().duration, "Duration"));
  const [query_condition] = useState(props.passed_conditions[0]);
  const [sort_condition] = useState(props.passed_conditions[1]);
  const [copy, setCopy] = useState(props.array.slice());
  const [copy_len, setCopy_len] = useState(props.array.length);
  const [curr_data, setCurr_data] = useState(props.array.slice());
  const [current, setCurrent] = useState(1);
  const [page, setPage] = useState([]);
  const [first_fetch, setFirst_fetch] = useState(true);
  const [expand, setExpand] = useState(true);
  //var input_query = useLocation().search.slice(1,);
  const [input_query, setInput] = useState(useLocation().search.slice(1,));
  const [first_page_num, setFirst_page_num] = useState([]);
  var maxLen = Math.ceil(copy_len / 20);
  // const isAlphaNumeric = ch => {
  //   return ch.match(/^[a-z0-9]+$/i) !== null;
  // }
  useEffect(() => {
    render_bg();
    
    get_data();
    
  }, []);

  useEffect(() => {
    //alert(input_query);
    var initial = [];
    maxLen = Math.ceil(copy_len / 20);
    if (maxLen <= 7) {
      //alert("copy_len: " + copy_len + " maxLen <=7");
      for (var i = 1; i <= maxLen; ++i) {
        initial.push(i);
      }
    } else {
      for (var a = 1; a <= 7; ++a) {
        initial.push(a);
      }
    }
    setPage(initial);
    setFirst_page_num(initial);
  }, [copy_len]);

  useEffect(() => {
    let temp_data = copy_filter(curr_data);
    if (temp_data !== null) {
      setCount(0);
      setCurrent(1);
      setCopy_len(temp_data.length);
      setCopy(temp_data);
    }
    
  }, [input_query]);
  // useEffect(() => {
  //   setCopy_len(copy.length);
  // }, [copy]);

  function handleExpand() {
    var jobCard = document.getElementsByClassName('job-card');
    var clicked = document.getElementsByClassName('clicked');
    if (expand) {
      for (var i = 0; i < jobCard.length; ++i) {
        jobCard[i].click();
      }
    } else {
      for (var i = 0; i < clicked.length; ++i) {
        clicked[i].click();
      }
    }
    setExpand(!expand);
  }

  function check_defined(value, tag_holder) {
    if (typeof value === "undefined") {
      return tag_holder;
      // setRegion("Region");
      // setTerm_priority("Work Term Priority");
      // setIs_cover("Cover Letter");
      // setDuration("Duration");
    } else {
      return value;
    }
  }

  function copy_filter(temp_data) {
    
    // alert(JSON.stringify(temp_data));
    if (input_query === "") {
      setCopy(curr_data);
      setCopy_len(curr_data.length);
      return null;
    }
    let filtered_data = [];


    temp_data.forEach(element => {
      let title = null;
      let company = null;
      if ('Job Title' in element["overview"]) {
        title = element["overview"]["Job Title"].toLowerCase();
        //alert(title)
        if (title.includes(input_query)) {
          //alert(title.search(input_re) + " title: " + title);
          filtered_data.push(element);
          return;
        }
      }
      company = element["company_name"].toLowerCase();
      //alert(company.search(input_re));
      if (company.includes(input_query)) {
        //alert(title.search(input_re) + " title: " + title);
        filtered_data.push(element);
        return;
      }
    });


    // let input_re = new RegExp(input_query, "i");
    // //let input_re = /developer/i;
    // temp_data.forEach(element => {
    //   let title = null;
    //   let company = null;
    //   if ('Job Title' in element["overview"]) {
    //     title = element["overview"]["Job Title"];
    //     if (title.search(input_re) !== -1) {
    //       //alert(title.search(input_re) + " title: " + title);
    //       filtered_data.push(element);
    //       return;
    //     }
    //   }

    //   company = element["company_name"];
    //   //alert(company.search(input_re));
    //   if (company.search(input_re) !== -1) {
        
    //     //alert(title.search(input_re) + " title: " + title);
    //     filtered_data.push(element);
    //     return;
    //   }
    // });
    return filtered_data;
  }

  function handleChange(event) {
    //input_query = event.target.value;
    setInput(event.target.value);
  }

  function increase() {
    if (current >= maxLen) {
      setCount(count);
      //alert("Max page number");
    } else if (current < 4) {
      setCount(count + 20);
      setCurrent(current + 1);
    } else if (current >= maxLen - 3) {
      setCount(count + 20);
      setCurrent(current + 1);
    } else {
      var newArray = [];
      for (var i = 0; i < 7; ++i) {
        newArray.push(page[i] + 1);
      }
      setCurrent(current + 1);
      setCount(count + 20);
      setPage(newArray);
    }
  }

  function decrease() {
    if (current === 1) {
      setCount(count);
      //alert("Min page number");
    } else if (current <= 4) {
      setCount(count - 20);
      setCurrent(current - 1);
    } else if (current >= maxLen - 3) {
      setCount(count - 20);
      setCurrent(current - 1);
    } else {
    var newArray = [];
    for (var i = 0; i < 7; ++i) {
      newArray.push(page[i] - 1);
    }
    setPage(newArray);
    setCount(count - 20);
    setCurrent(current - 1);
    }
  }

  function get_data() {
    axios.post('/express_backend_sort', {'params':  [query_condition, sort_condition]})
      .then((res) => {
        setCount(0);

        setCurrent(1);

        const temp_copy = res.data.express.slice();
        setCurr_data(temp_copy);
        if (input_query !== "") {
          let temp_data = copy_filter(temp_copy);
          //setCount(0);
          if (first_fetch) {
            setFirst_fetch(false);
            setCopy(props.array.slice());
            // setCopy_len(temp_data.length);
            // setCopy(temp_data);
            if (temp_data.length > copy_len) {
              setCopy(temp_data);
              setCopy_len(temp_data.length);
            } else {
              setCopy_len(temp_data.length);
              setCopy(temp_data);
            }
          }
          if (temp_data.length > copy_len) {
            setCopy(temp_data);
            setCopy_len(temp_data.length);
          } else {
            setCopy_len(temp_data.length);
            setCopy(temp_data);
          }

        } else {
          if (temp_copy.length > copy_len) {
            //alert(temp_copy.length)
            setCopy(temp_copy);
            setCopy_len(temp_copy.length);
          } else {
            setCopy_len(temp_copy.length);
            setCopy(temp_copy);
          }
        }
      });
  }
  
  // query by location
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
    get_data();
    
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
    get_data();
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
    get_data();
    e.preventDefault();
  }

  // query by work term priority
  function get_priority(e) {
    const priorities = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth +"];
    const condition = JSON.parse(e.target.value);
    //setTerm_priority(condition.order);
    for (var i = 0; i < 6; i++) {
      let delete_condition = "work_term_ratings.by_work_term" + "." + priorities[i];
      delete sort_condition[delete_condition];
    }
    delete query_condition['work_term_ratings'];

    if (condition.order !== "Unselect") {
      setTerm_priority(condition.order);
      if (condition.order === "Sixth") {
        condition.order = "Sixth +";
      }
      query_condition['work_term_ratings'] = {$exists: true};
      let term_copy = condition.condition + "." + condition.order;
      sort_condition[term_copy] = -1;
    } else {
      setTerm_priority("Work Term Priority");
    }
    get_data();
    e.preventDefault();
  }

  function Pages(pages) {
    return (
      <li className="page-item">
        <button onClick={set_page}
          value={pages} style={(current !== pages ? {backgroundColor:"transparent", border:"none"} : {backgroundColor:"transparent", border:"1px solid", borderRadius:"5px"})} 
          className="page-link">{pages}
        </button>
      </li>);
  }

  function set_page(event) {
    var intValue = parseInt(event.target.value);
  
    if (maxLen <= 7) {
      setCurrent(intValue);
      setCount((JSON.parse(event.target.value - 1)) * 20);
    } else if (event.target.value <= 4) {
      setCurrent(intValue);
      setCount((event.target.value - 1) * 20);
      setPage([1, 2, 3, 4, 5, 6, 7]);
    } else if (event.target.value >= maxLen - 3) {
      setCurrent(intValue);
      setCount((event.target.value - 1) * 20);
      setPage([maxLen - 6, maxLen - 5, maxLen - 4, maxLen - 3, maxLen - 2, maxLen - 1, maxLen]);
    } else {
      var newArray = [];

      var difference = event.target.value - page[3];

      for (var i = 0; i < 7; ++i) {
        newArray.push(page[i] + difference);
      }
      setCount((event.target.value - 1) * 20);
      setPage(newArray);
      setCurrent(intValue);
    }
    event.preventDefault();
  }

  function first() {
    setCount(0);
    setCurrent(1);
    setPage(first_page_num);
  }

  function last() {
    setCurrent(maxLen);
    setCount((maxLen - 1) * 20);
    if (maxLen <= 7) {
      setPage(first_page_num);
    } else {
      setPage([maxLen - 6, maxLen - 5, maxLen - 4, maxLen - 3, maxLen - 2, maxLen - 1, maxLen]);
    } 
  }

  let twentyCards = [];
  //alert(JSON.stringify(copy.length) + " " + JSON.stringify(copy_len));
  for (var i = count; i < Math.min(count + 20, copy_len); i++) {
    
    twentyCards.push(copy[i]);
  }

  return (
    <div>

      
      <Navbar />
      <div className="search-bar-job">
        <input className="search-input" type="text" placeholder="Enter company name or job title "
          value={input_query} onChange={handleChange}></input>
        <a className="search-btn"><i class="fas fa-search"></i></a>
        <p style={{fontSize: "1.25rem", textAlign: "left", padding: "1%"}}>
          <i class="fas fa-angle-double-down icon-large"></i> Advanced Search</p>
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

    <h1 style={{fontFamily: "monospace"}}>Search Result</h1>

    <div className="job-count">
    </div>

    <div style={{width:"50rem", margin:"auto", marginBottom:"5%"}}>
      <button onClick={handleExpand} className="expand-btn btn">{expand ? 'Exapnd All ▾' : 'Collapse All ▴'}</button>
    </div>
    
    {twentyCards.map(Card)}

    <nav style={{width:"25%", margin:"5% auto", transform:"scale(1.5)"}} aria-label="Page navigation example">
      <ul className="pagination" style={{justifyContent: "center", alignItems: "center"}}>
        <li className="page-item">
          <button onClick={first} style={{backgroundColor:"transparent", border:"none"}} className="page-link" aria-label="Next">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li className="page-item">
          <button onClick={decrease} style={{backgroundColor:"transparent", border:"none"}} className="page-link" aria-label="Previous">
            <span aria-hidden="true">‹</span>
          </button>
        </li>
          {page.map(Pages)}
        <li className="page-item">
          <button onClick={increase} style={{backgroundColor:"transparent", border:"none"}} className="page-link" aria-label="Next">
            <span aria-hidden="true">›</span>
          </button>
          
        </li>
        <li className="page-item">
          <button onClick={last} style={{backgroundColor:"transparent", border:"none"}} className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
        {/* <li><button onClick={() => alert(maxLen)}>Counting</button></li> */}
        
      </ul>
    </nav>
    <footer id="footer">
      <p style={{marginTop: "0%", fontFamily: "fantasy", fontSize: "1.25rem"}}>© Copyright 2020 Lingwei Gu & Ivan Hu</p>
    </footer>

    </div>);
}

export default Job;
                    

                    
