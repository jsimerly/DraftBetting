import React, { Component } from "react";
import { 
        Button, 
        Grid, 
        Typography, 
        FormControl, 
        InputLabel,
        MenuItem,
        Divider, 
        Select,
     } from '@material-ui/core';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";


export default class PickPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            playerSelected: null,
            positionSelected: null,
            pickIsLocked: 'false',
            players:[],
        };

        this.getPlayers();
        this.handleLockInPressed = this.handleLockInPressed.bind(this);
        this.handlePlayerSelected = this.handlePlayerSelected.bind(this);
        this.handlePosSelected = this.handlePosSelected.bind(this);
        this.handleTestPress = this.handleTestPress.bind(this);
    }

    handlePlayerSelected(e) {
        this.setState({
            playerSelected: e.target.value,
        });
    }

    handlePosSelected(e) {
        alert(this.state.players)
        this.setState({
            positionSelected: e.target.value,
        });
    }

    handleTestPress(){
        console.log(this.state.players[0].name)
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
        .then((response) => response.json());
    }

    getPlayers() {
        fetch('/draft/get-players')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                players: data,
            });
        });
    }

    
    
    render(){
        let playersMenuItem = this.state.players.map((player)=>{
            return (
                <MenuItem value={player.id}>{player.name}</MenuItem>
            );
        })
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Button 
                            color="secondary" 
                            variant="container" 
                            align="center"
                            onClick={this.handleTestPress}>  
                        <LockIcon/>
                        </Button>  
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography component='h4' variant='h4'>
                            Select Player
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
                                {playersMenuItem}
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
            </div>
            
        );
    }
}