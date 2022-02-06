import React, { Component } from "react";
import { 
    Button, 
    Grid, 
    Typography, 
    FormControl, 
    TextField,
    InputLabel,
    MenuItem,
    Divider, 
    Select,
 } from '@material-ui/core';

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
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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
                            defaultValue="e.g. Anti-Football Pussies"
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
                        
                    >
                        Create League
                    </Button>
                </Grid>
            </Grid>
        );
    }
}