import React, { Component } from "react";
import { 
    Button, 
    Grid, 
    Typography, 
    FormControl,
    Form,
    Input,
    InputLabel,
    MenuItem,
    Divider, 
    Select,
    Menu,
    Stack,
    Item,
    List,
    ListItem,
    ListItemText
 } from '@material-ui/core';

export default class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state = {
         }

    }




    render(){
        return (
            <div>
                <FormControl>
                    <InputLabel> e-mail </InputLabel>
                    <Input
                        name="email"
                        type="email"
                        autoComplete="email"

                    />
                </FormControl>
                <FormControl>
                    <InputLabel> password </InputLabel>
                        <Input
                            name="password"
                            type="password"
                            autoComplete="password"
                        />
                </FormControl>
                <FormControl>
                    <InputLabel> confirm password </InputLabel>
                        <Input
                            name="password"
                            type="password"
                            autoComplete="password"
                        />
                </FormControl>

                <Button
                    variant="contained" color="primary"
                >
                    Register
                </Button>
            </div>
        )
    }
}