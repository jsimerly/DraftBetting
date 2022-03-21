import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Button,
    Link
 } from '@mui/material';

export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {}
    
        this.handleLogInPressed = this.handleLogInPressed.bind(this);
    }

 

    handleLogInPressed(){       
        console.log('button pressed');

        let navigate = useNavigate();
        navigate('/login');
    };

    render(){
        return ( 
            <div>
                <h1>Landing Page</h1>
                <Button
                    component={Link}
                    href="/login"
                    variant="contained" 
                    color="primary"
                    
                >

                    Log In Page
                </Button>
            </div>
        );
    }
}