import React, { Component } from "react";
import { Container, Row, Col, Form, Button} from "react-bootstrap";
import "./PatientPortal.css";
import calendar_icon from "./calendar_icon.png";

class PatientPortal extends Component {
    componentDidMount(){
        document.body.style = 'background: #fff;';
    }
    render(){
        return(
            <div>
                <div>
                    <Row style={{height: "8vh", paddingBottom: 0, borderBottom: "1px solid #36356b", display: "flex"}}>
                        <Col md={1} style={{display: "flex", alignItems: "center", marginRight: "60%",paddingLeft: "2%", fontFamily: "Helvetica Neue", color: "#36356b"}}>
                            <h3>HealthQuery</h3>
                        </Col>
                        
                        <Col md={1} className="navlink">
                            <h4 className="linkText">Queries</h4>
                        </Col>
                        <Col md={1} className="navlink">
                            <h4 className="linkText">Profile</h4>
                        </Col>
                        <Col md={1} className="navlink">
                            <h4 className="linkText">Logout</h4>
                        </Col>
                    </Row>
            </div>
            <div>
                <div className="chat">
                
                <Row style={{height: "10vh", width: "100%", textAlign:"center"}}>
                        <h1 className="chatLabel">Chat</h1>
                </Row>
                
                    <div className="chatbox">
                        <Row style={{width: "100%", height: "20vh", display: "flex"}}>
                            <Col style={{width: "20%"}}>
                                <div style={{width: "80%", height: "15vh", backgroundColor:"black", borderRadius: "200px", marginLeft: "10%", marginTop: "10%"}}>
                        
                                </div>
                            </Col>
                            <Col style={{marginTop: "6%", width: "80%"}}>
                                
                                <h1 style={{fontSize: 16, display: "inline"}}>Sandra Adams </h1>
                                <h1 style={{fontSize: 16, display: "inline", fontWeight: 300}}>
                                    - Hello there I would like to talk about something</h1>
                                
                            </Col>
                        </Row>
                    </div>
                    <div className="chatbox">
                        <Row style={{width: "100%", height: "20vh", display: "flex"}}>
                            <Col style={{width: "20%"}}>
                                <div style={{width: "80%", height: "15vh", backgroundColor:"black", borderRadius: "200px", marginLeft: "10%", marginTop: "10%"}}>
                        
                                </div>
                            </Col>
                            <Col style={{marginTop: "6%", width: "80%"}}>
                                
                                <h1 style={{fontSize: 16, display: "inline"}}>Jane Smith </h1>
                                <h1 style={{fontSize: 16, display: "inline", fontWeight: 300}}>
                                    - Hello there I would like to talk about something</h1>
                                
                            </Col>
                        </Row>
                    </div>

                </div>
                <div className="queries">
                    <Row style={{height: "10vh", width: "100%", textAlign:"center"}}>
                            <h1 className="chatLabel">Queries</h1>
                    </Row>
                    <div className="chatbox">
                        
                    </div>
                    
                </div>
                <div className="doctors">
                <Row style={{height: "10vh", width: "100%", textAlign:"center"}}>
                        <h1 className="chatLabel">Your Doctors</h1>
                </Row>
                <div>
                    <Row style={{width: "100%", height: "40vh", display: "flex"}}>
                       <Col style={{width: "50%", alignItems:"center", justifyContent:"center", display: "flex"}}>
                            <div style={{backgroundColor:"white", width: "80%", height: "40vh", borderRadius: 8}}>
                                <Row style={{alignItems: "center", justifyContent:"center", display: "flex"}}>
                                    <div style={{width: "48%", height: "15vh", backgroundColor:"black", borderRadius: "200px",marginTop: "10%"}}>
                        
                                    </div>
                                
                                </Row>
                                <Row style={{alignItems: "center", justifyContent:"center", textAlign: "center"}}>
                                    <h1 style={{fontSize: 35, fontFamily: "Helvetica Neue", fontWeight: 500, marginBottom: 0, paddingBottom: 0}}>Sandra</h1>
                                    <h1 style={{fontSize: 35, fontFamily: "Helvetica Neue", fontWeight: 500, marginTop: 0, paddingTop: 0}}>Adams</h1>
                                </Row>
                            </div>
                       </Col>
                       <Col style={{width: "50%", alignItems:"center", justifyContent:"center", display: "flex"}}>
                            <div style={{backgroundColor:"white", width: "80%", height: "40vh", borderRadius: 8}}>
                                <Row style={{alignItems: "center", justifyContent:"center", display: "flex"}}>
                                    <div style={{width: "48%", height: "15vh", backgroundColor:"black", borderRadius: "200px",marginTop: "10%"}}>
                        
                                    </div>
                                
                                </Row>
                                <Row style={{alignItems: "center", justifyContent:"center", textAlign: "center"}}>
                                    <h1 style={{fontSize: 35, fontFamily: "Helvetica Neue", fontWeight: 500, marginBottom: 0, paddingBottom: 0}}>Jane</h1>
                                    <h1 style={{fontSize: 35, fontFamily: "Helvetica Neue", fontWeight: 500, marginTop: 0, paddingTop: 0}}>Smith</h1>
                                </Row>
                            </div>
                       </Col>
                    </Row>
                    
                </div>
               
               
            </div>
            </div>

            <div>

            <div className="appointments">
                <Row style={{height: "10vh", width: "100%", textAlign:"center"}}>
                        <h1 className="chatLabel">Upcoming Appointments</h1>
                </Row>
                <div className="chatbox">
                    <Row style={{width: "100%", height: "20vh", display: "flex"}}>
                        <Col style={{width: "20%", alignSelf: "center", justifyContent: "center", textAlign: "center"}}>
                            <img src={calendar_icon} style={{width: "50%", height: "50%"}}/>
                        </Col>
                        <Col style={{width: "50%", alignSelf: "center", justifyContent: "center", textAlign: "center"}}>
                            <h1 style={{fontSize: 16, fontFamily:"Helvetica Neue", float:"left", fontWeight: 500}}>
                                Patient Follow-up: Irene Johnson
                            </h1>
                            <h1 style={{fontSize: 14,fontFamily:"Helvetica Neue", float: "left", fontWeight: 200}}>
                                Virtual Call Room
                            </h1>
                        </Col>
                        <Col style={{width: "30%", alignSelf: "center", justifyContent: "center", textAlign: "center"}}>
                            <h1 style={{fontSize:14, fontFamily:"Helvetica Neue", fontWeight: 400}}>Wed March 5</h1>
                            <h1 style={{fontSize:14, fontFamily:"Helvetica Neue", fontWeight: 400}}>10:00 AM - </h1>
                            <h1 style={{fontSize:14, fontFamily:"Helvetica Neue", fontWeight: 400}}>11:00 AM</h1>
                        </Col>
                    </Row>
                </div>
                <div className="chatbox">
                    <Row style={{width: "100%", height: "20vh", display: "flex"}}>
                        <Col style={{width: "20%", alignSelf: "center", justifyContent: "center", textAlign: "center"}}>
                            <img src={calendar_icon} style={{width: "50%", height: "50%"}}/>
                        </Col>
                        <Col style={{width: "50%", alignSelf: "center", justifyContent: "center", textAlign: "center"}}>
                            <h1 style={{fontSize: 16, fontFamily:"Helvetica Neue", float:"left", fontWeight: 500}}>
                                Patient Follow-up: Irene Johnson
                            </h1>
                            <h1 style={{fontSize: 14,fontFamily:"Helvetica Neue", float: "left", fontWeight: 200}}>
                                Virtual Call Room
                            </h1>
                        </Col>
                        <Col style={{width: "30%", alignSelf: "center", justifyContent: "center", textAlign: "center"}}>
                            <h1 style={{fontSize:14, fontFamily:"Helvetica Neue", fontWeight: 400}}>Wed March 5</h1>
                            <h1 style={{fontSize:14, fontFamily:"Helvetica Neue", fontWeight: 400}}>10:00 AM - </h1>
                            <h1 style={{fontSize:14, fontFamily:"Helvetica Neue", fontWeight: 400}}>11:00 AM</h1>
                        </Col>
                    </Row>
                </div>
               
            </div>

            

            </div>



            


            
            
        </div>
        );
    }
}

export default PatientPortal;