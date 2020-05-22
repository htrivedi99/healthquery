import React, { Component } from 'react';

const styles = {
    login: {
        width: '50%',
        cursor: 'pointer',
        marginRight: '0.25em',
        marginTop: '0.5em',
        padding: '0.938em',
        border: 'none',
        borderRadius: 10,
        backgroundColor: '#576CA8',
        color: '#fefefe',
        fontSize: 20,
        fontWeight: 600,
    },
    signup: {
        width: '50%',
        cursor: 'pointer',
        marginRight: '0.25em',
        marginTop: '0.5em',
        padding: '0.938em',
        border: 'none',
        borderRadius: 10,
        backgroundColor: '#E5D4ED',
        color: '#fefefe',
        fontSize: 20,
        fontWeight: 600,
    },
};

class LandingPage extends Component {
    componentDidMount() {
        document.body.style = 'background: #36356b;';
    }

    goTologin = () => {
        this.props.history.push('/login');
    };

    goToSignup = () => {
        this.props.history.push('/register');
    };

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginRight: '20em',
                    marginTop: '20em',
                    marginLeft: '20em',
                    marginBottom: '20em',
                }}
            >
                <img src="./HQLogo.png" />
                <img src="./HealthQueryTitleLogo.png" />

                <button style={styles.login} onClick={this.goTologin}>
                    Login
                </button>
                <button style={styles.signup} onClick={this.goToSignup}>
                    Sign Up
                </button>
            </div>
        );
    }
}

export default LandingPage;
