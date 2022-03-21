import React, { Component } from "react";
import { 
    Button, 
    Grid, 
    Typography, 
    FormControl,
    Input,
    InputLabel,
 } from '@mui/material';

export default class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: null,
            name: null,
            password: null,
            password2: null,
        }

        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handlePass1Changed = this.handlePass1Changed.bind(this);
        this.handlePass2Changed = this.handlePass2Changed.bind(this);
        this.handlePressRegister = this.handlePressRegister.bind(this);
        this.handleNameChanged = this.handleNameChanged.bind(this);
    }

    handleNameChanged(e) {
        this.setState({
            name: e.target.value,
        })
    }

    handleEmailChanged(e) {
        this.setState({
            email: e.target.value,
        });
    }

    handlePass1Changed(e) {
        this.setState({
            password: e.target.value,
        })
    }

    handlePass2Changed(e) {
        this.setState({
            password2: e.target.value,
        })
    }

    handlePressRegister() {

        const passwordsMatchBool = this.state.password === this.state.password2
        
        if (passwordsMatchBool) {

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    name: this.state.name,
                    password: this.state.password,
                })
            };

            fetch('/account/register/', requestOptions)
            .then((response) => response.json());

        } else {
            console.log('passwords do not match')
        }
        
    }

    render(){
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Typography component='h4' variant='h4'>
                            Register
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
                            <InputLabel> Name </InputLabel>
                            <Input
                                name="name"
                                type="name"
                                autoComplete="name"
                                onChange={this.handleNameChanged}
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
                                    onChange={this.handlePass1Changed}
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <InputLabel> confirm password </InputLabel>
                                <Input
                                    name="password2"
                                    type="password"
                                    autoComplete="password"
                                    onChange={this.handlePass2Changed}
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                            variant="contained" color="primary"
                            onClick={this.handlePressRegister}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}