import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Logo from './HQLogo.png';
import axios from 'axios';
const API_BASE = 'http://localhost:5000/healthquery-e1a26/us-central1/api';

const styles = {
    input: {
        padding: '10px 10px',
        borderRadius: '5px',
        outline: 'none',
        border: '1px solid #d6d1d5',
        fontFamily: 'Helvetica Neue',
        width: '60%',
        fontSize: 18,
        marginBottom: '5%',
    },
    button: {
        width: '50%',
        cursor: 'pointer',
        marginRight: '0.25em',
        marginTop: '0.5em',
        padding: '0.938em',
        border: 'none',
        borderRadius: 10,
        backgroundColor: '#36356b',
        color: '#fefefe',
        fontSize: 20,
        fontWeight: 600,
    },
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            userInfo: '',
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.password,
        };
        axios.post(API_BASE + '/registerNewUser', userData).then((res) => {
            if (res.status === 200) {
                this.props.history.push('/patientPortal');
            }
        });
    };

    render() {
        return (
            <Container>
                <Row style={{ display: 'flex' }}>
                    <Col
                        style={{
                            width: '50%',
                            backgroundColor: '#36356b',
                            height: '100vh',
                            textAlign: 'center',
                            paddingTop: '10%',
                        }}
                    >
                        <div
                            style={{
                                width: '50%',
                                backgroundColor: '#36356b',
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '5em',
                                marginLeft: '15em',
                            }}
                        >
                            <img src="./HQLogo.png" />
                            <img src="./HealthQueryTitleLogo.png" />
                        </div>
                    </Col>
                    <Col
                        style={{
                            width: '50%',
                            display: 'flex',
                            backgroundColor: 'white',
                            height: '100vh',
                            alignItems: 'center',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: '70%',
                                height: '62vh',
                                border: '3px solid #36356b',
                                borderRadius: 30,
                            }}
                        >
                            <form onSubmit={this.onSubmit}>
                                <h1 style={{ color: '#36356b' }}>
                                    Create Account
                                </h1>
                                <input
                                    id="name"
                                    style={styles.input}
                                    onChange={this.onChange}
                                    placeholder="Full Name"
                                />
                                <input
                                    id="email"
                                    style={styles.input}
                                    onChange={this.onChange}
                                    placeholder="Email"
                                />
                                <input
                                    id="password"
                                    style={styles.input}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder="Password"
                                />
                                <input
                                    id="confirmPassword"
                                    style={styles.input}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                                <Row>
                                    <button style={styles.button} type="submit">
                                        Sign Up
                                    </button>
                                </Row>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Register;
