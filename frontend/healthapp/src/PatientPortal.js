import React, { Component } from "react";

class PatientPortal extends Component {
    componentDidMount(){
        document.body.style = 'background: #fff;';
    }
    render(){
        return(
            <h1>Welcome to the Patient Portal</h1>
        );
    }
}

export default PatientPortal;