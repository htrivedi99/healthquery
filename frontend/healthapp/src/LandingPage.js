import React, { Component } from 'react';

const styles = {
    login: {
        width: "30%",
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
     },
     signup: {
        width: "30%",
        cursor: "pointer",
        marginRight: "0.25em",
        marginTop: "0.5em",
        padding: "0.938em",
        border: "none",
        borderRadius: 10,
        backgroundColor: "#ABABAB",
        color: "#000",
        fontSize: 20,
        fontWeight: 600
     }
}

class LandingPage extends Component {
    componentDidMount(){
        document.body.style = 'background: #fff;';
    }

    goTologin = () => {
        this.props.history.push("/login");
    }
    
    goToSignup = () => {
        this.props.history.push("/register");
    }

    render(){
        return(
            <div>
                <div style={{display: "flex", alignItems: "center", textAlign: "center", justifyContent:"center"}}>
                    <h1>Landing Page</h1>
                </div>
                <div style={{display: "flex", alignItems: "center", textAlign: "center", justifyContent:"center"}}>
                    <button style={styles.login} onClick={this.goTologin}>
                        Login
                    </button>
                    <button style={styles.signup} onClick={this.goToSignup}>
                       Sign Up
                    </button>
                </div>
            </div>
            
        );
    }
}

export default LandingPage;