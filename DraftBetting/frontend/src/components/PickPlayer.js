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
        ListItem,
        ListItemText
     } from '@mui/material';
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
            playerFilter : null,
        };

        this.getPlayers();
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
            const player_name = player.first_name + " " + player.last_name
            const player_info = player.pos + " - " + player.college
            return (
                <ListItem value={player.id}>
                        <ListItemText primary={player_name}  secondary={player_info}/>
                </ListItem>
            );
        })
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Typography component='h4' variant='h4'>
                            Select Player
                        </Typography>
                    </Grid>
                    <Grid item xs={8} align="center">
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
                    <Grid item xs={8} align="center">
                        <FormControl fullWidth="true">
                            <InputLabel id='select-helper-pos-label'>Position</InputLabel>
                            <Select
                                    labelId="select-helper-pos-label"
                                    id="pos-selection"
                                    label="position"
                                    align="center"
                                    onChange={this.handlePosSelected}
                                > 
                                <MenuItem value={"QB"}>QB</MenuItem>
                                <MenuItem value={"RB"}>RB</MenuItem>
                                <MenuItem value={"WR"}>WR</MenuItem>
                                <MenuItem value={"TE"}>TE</MenuItem>
                                <MenuItem value={"OT"}>OT</MenuItem>
                                <MenuItem value={"OG"}>OG</MenuItem>
                                <MenuItem value={"C"}>C</MenuItem>
                                <Divider/>
                                <MenuItem value={"DL"}>DL</MenuItem>
                                <MenuItem value={"EDGE"}>EDGE</MenuItem>
                                <MenuItem value={"ILB"}>ILB</MenuItem>
                                <MenuItem value={"OLB"}>OLB</MenuItem>
                                <MenuItem value={"CB"}>CB</MenuItem>
                                <MenuItem value={"S"}>S</MenuItem>
                                <Divider/>
                                <MenuItem value={"K/P"}>K/P</MenuItem>
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