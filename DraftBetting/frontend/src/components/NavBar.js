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
    Select,
    FormControl,
 } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function NavBar(props){
    const [tabValue, setTabValue] = useState();
    const [leagues, setLeagues] = useState(['league 1', 'league 2']);
    const csrftoken = props.csrftoken;

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    useEffect( () => {
        getLeagues()
    }, [props.user]);

    const handleProfileClickedOpen = (e) =>{
        setAnchorEl(e.currentTarget);
    };

    const handleProfileClickedClosed = () => {
        setAnchorEl(null);
    };

    const getLeagues = () => {
        fetch('/draft/get-user-leagues')
            .then((response) => response.json())
            .then((data) => {
                setLeagues(data)
            })
    }

    const handleLogOutClicked = () => {
        console.log(csrftoken);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'X-CSRFTOKEN' : csrftoken,
            },
        };

        fetch('/account/logout/', requestOptions)
        .then((response) => console.log(response.json()));
        handleProfileClickedClosed();
        window.location.reload();
    };

     return (
        <div>
            <AppBar>
                <Toolbar>
                    <Grid
                        container
                    >
                        <Grid
                            item
                            xs={3}
                            md={3}                            
                        >
                            <SportsFootballIcon
                                xs
                                sx={{
                                    marginRight:'auto',
                                    }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            md={6}
                            justifyContent="center"
                            style={{display: 'flex'}}
                        >
                            <FormControl                            >
                                <Select
                                    value={4}
                                    // onClick={}
                                >
                                    {leagues.map((league, index) => {
                                        return <MenuItem> {league.name}</MenuItem>
                                    })}
                                    <MenuItem value={4}>Create New League <AddCircleIcon sx={{marginLeft:'10px'}}/></MenuItem>
                                </Select>
                            </FormControl>
                            
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            md={3}
                            justifyContent="flex-end"
                            style={{display: 'flex'}}
                        >
                            <Box
                               
                            >
                                {props.user.isLoggedIn ? 
                                (<Box sx={{marginLeft:"auto"}}>
                                    <Grid container>
                                        <Typography>{props.user.name}</Typography>
                                        <AccountCircleIcon
                                            onClick={handleProfileClickedOpen}
                                            sx={{marginLeft: "15px"}}
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
                                            <MenuItem onClick={handleLogOutClicked}>Logout</MenuItem>

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
                            </Box>
                        </Grid>
                    </Grid>
                    
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
                        <Tab 
                            label='Draft' 
                            sx={{padding:"20px"}} 
                            component={Link}
                            to='/pick-a-player'
                        />
                        <Tab label='Scoreboard'/>
                        <Tab label='Research'/>
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
     )
 }