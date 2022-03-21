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
    const [tabValue, setTabValue] = useState();

     return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography>
                        Welcome
                    </Typography>
                    
                    <Tabs 
                        textColor="inherit"
                        value={tabValue}
                        indicatorColor="secondary"
                        onChange={(e, tabValue) => setTabValue(tabValue)}
                    >
                        <Tab label='Draft'/>
                        <Tab label='Scoreboard'/>
                        <Tab label='Research'/>
                    </Tabs>
                    <Button 
                        sx={{ marginLeft: "auto" }} 
                        variant="contained" 
                        color="secondary"
                    >
                        LOGIN
                    </Button>
                    <Button 
                        sx={{ marginLeft: '5px'}} 
                        variant="contained" 
                        color="secondary"
                    >
                        SIGNUP
                    </Button>
                    <AccountCircleIcon/>
                </Toolbar>
            </AppBar>
        </div>
     )
 }