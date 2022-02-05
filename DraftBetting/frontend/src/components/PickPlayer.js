import React, { Component } from "react";
import { 
        Button, 
        Grid, 
        Typography, 
        TextField,
        FormControl, 
        FormHelperText, 
        Radio, 
        RadioGroup, 
        FormControlLabel,
        Select, } from '@material-ui/core'
import { Link } from "react-router-dom";



export default class PickPage extends Component {


    constructor(props){
        super(props);
    }

    render(){
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        Select a Pick
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">
                                Player to pick:
                            </div>
                        </FormHelperText>
                        
                        <RadioGroup row defaultValue="true">
                            <FormControlLabel 
                                value="true" 
                                control={<Radio color="primary"/>}
                                label="Player/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel 
                                value="false" 
                                control={<Radio color="primary"/>}
                                label="No Color"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField 
                            required={true}
                            type="number"
                            inputProps={{
                                min:1,
                                style: { textAlign: "center" },
                            }}
                        />
                        <FormHelperText>
                            <div align="center">
                                Voters
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="container" align="center">  
                        Create Room
                    </Button>  
                </Grid>               
            </Grid>
        );
    }
}