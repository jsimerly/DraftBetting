import React, { Component } from "react";
import {
    Link
} from "react-router-dom"
import { 
    Button, 
    Grid, 
    Typography, 
    FormControl,
    Input,
    InputLabel,
 } from '@material-ui/core';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default class zzLoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
            redirectToHome: false,
        }

        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handlePassChanged = this.handlePassChanged.bind(this);
        this.handlePressLogin = this.handlePressLogin.bind(this);
        this.handlePressLogout = this.handlePressLogout.bind(this);
    }


    handleEmailChanged(e) {
        this.setState({
            email: e.target.value,
        });
    }

    handlePassChanged(e) {
        this.setState({
            password: e.target.value,
        })
    }

    handlePressLogin() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        };

        fetch('/account/login/', requestOptions)
        .then((response) => response.json());
    }

    handlePressLogout(){
        const csrftoken = getCookie('csrftoken');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN' : csrftoken,
        },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        };

        console.log(requestOptions)
        fetch('/account/logout/', requestOptions)
        .then((response) => console.log(response.json()));
    }

    render(){
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Typography component='h4' variant='h4'>
                            Login
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <InputLabel> e-mail </InputLabel>
                            <Input
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={this.handleEmailChanged}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <InputLabel> password </InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    onChange={this.handlePassChanged}
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                            variant="contained" color="primary"
                            onClick={this.handlePressLogin}
                        >
                            Log-In
                        </Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Link to=''>
                            <Button
                                variant="contained" 
                                color="primary"
                                onClick={this.handlePressLogout}
                            >
                                Logout
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        )
    }
}