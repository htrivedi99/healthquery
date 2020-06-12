import React, { Component } from "react";
import { Container, Row, Col, Form, Button} from "react-bootstrap";
import "./PatientPortal.css";
import axios from "axios";
import defaultProfile from "./defaultProfile.png";

const API_BASE = "http://localhost:5000/healthquery-e1a26/us-central1/api";


class Chatbox extends Component {

    constructor(props){
        super(props);
        this.state = {
            lastMessage: ""
        }
    }

    componentDidMount(){
        this.getLastMessage();
    }

    getLastMessage = () => {
        const data = {
            uid1: localStorage.userId,
            uid2: this.props.doctorId
        };
        axios.post(API_BASE + "/getLastMessage", data)
            .then(res => {
                if(res.data.length === 1){
                    this.setState({lastMessage: res.data[0]['text']});
                }
            })
    }
    
    getId = () => {
        this.props.getInfo(this.props.doctorId);
    }
    render(){
        console.log(this.props);
        console.log(this.state);
        return(
            <div className="chatbox" onClick={this.getId} style={{cursor: "pointer"}}>
                <Row style={{width: "100%", height: "20vh", display: "flex"}}>
                    <Col style={{width: "20%"}}>
                        <div style={{width: "80%", height: "15vh", borderRadius: "200px", marginLeft: "10%", marginTop: "10%"}}>
                            <img src={defaultProfile} style={{width: "60%", height: "60%"}}/>
                        </div>
                    </Col>
                    <Col style={{marginTop: "6%", width: "80%"}}>
                        
                        <h1 style={{fontSize: 16, display: "inline"}}>{this.props.doctorName} </h1>
                        <h1 style={{fontSize: 16, display: "inline", fontWeight: 300}}>
                            - {this.state.lastMessage}</h1>
                        
                    </Col>
                </Row>
    </div>
        );
    }
}
export default Chatbox;