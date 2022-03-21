import React, { useState, useEffect } from  "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import { 
    Button, 
    Grid,
    Item,
    Typography, 
    FormControl,
    Input,
    InputLabel,
 } from '@material-ui/core';

 export default function NavBar(props){
     return (
         <div>
             <Grid 
                container 
                spacing={3}
                p={3}
                justifyContent="center"
                alignItems="center"
                direction="row"
            >
                <Grid 
                    item 
                    container
                    alignItems="center" 
                    xs
                >
                    <div item>
                        item1
                    </div>
                </Grid>
                <Grid 
                    item 
                    container
                    xs={6}
                    alignItems="center"
                    justifyContent="center"
                >
                    <div item>
                        item2
                    </div>
                </Grid>
                <Grid 
                    item 
                    container
                    justifyContent="flex-end"
                    alignItems="center" 
                    xs
                >
                    <div item>
                        item 3
                    </div>
                </Grid>
            </Grid>
         </div>
     )
 }