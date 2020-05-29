import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./profile.css";

class Profile extends Component {
    componentDidMount(){
        document.body.style = 'background: #fff;';
    }
    render(){
        // Can put variables and such out here (private)
        return(
            <div>
                <div>
                    <Row style={{height: "200px", paddingBottom: 5, display: "flex"}}>
                        <Row className="headboard">
                            <img className="profileImage" src="defaultProfile.png" />
                            <h1 style={{marginBottom: "5px", marginTop: "5px"}}>Patient Name</h1>
                            <hr className="lineBreak"></hr>
                        </Row>
                    </Row>
                </div>
                <div>
                    {/* Wrap this in two columns? Might be better that way. Try at least*/}
                    <div className="basicInfo">
                        <Row style={{width: "100%", textAlign:"Center"}}>
                            <h1 style={{color: "grey"}}>Basic Information</h1>
                            <hr className="lineBreak" style={{marginBottom: "10px"}}></hr>
                            <Row className="infoBox">
                                <body style={{display: "inline-block"}}><b>Note 1:</b> This is a note.</body>
                            </Row>
                            <Row className="infoBox">
                                <body style={{display: "inline-block"}}><b>Note 2:</b> This is another note.</body>
                            </Row>
                            {/* Loop through items in the patient's info in DB, add based on present items */}
                        </Row>
                    </div>
                    <div className="queryBox">
                        <Row style={{width: "100%", textAlign:"Center"}}>
                            <h1 style={{color: "grey"}}>Patient Queries</h1>
                            <hr className="lineBreak" style={{marginBottom: "10px"}}></hr>
                            <Row className="query" style={{display: "flex", marginLeft: "2%", marginRight: "2%", marginTop: "5px", marginBottom: "5px"}}>
                                <Row style={{display: "flex", alignItems: "left"}}>
                                    <body style={{display: "inline-block"}}><b>Note 1:</b> This is a patient query.</body>
                                    <Row className="priorityColor" style={{display: "flex", alignItems: "right", backgroundColor: "red", width: "75px", height: "100px", float: "right"}}/>
                                </Row>
                            </Row>
                            <Row className="query" style={{marginLeft: "2%", marginRight: "2%", marginTop: "5px", marginBottom: "5px"}}>
                                <body style={{display: "inline-block"}}><b>Note 2:</b> This is a patient query.</body>
                            </Row>
                            {/* Loop through items in the patient's queries in DB, add based on present items */}
                        </Row>
                    </div>
                    <div className="appHist">
                        <Row style={{width: "100%", textAlign:"Center"}}>
                            <h1 style={{color: "grey"}}>Appointment History</h1>
                            <hr className="lineBreak" style={{marginBottom: "10px"}}></hr>
                            <Row className="appointment" style={{marginLeft: "2%", marginRight: "2%", marginTop: "5px", marginBottom: "5px"}}>
                                <body style={{display: "inline-block"}}><b>Note 1:</b> This is a patient appointment.</body>
                            </Row>
                            <Row className="appointment" style={{marginLeft: "2%", marginRight: "2%", marginTop: "5px", marginBottom: "5px"}}>
                                <body style={{display: "inline-block"}}><b>Note 2:</b> This is a patient appointment.</body>
                            </Row>
                            {/* Loop through patient appointments list, add based on present items, maybe top 5? */}
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
