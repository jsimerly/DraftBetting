import React, { useState, useEffect } from  "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import { 
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    Button,
    Box,
    Menu,
    MenuItem,
    Divider,
    Typography,
    Grid,
 } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';

export default function NavBar(props){
    const [tabValue, setTabValue] = useState();
    const [user, setUser] = useState(props.user)

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleProfileClickedOpen = (e) =>{
        setAnchorEl(e.currentTarget);
    };

    const handleProfileClickedClosed = () => {
        setAnchorEl(null);
    };

     return (
        <div>
            <AppBar>
                <Toolbar>
                    <SportsFootballIcon/>
                    {props.user.isLoggedIn ? 
                        (<Box sx={{marginLeft:"auto"}}>
                            <Grid container>
                                <Typography>{props.user.name}</Typography>
                                <AccountCircleIcon
                                    onClick={handleProfileClickedOpen}
                                    sx={{marginLeft: "5px"}}
                                    item
                                />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleProfileClickedClosed}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left"
                                    }}
                                >
                                    <MenuItem onClick={handleProfileClickedClosed}>Profile</MenuItem>
                                    <MenuItem onClick={handleProfileClickedClosed}>My Account</MenuItem>
                                    <MenuItem onClick={handleProfileClickedClosed}>Settings</MenuItem>
                                    <Divider sx={{my: 0.5}}/>
                                    <MenuItem onClick={handleProfileClickedClosed}>Logout</MenuItem>

                                </Menu>
                            </Grid>
                         </Box>                        
                        )
                        : 
                        (<Box
                            sx={{marginLeft:"auto"}}
                            >
                                <Button 
                                    variant="contained" 
                                    color="secondary"
                                    href="/login"
                                >
                                    LOGIN
                                </Button>
                                <Button 
                                    sx={{ marginLeft: '5px'}} 
                                    variant="contained" 
                                    color="secondary"
                                    href="/register"
                                >
                                    SIGNUP
                                </Button>
                            </Box>
                        )}
                </Toolbar>
                <Toolbar
                    sx={{backgroundColor: 'green'}}
                >
                    <Tabs 
                        textColor="inherit"
                        value={tabValue}
                        indicatorColor="secondary"
                        onChange={(e, tabValue) => setTabValue(tabValue)}        
                        sx={{margin: "auto"}}               
                    >
                        <Tab label='Draft' sx={{padding:"5px"}}/>
                        <Tab label='Scoreboard'/>
                        <Tab label='Research'/>
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
     )
 }