import React from 'react';
import Row from './row.jsx';

function Card(contact) {
    var priority_percentage = new Array(6).fill(0);
    const priorities = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth +"];
    for (var i = 0; i < 6; i++) {
        if (contact['work_term_ratings'] !== null) {
            if ('by_work_term' in contact['work_term_ratings'] && priorities[i] in contact['work_term_ratings']['by_work_term']) {
                priority_percentage[i] = contact['work_term_ratings']['by_work_term'][priorities[i]];
            }
        }
    }
    
    return (
        <Row 
          postingId = {contact['posting_id']}
          term = {contact['overview']['Work Term']}
          name = {contact['company_name']}
          title = {contact['overview']['Job Title']}
          ddl = {contact['app']['Application Deadline']}
          duration = {contact['overview']['Work Term Duration']}
          city = {contact['overview']['Job - City']}
          province = {contact['overview']['Job - Province / State']}
          country = {contact['overview']['Job - Country']}

          first = {priority_percentage[0]}
          second = {priority_percentage[1]}
          third = {priority_percentage[2]}
          fourth = {priority_percentage[3]}
          fifth = {priority_percentage[4]}
          sixth = {priority_percentage[5]}

          level = {contact['overview']['Level']}
          app = {contact['app']['Application Documents Required']}
          requirement = {contact['overview']['Required Skills']}
        />
    )
}

function render_bg() {
  document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM3Njd9&auto=format&fit=crop&w=2102&q=80')";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment= "fixed";
  document.body.style.backgroundSize = "cover";
}



export default Card;
export {Card, render_bg};