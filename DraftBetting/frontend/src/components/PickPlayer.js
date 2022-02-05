import React, { Component } from "react";
import { 
        Button, 
        Grid, 
        Typography, 
        TextField,
        FormControl, 
        FormHelperText,
        InputLabel,
        MenuItem,
        Divider, 
        Radio, 
        RadioGroup, 
        FormControlLabel,
        Select,
        Menu,
        SvgIcon,
     } from '@material-ui/core';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";


export default class PickPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            playerSelected: null,
            positionSelected: null,
            pickIsLocked: false,
        };

        this.handleLockInPressed = this.handleLockInPressed.bind(this);
        this.handlePlayerSelected = this.handlePlayerSelected.bind(this);
        this.handlePosSelected = this.handlePosSelected.bind(this);
    }

    handlePlayerSelected(e) {
        this.setState({
            playerSelected: e.target.value,
        });
    }

    handlePosSelected(e) {
        this.setState({
            positionSelected: e.target.value,
        });
    }

    handleLockInPressed() {
        this.setState({
            pickIsLocked: true,
        });
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                round: 1,
                pick: 1,
                comp: 'Jacob',
                player: this.state.playerSelected,
                pos: this.state.positionSelected
            })
        };

        fetch('/draft/pick-player/', requestOptions)
        .then((response) => response.json())
        .then((data) => alert(data));

    }


    render(){
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        Select a Pick
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl fullWidth="true">
                        <InputLabel id='select-helper-player-label'>Player</InputLabel>
                        <Select
                            labelId="select-helper-player-label"
                            id="player-selection"
                            label="player"
                            onChange={this.handlePlayerSelected}
                        >   
                            <MenuItem value={10}>Player 1</MenuItem>
                            <MenuItem value={20}>Player 2</MenuItem>
                            <MenuItem value={30}>Player 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl fullWidth="true">
                        <InputLabel id='select-helper-pos-label'>Position</InputLabel>
                        <Select
                                labelId="select-helper-pos-label"
                                id="pos-selection"
                                label="position"
                                align="center"
                                onChange={this.handlePosSelected}
                            > 
                                <MenuItem value={1}>QB</MenuItem>
                                <MenuItem value={2}>RB</MenuItem>
                                <MenuItem value={3}>WR</MenuItem>
                                <MenuItem value={4}>TE</MenuItem>
                                <MenuItem value={5}>OT</MenuItem>
                                <MenuItem value={6}>OG</MenuItem>
                                <MenuItem value={7}>C</MenuItem>
                                <Divider/>
                                <MenuItem value={8}>DL</MenuItem>
                                <MenuItem value={9}>EDGE</MenuItem>
                                <MenuItem value={10}>MLB</MenuItem>
                                <MenuItem value={11}>OLB</MenuItem>
                                <MenuItem value={12}>CB</MenuItem>
                                <MenuItem value={13}>S</MenuItem>
                                <Divider/>
                                <MenuItem value={14}>K/P</MenuItem>
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button 
                        color="secondary" 
                        variant="container" 
                        align="center"
                        onClick={this.handleLockInPressed}>  
                       <LockIcon/>
                    </Button>  
                </Grid>               
            </Grid>
        );
    }
}