import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Button,
 } from '@material-ui/core';

export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {}
    
        this.handleLogInPressed = this.handleLogInPressed.bind(this);
    }

 

    handleLogInPressed(){       
        let navigate = useNavigate();

        console.log('button pressed');
        navigate('/login');
    };

    render(){
        return ( 
            <div>
                <h1>Landing Page</h1>
                <Button
                    variant="contained" 
                    color="primary"
                    onClick={ this.handleLogInPressed}
                >

                    Log In Page
                </Button>
            </div>
        );
    }
}