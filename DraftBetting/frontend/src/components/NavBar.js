import React, { useState, useEffect } from  "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import { 
    AppBar,
    Toolbar,
    Typography,
    Tabs,
    Tab,
    Button,
 } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

 export default function NavBar(props){
     return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography>
                        Welcome
                    </Typography>
                    
                    <Tabs>
                        <Tab label='Draft'/>
                        <Tab label='Scoreboard'/>
                        <Tab label='Research'/>
                    </Tabs>
                    <Button sx={{ marginLeft: "auto" }} variant="contained">LOGIN</Button>
                    <Button variant="contained">SIGNUP</Button>
                    <AccountCircleIcon
                        // sx={{transform: scale(1.8)}}
                    />
                </Toolbar>
            </AppBar>
        </div>
     )
 }