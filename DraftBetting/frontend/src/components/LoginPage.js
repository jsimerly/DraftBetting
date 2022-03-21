import React, { useState, useEffect } from  "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import { 
    Button, 
    Grid, 
    Typography, 
    FormControl,
    Input,
    InputLabel,
 } from '@material-ui/core';


export default function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submitForm = () => {
        if (email === "" || passowrd === "") {
            setError("Fields are required!")
            return;
        }
    }

    function handleEmailChanged(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChanged(e){
        setPassword(e.target.value)
    }

    function handleLoginPressed(){
        console.log(email);
        const requestOptions = {
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        }

        fetch('/account/login/', requestOptions)
        .then(function (response){
            if(response.status === 202){
                console.log('success');
                navigate('/')
            } else {
                console.log(response.json())
            }
        });

    }
    
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
                            onChange={handleEmailChanged}
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
                                onChange={handlePasswordChanged}
                            />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLoginPressed}
                    >
                        Log-In
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

