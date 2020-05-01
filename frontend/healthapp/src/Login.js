import React, { Component } from 'react';
import { Container, Row, Col, Form, Button} from "react-bootstrap";
import axios from "axios";
const API_BASE = "http://localhost:5000/healthquery-e1a26/us-central1/api";

const styles = {
    input: {
      padding: "10px 10px",
      borderRadius: "5px",
      outline: "none",
      border: "1px solid #d6d1d5",
      fontFamily: "Helvetica Neue",
      width: "60%",
      fontSize: 18,
      marginBottom: "5%"
    },
    button: {
        width: "50%",
        cursor: "pointer",
        marginRight: "0.25em",
        marginTop: "0.5em",
        padding: "0.938em",
        border: "none",
        borderRadius: 10,
        backgroundColor: "#36356b",
        color: "#fefefe",
        fontSize: 20,
        fontWeight: 600
     }
}

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            token: ""
        }
    };

    componentDidMount(){
        document.body.style = 'background: #36356b;';
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
       axios.post(API_BASE + "/loginUser", userData)
        .then(res => {
            if(res.status === 200){
                this.props.history.push("/patientPortal");
            }
        })
    };

    render(){
        return(
            <Container style={{alignItems: "center", textAlign: "center", display: "flex", justifyContent: "center"}}>
                <div style={{width: "40%", height: "50vh", backgroundColor: "#fff", marginTop: "10%", borderRadius: 30}}>
                    <form onSubmit={this.onSubmit}>
                        <h1 style={{color: "#36356b"}}>Login</h1>
                        <input id="email" style={styles.input} onChange={this.onChange} placeholder="Email"/>
                        <input id="password" style={styles.input} onChange={this.onChange} type="password" placeholder="Password"/> 
                        <Row>
                            <button style={styles.button} type="submit">
                                Login
                            </button>
                        </Row>  
                    </form>                 
                </div>
                
            </Container>

            
        );
    }
}

export default Login;