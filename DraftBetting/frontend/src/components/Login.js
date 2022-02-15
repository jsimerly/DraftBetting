import React, { Component } from "react";
import { 
    Button, 
    Grid, 
    Typography, 
    FormControl,
    Input,
    InputLabel,
 } from '@material-ui/core';

export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
        }

        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handlePassChanged = this.handlePassChanged.bind(this);
        this.handlePressLogin = this.handlePressLogin.bind(this);
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
                </Grid>
            </div>
        )
    }
}