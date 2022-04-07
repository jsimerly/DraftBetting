import React, { useState, useEffect } from  "react";
import {
    useNavigate,
} from "react-router-dom";
import { 
    List,
    ListItem
 } from '@mui/material';



 export default function ManageLeagues(props) {
    const [leagues, setLeagues] = useState();

    
    if (leagues === null) {
        return (
            <div> You're not currently in any leagues. </div>
        )
    } else {
        
    }

     return(
        <List>
         
        </List> 
     )
 }