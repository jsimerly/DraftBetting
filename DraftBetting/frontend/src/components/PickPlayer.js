import React, { useState, useEffect } from  "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";

import { 
    FormControl,
    Select,
    MenuItem,
    ListItemText,
    InputLabel,
    Divider,
    Button,
    Box,
 } from '@mui/material';
 import LockIcon from '@mui/icons-material/Lock';

 export default function PickPage(props) {
    const [playerSelected, setPlayerSelected] = useState();
    const [positionSelected, setPositionSelected] = useState();
    const [pickIsLocked, setPickIsLocked] = useState(false);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        getPlayers()
    }, [])

    function handlePlayerSelected(e) {
        setPlayerSelected(e.target.value)
    }

    function handlePositionSelected(e) {
        setPositionSelected(e.target.value);
    }

    const handleLockInPressed = () => {
        setPickIsLocked(true);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                round:1,
                pick: 1,
                comp: 'Jacob',
                player: playerSelected,
                pos: positionSelected
            })
        };

        fetch('draft/pick-player/', requestOptions)
            .then((response) => console.log(response.json()))
    }

    const getPlayers = () => {
        fetch('/draft/get-players/')
            .then((response) => response.json())
            .then((data) => {
                setPlayers(data)
            })
    }

    

    const roles = {
        OFFENSE: 1,
        DEFENSE: 2,
        SPECIAL: 3,
        OTHER: 4,
    }

    const selectablePositions = {
        //off
        QB: {fullName:"Quarterback", abbrev:"QB", role: roles.OFFENSE},
        RB: {fullName:"Running Back", abbrev:"RB", role: roles.OFFENSE},
        WR: {fullName:"Wide Reciever", abbrev:"WR", role: roles.OFFENSE},
        TE: {fullName:"Tight End", abbrev:"TE", role: roles.OFFENSE},
        OT: {fullName:"Offensive Tackle", abbrev:"OT", role: roles.OFFENSE},
        OG: {fullName:"Offensive Gaurd", abbrev:"OG", role: roles.OFFENSE},
        C: {fullName:"Center", abbrev:"C", role: roles.OFFENSE},
        //def
        DL: {fullName:"Defensive Lineman", abbrev:"DL", role: roles.DEFENSE},
        EDGE: {fullName:"Edge Rusher", abbrev:"EDGE", role: roles.DEFENSE},
        ILB: {fullName:"Inside Linebacker", abbrev:"ILB", role: roles.DEFENSE},
        OLB: {fullName:"Outside Linebacker", abbrev:"OLB", role: roles.DEFENSE},
        CB: {fullName:"Cornerback", abbrev:"CB", role: roles.DEFENSE},
        S: {fullName:"Saftey", abbrev:"S", role: roles.DEFENSE},
        //special
        K: {fullName:"Kicker or Punter", abbrev:"K/P", role: roles.SPECIAL},

    }

    function mapPositions(positionDict) {
        let roleHolder = roles.OFFENSE;

        return(
            Object.keys(positionDict).map((key, index) => {
                let currentPositon = positionDict[key]

                if (currentPositon.role === roleHolder) {
                    return( 
                        <MenuItem value={currentPositon.abbrev}>
                            <ListItemText primary={currentPositon.abbrev}/>
                        </MenuItem>
                        
                    )
                } else { 
                    roleHolder = currentPositon.role
                    return (
                        <div>
                            <Divider/>
                            <MenuItem>
                                <ListItemText value={currentPositon.abbrev}> {currentPositon.abbrev} </ListItemText>
                            </MenuItem>
                            
                        </div>
                    )
                }
                
            })   
        )

             
    }

    function playersDropdown(){
        return(
            <FormControl fullWidth="true">
                <InputLabel id='select-helper-player-label'> Player </InputLabel>
                <Select
                    labelId="select-helper-player-label"
                >
                    {players.map((player, index) => {
                        const player_name = player.first_name + " " + player.last_name
                        const player_info = player.pos + " - " + player.college
                        return (
                                <MenuItem key={player.id} value={player.id}>
                                    <ListItemText primary={player_name} secondary={player_info}/>
                                </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }

    function positionDropdown(){
        
        return(
            <FormControl fullWidth='true'>
                <InputLabel id='select-helper-pos-label'> POS </InputLabel>
                <Select
                    labelId="select-helper-pos-label"
                    id="pos-selection"
                    label="position"
                    align="center"
                    onChange={handlePositionSelected}
                >
                    {mapPositions(selectablePositions)}
                </Select>
            </FormControl>
        )
    }
    
    function main() {
        if (pickIsLocked) {
            return(
                <div>
                    Pick is Locked
                </div>
            )
        } else {
            return(
                <Box
                    textAlign={'center'}
                >
                    {playersDropdown()}
                    {positionDropdown()}
                    <Button
                        onClick={handleLockInPressed}
                    >
                        <LockIcon/>
                    </Button>
                </Box>
            )
        }
    }


    return (
         main()
     )
 }