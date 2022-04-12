import React, { Component } from "react";
import { 
    Button, 
    Grid, 
    Typography, 
    FormControl, 
    TextField,
    Link,
 } from '@mui/material';

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


export default class CreateLeaguePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            leagueName: null,
        };

        this.handleNameEntered = this.handleNameEntered.bind(this);
        this.handleCreateButtonPressed = this.handleCreateButtonPressed.bind(this);
    }

    handleNameEntered(e) {
        this.setState({
            leagueName: e.target.value,
        });
    }

    handleCreateButtonPressed() {
        const csrftoken = getCookie('csrftoken')
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFTOKEN' : csrftoken,
        },
            body: JSON.stringify({
                name: this.state.leagueName,
            })
        };

        fetch('/draft/create-league/', requestOptions)
        .then((response) => response.json())
    }

    render(){
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        Create League
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl fullWidth="true">
                        <TextField 
                            required
                            id="name-required"
                            label="League Name"
                            onChange={this.handleNameEntered}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        align="center"
                        onClick={this.handleCreateButtonPressed}
                        to='/'
                        component={Link}                        
                    >
                        Create League
                    </Button>
                </Grid>
            </Grid>
        );
    }
}