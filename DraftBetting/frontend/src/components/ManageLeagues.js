import React, { useState, useEffect } from  "react";
import {
    useNavigate,
} from "react-router-dom";
import { 
    List,
    ListItem,
    Grid,
 } from '@mui/material';
 import AddCircleIcon from '@mui/icons-material/AddCircle';
 import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


 export default function ManageLeagues(props) {
    const leagues = props.leagues

    
    function leaguesManager() {
        if (leagues === null) {
            return (
                <div> You're not currently in any leagues. </div>
            )
        } else {
            return (
                <List>
                    {leagues.map((league, index) => {
                        if (league.is_owner) {
                            return (
                                <Grid container>
                                    <Grid item> <ListItem key={league.id} value={league.id}> {league.name} </ListItem></Grid>
                                    <Grid item> <AddCircleIcon style={{fontSize:32}} /> </Grid>
                                    <Grid item> <DeleteForeverIcon style={{fontSize:40}}/> </Grid>

                                </Grid>
                                

                            )
                        } else {
                            return <ListItem key={league.id} value={league.id}> {league.name} </ListItem>
                        }
                        
                    })}
                </List>
            )
        }
    }
    

     return(
         leaguesManager()
     )
 }