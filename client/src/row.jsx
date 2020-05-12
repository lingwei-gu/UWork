import React, { useState } from 'react';

const leftStyle = {
    width: "35%",
}

const leftInnerStyle = {
    marginTop: "13%",
}

const rightStyle = {
    width: "65%",
}

const rightInnerStyle = {
    marginTop: "7%",
}


function Row(props) {

    const [click, setClick] = useState(0);

    function handleClick() {
        if (click === 0) {
            setClick(1);
        } else {
            setClick(0);
        }
    }

    function copyToClipboard(e) {
        e.stopPropagation();
        var text = document.createElement('textarea');
        text.value = props.postingId;
        text.setAttribute('readonly', '');
        text.style.left = '-9999px';
        document.body.appendChild(text);
        text.select();
        document.execCommand('copy');
        document.body.removeChild(text);
    }

    if (click === 0) {
        let company_name = props.name;
        if (props.name.length > 58) {
            company_name = company_name.substring(0,55);
            company_name += "...";
        }
        return <div onClick={handleClick} className="row job-card">
                    <div style={leftStyle}>
                        <h5 className="aaa" style={leftInnerStyle}>{"Job ID: " + props.postingId}
                        <button  onClick={copyToClipboard} className="super-btn"><i className="far fa-copy"></i></button>
                        <br />
                        <br />
                        {company_name}</h5>
                        
                    </div>

                    <div style={rightStyle}>
                        <h5 className="aaa" style={rightInnerStyle}>{props.title}
                        <br />
                        <br />
                        {"deadline: " + props.ddl}
                    </h5>
                    </div>

                </div>;
    } else {
        return <div onClick={handleClick} className="clicked">
                    <h1 className="card-heading">{props.title}</h1>
                    {props.title.length > 70 ? <br /> : null}
                    {props.title.length > 70 ? <br /> : null}
                    <div className="left-right">
                    <div className="left">
                        <h5 className="subbing-left"><strong>Company:  &nbsp; </strong></h5>
                        <h5 className="subbing-right">{props.name}</h5>
                        <br />
                        <br />
                        <h5 className="subbing-left"><strong>Duration:  &nbsp; </strong></h5>
                        <h5 className="subbing-right">{props.duration}</h5>
                        <br />
                        <br />
                        <h5 className="subbing-left"><strong>Deadline:  &nbsp; </strong></h5>
                        <h5 className="subbing-right">{props.ddl}</h5>
                        <br />
                        <br />
                        <h5 className="subbing-left"><strong>Level:  &nbsp; </strong></h5>
                        <h5 className="subbing-right">
                            <ul>
                                <li>{'Junior ' + '\xa0\xa0' + (props.level.includes('Junior') ? '✔︎' : '')}</li>
                                <li>{'Intermediate ' + '\xa0\xa0' + (props.level.includes('Intermediate') ? '✔︎' : '')}</li>
                                <li>{'Senior ' + '\xa0\xa0' + (props.level.includes('Senior') ? '✔︎' : '')}</li>
                            </ul>
                        </h5>
                    </div>


                    <div className="right">
                        <h5 className="subbing-left"><strong>Posting ID:  &nbsp; </strong></h5>
                        <h5 className="subbing-right">{props.postingId}</h5>
                        <button  onClick={copyToClipboard} className=" copy-btn"><i className="far fa-copy"></i></button>
                        <br />  
                        <br />
                        <h5 className="subbing-left"><strong>Location:  &nbsp; </strong></h5>
                        <h5 className="subbing-right">{props.city + ' - ' + props.province + ' - ' + props.country}</h5>
                        
                        <br />
                        <br />
                        <h5 className="subbing-left"><strong>Work Term Hiring Percentage:</strong></h5>
                        <table>
                            <tr>
                                <th>1st</th>
                                <th>2nd</th>
                                <th>3rd</th>
                                <th>4th</th>
                                <th>5th</th>
                                <th>6th</th>
                            </tr>
                            <tr>
                                <td>{props.first + '%'}</td>
                                <td>{props.second + '%'}</td>
                                <td>{props.third + '%'}</td>
                                <td>{props.fourth + '%'}</td>
                                <td>{props.fifth + '%'}</td>
                                <td>{props.sixth + '%'}</td>
                            </tr>
                        </table>
                        <br />
                        <br />
                        <h5 className="subbing-left"><strong>Application package:  &nbsp; </strong></h5>
                        <h5 className="subbing-right">
                            <ul>
                                <li>{'Co-op Work History ' + '\xa0\xa0' + (props.app.includes('University of Waterloo Co-op Work History') ? '✔︎' : '')}</li>
                                <li>{'Résumé ' + '\xa0\xa0' + (props.app.includes('Résumé') ? '✔︎' : '')}</li>
                                <li>{'Grade Report ' + '\xa0\xa0' + (props.app.includes('Grade Report') ? '✔︎' : '')}</li>
                                <li>{'Cover Letter ' + '\xa0\xa0' + (props.app.includes('Cover Letter') ? '✔︎' : '')}</li>
                            </ul>
                            </h5>
                        </div>

                        </div>

                        <div className="requirement">
                        <h5 style={{fontFamily:"Lato", color:"#4d3e3e"}}><strong>Required skills:  &nbsp; </strong></h5>
                        <p style={{fontFamily:"Lato", fontWeight:"lighter", fontSize:"1.25rem"}}>{props.requirement}</p>
                    </div>
                
                </div>
    }
}



export default Row;
